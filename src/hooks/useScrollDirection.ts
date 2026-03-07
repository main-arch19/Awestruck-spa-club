'use client';

import { useState, useEffect, useRef } from 'react';

export function useScrollDirection(): 'up' | 'down' {
  const [direction, setDirection] = useState<'up' | 'down'>('up');
  const lastScrollY = useRef(0);

  useEffect(() => {
    const update = () => {
      const y = window.scrollY;
      setDirection(y > lastScrollY.current ? 'down' : 'up');
      lastScrollY.current = y;
    };
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return direction;
}

export function useScrollY(): number {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const update = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);

  return scrollY;
}
