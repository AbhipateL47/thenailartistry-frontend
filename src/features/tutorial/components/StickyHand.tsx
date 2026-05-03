import { motion, AnimatePresence } from 'framer-motion';

// ─── Types ────────────────────────────────────────────────────────────────────

type Tool = 'clean' | 'cuticle' | 'buff' | 'size' | 'glue' | 'press' | 'wipe' | 'repeat' | 'file' | 'final';

interface StickyHandProps {
  tool: Tool;
  nailsDone: number;
}

// ─── Constants ────────────────────────────────────────────────────────────────

const NATURAL = '#F2C8A8';
const DONE    = '#DD2C6C';

const FINGERS = [
  {
    id: 'index',
    fp: 'M 69 222 C 68 185 67 128 68 88 C 69 60 76 44 89 44 C 102 44 109 60 110 88 C 111 128 110 185 109 222 Z',
    nx: 75, ny: 46, nw: 28, nh: 34, nrx: 11,
    k1y: 174, k2y: 124, kx1: 71, kx2: 107,
  },
  {
    id: 'middle',
    fp: 'M 112 222 C 111 182 110 122 111 76 C 112 46 120 22 131 22 C 142 22 150 46 151 76 C 152 122 151 182 150 222 Z',
    nx: 117, ny: 24, nw: 28, nh: 34, nrx: 11,
    k1y: 172, k2y: 114, kx1: 114, kx2: 148,
  },
  {
    id: 'ring',
    fp: 'M 155 222 C 154 185 153 128 154 88 C 155 60 163 38 173 38 C 183 38 191 60 192 88 C 193 128 192 185 191 222 Z',
    nx: 159, ny: 40, nw: 28, nh: 34, nrx: 11,
    k1y: 174, k2y: 124, kx1: 157, kx2: 189,
  },
  {
    id: 'pinky',
    fp: 'M 198 222 C 197 192 196 152 197 118 C 198 94 205 76 213 76 C 221 76 228 94 229 118 C 230 152 229 192 228 222 Z',
    nx: 200, ny: 78, nw: 24, nh: 28, nrx: 10,
    k1y: 188, k2y: 150, kx1: 200, kx2: 226,
  },
] as const;

// ─── Tool overlays ────────────────────────────────────────────────────────────

function ToolClean() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <motion.g
        animate={{ x: [-55, 55, -55] }}
        transition={{ duration: 2.6, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Raised to cy=55 so pad sits on nail surface, not below it */}
        <ellipse cx={150} cy={55} rx={52} ry={22} fill="rgba(255,255,255,0.82)" />
        <ellipse cx={150} cy={52} rx={38} ry={15} fill="rgba(255,255,255,0.45)" />
        {[0, 1, 2, 3, 4].map(i => (
          <circle key={i} cx={132 + i * 9} cy={53 + (i % 2) * 4} r={1.6} fill="rgba(200,200,200,0.4)" />
        ))}
      </motion.g>
    </motion.g>
  );
}

function ToolCuticle() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <motion.g
        animate={{ y: [18, -2, 18] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Handle */}
        <rect x={86} y={62} width={7} height={52} rx={3.5} fill="#C4956A" />
        {/* Metal neck */}
        <rect x={87} y={56} width={5} height={10} rx={2} fill="#B8A090" />
        {/* Tip arc */}
        <path d="M83 60 Q89.5 54 96 60" fill="none" stroke="#D8C8A8" strokeWidth="2.5" strokeLinecap="round" />
        {/* Cuticle hint line */}
        <path d="M76 80 Q89 86 108 80" fill="none" stroke="rgba(160,108,72,0.4)" strokeWidth="1.2" strokeLinecap="round" />
      </motion.g>
    </motion.g>
  );
}

function ToolBuff() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <motion.g
        animate={{ x: [50, 165, 50, 165, 50] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <rect x={0} y={46} width={65} height={24} rx={7} fill="rgba(245,245,245,0.9)" />
        <rect x={0} y={46} width={65} height={24} rx={7} fill="none" stroke="rgba(200,200,200,0.3)" strokeWidth={1} />
        {[8, 18, 28, 38, 48, 58].map(x => (
          <line key={x} x1={x} y1={50} x2={x + 2} y2={66} stroke="rgba(170,170,170,0.35)" strokeWidth={1} />
        ))}
      </motion.g>
      {/* Dust particles */}
      <motion.g animate={{ opacity: [0, 0.6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
        {[89, 131, 173, 212].map((cx, i) => (
          <circle key={i} cx={cx} cy={58 + (i % 2) * 7} r={1.8} fill="rgba(255,210,185,0.65)" />
        ))}
      </motion.g>
    </motion.g>
  );
}

function ToolSize() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {FINGERS.map((f, i) => (
        <motion.g key={f.id} initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: i * 0.1, duration: 0.35, ease: 'backOut' }}>
          <rect
            x={f.nx} y={f.ny - 36} width={f.nw} height={f.nh}
            rx={f.nrx}
            fill={i === 0 ? 'rgba(221,44,108,0.18)' : 'rgba(255,255,255,0.06)'}
            stroke={i === 0 ? DONE : 'rgba(255,255,255,0.22)'}
            strokeWidth={i === 0 ? 1.5 : 1}
          />
          {i === 0 && (
            <motion.rect
              x={f.nx - 3} y={f.ny - 39} width={f.nw + 6} height={f.nh + 6}
              rx={f.nrx + 2}
              fill="none" stroke={DONE} strokeWidth={1.2}
              animate={{ opacity: [0.25, 0.9, 0.25] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          )}
        </motion.g>
      ))}
      {/* Thumb ghost nail — placed in the thumb's own local coord space so it
          inherits the same translate(36,258) rotate(-22) transform.
          Nail is at local y=-88; ghost sits 36px above at y=-124. */}
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4, duration: 0.35, ease: 'backOut' }}>
        <g transform="translate(36, 258) rotate(-22)">
          <rect
            x={-11} y={-124} width={24} height={30}
            rx={10}
            fill="rgba(255,255,255,0.06)"
            stroke="rgba(255,255,255,0.22)"
            strokeWidth={1}
          />
        </g>
      </motion.g>
    </motion.g>
  );
}

function ToolGlue() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Tube */}
      <motion.g
        animate={{ y: [-40, -4, -4, -40] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.3, 0.7, 1] }}
      >
        <rect x={83} y={28} width={16} height={32} rx={6} fill="#F0F0E0" stroke="rgba(200,200,180,0.4)" strokeWidth={1} />
        <rect x={87} y={22} width={8} height={11} rx={3} fill="#D4D4B4" />
        <rect x={87} y={34} width={8} height={3} rx={1} fill="rgba(200,200,180,0.5)" />
      </motion.g>
      {/* Drop */}
      <motion.ellipse
        cx={91} cy={66} rx={7} ry={9}
        fill="rgba(255,255,235,0.88)"
        animate={{ opacity: [0, 0, 1, 1, 0], scaleY: [0.2, 0.2, 1, 1.15, 0.6] }}
        style={{ transformOrigin: '91px 66px' }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.28, 0.48, 0.7, 1] }}
      />
      <motion.ellipse
        cx={87} cy={62} rx={3} ry={4}
        fill="rgba(255,255,255,0.5)"
        animate={{ opacity: [0, 0, 0.55, 0.55, 0] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.28, 0.48, 0.7, 1] }}
      />
    </motion.g>
  );
}

function ToolPress() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Press-on descending */}
      <motion.g
        animate={{ y: [-55, 0, 0, -55] }}
        transition={{ duration: 3, repeat: Infinity, repeatDelay: 0.5, times: [0, 0.35, 0.7, 1], ease: 'easeInOut' }}
      >
        <rect x={75} y={4} width={28} height={36} rx={11} fill={DONE} />
        <rect x={81} y={9} width={7} height={15} rx={3.5} fill="rgba(255,255,255,0.28)" />
        <circle cx={95} cy={17} r={1.4} fill="rgba(255,255,255,0.55)" />
      </motion.g>
      {/* Ripple */}
      <motion.ellipse
        cx={89} cy={62} rx={18} ry={6}
        fill="none" stroke={DONE} strokeWidth={1.8}
        animate={{ opacity: [0, 0.85, 0], scale: [0.65, 1.6] }}
        style={{ transformOrigin: '89px 62px' }}
        transition={{ duration: 0.85, repeat: Infinity, repeatDelay: 2.7, ease: 'easeOut' }}
      />
    </motion.g>
  );
}

function ToolWipe() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Cotton bud at index edge */}
      <motion.g
        animate={{ x: [115, 100, 115, 100, 115], y: [4, 0, 4, 0, 4] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        <circle cx={0} cy={-1} r={5.5} fill="rgba(255,255,255,0.75)" />
        <rect x={-1} y={-1} width={28} height={3} rx={1.5} fill="#D0D0D0" />
        <circle cx={28} cy={-1} r={5.5} fill="rgba(255,255,255,0.75)" />
      </motion.g>
    </motion.g>
  );
}

function ToolRepeat() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {/* Thumb ring — delay=0, first in the wave sequence */}
      <g transform="translate(36, 258) rotate(-22)">
        <motion.rect
          x={-15} y={-92} width={32} height={38}
          rx={13}
          fill="none" stroke={DONE} strokeWidth={1.5}
          style={{ transformOrigin: '1px -73px' }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.88, 1.08, 1] }}
          transition={{ duration: 0.65, delay: 0, repeat: Infinity, repeatDelay: 0.7 }}
        />
      </g>
      {/* Fingers follow: index→middle→ring→pinky shifted by (i+1)*0.2 */}
      {FINGERS.map((f, i) => (
        <motion.rect
          key={f.id}
          x={f.nx - 4} y={f.ny - 4}
          width={f.nw + 8} height={f.nh + 8}
          rx={f.nrx + 3}
          fill="none" stroke={DONE} strokeWidth={1.5}
          style={{ transformOrigin: `${f.nx + f.nw / 2}px ${f.ny + f.nh / 2}px` }}
          animate={{ opacity: [0, 0.9, 0], scale: [0.88, 1.08, 1] }}
          transition={{ duration: 0.65, delay: (i + 1) * 0.2, repeat: Infinity, repeatDelay: 0.7 }}
        />
      ))}
    </motion.g>
  );
}

function ToolFile() {
  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      <motion.g
        animate={{ x: [60, 185, 60, 185, 60] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
      >
        {/* Extended range x=[60,185] so file sweeps all 4 nails (index→pinky) */}
        <rect x={0} y={52} width={44} height={12} rx={5} fill="rgba(245,245,245,0.85)" />
        <rect x={0} y={52} width={44} height={12} rx={5} fill="none" stroke="rgba(200,200,200,0.25)" strokeWidth={1} />
        {[4, 10, 16, 22, 28, 36].map(x => (
          <line key={x} x1={x} y1={55} x2={x + 2} y2={61} stroke="rgba(160,160,160,0.35)" strokeWidth={1} />
        ))}
      </motion.g>
    </motion.g>
  );
}

function ToolFinal() {
  // 4 finger nails + thumb (thumb nail center in SVG coords ≈ (10, 190)
  // calculated from translate(36,258) rotate(-22) applied to local nail center (1, -73))
  const pts = [
    { cx: 89,  cy: 52  },
    { cx: 131, cy: 31  },
    { cx: 173, cy: 47  },
    { cx: 212, cy: 85  },
    { cx: 10,  cy: 190 },
  ];
  const star = (cx: number, cy: number) =>
    `M${cx},${cy - 8} L${cx + 1.8},${cy - 1.8} L${cx + 8},${cy} L${cx + 1.8},${cy + 1.8} L${cx},${cy + 8} L${cx - 1.8},${cy + 1.8} L${cx - 8},${cy} L${cx - 1.8},${cy - 1.8} Z`;

  return (
    <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
      {pts.map((p, i) => (
        <motion.g
          key={i}
          style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
          animate={{ scale: [0, 1.4, 0.85, 1.1, 0], opacity: [0, 1, 0.75, 0.9, 0] }}
          transition={{ delay: i * 0.18, duration: 1.4, repeat: Infinity, repeatDelay: 1.3 }}
        >
          {/* White stars — previously pink on pink nails = invisible */}
          <path d={star(p.cx, p.cy)} fill="white" />
          <circle cx={p.cx} cy={p.cy} r={2.2} fill="rgba(255,240,200,0.9)" />
        </motion.g>
      ))}
      {pts.map((p, i) => (
        <motion.circle
          key={`r${i}`}
          cx={p.cx} cy={p.cy} r={15}
          fill="none" stroke={DONE} strokeWidth={1.2}
          animate={{ opacity: [0, 0.4, 0], scale: [0.8, 1.7] }}
          style={{ transformOrigin: `${p.cx}px ${p.cy}px` }}
          transition={{ delay: i * 0.18 + 0.25, duration: 1.4, repeat: Infinity, repeatDelay: 1.3 }}
        />
      ))}
    </motion.g>
  );
}

// ─── SVG Hand ─────────────────────────────────────────────────────────────────

function HandSVG({ tool, nailsDone }: StickyHandProps) {
  const toolMap: Record<Tool, JSX.Element> = {
    clean:   <ToolClean />,
    cuticle: <ToolCuticle />,
    buff:    <ToolBuff />,
    size:    <ToolSize />,
    glue:    <ToolGlue />,
    press:   <ToolPress />,
    wipe:    <ToolWipe />,
    repeat:  <ToolRepeat />,
    file:    <ToolFile />,
    final:   <ToolFinal />,
  };

  return (
    <svg
      viewBox="-45 0 305 370"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-full h-full"
      overflow="visible"
      style={{ filter: 'drop-shadow(0 20px 48px rgba(0,0,0,0.55))' }}
    >
      <defs>
        <linearGradient id="skinGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#EEC0A0" />
          <stop offset="100%" stopColor="#D49070" />
        </linearGradient>
        <linearGradient id="skinLight" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#F4CCA8" />
          <stop offset="100%" stopColor="#E0A878" />
        </linearGradient>
        <radialGradient id="nailGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={DONE} stopOpacity="0.3" />
          <stop offset="100%" stopColor={DONE} stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Thumb — drawn BEFORE palm so its base tucks behind the palm naturally */}
      <g transform="translate(36, 258) rotate(-22)">
        <rect x="-17" y="-90" width="35" height="94" rx="17" fill="url(#skinGrad)" />
        <motion.rect
          x="-11" y="-88" width="24" height="30" rx="10"
          animate={{ fill: nailsDone >= 5 ? DONE : NATURAL }}
          transition={{ duration: 0.55 }}
        />
        {/* Nail shine — aligned to match other finger shine positions */}
        <rect x="-4" y="-86" width="6" height="14" rx="3" fill="rgba(255,255,255,0.26)" />
        {/* Cuticle crease at nail base */}
        <path d="M -9 -60 Q 0 -57 12 -60" stroke="rgba(160,108,72,0.16)" strokeWidth="1" fill="none" />
        {/* Knuckle crease — same style as FINGERS knuckle lines */}
        <path d="M -13 -38 Q 0 -34 13 -38" stroke="rgba(160,108,72,0.20)" strokeWidth="1.4" fill="none" strokeLinecap="round" />
      </g>

      {/* Palm — right side extended to x=234 and stays wide past y=268 to fully cover pinky base */}
      <path
        d="M 48 355 C 38 315 33 272 33 250 C 33 234 42 226 56 222 L 224 222 Q 234 222 234 232 C 237 238 236 255 233 272 C 230 295 224 320 212 355 Q 200 362 130 363 Q 60 362 48 355 Z"
        fill="url(#skinGrad)"
      />

      {/* Fingers */}
      {FINGERS.map(f => (
        <path key={f.id} d={f.fp} fill="url(#skinGrad)" />
      ))}

      {/* Knuckle lines */}
      {FINGERS.map(f => (
        <g key={`kn-${f.id}`}>
          <path
            d={`M ${f.kx1} ${f.k1y} Q ${(f.kx1 + f.kx2) / 2} ${f.k1y + 5} ${f.kx2} ${f.k1y}`}
            stroke="rgba(160,108,72,0.2)" strokeWidth="1.4" fill="none" strokeLinecap="round"
          />
          <path
            d={`M ${f.kx1} ${f.k2y} Q ${(f.kx1 + f.kx2) / 2} ${f.k2y + 4} ${f.kx2} ${f.k2y}`}
            stroke="rgba(160,108,72,0.12)" strokeWidth="1.1" fill="none" strokeLinecap="round"
          />
        </g>
      ))}

      {/* Wrist crease */}
      <path d="M 58 350 Q 130 354 202 350" stroke="rgba(160,108,72,0.15)" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Nails */}
      {FINGERS.map((f, i) => {
        const isDone = i < nailsDone;
        return (
          <g key={`nail-${f.id}`}>
            <motion.rect
              x={f.nx} y={f.ny} width={f.nw} height={f.nh} rx={f.nrx}
              animate={{ fill: isDone ? DONE : NATURAL }}
              transition={{ duration: 0.5, delay: isDone ? i * 0.07 : 0 }}
            />
            {/* Shine */}
            <rect
              x={f.nx + 6} y={f.ny + 5}
              width={6} height={f.nh * 0.48} rx={3}
              fill="rgba(255,255,255,0.26)"
            />
            {/* Cuticle crease */}
            <path
              d={`M ${f.nx + 2} ${f.ny + f.nh - 2} Q ${f.nx + f.nw / 2} ${f.ny + f.nh + 4} ${f.nx + f.nw - 2} ${f.ny + f.nh - 2}`}
              stroke="rgba(160,108,72,0.16)" strokeWidth="1" fill="none"
            />
          </g>
        );
      })}

      {/* Tool overlay */}
      <AnimatePresence mode="wait">
        <motion.g
          key={tool}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          {toolMap[tool]}
        </motion.g>
      </AnimatePresence>
    </svg>
  );
}

// ─── Export ───────────────────────────────────────────────────────────────────

export function StickyHand({ tool, nailsDone }: StickyHandProps) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      {/* Subtle ambient glow behind hand */}
      <div
        className="absolute rounded-full blur-3xl pointer-events-none"
        style={{
          width: '55%',
          paddingBottom: '55%',
          top: '18%',
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'radial-gradient(circle, rgba(221,44,108,0.06) 0%, transparent 70%)',
        }}
      />
      {/* Hand SVG — no card, no border */}
      <div
        className="relative z-10"
        style={{ width: 'min(65%, 300px)', aspectRatio: '305/370' }}
      >
        <HandSVG tool={tool} nailsDone={nailsDone} />
      </div>
    </div>
  );
}