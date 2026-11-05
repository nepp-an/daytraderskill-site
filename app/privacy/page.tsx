import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { BRAND, SITE_ORIGIN } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy policy for DayTraderSkill.com: no accounts on this static guide; outbound links to GitHub and third parties; Google AdSense Auto ads disclosure. Not financial advice.',
  alternates: { canonical: '/privacy/' },
};

export default function PrivacyPage() {
  return (
    <>
      <h1>Privacy policy</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> {BRAND} ({SITE_ORIGIN}) is a static information site. We do not
        operate user accounts or ask you to paste brokerage secrets here. Third-party destinations
        (GitHub, Claude, brokers you choose) have their own policies.
      </div>
      <h2>What this site is</h2>
      <p>
        A statically exported Next.js guide hosted for educational pages about open-source Claude
        skills. Pages may be crawled by search engines as allowed in robots.txt.
      </p>
      <h2>Accounts &amp; secrets</h2>
      <p>
        We do not provide logins on this site. Never submit API keys, account passwords, or one-time
        codes into forms on third-party pages you do not trust. Skill tutorials describe environment
        variables on <em>your</em> machine — not uploads to us.
      </p>
      <h2>Outbound links</h2>
      <p>
        We link to GitHub repositories, documentation, and occasionally other guides. Those sites
        may set cookies or collect analytics under their own terms. Review them before signing in.
      </p>
      <h2>Advertising / AdSense</h2>
      <p>
        We have enabled Google AdSense (publisher <code className="inline">ca-pub-3175943774981621</code>)
        on this site. Auto ads may place ads on pages; there are no manual ad slots. Google and its
        partners may use cookies or similar technologies to serve ads based on prior visits to this
        and other sites. See{' '}
        <a href="https://policies.google.com/technologies/ads" rel="noopener noreferrer">
          Google advertising policies
        </a>
        . Our <code className="inline">ads.txt</code> lists{' '}
        <code className="inline">google.com, pub-3175943774981621, DIRECT, f08c47fec0942fa0</code>.
        We do not ask you to disable security tools for “exclusive signals.”
      </p>
      <h2>Not financial advice</h2>
      <p>
        Privacy language does not change the compliance posture: this is not financial advice; paper
        trading is the default theme of our tutorials; we do not trade on your behalf.
      </p>
      <h2>Changes</h2>
      <p>
        We may update this page as hosting or measurement tooling changes. Continued use of the site
        after updates means you review the latest text here.
      </p>
      <h2>Contact</h2>
      <p>
        Questions about this policy or the site: see <Link href="/contact/">Contact</Link>.
      </p>
      <Related
        links={[
          { href: '/about/', label: 'About' },
          { href: '/contact/', label: 'Contact' },
          { href: '/safety/', label: 'Safety' },
          { href: '/', label: 'Home' },
        ]}
      />
    </>
  );
}
