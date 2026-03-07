'use client';

import { useRef, useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';

interface SliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  title: string;
}

function ComparisonSlider({ beforeSrc, afterSrc, beforeLabel = 'Before', afterLabel = 'After', title }: SliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [pct, setPct] = useState(50);
  const [dragging, setDragging] = useState(false);
  const [bounds, setBounds] = useState({ left: 0, width: 400 });

  useEffect(() => {
    const update = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      setBounds({ left: rect.left, width: rect.width });
    };
    update();
    const ro = new ResizeObserver(update);
    if (containerRef.current) ro.observe(containerRef.current);
    return () => ro.disconnect();
  }, []);

  const updateFromClientX = useCallback((clientX: number) => {
    const raw = clientX - bounds.left;
    const clamped = Math.max(0, Math.min(bounds.width, raw));
    setPct((clamped / bounds.width) * 100);
  }, [bounds]);

  // Mouse events
  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(true);
  };
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => updateFromClientX(e.clientX);
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging, updateFromClientX]);

  // Touch events
  const onTouchStart = () => setDragging(true);
  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: TouchEvent) => {
      e.preventDefault();
      updateFromClientX(e.touches[0].clientX);
    };
    const onEnd = () => setDragging(false);
    window.addEventListener('touchmove', onMove, { passive: false });
    window.addEventListener('touchend', onEnd);
    return () => {
      window.removeEventListener('touchmove', onMove);
      window.removeEventListener('touchend', onEnd);
    };
  }, [dragging, updateFromClientX]);

  return (
    <div className="flex flex-col gap-4">
      <h3 className="font-heading font-semibold text-h3-mobile md:text-h3 text-white text-center">{title}</h3>
      <div
        ref={containerRef}
        className="relative rounded-lg overflow-hidden select-none cursor-ew-resize"
        style={{ aspectRatio: '4/3' }}
      >
        {/* Before layer (full, desaturated) */}
        <div className="absolute inset-0">
          <Image
            src={beforeSrc}
            alt={`${title} - before`}
            fill
            className="object-cover"
            style={{ filter: 'grayscale(0.6) brightness(0.82)' }}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-3 left-3 bg-black/60 text-white text-xs font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {beforeLabel}
          </div>
        </div>

        {/* After layer (clipped) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - pct}% 0 0)` }}
        >
          <Image
            src={afterSrc}
            alt={`${title} - after`}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
          <div className="absolute top-3 right-3 bg-primary/90 text-white text-xs font-body font-semibold px-2.5 py-1 rounded-full uppercase tracking-wider">
            {afterLabel}
          </div>
        </div>

        {/* Divider line */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-white shadow-lg pointer-events-none"
          style={{ left: `${pct}%` }}
        />

        {/* Drag handle — 48×48px */}
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-white shadow-lg flex items-center justify-center gap-1 cursor-ew-resize z-10 touch-none"
          style={{ left: `${pct}%` }}
          onMouseDown={onMouseDown}
          onTouchStart={onTouchStart}
          role="slider"
          aria-valuenow={Math.round(pct)}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label="Drag to compare before and after"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowLeft') setPct((p) => Math.max(0, p - 5));
            if (e.key === 'ArrowRight') setPct((p) => Math.min(100, p + 5));
          }}
        >
          <svg className="w-4 h-4 text-grey-dark" fill="currentColor" viewBox="0 0 24 24">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
          <div className="w-0.5 h-4 bg-grey-dark/50 rounded-full" />
          <svg className="w-4 h-4 text-grey-dark" fill="currentColor" viewBox="0 0 24 24">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

const SLIDERS: SliderProps[] = [
  {
    title: 'Skin Rejuvenation',
    beforeSrc: '/images/rejuvenate-skin.jpg',
    afterSrc: '/images/rejuvenate-skin.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
  },
  {
    title: 'Facial Glow Treatment',
    beforeSrc: '/images/face-mask-spa.jpg',
    afterSrc: '/images/face-mask-spa.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
  },
  {
    title: 'Hair Transformation',
    beforeSrc: '/images/beauty-emilynn.jpg',
    afterSrc: '/images/beauty-emilynn.jpg',
    beforeLabel: 'Before',
    afterLabel: 'After',
  },
];

export default function BeforeAfter() {
  return (
    <section id="before-after" className="section-wrapper bg-charcoal grain-overlay">
      <div className="max-w-content mx-auto">
        <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
          <p className="font-accent italic text-primary text-lg mb-3">See the Difference</p>
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-white">
            Real Transformations
          </h2>
          <p className="font-body text-grey-med max-w-xl mx-auto mt-4 leading-relaxed">
            Drag the slider to reveal the stunning before and after results of our treatments.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SLIDERS.map((slider, i) => (
            <AnimateOnScroll key={slider.title} animation="fade-up" delay={i * 120}>
              <ComparisonSlider {...slider} />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
