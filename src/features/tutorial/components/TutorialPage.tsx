import { useRef, useState, useEffect, useCallback } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { IntroSection } from './IntroSection';
import { StickyHand } from './StickyHand';
import { StepContent } from './StepContent';
import { FinalBox } from './FinalBox';

// ─── Step data ────────────────────────────────────────────────────────────────

const STEPS = [
  { n: '01', title: 'Clean Your Nails',      desc: 'Wipe each nail with an alcohol pad. Oils and lotions are the #1 cause of early lifting — this step sets everything.',              tool: 'clean'   as const, nailsDone: 0 },
  { n: '02', title: 'Push Back Cuticles',    desc: 'Gently push back your cuticles to expose the full nail bed. More surface area means a stronger, gap-free bond.',                 tool: 'cuticle' as const, nailsDone: 0 },
  { n: '03', title: 'Buff the Surface',      desc: "Lightly buff each nail to remove the natural shine. You're creating grip — not damaging your nails.",                            tool: 'buff'    as const, nailsDone: 0 },
  { n: '04', title: 'Select Your Size',      desc: 'Hold each press-on to your nail. It should cover edge to edge without touching skin. Between sizes? Go smaller.',                tool: 'size'    as const, nailsDone: 0 },
  { n: '05', title: 'Apply the Glue',        desc: 'One dot on your natural nail, a thin coat on the press-on back. Too much causes lifting — less is always more.',                tool: 'glue'    as const, nailsDone: 0 },
  { n: '06', title: 'Press & Hold',          desc: 'Angle from the cuticle down and press slowly toward the tip. Hold firm for 15–20 seconds — no exceptions.',                     tool: 'press'   as const, nailsDone: 1 },
  { n: '07', title: 'Clean the Edges',       desc: 'Remove any glue squeeze-out with a cotton bud dipped in acetone. The detail that separates good from great.',                   tool: 'wipe'    as const, nailsDone: 2 },
  { n: '08', title: 'Repeat All 10',         desc: 'Work through each finger methodically. Rushing here leads to bubbles and lifting. One nail at a time.',                          tool: 'repeat'  as const, nailsDone: 5 },
  { n: '09', title: 'Shape & File',          desc: 'Give edges a final file to your preferred shape — square, round, coffin. This is your finish.',                                  tool: 'file'    as const, nailsDone: 5 },
  { n: '10', title: 'Done. Now Slay.',       desc: 'Your set lasts 2–3 weeks. Avoid prolonged water for the first hour while the glue fully cures.',                                tool: 'final'   as const, nailsDone: 5 },
] as const;

const TOTAL_VH = STEPS.length + 1; // 11 × 100vh

// ─── Main ─────────────────────────────────────────────────────────────────────

export function TutorialPage() {
  const sectionRef       = useRef<HTMLDivElement>(null);
  const stepRef          = useRef(0);       // mirrors state — readable in event handlers
  const programmaticRef  = useRef(false);   // suppress scroll-progress updates during snap
  const wheelActiveRef   = useRef(false);   // true while a wheel gesture is in flight
  const wheelEndTimer    = useRef<ReturnType<typeof setTimeout>>();
  const [currentStep, _set] = useState(0);

  const setStep = useCallback((n: number) => {
    stepRef.current = n;
    _set(n);
  }, []);

  // ── Scroll-to-step (programmatic snap) ──────────────────────────────────────
  const snapToStep = useCallback((next: number) => {
    const el = sectionRef.current;
    if (!el) return;
    const clamped = Math.max(0, Math.min(STEPS.length - 1, next));
    programmaticRef.current = true;
    setStep(clamped);
    const elTop = el.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: elTop + (clamped / STEPS.length) * el.offsetHeight, behavior: 'smooth' });
    setTimeout(() => { programmaticRef.current = false; }, 800);
  }, [setStep]);

  // ── Wheel: exactly one step per gesture ─────────────────────────────────────
  //
  // Problem with a simple time-throttle: trackpad inertia fires wheel events for
  // 1-2 s after the finger lifts, so a 700 ms throttle still lets a second event
  // through on a long swipe.
  //
  // Fix: fire on the FIRST event of a new gesture, then lock.  A gesture is
  // considered "ended" when there is 50 ms of silence.  Tiny inertia events
  // (|deltaY| ≤ 4) do NOT reset the silence window, so inertia dies out quickly.
  //
  // Boundary fix: only intercept while the sticky panel is truly pinned
  // (section top ≤ 0 AND section bottom ≥ viewport height).  This prevents the
  // handler from firing when the user is reading the FinalBox section below.
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      // Sticky panel is pinned only when section spans the whole viewport
      if (top > 0 || bottom < window.innerHeight) return;

      // At boundaries let the page scroll naturally
      if (e.deltaY > 0 && stepRef.current >= STEPS.length - 1) return;
      if (e.deltaY < 0 && stepRef.current <= 0) return;

      e.preventDefault();

      // Significant delta resets the gesture-end timer; dying inertia does not
      if (Math.abs(e.deltaY) > 4) {
        clearTimeout(wheelEndTimer.current);
        wheelEndTimer.current = setTimeout(() => {
          wheelActiveRef.current = false;
        }, 50);
      }

      if (wheelActiveRef.current) return; // still in the same gesture

      // First event of a new gesture — snap and lock
      wheelActiveRef.current = true;
      snapToStep(stepRef.current + (e.deltaY > 0 ? 1 : -1));
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [snapToStep]);

  // ── Keyboard: arrow keys ─────────────────────────────────────────────────────
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      const el = sectionRef.current;
      if (!el) return;
      const { top, bottom } = el.getBoundingClientRect();
      if (top > 100 || bottom < 0) return;

      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') { e.preventDefault(); snapToStep(stepRef.current + 1); }
      if (e.key === 'ArrowUp'   || e.key === 'ArrowLeft')  { e.preventDefault(); snapToStep(stepRef.current - 1); }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [snapToStep]);

  // ── Mobile / trackpad: track real scroll progress ────────────────────────────
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] });
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (programmaticRef.current) return;
    setStep(Math.min(STEPS.length - 1, Math.floor(v * STEPS.length)));
  });

  const step = STEPS[currentStep];

  return (
    <div className="bg-black min-h-screen">

      {/* ── 1. Intro ── */}
      <IntroSection />

      {/* ── 2. Scroll-driven tutorial ── */}
      <div
        ref={sectionRef}
        style={{ height: `${TOTAL_VH * 100}vh` }}
        className="relative bg-black"
      >
        {/* sticky panel — NO overflow-hidden so SVG tools render freely */}
        <div className="sticky top-0 h-[100dvh] bg-black">

          {/* Top progress line */}
          <div className="absolute top-0 left-0 right-0 h-px bg-white/[0.05] z-20">
            <motion.div
              className="h-full bg-[#DD2C6C] origin-left"
              animate={{ scaleX: (currentStep + 1) / STEPS.length }}
              transition={{ duration: 0.4, ease: 'easeOut' }}
            />
          </div>

          {/* Step counter — top-right */}
          <div className="absolute top-4 right-5 z-20 tabular-nums text-[11px] font-mono text-white/20 tracking-widest">
            {currentStep + 1} / {STEPS.length}
          </div>

          {/* Main layout */}
          <div className="h-full flex flex-col lg:flex-row">

            {/* ── Left: hand (mobile: 52vh, desktop: 60%) ── */}
            <div className="w-full lg:w-[58%] flex-shrink-0 h-[52vh] lg:h-full">
              <StickyHand tool={step.tool} nailsDone={step.nailsDone} />
            </div>

            {/* ── Right: step text ── */}
            <div className="flex-1 flex items-center px-6 sm:px-10 lg:px-14 pb-16 lg:pb-0 overflow-hidden">
              <div className="w-full max-w-sm">
                <StepContent step={step} stepIndex={currentStep} total={STEPS.length} />
              </div>
            </div>

          </div>

          {/* Scroll hint */}
          {currentStep === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 2, duration: 0.7 }}
              className="absolute bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none z-10"
            >
              <span className="text-[9px] tracking-[0.26em] uppercase text-white/15">scroll</span>
              <motion.div
                animate={{ y: [0, 5, 0] }}
                transition={{ duration: 1.3, repeat: Infinity, ease: 'easeInOut' }}
                className="w-px h-4 bg-[#DD2C6C]/30 rounded-full"
              />
            </motion.div>
          )}

        </div>
      </div>

      {/* ── 3. What's in the box ── */}
      <FinalBox />
    </div>
  );
}
