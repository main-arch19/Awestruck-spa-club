'use client';

import { useState } from 'react';
import dynamic from 'next/dynamic';

import TopInfoBar from '@/components/layout/TopInfoBar';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/home/Hero';
import About from '@/components/home/About';
import Services from '@/components/home/Services';
import BeforeAfter from '@/components/home/BeforeAfter';
import Team from '@/components/home/Team';
import Gallery from '@/components/home/Gallery';
import Testimonials from '@/components/home/Testimonials';
import Pricing from '@/components/home/Pricing';
import InstagramFeed from '@/components/home/InstagramFeed';
import BookingCTA from '@/components/home/BookingCTA';
import Contact from '@/components/home/Contact';
import FloatingBookingBar from '@/components/global/FloatingBookingBar';

const LoadingScreen = dynamic(() => import('@/components/global/LoadingScreen'), { ssr: false });
const CustomCursor = dynamic(() => import('@/components/global/CustomCursor'), { ssr: false });

export default function HomePage() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {!loaded && <LoadingScreen onComplete={() => setLoaded(true)} />}
      <CustomCursor />

      <div className="dark:bg-brand-black bg-white">
        <TopInfoBar />
        <Navbar />

        <main>
          <Hero />
          <About />
          <Services />
          <BeforeAfter />
          <Team />
          <Gallery />
          <Testimonials />
          <Pricing />
          <InstagramFeed />
          <BookingCTA />
          <Contact />
        </main>

        <Footer />
        <FloatingBookingBar />
      </div>
    </>
  );
}
