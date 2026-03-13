'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useReducedMotion } from '@/hooks/useReducedMotion';

const HEADING = 'Where Relaxation Meets Artistry';
const WORDS = HEADING.split(' ');

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.5 },
  },
};

const wordVariant = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col items-center justify-center overflow-hidden grain-overlay"
    >
      {/* Background image with Ken Burns */}
      <div className="absolute inset-0 overflow-hidden">
        <div
          className="ken-burns-image absolute w-[110%] h-[110%] -top-[5%] -left-[5%]"
          style={{ animation: 'ken-burns 20s ease-in-out infinite' }}
        >
          <Image
            src="/images/hero-bg.jpeg"
            alt="Awestruck Spa Club luxury spa interior"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={90}
          />
        </div>
        {/* White overlay */}
        <div className="absolute inset-0 bg-white/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center text-center px-5 max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.p
          className="font-accent italic text-primary text-lg md:text-xl mb-6 tracking-wide"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          Luxury Spa & Beauty Club
        </motion.p>

        {/* Main heading — word-by-word reveal */}
        <motion.h1
          className="font-heading font-black leading-tight mb-6"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)' }}
          variants={reduced ? {} : container}
          initial="hidden"
          animate="visible"
        >
          {WORDS.map((word, i) => {
            const isArtistry = word === 'Artistry';
            const isRelaxation = word === 'Relaxation';
            return (
              <motion.span
                key={i}
                variants={reduced ? {} : wordVariant}
                className={`inline-block mr-[0.25em] ${
                  isArtistry || isRelaxation ? 'text-gradient' : 'text-brand-black'
                }`}
              >
                {word}
              </motion.span>
            );
          })}
        </motion.h1>

        {/* Sub-heading */}
        <motion.p
          className="font-body text-grey-med text-base md:text-lg max-w-xl leading-relaxed mb-10"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
        >
          Indulge in world-class treatments crafted to restore, renew, and transform. Your sanctuary awaits.
        </motion.p>

        {/* CTAs */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto"
          initial={reduced ? {} : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.7 }}
        >
          <Link
            href="/booking"
            className="flex items-center justify-center h-14 px-8 rounded-md bg-primary text-white font-body font-semibold text-base hover:bg-primary-dark transition-all duration-200 shadow-glow hover:shadow-glow-lg"
          >
            Book Your Experience
          </Link>
          <a
            href="#services"
            className="flex items-center justify-center h-14 px-8 rounded-md border border-brand-black/30 text-brand-black font-body font-medium text-base hover:bg-brand-black/10 transition-all duration-200"
          >
            Explore Services
          </a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          className="flex items-center gap-8 md:gap-12 mt-14"
          initial={reduced ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.1 }}
        >
          {[
            { val: '5000+', label: 'Clients' },
            { val: '15+', label: 'Stylists' },
            { val: '10 Yrs', label: 'Experience' },
            { val: '50+', label: 'Awards' },
          ].map(({ val, label }) => (
            <div key={label} className="text-center">
              <p className="font-heading font-bold text-xl md:text-2xl text-brand-black">{val}</p>
              <p className="font-body text-xs text-grey-med uppercase tracking-widest mt-0.5">{label}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll chevron */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-1 text-brand-black/50 hover:text-brand-black transition-colors duration-200"
        animate={reduced ? {} : { y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        aria-label="Scroll to About"
      >
        <span className="font-body text-xs tracking-widest uppercase">Scroll</span>
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </motion.a>
    </section>
  );
}
