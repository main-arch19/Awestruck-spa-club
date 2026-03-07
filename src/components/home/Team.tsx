'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';
import { cn } from '@/lib/utils';

const TEAM = [
  {
    id: 'maya',
    name: 'Maya Chen',
    role: 'Lead Stylist & Color Expert',
    image: '/images/beauty-emilynn.jpg',
    bio: 'With over 12 years of mastery, Maya has transformed thousands of clients using cutting-edge coloring techniques. Her signature balayage has won multiple industry awards.',
    specialties: ['Balayage', 'Color Correction', 'Keratin'],
  },
  {
    id: 'jordan',
    name: 'Jordan Wells',
    role: 'Color Specialist',
    image: '/images/genz-skincare.jpg',
    bio: 'Jordan is a visionary colorist trained in Paris and New York. Known for her bold creative color stories and precision highlights.',
    specialties: ['Vivid Color', 'Highlights', 'Toning'],
  },
  {
    id: 'sophia',
    name: 'Sophia Rivera',
    role: 'Skincare Expert',
    image: '/images/face-mask-spa.jpg',
    bio: 'A certified esthetician with deep expertise in advanced skincare science. Sophia customizes every facial to address your unique skin concerns with clinical precision.',
    specialties: ['HydraFacial', 'Peels', 'LED Therapy'],
  },
  {
    id: 'marcus',
    name: 'Marcus Thomas',
    role: 'Massage Therapist',
    image: '/images/gallery-19.jpg',
    bio: 'Marcus brings 10 years of therapeutic massage experience, blending sports medicine techniques with deep relaxation approaches for ultimate restoration.',
    specialties: ['Deep Tissue', 'Hot Stone', 'Sports'],
  },
];

function TeamCard({ member, index }: { member: typeof TEAM[0]; index: number }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <AnimateOnScroll animation="fade-up" delay={index * 100} className="h-full">
      <div
        className="flip-card-container cursor-pointer h-full min-h-[420px]"
        onClick={() => setFlipped(!flipped)}
        onKeyDown={(e) => e.key === 'Enter' && setFlipped(!flipped)}
        tabIndex={0}
        role="button"
        aria-label={`${member.name} — click to see bio`}
      >
        <div className={cn('flip-card-inner h-full rounded-lg', flipped && 'flipped')}>
          {/* Front */}
          <div className="flip-card-front rounded-lg overflow-hidden bg-grey-dark border border-grey-dark">
            <div className="relative h-72 overflow-hidden">
              <Image
                src={member.image}
                alt={member.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-grey-dark via-transparent to-transparent" />
            </div>
            <div className="p-5">
              <h3 className="font-heading font-semibold text-xl text-white">{member.name}</h3>
              <p className="font-accent italic text-primary text-sm mt-1">{member.role}</p>
              <p className="font-body text-xs text-grey-med mt-3 text-center tracking-wider uppercase">Tap to learn more</p>
            </div>
          </div>

          {/* Back */}
          <div className="flip-card-back rounded-lg bg-charcoal border border-primary/20 p-6 flex flex-col justify-between">
            <div>
              <h3 className="font-heading font-semibold text-xl text-white mb-1">{member.name}</h3>
              <p className="font-accent italic text-primary text-sm mb-4">{member.role}</p>
              <p className="font-body text-grey-light text-sm leading-relaxed">{member.bio}</p>
              <div className="flex flex-wrap gap-2 mt-5">
                {member.specialties.map((s) => (
                  <span key={s} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-body font-medium">
                    {s}
                  </span>
                ))}
              </div>
            </div>
            <Link
              href={`/booking?stylist=${member.id}`}
              className="mt-6 flex items-center justify-center h-11 rounded-md bg-primary text-white font-body font-semibold text-sm hover:bg-primary-dark transition-colors duration-200"
              onClick={(e) => e.stopPropagation()}
            >
              Book with {member.name.split(' ')[0]}
            </Link>
          </div>
        </div>
      </div>
    </AnimateOnScroll>
  );
}

export default function Team() {
  return (
    <section id="team" className="section-wrapper bg-brand-black">
      <div className="max-w-content mx-auto">
        <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
          <p className="font-accent italic text-primary text-lg mb-3">The Artists Behind the Magic</p>
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-white">
            Meet Our Team
          </h2>
          <p className="font-body text-grey-med max-w-2xl mx-auto mt-4 leading-relaxed">
            World-class professionals who pour passion into every service. Flip a card to meet them.
          </p>
        </AnimateOnScroll>

        {/* Desktop grid */}
        <div className="hidden sm:grid grid-cols-2 lg:grid-cols-4 gap-6">
          {TEAM.map((member, i) => (
            <TeamCard key={member.id} member={member} index={i} />
          ))}
        </div>

        {/* Mobile carousel */}
        <div className="sm:hidden snap-carousel pb-4">
          {TEAM.map((member, i) => (
            <div key={member.id} className="w-[75vw] max-w-[280px]">
              <TeamCard member={member} index={i} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
