'use client';

import { useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';
import { cn } from '@/lib/utils';

const PRICING = [
  {
    category: 'Massage & Body',
    icon: '✦',
    items: [
      { name: 'Swedish Massage', duration: '60 min', price: '$95' },
      { name: 'Deep Tissue Massage', duration: '60 min', price: '$115' },
      { name: 'Hot Stone Massage', duration: '75 min', price: '$135' },
      { name: 'Aromatherapy Body Wrap', duration: '90 min', price: '$160' },
      { name: 'Couples Massage', duration: '60 min', price: '$190' },
    ],
  },
  {
    category: 'Hair Services',
    icon: '✦',
    items: [
      { name: 'Haircut & Style', duration: '45 min', price: '$75' },
      { name: 'Blowout & Style', duration: '30 min', price: '$55' },
      { name: 'Brazilian Blowout', duration: '90 min', price: '$250' },
      { name: 'Keratin Treatment', duration: '120 min', price: '$280' },
      { name: 'Wedding / Special Event', duration: '90 min', price: '$195' },
    ],
  },
  {
    category: 'Color',
    icon: '✦',
    items: [
      { name: 'Full Color', duration: '90 min', price: '$120' },
      { name: 'Partial Highlights', duration: '60 min', price: '$140' },
      { name: 'Full Highlights', duration: '90 min', price: '$185' },
      { name: 'Balayage', duration: '120 min', price: '$220' },
      { name: 'Color Correction', duration: 'Varies', price: 'From $200' },
    ],
  },
  {
    category: 'Facials & Skincare',
    icon: '✦',
    items: [
      { name: 'Classic Facial', duration: '60 min', price: '$110' },
      { name: 'HydraFacial', duration: '50 min', price: '$175' },
      { name: 'Chemical Peel', duration: '45 min', price: '$150' },
      { name: 'LED Light Therapy', duration: '30 min', price: '$85' },
      { name: 'Microdermabrasion', duration: '45 min', price: '$130' },
    ],
  },
  {
    category: 'Nails',
    icon: '✦',
    items: [
      { name: 'Classic Manicure', duration: '30 min', price: '$45' },
      { name: 'Gel Manicure', duration: '45 min', price: '$65' },
      { name: 'Acrylic Full Set', duration: '60 min', price: '$85' },
      { name: 'Pedicure', duration: '45 min', price: '$60' },
      { name: 'Nail Art (per nail)', duration: 'Add-on', price: '$5+' },
    ],
  },
  {
    category: 'Bridal Packages',
    icon: '✦',
    items: [
      { name: 'Bridal Hair & Makeup', duration: '3 hrs', price: '$350' },
      { name: 'Bridal Party (4 people)', duration: '5 hrs', price: '$950' },
      { name: 'Bridal Prep Day', duration: 'Full day', price: '$550' },
      { name: 'Trial Run (Hair & MU)', duration: '2 hrs', price: '$220' },
    ],
  },
];

function PricingCard({ category, icon, items, index }: typeof PRICING[0] & { index: number }) {
  const [openItem, setOpenItem] = useState<string | null>(null);

  return (
    <AnimateOnScroll animation="fade-up" delay={index * 80} className="h-full">
      <div className="glass rounded-xl h-full border border-white/5 hover:border-primary/20 transition-colors duration-300">
        <div className="p-6">
          <div className="flex items-center gap-3 mb-6">
            <span className="text-primary text-xl">{icon}</span>
            <h3 className="font-heading font-semibold text-xl text-white">{category}</h3>
          </div>
          <div className="space-y-1">
            {items.map((item) => (
              <div key={item.name}>
                <button
                  className="w-full flex items-center justify-between py-3 px-3 rounded-lg hover:bg-white/5 transition-colors duration-200 text-left group min-h-[48px]"
                  onClick={() => setOpenItem(openItem === item.name ? null : item.name)}
                  aria-expanded={openItem === item.name}
                >
                  <span className="font-body text-sm text-white group-hover:text-grey-light transition-colors">{item.name}</span>
                  <div className="flex items-center gap-3 shrink-0">
                    <span className="font-body font-semibold text-primary text-sm">{item.price}</span>
                    <motion.span
                      animate={{ rotate: openItem === item.name ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="text-grey-med"
                    >
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path d="M19 9l-7 7-7-7"/>
                      </svg>
                    </motion.span>
                  </div>
                </button>
                <AnimatePresence>
                  {openItem === item.name && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="px-3 pb-3">
                        <div className="flex items-center gap-4 text-xs text-grey-med font-body bg-white/5 rounded-lg px-3 py-2">
                          <span>⏱ {item.duration}</span>
                          <span>·</span>
                          <Link href="/booking" className="text-primary hover:underline">Book this service →</Link>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export default function Pricing() {
  return (
    <section id="pricing" className="section-wrapper bg-charcoal grain-overlay">
      <div className="max-w-content mx-auto">
        <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
          <p className="font-accent italic text-primary text-lg mb-3">Investment in Yourself</p>
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-white">
            Pricing
          </h2>
          <p className="font-body text-grey-med max-w-2xl mx-auto mt-4 leading-relaxed">
            Transparent pricing for exceptional services. First-time clients enjoy <span className="text-primary font-medium">20% off</span> with code AWESTRUCK.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {PRICING.map((p, i) => (
            <PricingCard key={p.category} {...p} index={i} />
          ))}
        </div>

        <AnimateOnScroll animation="fade-up" className="text-center">
          <Link
            href="/booking"
            className="inline-flex items-center justify-center h-14 px-10 rounded-md bg-primary text-white font-body font-semibold text-base hover:bg-primary-dark transition-all duration-200 shadow-glow hover:shadow-glow-lg"
          >
            Reserve Your Spot
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
