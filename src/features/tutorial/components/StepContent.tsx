import { motion, AnimatePresence } from 'framer-motion';

interface Step {
  n: string;
  title: string;
  desc: string;
}

interface StepContentProps {
  step: Step;
  stepIndex: number;
  total: number;
}

export function StepContent({ step, stepIndex, total }: StepContentProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepIndex}
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-4 lg:gap-6"
      >
        {/* Step label */}
        <span className="text-[13px] font-mono tracking-[0.22em] uppercase text-white/40">
          Step {step.n} / {String(total).padStart(2, '0')}
        </span>

        {/* Title */}
        <h2 className="text-[2rem] sm:text-[2.8rem] lg:text-[3.2rem] xl:text-[3.6rem] font-black text-white leading-[1.05] tracking-tight">
          {step.title}
        </h2>

        {/* Description */}
        <p className="text-white/45 text-sm sm:text-[15px] leading-[1.85] max-w-[30ch] lg:max-w-[28ch]">
          {step.desc}
        </p>

        {/* Progress dots */}
        <div className="flex items-center gap-1.5 mt-2">
          {Array.from({ length: total }).map((_, i) => (
            <div
              key={i}
              className="rounded-full transition-all duration-500 ease-out"
              style={
                i === stepIndex
                  ? { width: 20, height: 5, background: '#DD2C6C' }
                  : i < stepIndex
                  ? { width: 5, height: 5, background: 'rgba(255,255,255,0.3)' }
                  : { width: 5, height: 5, background: 'rgba(255,255,255,0.08)' }
              }
            />
          ))}
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
