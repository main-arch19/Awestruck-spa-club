'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';

const FOOTER_SECTIONS = [
  {
    title: 'Services',
    links: [
      { label: 'Massage & Body Therapy', href: '/#services' },
      { label: 'Haircuts & Styling', href: '/#services' },
      { label: 'Color & Highlights', href: '/#services' },
      { label: 'Facials & Skincare', href: '/#services' },
      { label: 'Nails & Manicure', href: '/#services' },
      { label: 'Bridal & Special Events', href: '/#services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '/#about' },
      { label: 'Our Team', href: '/#team' },
      { label: 'Gallery', href: '/#gallery' },
      { label: 'Testimonials', href: '/#testimonials' },
      { label: 'Pricing', href: '/#pricing' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: '123 Luxury Lane, Suite 200', href: '#contact' },
      { label: 'Beverly Hills, CA 90210', href: '#contact' },
      { label: '(555) 123-4567', href: 'tel:+15551234567' },
      { label: 'hello@awestruckspaclub.com', href: 'mailto:hello@awestruckspaclub.com' },
    ],
  },
];

function FooterAccordion({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-grey-dark md:border-0">
      <button
        className="md:hidden w-full flex items-center justify-between py-4 text-left font-body font-semibold text-sm text-white uppercase tracking-wider"
        onClick={() => setOpen(!open)}
        aria-expanded={open}
      >
        {title}
        <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <svg className="w-4 h-4 text-grey-med" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path d="M19 9l-7 7-7-7"/>
          </svg>
        </motion.span>
      </button>
      <h3 className="hidden md:block font-body font-semibold text-sm text-white uppercase tracking-wider mb-4">{title}</h3>
      <AnimatePresence>
        {(open || typeof window !== 'undefined' && window.innerWidth >= 768) && (
          <motion.ul
            className="md:!block overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {links.map(({ label, href }) => (
              <li key={label} className="mb-2.5">
                <Link
                  href={href}
                  className="text-grey-med hover:text-white text-sm font-body transition-colors duration-200 block py-1 md:py-0"
                >
                  {label}
                </Link>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const check = () => setShowBackToTop(window.scrollY > 400);
    window.addEventListener('scroll', check, { passive: true });
    return () => window.removeEventListener('scroll', check);
  }, []);

  return (
    <footer className="relative bg-brand-black border-t border-grey-dark overflow-hidden">
      {/* Subtle red glow at top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60" />

      <div className="max-w-content mx-auto px-5 md:px-8 lg:px-16 pt-16 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand column */}
          <div className="md:col-span-1">
            <div className="relative w-36 h-9 mb-4">
              <Image src="/images/logo.png" alt="Awestruck Spa Club" fill className="object-contain object-left" />
            </div>
            <p className="text-grey-med text-sm font-accent italic leading-relaxed mb-6">
              Where Relaxation Meets Artistry
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://instagram.com/AwestruckSpaClub"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-grey-dark hover:bg-primary transition-colors duration-200 text-grey-med hover:text-white"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 flex items-center justify-center rounded-full bg-grey-dark hover:bg-primary transition-colors duration-200 text-grey-med hover:text-white"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_SECTIONS.map((section) => (
            <FooterAccordion key={section.title} {...section} />
          ))}
        </div>

        {/* Bottom bar */}
        <div className="border-t border-grey-dark pt-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-grey-med text-xs font-body text-center sm:text-left">
            © {new Date().getFullYear()} Awestruck Spa Club. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="text-grey-med hover:text-white text-xs font-body transition-colors duration-200">Privacy</Link>
            <Link href="/terms" className="text-grey-med hover:text-white text-xs font-body transition-colors duration-200">Terms</Link>
          </div>
        </div>
      </div>

      {/* Back to top */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-24 md:bottom-8 right-5 md:right-8 w-11 h-11 rounded-full bg-primary text-white flex items-center justify-center shadow-glow hover:bg-primary-dark transition-colors duration-200 z-40"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            aria-label="Back to top"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
              <path d="M5 15l7-7 7 7"/>
            </svg>
          </motion.button>
        )}
      </AnimatePresence>
    </footer>
  );
}
