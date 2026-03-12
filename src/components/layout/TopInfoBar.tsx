'use client';

import { useScrollDirection } from '@/hooks/useScrollDirection';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopInfoBar() {
  const scrollDir = useScrollDirection();

  return (
    <AnimatePresence>
      {scrollDir === 'up' && (
        <motion.div
          className="fixed top-0 left-0 right-0 z-50 bg-cream text-grey-med text-xs font-body h-9 border-b border-sand"
          initial={{ y: -36 }}
          animate={{ y: 0 }}
          exit={{ y: -36 }}
          transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="max-w-content mx-auto h-full flex items-center justify-between px-5 md:px-8 lg:px-16">
            {/* Phone */}
            <a
              href="tel:+15551234567"
              className="hover:text-brand-black transition-colors duration-200 hidden sm:flex items-center gap-1.5 min-h-[36px]"
            >
              <svg className="w-3 h-3 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
              </svg>
              (555) 123-4567
            </a>

            {/* Promo */}
            <p className="text-center flex-1 sm:flex-none">
              <span className="text-primary font-medium">20% Off</span> your first visit — use code{' '}
              <span className="font-medium text-brand-black">AWESTRUCK</span>
            </p>

            {/* Socials */}
            <div className="hidden sm:flex items-center gap-3">
              <a
                href="https://instagram.com/AwestruckSpaClub"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-brand-black transition-colors duration-200 min-h-[36px] flex items-center"
                aria-label="Instagram"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <span className="text-grey-dark">|</span>
              <span>Mon–Sat 9am–8pm · Sun 10am–6pm</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
