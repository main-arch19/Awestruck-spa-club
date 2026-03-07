'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';
import { cn } from '@/lib/utils';

const SERVICES = [
  {
    id: 'massage',
    name: 'Massage & Body Therapy',
    tagline: 'Melt away tension, restore balance',
    description: 'Our licensed massage therapists combine ancient techniques with modern wellness science. From Swedish to deep tissue, hot stone to aromatherapy — every session is a journey.',
    price: 'From $95',
    image: '/images/nia-wellness.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M4.5 12.75l6 6 9-13.5" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="12" cy="12" r="9" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'hair',
    name: 'Haircuts & Styling',
    tagline: 'Precision cuts that define you',
    description: 'From modern bobs to classic cuts, our master stylists craft every look with intention. Includes consultation, wash, cut, blow-dry, and style.',
    price: 'From $75',
    image: '/images/confidence-shave.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M6 3l4.5 4.5M6 3C4.5 4.5 3 6 3 8c0 2.5 2 4 4.5 4S12 10.5 12 8" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M21 21l-4.35-4.35M16.65 16.65A7 7 0 1116.65 2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'color',
    name: 'Color & Highlights',
    tagline: 'Vivid transformations, lasting brilliance',
    description: 'Balayage, ombré, full color, highlights — our color artists use premium Wella and Olaplex products to protect and perfect your color journey.',
    price: 'From $120',
    image: '/images/beauty-emilynn.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'facials',
    name: 'Facials & Skincare',
    tagline: 'Glow that goes deeper than skin',
    description: 'Customized facials using medical-grade ingredients. HydraFacial, chemical peels, LED therapy, microdermabrasion — science-backed results you can see.',
    price: 'From $110',
    image: '/images/face-mask-spa.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M12 3c-1.2 5.4-5 8.4-5 12a5 5 0 0010 0c0-3.6-3.8-6.6-5-12z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 17.5c0 1.66 1.34 3 3 3s3-1.34 3-3" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: 'nails',
    name: 'Nails & Manicure',
    tagline: 'Art at your fingertips',
    description: 'Classic manicures, gel, acrylics, nail art, and pedicures. Our nail technicians are artists who treat every set as a canvas for self-expression.',
    price: 'From $45',
    image: '/images/gallery-20.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M7 11.5V14m0-2.5V6a1.5 1.5 0 013 0m-3 5.5a1.5 1.5 0 000 3M10 6v8m0-8a1.5 1.5 0 013 0m0 0v8m0-8a1.5 1.5 0 013 0v2.5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: 'bridal',
    name: 'Bridal & Special Events',
    tagline: 'Your most radiant day, perfected',
    description: 'Comprehensive bridal packages including hair, makeup, skincare prep, and day-of styling. We also serve bridal parties, proms, and special occasions.',
    price: 'From $350',
    image: '/images/celebrate.jpg',
    icon: (
      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
        <path d="M12 3l1.9 5.8H20l-4.9 3.6 1.9 5.8L12 15l-5 3.2 1.9-5.8L4 8.8h6.1L12 3z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

function ServiceCard({ service, index }: { service: typeof SERVICES[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <AnimateOnScroll animation="scale-up" delay={index * 80} className="h-full">
      <div
        className="flip-card-container cursor-pointer h-full min-h-[360px]"
        onClick={() => setFlipped(!flipped)}
        onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
        tabIndex={0}
        role="button"
        aria-label={`${service.name} — click to see details`}
      >
        <div className={cn('flip-card-inner h-full rounded-lg', flipped && 'flipped')}>
          {/* Front */}
          <div className="flip-card-front rounded-lg overflow-hidden bg-grey-dark border border-grey-dark hover:border-primary/20 transition-colors duration-300">
            <div className="relative h-44 overflow-hidden">
              <Image
                src={service.image}
                alt={service.name}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-grey-dark to-transparent" />
            </div>
            <div className="p-6">
              <div className="text-primary mb-3">{service.icon}</div>
              <h3 className="font-heading font-semibold text-h3-mobile md:text-h3 text-white leading-snug mb-2">
                {service.name}
              </h3>
              <p className="font-accent italic text-grey-med text-sm">{service.tagline}</p>
              <div className="mt-4 flex items-center justify-between">
                <span className="font-body text-sm text-primary font-medium">{service.price}</span>
                <span className="text-grey-med text-xs font-body">Tap to learn more →</span>
              </div>
            </div>
          </div>

          {/* Back */}
          <div className="flip-card-back rounded-lg bg-primary/10 border border-primary/30 p-6 flex flex-col justify-between">
            <div>
              <div className="text-primary mb-3">{service.icon}</div>
              <h3 className="font-heading font-semibold text-xl text-white mb-3">{service.name}</h3>
              <p className="font-body text-grey-light text-sm leading-relaxed">{service.description}</p>
            </div>
            <div className="mt-6">
              <p className="font-body text-primary font-semibold text-lg mb-4">{service.price}</p>
              <Link
                href="/booking"
                className="flex items-center justify-center h-11 w-full rounded-md bg-primary text-white font-body font-semibold text-sm hover:bg-primary-dark transition-colors duration-200"
                onClick={(e) => e.stopPropagation()}
              >
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export default function Services() {
  return (
    <section id="services" className="section-wrapper bg-brand-black">
      <div className="max-w-content mx-auto">
        {/* Header */}
        <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
          <p className="font-accent italic text-primary text-lg mb-3">What We Offer</p>
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-white">
            Our Signature Services
          </h2>
          <p className="font-body text-grey-med max-w-2xl mx-auto mt-4 leading-relaxed">
            Each service is a bespoke experience tailored to your unique needs. Hover or tap a card to learn more.
          </p>
        </AnimateOnScroll>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-3 gap-6">
          {SERVICES.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="sm:hidden snap-carousel pb-4">
          {SERVICES.map((service, i) => (
            <div key={service.id} className="w-[80vw] max-w-[300px]">
              <ServiceCard service={service} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
