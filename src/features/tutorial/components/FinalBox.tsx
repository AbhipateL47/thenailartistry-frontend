import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ITEMS = [
  {
    label: 'Press-On Nails',
    detail: '24 sizes per set',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="8" y="6" width="32" height="36" rx="10" stroke="currentColor" strokeWidth="1.8" />
        <rect x="14" y="4" width="20" height="8" rx="4" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.2" />
        <rect x="16" y="20" width="16" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
        <rect x="16" y="27" width="11" height="3" rx="1.5" fill="currentColor" opacity="0.3" />
      </svg>
    ),
  },
  {
    label: 'Nail Glue',
    detail: 'Super Bond formula',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="16" y="8" width="16" height="28" rx="6" stroke="currentColor" strokeWidth="1.8" />
        <rect x="19" y="4" width="10" height="8" rx="3" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="24" cy="42" rx="7" ry="4.5" fill="currentColor" opacity="0.18" stroke="currentColor" strokeWidth="1.2" />
        <ellipse cx="21" cy="22" rx="2.5" ry="4" fill="currentColor" opacity="0.2" />
      </svg>
    ),
  },
  {
    label: 'Nail File',
    detail: 'Dual-grit surface',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="6" y="20" width="36" height="10" rx="5" stroke="currentColor" strokeWidth="1.8" />
        {[10, 15, 20, 25, 30, 35].map(x => (
          <line key={x} x1={x} y1="22" x2={x + 2} y2="28" stroke="currentColor" strokeWidth="1.2" opacity="0.4" />
        ))}
        <rect x="32" y="18" width="10" height="14" rx="4" fill="currentColor" opacity="0.12" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    label: 'Adhesive Tabs',
    detail: 'Glue-free option',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="10" y="12" width="28" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" />
        <rect x="10" y="26" width="28" height="10" rx="3" stroke="currentColor" strokeWidth="1.6" opacity="0.5" />
        <line x1="38" y1="12" x2="38" y2="36" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M35 9 L38 12 L41 9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    label: 'Cuticle Pusher',
    detail: 'Pro-grade steel',
    svg: (
      <svg viewBox="0 0 48 48" fill="none" className="w-full h-full">
        <rect x="22" y="6" width="4" height="34" rx="2" stroke="currentColor" strokeWidth="1.6" />
        <path d="M16 40 Q24 44 32 40" stroke="currentColor" strokeWidth="2" strokeLinecap="round" fill="none" />
        <rect x="19" y="6" width="10" height="10" rx="4" fill="currentColor" opacity="0.14" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
] as const;

export function FinalBox() {
  return (
    <section className="bg-black py-24 md:py-32 px-6">
      <div className="max-w-4xl mx-auto">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16 md:mb-20"
        >
          <p className="text-white/22 text-[10px] font-semibold tracking-[0.3em] uppercase mb-4">
            Every Set Includes
          </p>
          <h2 className="text-[2.2rem] sm:text-[3rem] lg:text-[3.6rem] font-black text-white leading-tight tracking-tight">
            What's Inside the Box.
          </h2>
        </motion.div>

        {/* Items */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-8 sm:gap-10">
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center gap-3 text-center"
            >
              {/* Icon */}
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 text-white/55"
                style={{ color: 'rgba(255,255,255,0.55)' }}
              >
                {item.svg}
              </div>
              {/* Label */}
              <div>
                <p className="text-white text-xs sm:text-sm font-semibold tracking-wide">
                  {item.label}
                </p>
                <p className="text-white/28 text-[10px] mt-0.5 tracking-wide">
                  {item.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-20 text-center"
        >
          <p className="text-white/28 text-sm mb-6">
            Ready to try it yourself?
          </p>
          <Link
            to="/products"
            className="inline-flex items-center gap-2 bg-[#DD2C6C] hover:bg-[#c42460] text-white text-sm font-semibold px-8 py-3.5 rounded-full transition-colors duration-200"
          >
            Shop the Collection
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
