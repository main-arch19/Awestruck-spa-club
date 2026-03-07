'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { BookingState } from './BookingWizard';

interface Props {
  booking: BookingState;
  update: (partial: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const SERVICE_LABELS: Record<string, string> = {
  massage: 'Massage & Body Therapy',
  hair: 'Haircuts & Styling',
  color: 'Color & Highlights',
  facials: 'Facials & Skincare',
  nails: 'Nails & Manicure',
  bridal: 'Bridal & Special Events',
};

const STYLIST_LABELS: Record<string, string> = {
  any: 'No preference',
  maya: 'Maya Chen',
  jordan: 'Jordan Wells',
  sophia: 'Sophia Rivera',
  marcus: 'Marcus Thomas',
};

function generateICS(booking: BookingState): string {
  if (!booking.date || !booking.time) return '';

  const dateStr = booking.date.toISOString().slice(0, 10).replace(/-/g, '');
  const [time, ampm] = booking.time.split(' ');
  const [h, m] = time.split(':').map(Number);
  let hour = h;
  if (ampm === 'PM' && h !== 12) hour += 12;
  if (ampm === 'AM' && h === 12) hour = 0;
  const startStr = `${dateStr}T${String(hour).padStart(2, '0')}${String(m).padStart(2, '0')}00`;
  const endHour = hour + 1;
  const endStr = `${dateStr}T${String(endHour).padStart(2, '0')}${String(m).padStart(2, '0')}00`;

  return `BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//Awestruck Spa Club//EN\nBEGIN:VEVENT\nDTSTART:${startStr}\nDTEND:${endStr}\nSUMMARY:${SERVICE_LABELS[booking.service || ''] || 'Spa Appointment'} @ Awestruck Spa Club\nDESCRIPTION:Appointment with ${STYLIST_LABELS[booking.stylist || 'any']}\nLOCATION:123 Luxury Lane Suite 200, Beverly Hills CA 90210\nEND:VEVENT\nEND:VCALENDAR`;
}

function downloadICS(booking: BookingState) {
  const ics = generateICS(booking);
  if (!ics) return;
  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'awestruck-appointment.ics';
  a.click();
  URL.revokeObjectURL(url);
}

export default function Step5Confirmation({ booking }: Props) {
  const confirmationNumber = `AWE-${Math.random().toString(36).slice(2, 8).toUpperCase()}`;

  const details = [
    { label: 'Confirmation #', value: confirmationNumber },
    { label: 'Service', value: SERVICE_LABELS[booking.service || ''] || '—' },
    { label: 'Specialist', value: STYLIST_LABELS[booking.stylist || 'any'] || 'No preference' },
    { label: 'Date', value: booking.date ? booking.date.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }) : '—' },
    { label: 'Time', value: booking.time || '—' },
    { label: 'Name', value: booking.name },
    { label: 'Email', value: booking.email },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-lg mx-auto px-4 md:px-8 py-8 flex flex-col items-center text-center">

        {/* Animated checkmark */}
        <motion.div
          className="relative mb-8"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.1 }}
        >
          <div className="w-24 h-24 rounded-full bg-primary/10 border-2 border-primary/30 flex items-center justify-center">
            <svg
              className="w-12 h-12 text-primary"
              fill="none"
              viewBox="0 0 52 52"
            >
              <motion.circle
                cx="26" cy="26" r="24"
                stroke="currentColor"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.6, delay: 0.2, ease: 'easeInOut' }}
                style={{ strokeDasharray: '151 151' }}
              />
              <motion.path
                d="M14 27l9 9 15-18"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.5, delay: 0.7, ease: 'easeOut' }}
                style={{ strokeDasharray: '40 40' }}
              />
            </svg>
          </div>

          {/* Sparkle dots */}
          {[0, 72, 144, 216, 288].map((deg, i) => (
            <motion.div
              key={deg}
              className="absolute w-2 h-2 rounded-full bg-primary"
              style={{
                top: '50%',
                left: '50%',
                transformOrigin: '0 0',
              }}
              initial={{ scale: 0, x: 0, y: 0 }}
              animate={{
                scale: [0, 1, 0],
                x: Math.cos((deg * Math.PI) / 180) * 52,
                y: Math.sin((deg * Math.PI) / 180) * 52,
              }}
              transition={{ duration: 0.6, delay: 0.8 + i * 0.05, ease: 'easeOut' }}
            />
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.4 }}
        >
          <h1 className="font-heading font-bold text-3xl text-white mb-2">You're Booked!</h1>
          <p className="font-body text-grey-med text-sm leading-relaxed max-w-sm">
            A confirmation email has been sent to <span className="text-white">{booking.email}</span>. We can't wait to see you!
          </p>
        </motion.div>

        {/* Summary card */}
        <motion.div
          className="glass rounded-xl p-5 mt-8 w-full text-left space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          {details.map(({ label, value }) => (
            <div key={label} className="flex items-start justify-between gap-4">
              <span className="font-body text-xs text-grey-med uppercase tracking-wider flex-shrink-0">{label}</span>
              <span className="font-body text-sm text-white text-right font-medium">{value}</span>
            </div>
          ))}
        </motion.div>

        {/* Actions */}
        <motion.div
          className="flex flex-col gap-3 mt-8 w-full"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <button
            onClick={() => downloadICS(booking)}
            className="flex items-center justify-center gap-2 h-12 w-full rounded-lg border border-primary/40 text-primary hover:bg-primary/5 transition-all duration-200 font-body font-medium text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/>
            </svg>
            Add to Calendar
          </button>
          <Link
            href="/"
            className="flex items-center justify-center h-12 w-full rounded-lg bg-grey-dark text-grey-med hover:text-white hover:bg-grey-dark/80 transition-all duration-200 font-body font-medium text-sm"
          >
            Back to Home
          </Link>
        </motion.div>

        <motion.p
          className="font-body text-xs text-grey-med mt-6 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.0 }}
        >
          Need to reschedule? Call us at{' '}
          <a href="tel:+15551234567" className="text-primary hover:underline">(555) 123-4567</a>
          {' '}or email{' '}
          <a href="mailto:hello@awestruckspaclub.com" className="text-primary hover:underline">hello@awestruckspaclub.com</a>
        </motion.p>
      </div>
    </div>
  );
}
