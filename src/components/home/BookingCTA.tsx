'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';

export default function BookingCTA() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const yBg = useTransform(scrollYProgress, [0, 1], isMobile || reduced ? ['0%', '0%'] : ['-12%', '12%']);

  return (
    <section ref={sectionRef} className="relative overflow-hidden min-h-[500px] flex items-center grain-overlay">
      {/* Parallax background */}
      <motion.div className="absolute inset-0 overflow-hidden" style={{ y: yBg }}>
        <div className="absolute w-full h-[130%] -top-[15%]">
          <Image
            src="/images/spa-resort.jpg"
            alt="Luxury spa resort"
            fill
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-black/65" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-transparent to-black/60" />
      </motion.div>

      {/* Subtle red line at top */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />

      <div className="relative z-10 w-full section-wrapper">
        <div className="max-w-content mx-auto flex flex-col items-center text-center">
          <AnimateOnScroll animation="fade-up">
            <p className="font-accent italic text-primary text-xl mb-4">Your Journey Awaits</p>
            <h2
              className="font-heading font-black text-white leading-tight mb-6"
              style={{ fontSize: 'clamp(2rem, 6vw, 3.5rem)' }}
            >
              Reserve Your{' '}
              <span className="text-gradient">Awestruck</span>
              {' '}Experience
            </h2>
            <p className="font-body text-grey-light text-base md:text-lg max-w-xl mx-auto mb-10 leading-relaxed">
              Don't just imagine feeling extraordinary — experience it. Book online in under 2 minutes and receive a 20% first-visit discount.
            </p>
          </AnimateOnScroll>

          <AnimateOnScroll animation="scale-up" delay={200}>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="flex items-center justify-center h-14 px-10 rounded-md bg-primary text-white font-body font-bold text-base hover:bg-primary-dark transition-all duration-200 shadow-glow hover:shadow-glow-lg"
              >
                Book Now — 20% Off
              </Link>
              <a
                href="tel:+15551234567"
                className="flex items-center justify-center h-14 px-8 rounded-md border border-white/40 text-white font-body font-medium text-base hover:bg-white/10 transition-all duration-200 backdrop-blur-sm gap-2"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                Call (555) 123-4567
              </a>
            </div>
          </AnimateOnScroll>

          {/* Trust badges */}
          <AnimateOnScroll animation="fade-in" delay={400} className="flex items-center gap-6 mt-10 flex-wrap justify-center">
            {['5-Star Rated', '10+ Years', 'Same-Day Booking', 'Free Consultation'].map((badge) => (
              <div key={badge} className="flex items-center gap-2 text-white/70">
                <svg className="w-3.5 h-3.5 text-primary shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="font-body text-xs">{badge}</span>
              </div>
            ))}
          </AnimateOnScroll>
        </div>
      </div>

      {/* Subtle red line at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
    </section>
  );
}
