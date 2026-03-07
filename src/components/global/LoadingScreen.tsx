'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';

interface Props {
  onComplete: () => void;
}

export default function LoadingScreen({ onComplete }: Props) {
  const [curtainDone, setCurtainDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setCurtainDone(true), 1400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!curtainDone && (
        <motion.div
          key="loading"
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-brand-black"
          initial={{ scaleY: 1 }}
          exit={{
            scaleY: 0,
            transition: {
              duration: 0.8,
              ease: [0.76, 0, 0.24, 1],
              delay: 0.1,
            },
          }}
          style={{ transformOrigin: 'top' }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative w-40 h-20">
              <Image
                src="/images/logo.png"
                alt="Awestruck Spa Club"
                fill
                className="object-contain"
                priority
              />
            </div>
            <div className="flex gap-1.5 mt-2">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-primary"
                  animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
                  transition={{
                    duration: 1.2,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
