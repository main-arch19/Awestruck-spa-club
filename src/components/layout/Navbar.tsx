'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from 'next-themes';
import { useScrollY } from '@/hooks/useScrollDirection';
import { useActiveSection } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';

const NAV_LINKS = [
  { href: '#home', label: 'Home' },
  { href: '#about', label: 'About' },
  { href: '#services', label: 'Services' },
  { href: '#team', label: 'Team' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#testimonials', label: 'Testimonials' },
  { href: '#pricing', label: 'Pricing' },
  { href: '#contact', label: 'Contact' },
];

const SECTION_IDS = ['home', 'about', 'services', 'team', 'gallery', 'testimonials', 'pricing', 'contact'];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const scrollY = useScrollY();
  const pathname = usePathname();
  const activeSection = useActiveSection(SECTION_IDS);
  const { theme, setTheme } = useTheme();

  const isScrolled = scrollY > 80;
  const isHomePage = pathname === '/';

  useEffect(() => setMounted(true), []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const toggleTheme = () => setTheme(theme === 'dark' ? 'light' : 'dark');

  return (
    <>
      <nav
        className={cn(
          'fixed left-0 right-0 z-40 transition-all duration-300',
          'top-0',
          isScrolled
            ? 'glass shadow-lg'
            : isHomePage
            ? 'bg-transparent'
            : 'glass',
          menuOpen && 'bg-transparent backdrop-filter-none border-0 shadow-none'
        )}
        style={{ top: isScrolled || !isHomePage ? 0 : 36 }}
      >
        <div className="max-w-content mx-auto h-[72px] flex items-center justify-between px-5 md:px-8 lg:px-16">
          {/* Logo */}
          <Link href="/" className="relative flex-shrink-0 min-w-[120px] h-10" onClick={() => setMenuOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Awestruck Spa Club"
              width={140}
              height={40}
              className="object-contain object-left h-10 w-auto"
              priority
            />
          </Link>

          {/* Desktop Nav Links */}
          <ul className="hidden lg:flex items-center gap-6 xl:gap-8">
            {NAV_LINKS.map(({ href, label }) => {
              const sectionId = href.replace('#', '');
              const isActive = isHomePage && activeSection === sectionId;
              return (
                <li key={href}>
                  <a
                    href={href}
                    className={cn(
                      'font-body text-sm font-medium transition-colors duration-200 relative py-1',
                      'after:absolute after:bottom-0 after:left-0 after:h-[2px] after:bg-primary after:transition-all after:duration-300',
                      isActive
                        ? 'text-white after:w-full'
                        : 'text-grey-med hover:text-white after:w-0 hover:after:w-full'
                    )}
                  >
                    {label}
                  </a>
                </li>
              );
            })}
          </ul>

          {/* Right side: Theme toggle + Book Now + Hamburger */}
          <div className="flex items-center gap-3">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={toggleTheme}
                className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-grey-dark/50 transition-colors duration-200 text-grey-med hover:text-white"
                aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              >
                {theme === 'dark' ? (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                ) : (
                  <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/>
                  </svg>
                )}
              </button>
            )}

            {/* Book Now — always visible */}
            <Link
              href="/booking"
              className="hidden md:flex items-center justify-center px-5 h-10 rounded-md bg-primary text-white font-body font-semibold text-sm hover:bg-primary-dark transition-all duration-200 shadow-glow hover:shadow-glow-lg whitespace-nowrap"
            >
              Book Now
            </Link>

            {/* Hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden flex flex-col items-center justify-center w-11 h-11 gap-[5px] rounded-md hover:bg-grey-dark/40 transition-colors duration-200"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={menuOpen}
            >
              <span
                className={cn(
                  'block w-6 h-[2px] bg-white transition-all duration-300 origin-center',
                  menuOpen && 'rotate-45 translate-y-[7px]'
                )}
              />
              <span
                className={cn(
                  'block w-6 h-[2px] bg-white transition-all duration-300',
                  menuOpen && 'opacity-0 scale-x-0'
                )}
              />
              <span
                className={cn(
                  'block w-6 h-[2px] bg-white transition-all duration-300 origin-center',
                  menuOpen && '-rotate-45 -translate-y-[7px]'
                )}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Fullscreen Overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            className="lg:hidden fixed inset-0 z-30 flex flex-col"
            style={{ background: 'rgba(10,10,10,0.97)', backdropFilter: 'blur(20px)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex flex-col h-full pt-24 pb-12 px-8">
              <nav className="flex flex-col gap-2 flex-1">
                {NAV_LINKS.map(({ href, label }, i) => (
                  <motion.a
                    key={href}
                    href={href}
                    onClick={() => setMenuOpen(false)}
                    className="font-heading text-3xl font-bold text-white hover:text-primary transition-colors duration-200 py-2 border-b border-grey-dark/40 last:border-0"
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.05 + i * 0.06, duration: 0.3 }}
                  >
                    {label}
                  </motion.a>
                ))}
              </nav>

              <motion.div
                className="flex flex-col gap-4 mt-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Link
                  href="/booking"
                  onClick={() => setMenuOpen(false)}
                  className="flex items-center justify-center h-14 rounded-lg bg-primary text-white font-body font-semibold text-base"
                >
                  Book Now
                </Link>
                {mounted && (
                  <button
                    onClick={toggleTheme}
                    className="flex items-center justify-center gap-2 h-12 rounded-lg border border-grey-dark text-grey-med hover:text-white hover:border-grey-med transition-colors duration-200 font-body text-sm"
                  >
                    {theme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
                  </button>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
