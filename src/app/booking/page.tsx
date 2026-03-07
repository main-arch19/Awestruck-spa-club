import { Metadata } from 'next';
import { Suspense } from 'react';
import BookingPageClient from './BookingPageClient';

export const metadata: Metadata = {
  title: 'Book Your Experience — Awestruck Spa Club',
  description: 'Reserve your spa treatment, hair, nails or beauty service at Awestruck Spa Club. Quick online booking in under 2 minutes.',
};

export default function BookingPage() {
  return (
    <Suspense fallback={
      <div className="min-h-[100dvh] bg-brand-black flex items-center justify-center">
        <div className="flex gap-1.5">
          {[0, 1, 2].map((i) => (
            <span key={i} className="w-2 h-2 rounded-full bg-primary animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
          ))}
        </div>
      </div>
    }>
      <BookingPageClient />
    </Suspense>
  );
}
