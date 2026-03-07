'use client';

import { useRef } from 'react';
import { motion, useInView, type Variants } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { cn } from '@/lib/utils';

type Animation = 'fade-up' | 'fade-in' | 'slide-left' | 'slide-right' | 'scale-up';

interface Props {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  animation?: Animation;
  once?: boolean;
}

const variants: Record<Animation, Variants> = {
  'fade-up': {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  'fade-in': {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  'slide-left': {
    hidden: { opacity: 0, x: -40 },
    visible: { opacity: 1, x: 0 },
  },
  'slide-right': {
    hidden: { opacity: 0, x: 40 },
    visible: { opacity: 1, x: 0 },
  },
  'scale-up': {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
};

export default function AnimateOnScroll({
  children,
  delay = 0,
  duration = 0.5,
  className,
  animation = 'fade-up',
  once = true,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const inView = useInView(ref, { once, margin: '-10% 0px' });

  if (reduced) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={cn(className)}
      initial="hidden"
      animate={inView ? 'visible' : 'hidden'}
      variants={variants[animation]}
      transition={{
        duration,
        delay: delay / 1000,
        ease: [0.4, 0, 0.2, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
