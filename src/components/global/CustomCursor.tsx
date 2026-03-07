'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CustomCursor() {
  const [isPointerDevice, setIsPointerDevice] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const dotX = useRef(0);
  const dotY = useRef(0);
  const dotRef = useRef<HTMLDivElement>(null);

  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const springX = useSpring(ringX, { stiffness: 150, damping: 20, mass: 0.5 });
  const springY = useSpring(ringY, { stiffness: 150, damping: 20, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches;
    setIsPointerDevice(fine);
    if (!fine) return;

    const move = (e: MouseEvent) => {
      const x = e.clientX;
      const y = e.clientY;
      dotX.current = x;
      dotY.current = y;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${x - 3}px, ${y - 3}px)`;
      }
      ringX.set(x - 16);
      ringY.set(y - 16);
      setIsVisible(true);
    };

    const handleEnter = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setIsHovering(true);
      }
    };

    const handleLeave = (e: Event) => {
      const target = e.target as HTMLElement;
      if (target.closest('a, button, [role="button"], [data-cursor-hover]')) {
        setIsHovering(false);
      }
    };

    const handleLeaveDoc = () => setIsVisible(false);
    const handleEnterDoc = () => setIsVisible(true);

    window.addEventListener('mousemove', move);
    document.addEventListener('mouseover', handleEnter);
    document.addEventListener('mouseout', handleLeave);
    document.documentElement.addEventListener('mouseleave', handleLeaveDoc);
    document.documentElement.addEventListener('mouseenter', handleEnterDoc);

    return () => {
      window.removeEventListener('mousemove', move);
      document.removeEventListener('mouseover', handleEnter);
      document.removeEventListener('mouseout', handleLeave);
      document.documentElement.removeEventListener('mouseleave', handleLeaveDoc);
      document.documentElement.removeEventListener('mouseenter', handleEnterDoc);
    };
  }, [ringX, ringY]);

  if (!isPointerDevice) return null;

  return (
    <>
      {/* Dot — direct follow */}
      <div
        ref={dotRef}
        className="custom-cursor-dot fixed top-0 left-0 w-[6px] h-[6px] rounded-full bg-primary pointer-events-none z-[9999] transition-opacity duration-200"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      {/* Ring — spring lag */}
      <motion.div
        className="custom-cursor-ring fixed top-0 left-0 rounded-full pointer-events-none z-[9998] border border-primary transition-all duration-200"
        style={{
          x: springX,
          y: springY,
          opacity: isVisible ? 1 : 0,
          width: isHovering ? 44 : 32,
          height: isHovering ? 44 : 32,
          backgroundColor: isHovering ? 'rgba(196,30,58,0.12)' : 'transparent',
          marginLeft: isHovering ? -4 : 0,
          marginTop: isHovering ? -4 : 0,
        }}
      />
    </>
  );
}
