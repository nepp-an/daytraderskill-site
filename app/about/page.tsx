import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { BRAND, UPSTREAM_REPO, UPSTREAM_LICENSE } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'About This Independent Day Trader Guide' },
  description:
    'DayTraderSkill.com is an independent English tutorial site about the open-source Claude Day Trader Skill pack. Not official. Not financial advice. MIT upstream on GitHub.',
  alternates: { canonical: '/about/' },
};

export default function AboutPage() {
  return (
    <>
      <h1>About {BRAND}</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> We publish install, safety, troubleshooting, and comparison pages for
        the open-source Claude Day Trader Skill pack. We are <strong>not</strong> the official
        project, not a broker, and not an advisory firm.
      </div>
      <h2>Independence</h2>
      <p>
        Upstream project (MIT):{' '}
        <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          {UPSTREAM_REPO}
        </a>{' '}
        — license {UPSTREAM_LICENSE}. This website rewrites concepts for learners; it is not a
        mirror of the README and not endorsed by the upstream authors unless they say so themselves.
      </p>
      <h2>Editorial standards</h2>
      <ul>
        <li>Fixed Not financial advice framing sitewide.</li>
        <li>Paper trading default; no profit promises; no trade-on-your-behalf offers.</li>
        <li>Prefer differentiation via troubleshoot matrices, safety checklists, and honest VS tables.</li>
        <li>Call out upstream freshness risk when pushes look stalled.</li>
      </ul>
      <p className="article-meta">
        <span>DayTraderSkill editorial team</span>
        <span>AI-assisted, human-reviewed</span>
        <span>Reviewed 10 November 2026</span>
      </p>
      <p>
        Pages are drafted with AI assistance and reviewed by the site editorial team against primary
        sources before publication. We do not publish invented author names, personal biographies, or
        financial credentials. Read the full{' '}
        <Link href="/editorial-policy/">editorial policy</Link> for our independence, sourcing,
        dating, advertising, and affiliate rules.
      </p>
      <h2>Contact / privacy</h2>
      <p>
        See <Link href="/contact/">Contact</Link> for corrections and site feedback, and{' '}
        <Link href="/privacy/">Privacy</Link> for how this static site handles data. We do not offer
        user accounts.
      </p>
      <Related
        links={[
          { href: '/', label: 'Home' },
          { href: '/editorial-policy/', label: 'Editorial policy' },
          { href: '/contact/', label: 'Contact' },
          { href: '/privacy/', label: 'Privacy' },
          { href: '/changelog-watch/', label: 'Changelog watch' },
        ]}
      />
    </>
  );
}
