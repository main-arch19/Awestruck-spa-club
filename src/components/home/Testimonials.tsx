'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';

const TESTIMONIALS = [
  {
    id: 1,
    quote: "Awestruck transformed not just my hair, but my entire outlook. Maya's color work is nothing short of sorcery — I left feeling like a completely different, more radiant version of myself.",
    name: 'Priya Sharma',
    role: 'Creative Director',
    avatar: '/images/genz-skincare.jpg',
    rating: 5,
  },
  {
    id: 2,
    quote: "The facial I received from Sophia is the best skincare experience I've ever had. My skin glowed for weeks. The attention to detail and genuine care for clients here is unmatched in Beverly Hills.",
    name: 'Isabella Torres',
    role: 'Entrepreneur',
    avatar: '/images/celebrate.jpg',
    rating: 5,
  },
  {
    id: 3,
    quote: "Marcus's deep tissue massage dissolved months of tension in 90 minutes. I've been to spas around the world — Awestruck stands in a class of its own. Worth every penny and more.",
    name: 'David Kim',
    role: 'Executive',
    avatar: '/images/confidence-shave.jpg',
    rating: 5,
  },
  {
    id: 4,
    quote: "My bridal day would not have been the same without the Awestruck team. They made me feel like royalty. Every single guest asked who did my hair and makeup. Five stars doesn't cover it.",
    name: 'Amara Osei',
    role: 'Bride & Interior Designer',
    avatar: '/images/beauty-emilynn.jpg',
    rating: 5,
  },
];

export default function Testimonials() {
  const [idx, setIdx] = useState(0);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const reduced = useReducedMotion();
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (reduced || paused) return;
    intervalRef.current = setInterval(() => {
      setIdx((i) => (i + 1) % TESTIMONIALS.length);
    }, 5000);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [reduced, paused]);

  const goTo = (i: number) => setIdx(i);

  return (
    <section
      id="testimonials"
      className="relative section-wrapper overflow-hidden grain-overlay"
      style={{ background: 'linear-gradient(135deg, #FAFAF9 0%, #FEF2F4 100%)' }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background image */}
      <div className="absolute inset-0 opacity-8">
        <Image src="/images/gallery-17.jpg" alt="" fill className="object-cover" />
        <div className="absolute inset-0 bg-white/50" />
      </div>

      <div className="relative z-10 max-w-content mx-auto">
        <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
          <p className="font-accent italic text-primary text-lg mb-3">What Clients Say</p>
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-brand-black">
            Stories of Transformation
          </h2>
        </AnimateOnScroll>

        {/* Carousel */}
        <div className="relative max-w-3xl mx-auto"
          onTouchStart={(e) => setTouchStart(e.touches[0].clientX)}
          onTouchEnd={(e) => {
            if (touchStart === null) return;
            const delta = e.changedTouches[0].clientX - touchStart;
            if (delta < -60) setIdx((i) => (i + 1) % TESTIMONIALS.length);
            if (delta > 60) setIdx((i) => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
            setTouchStart(null);
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={idx}
              initial={reduced ? {} : { opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={reduced ? {} : { opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              className="glass rounded-2xl p-8 md:p-12 text-center"
            >
              {/* Stars */}
              <div className="flex items-center justify-center gap-1 mb-6">
                {Array.from({ length: TESTIMONIALS[idx].rating }).map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-primary" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                ))}
              </div>

              <blockquote className="font-accent italic text-xl md:text-2xl text-grey-dark leading-relaxed mb-8">
                "{TESTIMONIALS[idx].quote}"
              </blockquote>

              <div className="flex flex-col items-center gap-3">
                <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary/50">
                  <Image
                    src={TESTIMONIALS[idx].avatar}
                    alt={TESTIMONIALS[idx].name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <p className="font-heading font-semibold text-brand-black">{TESTIMONIALS[idx].name}</p>
                  <p className="font-body text-sm text-grey-med">{TESTIMONIALS[idx].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`transition-all duration-300 rounded-full ${
                i === idx ? 'w-6 h-2 bg-primary' : 'w-2 h-2 bg-sand hover:bg-warm-grey'
              }`}
              aria-label={`Go to testimonial ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
