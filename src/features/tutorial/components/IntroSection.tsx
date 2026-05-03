import { motion } from 'framer-motion';
import { Mouse } from 'lucide-react';

export function IntroSection() {
  return (
    <section className="h-screen bg-black flex flex-col items-center justify-center relative select-none">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        className="text-center px-6 space-y-5"
      >
        <p className="text-white/25 text-[10px] font-semibold tracking-[0.35em] uppercase">
          The Nail Artistry
        </p>

        <h1 className="text-[2.8rem] sm:text-[4rem] lg:text-[5.5rem] font-black text-white leading-[1.03] tracking-tight">
          How to Apply<br />
          <span className="text-[#DD2C6C]">Press-On Nails.</span>
        </h1>

        <p className="text-white/35 text-sm sm:text-base max-w-[26rem] mx-auto leading-[1.8]">
          Ten steps to salon-quality results. No appointments, no experience needed.
        </p>
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.9 }}
        className="absolute bottom-8 flex flex-col items-center gap-2"
      >
        <Mouse className="w-3.5 h-3.5 text-white/18" />
        <span className="text-[9px] tracking-[0.28em] uppercase text-white/15">Scroll</span>
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-5 bg-[#DD2C6C]/30 rounded-full"
        />
      </motion.div>
    </section>
  );
}
