'use client';

import { useSearchParams } from 'next/navigation';
import BookingWizard from '@/components/booking/BookingWizard';

export default function BookingPageClient() {
  const params = useSearchParams();
  const stylist = params.get('stylist') || undefined;

  return <BookingWizard initialStylist={stylist} />;
}
