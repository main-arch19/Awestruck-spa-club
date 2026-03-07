'use client';

import { BookingState } from './BookingWizard';

interface Props {
  booking: BookingState;
  update: (partial: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

export default function Step4Details({ booking, update }: Props) {
  const inputClass = 'w-full h-12 px-4 rounded-lg bg-grey-dark border border-grey-dark focus:border-primary/60 focus:outline-none text-white placeholder-grey-med font-body text-base transition-colors duration-200';
  const labelClass = 'block font-body text-xs uppercase tracking-wider text-grey-med mb-1.5';

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-white">Your Details</h1>
          <p className="font-body text-grey-med mt-2 text-sm">Almost there — just a few details to confirm your booking.</p>
        </div>

        {/* Booking summary */}
        <div className="glass rounded-xl p-4 mb-8 space-y-2">
          <p className="font-body text-xs uppercase tracking-wider text-grey-med mb-3">Booking Summary</p>
          {[
            { label: 'Service', value: booking.service ? booking.service.charAt(0).toUpperCase() + booking.service.slice(1) : '—' },
            { label: 'Stylist', value: booking.stylist && booking.stylist !== 'any' ? booking.stylist.charAt(0).toUpperCase() + booking.stylist.slice(1) : 'No preference' },
            { label: 'Date', value: booking.date ? booking.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' }) : '—' },
            { label: 'Time', value: booking.time || '—' },
          ].map(({ label, value }) => (
            <div key={label} className="flex items-center justify-between">
              <span className="font-body text-sm text-grey-med">{label}</span>
              <span className="font-body text-sm text-white font-medium">{value}</span>
            </div>
          ))}
        </div>

        <form className="flex flex-col gap-5" onSubmit={(e) => e.preventDefault()}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label htmlFor="book-name" className={labelClass}>Full Name *</label>
              <input
                id="book-name"
                type="text"
                autoComplete="name"
                placeholder="Your full name"
                value={booking.name}
                onChange={(e) => update({ name: e.target.value })}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="book-email" className={labelClass}>Email Address *</label>
              <input
                id="book-email"
                type="email"
                autoComplete="email"
                inputMode="email"
                placeholder="you@example.com"
                value={booking.email}
                onChange={(e) => update({ email: e.target.value })}
                className={inputClass}
              />
            </div>
          </div>

          <div>
            <label htmlFor="book-phone" className={labelClass}>Phone Number</label>
            <input
              id="book-phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              placeholder="(555) 000-0000"
              value={booking.phone}
              onChange={(e) => update({ phone: e.target.value })}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="book-notes" className={labelClass}>Special Requests or Notes</label>
            <textarea
              id="book-notes"
              rows={3}
              placeholder="Any allergies, preferences, or special requests..."
              value={booking.notes}
              onChange={(e) => update({ notes: e.target.value })}
              className={`${inputClass} h-auto py-3 resize-none`}
            />
          </div>

          <p className="font-body text-xs text-grey-med">
            * Required fields. By booking, you agree to our{' '}
            <a href="/terms" className="text-primary hover:underline">Terms of Service</a> and{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
          </p>
        </form>
      </div>
    </div>
  );
}
