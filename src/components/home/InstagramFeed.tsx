'use client';

import Image from 'next/image';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';

const POSTS = [
  { src: '/images/beauty-emilynn.jpg', alt: 'Beautiful hair styling', likes: '2.4k', caption: 'Confidence in every strand ✨' },
  { src: '/images/face-mask-spa.jpg', alt: 'Facial treatment', likes: '1.8k', caption: 'Glow from within 💆‍♀️' },
  { src: '/images/gallery-20.jpg', alt: 'Nail art', likes: '3.1k', caption: 'Art at your fingertips 💅' },
  { src: '/images/genz-skincare.jpg', alt: 'Skincare routine', likes: '2.7k', caption: 'Your skin, perfected 🌟' },
  { src: '/images/celebrate.jpg', alt: 'Celebration moment', likes: '4.2k', caption: 'Today we celebrate you ✨' },
  { src: '/images/nia-wellness.jpg', alt: 'Wellness spa', likes: '1.9k', caption: 'Find your calm here 🌿' },
];

export default function InstagramFeed() {
  return (
    <section className="section-wrapper bg-cream">
      <div className="max-w-content mx-auto">
        <AnimateOnScroll animation="fade-up" className="text-center mb-10 md:mb-12">
          <p className="font-accent italic text-primary text-lg mb-3">Follow Our Journey</p>
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-brand-black">
            @AwestruckSpaClub
          </h2>
          <p className="font-body text-grey-med mt-3">Stay connected for daily inspiration and behind-the-scenes moments</p>
        </AnimateOnScroll>

        <div className="grid grid-cols-3 gap-1.5 md:gap-3">
          {POSTS.map((post, i) => (
            <AnimateOnScroll key={post.src} animation="scale-up" delay={i * 60}>
              <a
                href="https://instagram.com/AwestruckSpaClub"
                target="_blank"
                rel="noopener noreferrer"
                className="block relative overflow-hidden rounded-md group aspect-square"
                aria-label={`Instagram post: ${post.caption}`}
              >
                <Image
                  src={post.src}
                  alt={post.alt}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 33vw, (max-width: 1200px) 200px, 25vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex flex-col items-center justify-center gap-2 opacity-0 group-hover:opacity-100 p-3">
                  <div className="flex items-center gap-1.5 text-white">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                    </svg>
                    <span className="font-body text-sm font-semibold">{post.likes}</span>
                  </div>
                  <p className="font-body text-xs text-white/80 text-center leading-tight line-clamp-2">{post.caption}</p>
                </div>
              </a>
            </AnimateOnScroll>
          ))}
        </div>

        <AnimateOnScroll animation="fade-up" delay={300} className="text-center mt-8">
          <a
            href="https://instagram.com/AwestruckSpaClub"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 h-11 px-6 rounded-full border border-sand text-grey-med hover:text-brand-black hover:border-primary/50 transition-all duration-200 font-body text-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            Follow @AwestruckSpaClub
          </a>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
