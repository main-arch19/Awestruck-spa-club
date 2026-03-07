'use client';

import Image from 'next/image';
import { BookingState } from './BookingWizard';
import { cn } from '@/lib/utils';

interface Props {
  booking: BookingState;
  update: (partial: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const STYLISTS = [
  { id: 'any', name: 'No Preference', role: 'Any available stylist', image: null, specialties: ['All services'] },
  { id: 'maya', name: 'Maya Chen', role: 'Lead Stylist & Color Expert', image: '/images/beauty-emilynn.jpg', specialties: ['Balayage', 'Color', 'Keratin'] },
  { id: 'jordan', name: 'Jordan Wells', role: 'Color Specialist', image: '/images/genz-skincare.jpg', specialties: ['Vivid Color', 'Highlights', 'Toning'] },
  { id: 'sophia', name: 'Sophia Rivera', role: 'Skincare Expert', image: '/images/face-mask-spa.jpg', specialties: ['HydraFacial', 'Peels', 'LED'] },
  { id: 'marcus', name: 'Marcus Thomas', role: 'Massage Therapist', image: '/images/gallery-19.jpg', specialties: ['Deep Tissue', 'Hot Stone', 'Sports'] },
];

export default function Step2Stylist({ booking, update, onNext }: Props) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-white">Choose Your Stylist</h1>
          <p className="font-body text-grey-med mt-2 text-sm">Select a specialist or let us match you with the best available.</p>
        </div>

        <div className="flex flex-col gap-3">
          {STYLISTS.map((stylist) => {
            const selected = booking.stylist === stylist.id || (!booking.stylist && stylist.id === 'any');
            return (
              <button
                key={stylist.id}
                onClick={() => {
                  update({ stylist: stylist.id });
                  if (stylist.id !== 'any') setTimeout(onNext, 150);
                }}
                className={cn(
                  'flex items-center gap-4 p-4 rounded-xl border-2 text-left transition-all duration-200',
                  selected
                    ? 'border-primary bg-primary/5 shadow-glow'
                    : 'border-grey-dark hover:border-primary/30 hover:bg-grey-dark/30'
                )}
                aria-pressed={selected}
              >
                {/* Avatar */}
                <div className={cn(
                  'relative rounded-full overflow-hidden flex-shrink-0',
                  stylist.id === 'any' ? 'w-14 h-14 bg-grey-dark flex items-center justify-center' : 'w-14 h-14'
                )}>
                  {stylist.image ? (
                    <Image src={stylist.image} alt={stylist.name} fill className="object-cover object-top" sizes="56px" />
                  ) : (
                    <svg className="w-6 h-6 text-grey-med" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 7a4 4 0 100 8 4 4 0 000-8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <p className="font-heading font-semibold text-white text-base">{stylist.name}</p>
                  <p className="font-accent italic text-primary text-xs mt-0.5">{stylist.role}</p>
                  <div className="flex flex-wrap gap-1.5 mt-2">
                    {stylist.specialties.map((s) => (
                      <span key={s} className="px-2 py-0.5 rounded-full bg-grey-dark text-grey-med text-xs font-body">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Check */}
                <div className={cn(
                  'w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200',
                  selected ? 'border-primary bg-primary' : 'border-grey-dark'
                )}>
                  {selected && (
                    <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                      <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
