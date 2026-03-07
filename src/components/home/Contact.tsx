'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import AnimateOnScroll from '@/components/global/AnimateOnScroll';

const SERVICES_LIST = ['Massage & Body Therapy', 'Haircuts & Styling', 'Color & Highlights', 'Facials & Skincare', 'Nails & Manicure', 'Bridal & Special Events'];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<typeof form>>({});

  const validate = () => {
    const e: Partial<typeof form> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email is required';
    return e;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitted(true);
  };

  const inputClass = 'w-full h-12 px-4 rounded-md bg-grey-dark border border-grey-dark focus:border-primary/60 focus:outline-none text-white placeholder-grey-med font-body text-base transition-colors duration-200';
  const labelClass = 'block font-body text-xs uppercase tracking-wider text-grey-med mb-1.5';

  return (
    <section id="contact" className="section-wrapper bg-brand-black">
      <div className="max-w-content mx-auto">
        <AnimateOnScroll animation="fade-up" className="text-center mb-12 md:mb-16">
          <p className="font-accent italic text-primary text-lg mb-3">Get in Touch</p>
          <h2 className="font-heading font-bold text-h2-mobile md:text-h2 text-white">Contact Us</h2>
          <p className="font-body text-grey-med max-w-xl mx-auto mt-4 leading-relaxed">
            Questions? Special requests? We'd love to hear from you.
          </p>
        </AnimateOnScroll>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact form */}
          <AnimateOnScroll animation="slide-left">
            {submitted ? (
              <motion.div
                className="flex flex-col items-center justify-center text-center h-full min-h-[400px] glass rounded-xl p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
                <h3 className="font-heading font-semibold text-2xl text-white mb-3">Message Sent!</h3>
                <p className="font-body text-grey-med leading-relaxed">
                  Thank you for reaching out. A member of our team will get back to you within 24 hours.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', service: '', message: '' }); }}
                  className="mt-6 font-body text-sm text-primary hover:underline"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col gap-5" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className={labelClass}>Full Name *</label>
                    <input
                      id="name"
                      type="text"
                      autoComplete="name"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className={inputClass}
                    />
                    {errors.name && <p className="mt-1 text-xs text-red-400 font-body">{errors.name}</p>}
                  </div>
                  <div>
                    <label htmlFor="email" className={labelClass}>Email Address *</label>
                    <input
                      id="email"
                      type="email"
                      autoComplete="email"
                      inputMode="email"
                      placeholder="you@example.com"
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className={inputClass}
                    />
                    {errors.email && <p className="mt-1 text-xs text-red-400 font-body">{errors.email}</p>}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="phone" className={labelClass}>Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      autoComplete="tel"
                      inputMode="tel"
                      placeholder="(555) 000-0000"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="service" className={labelClass}>Service of Interest</label>
                    <select
                      id="service"
                      value={form.service}
                      onChange={(e) => setForm({ ...form, service: e.target.value })}
                      className={`${inputClass} cursor-pointer`}
                    >
                      <option value="">Select a service</option>
                      {SERVICES_LIST.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    placeholder="Tell us about what you're looking for..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    className={`${inputClass} h-auto py-3 resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto sm:self-end h-12 px-8 rounded-md bg-primary text-white font-body font-semibold text-base hover:bg-primary-dark transition-all duration-200 shadow-glow hover:shadow-glow-lg"
                >
                  Send Message
                </button>
              </form>
            )}
          </AnimateOnScroll>

          {/* Contact info + Map */}
          <AnimateOnScroll animation="slide-right" className="flex flex-col gap-8">
            {/* Info cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round"/>
                      <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: 'Visit Us',
                  lines: ['123 Luxury Lane, Suite 200', 'Beverly Hills, CA 90210'],
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: 'Call Us',
                  lines: ['(555) 123-4567', 'Mon–Sat 9am–8pm'],
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: 'Email Us',
                  lines: ['hello@awestruckspaclub.com'],
                },
                {
                  icon: (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.8}>
                      <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round"/>
                    </svg>
                  ),
                  title: 'Hours',
                  lines: ['Mon–Sat: 9am–8pm', 'Sunday: 10am–6pm'],
                },
              ].map(({ icon, title, lines }) => (
                <div key={title} className="glass rounded-lg p-4 flex gap-3">
                  <div className="text-primary mt-0.5 shrink-0">{icon}</div>
                  <div>
                    <p className="font-body font-semibold text-sm text-white mb-1">{title}</p>
                    {lines.map((l) => <p key={l} className="font-body text-xs text-grey-med leading-relaxed">{l}</p>)}
                  </div>
                </div>
              ))}
            </div>

            {/* Map placeholder */}
            <div className="relative rounded-xl overflow-hidden bg-grey-dark border border-grey-dark h-52 flex items-center justify-center">
              <div className="text-center">
                <svg className="w-10 h-10 text-primary mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" strokeLinecap="round"/>
                  <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" strokeLinecap="round"/>
                </svg>
                <p className="font-body font-semibold text-white text-sm">123 Luxury Lane, Suite 200</p>
                <p className="font-body text-grey-med text-xs mt-1">Beverly Hills, CA 90210</p>
                <a
                  href="https://maps.google.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-primary text-xs font-body hover:underline"
                >
                  Get Directions
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                  </svg>
                </a>
              </div>
              {/* Subtle grid overlay */}
              <div className="absolute inset-0 opacity-5" style={{
                backgroundImage: 'linear-gradient(#8A8A8A 1px, transparent 1px), linear-gradient(90deg, #8A8A8A 1px, transparent 1px)',
                backgroundSize: '32px 32px'
              }} />
            </div>
          </AnimateOnScroll>
        </div>
      </div>
    </section>
  );
}
