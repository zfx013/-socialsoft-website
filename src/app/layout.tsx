import type { Metadata } from 'next';
import { metadata as seoMetadata, jsonLd, faqJsonLd } from '@/lib/seo';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StickyContact from '@/components/layout/StickyContact';
import SplashScreen from '@/components/effects/SplashScreen';
import SmoothScroll from '@/components/effects/SmoothScroll';
import ScrollCleanup from '@/components/effects/ScrollCleanup';
import NavigationWrapper from '@/components/effects/NavigationWrapper';
import ScrollProgress from '@/components/effects/ScrollProgress';
import CustomCursor from '@/components/effects/CustomCursor';
import GrainOverlay from '@/components/effects/GrainOverlay';
import CursorTrail from '@/components/effects/CursorTrail';
import './globals.css';

export const metadata: Metadata = seoMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
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
          <ScrollCleanup />
          <SplashScreen />
          <ScrollProgress />
          <CustomCursor />
          <CursorTrail />
          <GrainOverlay />
          <Header />
          <main>
            <NavigationWrapper>
              {children}
            </NavigationWrapper>
          </main>
          <Footer />
          <StickyContact />
        </SmoothScroll>
      </body>
    </html>
  );
}
