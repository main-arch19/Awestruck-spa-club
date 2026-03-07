'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';
import { cn } from '@/lib/utils';

type Category = 'All' | 'Hair' | 'Color' | 'Nails' | 'Skincare';

const GALLERY_ITEMS = [
  { src: '/images/beauty-emilynn.jpg', alt: 'Beautiful hair styling result', category: 'Hair' as Category },
  { src: '/images/genz-skincare.jpg', alt: 'Skincare treatment result', category: 'Skincare' as Category },
  { src: '/images/gallery-17.jpg', alt: 'Luxury spa experience', category: 'Skincare' as Category },
  { src: '/images/gallery-18.jpg', alt: 'Spa interior', category: 'Hair' as Category },
  { src: '/images/gallery-19.jpg', alt: 'Beauty service', category: 'Hair' as Category },
  { src: '/images/gallery-16.jpg', alt: 'Spa treatment', category: 'Skincare' as Category },
  { src: '/images/gallery-20.jpg', alt: 'Nail art result', category: 'Nails' as Category },
  { src: '/images/face-mask-spa.jpg', alt: 'Facial treatment', category: 'Skincare' as Category },
  { src: '/images/confidence-shave.jpg', alt: 'Hair styling', category: 'Hair' as Category },
  { src: '/images/rejuvenate-skin.jpg', alt: 'Skin rejuvenation', category: 'Skincare' as Category },
  { src: '/images/celebrate.jpg', alt: 'Celebration beauty look', category: 'Color' as Category },
  { src: '/images/nia-wellness.jpg', alt: 'Wellness treatment', category: 'Skincare' as Category },
];

const TABS: Category[] = ['All', 'Hair', 'Color', 'Nails', 'Skincare'];

export default function Gallery() {
  const [active, setActive] = useState<Category>('All');
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [pinchScale, setPinchScale] = useState(1);
  const [pinchStart, setPinchStart] = useState<number | null>(null);

  const filtered = active === 'All' ? GALLERY_ITEMS : GALLERY_ITEMS.filter((i) => i.category === active);

  // Keyboard nav for lightbox
  useEffect(() => {
    if (lightboxIdx === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') setLightboxIdx((i) => (i !== null ? Math.min(i + 1, filtered.length - 1) : null));
      if (e.key === 'ArrowLeft') setLightboxIdx((i) => (i !== null ? Math.max(i - 1, 0) : null));
      if (e.key === 'Escape') setLightboxIdx(null);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [lightboxIdx, filtered.length]);

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = lightboxIdx !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIdx]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.touches[0].clientX);
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setPinchStart(dist);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStart === null || lightboxIdx === null) return;
    const deltaX = e.changedTouches[0].clientX - touchStart;
    if (Math.abs(deltaX) > 60) {
      if (deltaX < 0) setLightboxIdx((i) => (i !== null ? Math.min(i + 1, filtered.length - 1) : null));
      else setLightboxIdx((i) => (i !== null ? Math.max(i - 1, 0) : null));
    }
    setTouchStart(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2 && pinchStart !== null) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      setPinchScale(Math.max(1, Math.min(3, dist / pinchStart)));
    }
  };

  const closeLightbox = useCallback(() => {
    setLightboxIdx(null);
    setPinchScale(1);
    setPinchStart(null);
  }, []);

  return (
    <section id="gallery" className="section-wrapper bg-brand-black">
      <div className="max-w-content mx-auto">
        <AnimateOnScroll animation="fade-up" className="text-center mb-10 md:mb-12">
          <p className="font-accent italic text-primary text-lg mb-3">Our Portfolio</p>
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-white">Gallery</h2>
          <p className="font-body text-grey-med max-w-xl mx-auto mt-4 leading-relaxed">
            A glimpse into the transformations that happen every day at Awestruck.
          </p>
        </AnimateOnScroll>

        {/* Filter tabs */}
        <AnimateOnScroll animation="fade-up" delay={100} className="flex items-center justify-center gap-2 flex-wrap mb-10">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActive(tab)}
              className={cn(
                'h-10 px-5 rounded-full font-body text-sm font-medium transition-all duration-200',
                active === tab
                  ? 'bg-primary text-white shadow-glow'
                  : 'bg-grey-dark text-grey-med hover:text-white hover:bg-grey-dark/80 border border-grey-dark'
              )}
            >
              {tab}
            </button>
          ))}
        </AnimateOnScroll>

        {/* Masonry grid */}
        <motion.div
          className="columns-1 sm:columns-2 lg:columns-3 gap-3"
          layout
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((item, i) => (
              <motion.div
                key={item.src}
                className="break-inside-avoid mb-3 cursor-pointer group overflow-hidden rounded-lg relative"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: i * 0.04 }}
                onClick={() => setLightboxIdx(i)}
              >
                <div className="relative w-full">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    width={600}
                    height={400}
                    className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                        <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"/>
                      </svg>
                    </div>
                  </div>
                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 text-xs text-white font-body opacity-0 group-hover:opacity-100 transition-opacity duration-300 backdrop-blur-sm">
                    {item.category}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxIdx !== null && (
          <motion.div
            className="fixed inset-0 z-[200] flex items-center justify-center bg-black/95 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeLightbox}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchMove}
          >
            <motion.div
              className="relative max-w-4xl w-full mx-4"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              style={{ transform: `scale(${pinchScale})` }}
            >
              <div className="relative rounded-lg overflow-hidden" style={{ maxHeight: '80dvh' }}>
                <Image
                  src={filtered[lightboxIdx].src}
                  alt={filtered[lightboxIdx].alt}
                  width={1200}
                  height={800}
                  className="w-full h-auto object-contain"
                  style={{ maxHeight: '80dvh' }}
                />
              </div>
            </motion.div>

            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
              aria-label="Close lightbox"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>

            {/* Prev */}
            {lightboxIdx > 0 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i !== null ? i - 1 : null)); }}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
                aria-label="Previous image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M15 18l-6-6 6-6"/>
                </svg>
              </button>
            )}

            {/* Next */}
            {lightboxIdx < filtered.length - 1 && (
              <button
                onClick={(e) => { e.stopPropagation(); setLightboxIdx((i) => (i !== null ? i + 1 : null)); }}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-colors duration-200"
                aria-label="Next image"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </button>
            )}

            {/* Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/60 text-sm font-body">
              {lightboxIdx + 1} / {filtered.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
