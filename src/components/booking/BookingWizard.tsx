'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Step1Service from './Step1Service';
import Step2Stylist from './Step2Stylist';
import Step3DateTime from './Step3DateTime';
import Step4Details from './Step4Details';
import Step5Confirmation from './Step5Confirmation';

export interface BookingState {
  service: string | null;
  stylist: string | null;
  date: Date | null;
  time: string | null;
  name: string;
  email: string;
  phone: string;
  notes: string;
}

const STEP_LABELS = ['Service', 'Stylist', 'Date & Time', 'Details', 'Confirm'];

const slideVariants = {
  enter: (dir: number) => ({
    x: dir > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({
    x: dir < 0 ? '100%' : '-100%',
    opacity: 0,
  }),
};

export default function BookingWizard({ initialStylist }: { initialStylist?: string }) {
  const [step, setStep] = useState(1);
  const [dir, setDir] = useState(1);
  const [booking, setBooking] = useState<BookingState>({
    service: null,
    stylist: initialStylist || null,
    date: null,
    time: null,
    name: '',
    email: '',
    phone: '',
    notes: '',
  });

  const update = (partial: Partial<BookingState>) =>
    setBooking((prev) => ({ ...prev, ...partial }));

  const next = () => {
    setDir(1);
    setStep((s) => Math.min(s + 1, 5));
  };

  const back = () => {
    setDir(-1);
    setStep((s) => Math.max(s - 1, 1));
  };

  const canAdvance = () => {
    if (step === 1) return !!booking.service;
    if (step === 2) return true; // stylist optional
    if (step === 3) return !!booking.date && !!booking.time;
    if (step === 4) return !!booking.name.trim() && !!booking.email.trim();
    return true;
  };

  const stepProps = { booking, update, onNext: next, onBack: back };

  return (
    <div className="flex flex-col min-h-[100dvh] bg-brand-black">
      {/* Progress bar */}
      <div className="fixed top-0 left-0 right-0 z-10 bg-charcoal border-b border-grey-dark">
        <div className="flex items-center justify-between px-4 md:px-8 h-16">
          {/* Logo */}
          <span className="font-heading font-bold text-lg">
            <span className="text-silver">AWE</span><span className="text-primary">STRUCK</span>
          </span>

          {/* Step indicator */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            {STEP_LABELS.map((label, i) => {
              const n = i + 1;
              const isActive = n === step;
              const isDone = n < step;
              return (
                <div key={label} className="flex items-center gap-1.5">
                  <div className={`flex items-center justify-center rounded-full font-body font-semibold text-xs transition-all duration-300 ${
                    isActive ? 'w-7 h-7 bg-primary text-white' :
                    isDone ? 'w-7 h-7 bg-primary/20 text-primary border border-primary/40' :
                    'w-7 h-7 bg-grey-dark text-grey-med'
                  }`}>
                    {isDone ? (
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2.5}>
                        <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    ) : n}
                  </div>
                  <span className={`hidden sm:block font-body text-xs transition-colors duration-200 ${
                    isActive ? 'text-white' : isDone ? 'text-primary/60' : 'text-grey-med'
                  }`}>{label}</span>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`hidden sm:block w-6 h-px transition-colors duration-300 ${isDone ? 'bg-primary/40' : 'bg-grey-dark'}`} />
                  )}
                </div>
              );
            })}
          </div>

          {/* Progress fraction */}
          <span className="font-body text-xs text-grey-med">{step}/5</span>
        </div>

        {/* Progress fill bar */}
        <div className="h-0.5 bg-grey-dark">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: '20%' }}
            animate={{ width: `${step * 20}%` }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="flex-1 overflow-hidden pt-[68px] pb-[88px]">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={step}
            custom={dir}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            className="h-full"
          >
            {step === 1 && <Step1Service {...stepProps} />}
            {step === 2 && <Step2Stylist {...stepProps} />}
            {step === 3 && <Step3DateTime {...stepProps} />}
            {step === 4 && <Step4Details {...stepProps} />}
            {step === 5 && <Step5Confirmation {...stepProps} />}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Fixed bottom nav */}
      {step < 5 && (
        <div
          className="fixed bottom-0 left-0 right-0 z-10 bg-charcoal border-t border-grey-dark px-4 md:px-8 flex items-center gap-3"
          style={{ paddingTop: '12px', paddingBottom: 'max(12px, env(safe-area-inset-bottom))' }}
        >
          {step > 1 ? (
            <button
              onClick={back}
              className="flex items-center justify-center h-14 px-6 rounded-lg border border-grey-dark text-grey-med hover:text-white hover:border-grey-med transition-all duration-200 font-body font-semibold text-base flex-shrink-0 min-w-[100px]"
            >
              ← Back
            </button>
          ) : (
            <div className="flex-shrink-0 min-w-[100px]" />
          )}

          <button
            onClick={next}
            disabled={!canAdvance()}
            className="flex-1 flex items-center justify-center h-14 rounded-lg font-body font-semibold text-base transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-primary text-white hover:bg-primary-dark shadow-glow hover:shadow-glow-lg disabled:shadow-none"
          >
            {step === 4 ? 'Confirm Booking' : 'Continue →'}
          </button>
        </div>
      )}
    </div>
  );
}
