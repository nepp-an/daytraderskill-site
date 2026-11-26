import type { Metadata } from 'next';
import Script from 'next/script';
import { DisclaimerBar } from '@/components/DisclaimerBar';
import { SiteFooter } from '@/components/SiteFooter';
import { SiteHeader } from '@/components/SiteHeader';
import { BRAND, DISCLAIMER_SHORT, GA4_MEASUREMENT_ID, SITE_ORIGIN } from '@/lib/site';
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
    description: DISCLAIMER_SHORT,
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
        {/* Adsterra popunder — DTS unit only; one per page, in <head>. */}
        <script
          data-cfasync="false"
          src="https://abscloud.org/1/a208e4544d83a35202b91d2ed10326a9"
        />
      </head>
      <body>
        {/* GA4: Day Trader Skill property only (G-CFQ8JV652G). Not OCA/E7. */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA4_MEASUREMENT_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4-dts" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA4_MEASUREMENT_ID}');
        `}</Script>
        <DisclaimerBar />
        <SiteHeader />
        <main>{children}</main>
        {/* Adsterra native/banner — DTS unit only; once, above the footer. */}
        <div className="adsterra-native">
          <script
            async
            data-cfasync="false"
            src="https://bauval.org/21/c71ffef6cae1bbba7021402cdd6d53fa"
            // React 18 types omit fetchPriority on <script>; still emit fetchpriority="high".
            {...({ fetchPriority: 'high' } as object)}
          />
          <div id="container-c71ffef6cae1bbba7021402cdd6d53fa" />
        </div>
        <SiteFooter />
        {/* Adsterra Social Bar — DTS unit only; one per page, end of <body>. */}
        <script
          data-cfasync="false"
          src="https://bauval.org/14/ef25d88f8a3fe9c5b1d0893dbdd6cc56"
        />
      </body>
    </html>
  );
}
