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

const SERVICES = [
  { id: 'massage', name: 'Massage & Body Therapy', price: 'From $95', image: '/images/nia-wellness.jpg', emoji: '🫶' },
  { id: 'hair', name: 'Haircuts & Styling', price: 'From $75', image: '/images/confidence-shave.jpg', emoji: '✂️' },
  { id: 'color', name: 'Color & Highlights', price: 'From $120', image: '/images/beauty-emilynn.jpg', emoji: '🎨' },
  { id: 'facials', name: 'Facials & Skincare', price: 'From $110', image: '/images/face-mask-spa.jpg', emoji: '✨' },
  { id: 'nails', name: 'Nails & Manicure', price: 'From $45', image: '/images/gallery-20.jpg', emoji: '💅' },
  { id: 'bridal', name: 'Bridal & Special Events', price: 'From $350', image: '/images/celebrate.jpg', emoji: '💍' },
];

export default function Step1Service({ booking, update, onNext }: Props) {
  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-3xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-white">Select a Service</h1>
          <p className="font-body text-grey-med mt-2 text-sm">Choose the service you'd like to book today.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {SERVICES.map((service) => {
            const selected = booking.service === service.id;
            return (
              <button
                key={service.id}
                onClick={() => {
                  update({ service: service.id });
                  // Auto-advance on mobile after short delay
                  setTimeout(onNext, 150);
                }}
                className={cn(
                  'relative rounded-xl overflow-hidden text-left transition-all duration-200 group',
                  'border-2',
                  selected
                    ? 'border-primary shadow-glow scale-[1.02]'
                    : 'border-grey-dark hover:border-primary/40 hover:scale-[1.01]'
                )}
                aria-pressed={selected}
              >
                <div className="relative h-28 md:h-36 overflow-hidden">
                  <Image
                    src={service.image}
                    alt={service.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                  {/* Check badge */}
                  {selected && (
                    <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                      <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={3}>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-3">
                  <p className="font-heading font-semibold text-sm text-white leading-tight">{service.name}</p>
                  <p className="font-body text-xs text-primary mt-1 font-medium">{service.price}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
