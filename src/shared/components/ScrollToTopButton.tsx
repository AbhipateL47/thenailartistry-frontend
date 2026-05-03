import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.2 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-5 z-50 w-10 h-10 rounded-full bg-[#DD2C6C] flex items-center justify-center shadow-lg hover:bg-[#c42460] transition-colors duration-200 md:bottom-8 md:right-8"
          aria-label="Scroll to top"
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
