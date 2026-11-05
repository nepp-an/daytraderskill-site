import type { Metadata } from 'next';
import { DisclaimerBar } from '@/components/DisclaimerBar';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { BRAND, DISCLAIMER_SHORT, SITE_ORIGIN } from '@/lib/site';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default: 'Day Trading Guide & Paper-First Practice Hub',
    template: `%s | ${BRAND}`,
  },
  description: DISCLAIMER_SHORT,
  applicationName: BRAND,
  category: 'education',
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: BRAND,
    locale: 'en_US',
    title: 'Day Trading Guide & Paper-First Practice Hub',
    description: DISCLAIMER_SHORT,
    url: SITE_ORIGIN,
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'DayTraderSkill.com — a paper-first day trading guide',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day Trading Guide & Paper-First Practice Hub',
    description: DISCLAIMER_SHORT,
    images: ['/og/home.svg'],
  },
  icons: {
    icon: [{ url: '/favicon.svg', type: 'image/svg+xml' }],
    shortcut: '/favicon.svg',
  },
  other: {
    'google-adsense-account': 'ca-pub-3175943774981621',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        {/* Google AdSense — Auto ads; same pub as OCA/E7 */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3175943774981621"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <DisclaimerBar />
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
