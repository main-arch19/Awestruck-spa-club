'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useScrollDirection } from '@/hooks/useScrollDirection';

export default function FloatingBookingBar() {
  const pathname = usePathname();
  const scrollDir = useScrollDirection();

  const isBookingPage = pathname === '/booking';
  const visible = scrollDir === 'up' && !isBookingPage;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="floating-bar"
          className="md:hidden fixed bottom-0 left-0 right-0 z-50 safe-bottom px-4 pt-3 pb-safe bg-gradient-to-t from-brand-black/95 to-transparent"
          initial={{ y: 100 }}
          animate={{ y: 0 }}
          exit={{ y: 100 }}
          transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
          style={{ paddingBottom: 'max(16px, env(safe-area-inset-bottom))' }}
        >
          <Link
            href="/booking"
            className="flex items-center justify-center w-full h-14 rounded-lg bg-primary text-white font-body font-semibold text-base tracking-wide hover:bg-primary-dark transition-colors duration-200 shadow-glow"
          >
            Book Now
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
