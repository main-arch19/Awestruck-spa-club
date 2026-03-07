'use client';

import { useState } from 'react';
import { BookingState } from './BookingWizard';
import { cn } from '@/lib/utils';

interface Props {
  booking: BookingState;
  update: (partial: Partial<BookingState>) => void;
  onNext: () => void;
  onBack: () => void;
}

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];

function generateTimeSlots(): string[] {
  const slots: string[] = [];
  for (let h = 9; h <= 19; h++) {
    for (const m of [0, 30]) {
      if (h === 19 && m === 30) break;
      const hour = h > 12 ? h - 12 : h === 0 ? 12 : h;
      const ampm = h >= 12 ? 'PM' : 'AM';
      const minStr = m === 0 ? '00' : '30';
      slots.push(`${hour}:${minStr} ${ampm}`);
    }
  }
  return slots;
}

const TIME_SLOTS = generateTimeSlots();

// Simulate some unavailable dates
const UNAVAILABLE = [1, 8, 15, 22, 29]; // specific day-of-month numbers

export default function Step3DateTime({ booking, update }: Props) {
  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const firstDay = new Date(viewYear, viewMonth, 1).getDay();
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate();

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const isToday = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    return d.toDateString() === today.toDateString();
  };

  const isPast = (day: number) => {
    const d = new Date(viewYear, viewMonth, day);
    d.setHours(23, 59, 59);
    return d < today;
  };

  const isUnavailable = (day: number) => UNAVAILABLE.includes(day);

  const isSelected = (day: number) => {
    if (!booking.date) return false;
    const d = new Date(viewYear, viewMonth, day);
    return d.toDateString() === booking.date.toDateString();
  };

  const selectDay = (day: number) => {
    if (isPast(day) || isUnavailable(day)) return;
    update({ date: new Date(viewYear, viewMonth, day), time: null });
  };

  // Disable prev month if it would go before current month
  const canGoPrev = viewYear > today.getFullYear() || viewMonth > today.getMonth();

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-2xl mx-auto px-4 md:px-8 py-8">
        <div className="mb-8">
          <h1 className="font-heading font-bold text-2xl md:text-3xl text-white">Pick a Date & Time</h1>
          <p className="font-body text-grey-med mt-2 text-sm">Select your preferred appointment date and time slot.</p>
        </div>

        {/* Calendar */}
        <div className="bg-grey-dark rounded-xl p-4 md:p-6 mb-6">
          {/* Month nav */}
          <div className="flex items-center justify-between mb-5">
            <button
              onClick={prevMonth}
              disabled={!canGoPrev}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-grey-med hover:text-white hover:bg-grey-dark/80 transition-colors duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous month"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M15 18l-6-6 6-6"/>
              </svg>
            </button>
            <h2 className="font-heading font-semibold text-white text-lg">
              {MONTHS[viewMonth]} {viewYear}
            </h2>
            <button
              onClick={nextMonth}
              className="w-10 h-10 rounded-lg flex items-center justify-center text-grey-med hover:text-white hover:bg-grey-dark/80 transition-colors duration-200"
              aria-label="Next month"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                <path d="M9 18l6-6-6-6"/>
              </svg>
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 mb-2">
            {DAYS.map((d) => (
              <div key={d} className="text-center font-body text-xs text-grey-med font-semibold uppercase tracking-wider py-2">
                {d}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Leading empty cells */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} />
            ))}

            {/* Day cells */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const past = isPast(day);
              const unavail = isUnavailable(day);
              const today_ = isToday(day);
              const selected = isSelected(day);
              const disabled = past || unavail;

              return (
                <button
                  key={day}
                  onClick={() => selectDay(day)}
                  disabled={disabled}
                  className={cn(
                    'relative flex items-center justify-center rounded-lg font-body font-medium text-sm transition-all duration-150',
                    'min-h-[44px] aspect-square',
                    selected
                      ? 'bg-primary text-white shadow-glow font-bold'
                      : disabled
                      ? 'text-grey-dark cursor-not-allowed'
                      : today_
                      ? 'text-primary border border-primary/40 hover:bg-primary/10'
                      : 'text-white hover:bg-grey-dark/60'
                  )}
                  aria-label={`${MONTHS[viewMonth]} ${day}, ${viewYear}${disabled ? ' (unavailable)' : ''}`}
                  aria-pressed={selected}
                >
                  {day}
                  {today_ && !selected && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-primary" />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Time slots */}
        {booking.date && (
          <div>
            <h3 className="font-heading font-semibold text-white text-base mb-4">
              Available Times —{' '}
              <span className="text-primary">
                {booking.date.toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
              </span>
            </h3>
            <div className="grid grid-cols-3 gap-2">
              {TIME_SLOTS.map((time) => {
                const selected = booking.time === time;
                return (
                  <button
                    key={time}
                    onClick={() => update({ time })}
                    className={cn(
                      'h-11 rounded-lg font-body text-sm font-medium transition-all duration-150',
                      selected
                        ? 'bg-primary text-white shadow-glow'
                        : 'bg-grey-dark text-grey-med hover:text-white hover:bg-grey-dark/60 border border-grey-dark hover:border-primary/30'
                    )}
                    aria-pressed={selected}
                  >
                    {time}
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {!booking.date && (
          <p className="text-center font-body text-sm text-grey-med py-4">
            Select a date above to see available time slots.
          </p>
        )}
      </div>
    </div>
  );
}
