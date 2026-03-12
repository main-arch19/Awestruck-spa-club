import type { Metadata } from 'next';
import { ThemeProvider } from 'next-themes';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://awestruckspaclub.com'),
  title: 'Awestruck Spa Club — Where Relaxation Meets Artistry',
  description: 'Premium spa and beauty experiences. Book massages, facials, hair styling, nails, and bridal services in Beverly Hills.',
  keywords: 'spa, beauty, massage, facials, hair salon, nails, bridal, Beverly Hills',
  openGraph: {
    title: 'Awestruck Spa Club',
    description: 'Where Relaxation Meets Artistry',
    images: ['/images/gallery-17.jpg'],
    type: 'website',
    siteName: 'Awestruck Spa Club',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Awestruck Spa Club',
    description: 'Where Relaxation Meets Artistry',
    images: ['/images/gallery-17.jpg'],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
