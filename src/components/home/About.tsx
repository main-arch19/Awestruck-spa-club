'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';

const STATS = [
  { value: 5000, suffix: '+', label: 'Happy Clients' },
  { value: 15, suffix: '+', label: 'Expert Stylists' },
  { value: 10, suffix: '', label: 'Years of Excellence' },
  { value: 50, suffix: '+', label: 'Industry Awards' },
];

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: '-10% 0px' });
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!inView) return;
    if (reduced) { setCount(value); return; }

    const duration = 1800;
    const steps = 60;
    const increment = value / steps;
    let current = 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= value) {
        setCount(value);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);
    return () => clearInterval(timer);
  }, [inView, value, reduced]);

  return (
    <span ref={ref} className="tabular-nums">
      {count.toLocaleString()}{suffix}
    </span>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Disable parallax on mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const yImg = useTransform(scrollYProgress, [0, 1], isMobile || reduced ? ['0%', '0%'] : ['-8%', '8%']);

  return (
    <section id="about" ref={sectionRef} className="relative bg-white overflow-hidden">
      <div className="section-wrapper max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Image — parallax on desktop */}
          <AnimateOnScroll animation="slide-left" className="relative">
            <motion.div
              className="relative h-[400px] md:h-[560px] rounded-lg overflow-hidden shadow-lg"
              style={{ y: yImg }}
            >
              <Image
                src="/images/gallery-18.jpg"
                alt="Awestruck Spa Club interior"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </motion.div>
            {/* Floating accent card */}
            <div className="absolute -bottom-6 -right-4 md:-right-8 glass rounded-lg px-5 py-4 shadow-lg">
              <p className="font-accent italic text-primary text-sm">Est. 2015</p>
              <p className="font-heading font-bold text-brand-black text-xl mt-0.5">Beverly Hills, CA</p>
            </div>
          </AnimateOnScroll>

          {/* Text content */}
          <div className="flex flex-col gap-8">
            <AnimateOnScroll animation="fade-up">
              <p className="font-accent italic text-primary text-lg">Our Story</p>
              <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-brand-black mt-2 leading-tight">
                A Decade of Transforming Lives Through the Art of Beauty
              </h2>
            </AnimateOnScroll>

            <AnimateOnScroll animation="fade-up" delay={100}>
              <p className="font-body text-grey-med leading-relaxed">
                Awestruck Spa Club was born from a simple belief: that every person deserves to feel extraordinary. Nestled in the heart of Beverly Hills, we've spent over a decade curating the finest spa and beauty experiences, pairing world-class techniques with genuine warmth.
              </p>
              <p className="font-body text-grey-med leading-relaxed mt-4">
                Our team of 15+ master stylists, estheticians, and wellness therapists bring a passion for their craft that shows in every treatment. We don't just enhance appearances — we restore confidence and renew the spirit.
              </p>
            </AnimateOnScroll>

            {/* Stats grid */}
            <div className="grid grid-cols-2 gap-6">
              {STATS.map(({ value, suffix, label }, i) => (
                <AnimateOnScroll key={label} animation="scale-up" delay={i * 100}>
                  <div className="bg-cream rounded-lg p-5 border border-sand hover:border-primary/30 transition-colors duration-300">
                    <p className="font-heading font-black text-3xl md:text-4xl text-brand-black">
                      <AnimatedCounter value={value} suffix={suffix} />
                    </p>
                    <p className="font-body text-sm text-grey-med mt-1">{label}</p>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>

            <AnimateOnScroll animation="fade-up" delay={400}>
              <a
                href="#services"
                className="inline-flex items-center gap-2 text-primary font-body font-medium text-sm hover:gap-3 transition-all duration-200 group"
              >
                Explore our services
                <svg className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </a>
            </AnimateOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
}
