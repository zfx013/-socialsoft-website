import type { Metadata } from 'next';
import { Inter, Montserrat } from 'next/font/google';
import { metadata as seoMetadata, jsonLd, faqJsonLd } from '@/lib/seo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyContact from '@/components/layout/StickyContact';
import SplashScreen from '@/components/effects/SplashScreen';
import SmoothScroll from '@/components/effects/SmoothScroll';
import ScrollCleanup from '@/components/effects/ScrollCleanup';
import ScrollProgress from '@/components/effects/ScrollProgress';
import CustomCursor from '@/components/effects/CustomCursor';
import GrainOverlay from '@/components/effects/GrainOverlay';
import CursorTrail from '@/components/effects/CursorTrail';
import PageWrapper from '@/components/effects/PageWrapper';
import ScrollToTop from '@/components/ScrollToTop';
import PageVisitTracker from '@/components/effects/PageVisitTracker';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-inter',
  display: 'swap',
});

const montserrat = Montserrat({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800'],
  variable: '--font-montserrat',
  display: 'swap',
});

export const metadata: Metadata = seoMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning className={`${inter.variable} ${montserrat.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0a0f1a" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-dark-900" suppressHydrationWarning>
        <SmoothScroll>
          {/* Skip Link pour accessibilité */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent-blue focus:text-white focus:rounded-lg focus:outline-none"
          >
            Aller au contenu principal
          </a>
          <PageVisitTracker />
          <ScrollCleanup />
          <ScrollToTop />
          <SplashScreen />
          <ScrollProgress />
          <CustomCursor />
          <CursorTrail />
          <GrainOverlay />
          <Header />
          <main id="main-content">
            <PageWrapper>{children}</PageWrapper>
          </main>
          <Footer />
          <StickyContact />
        </SmoothScroll>
      </body>
    </html>
  );
}
