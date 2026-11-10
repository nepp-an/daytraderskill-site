import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd, type FaqItem } from '@/components/Faq';
import { Related } from '@/components/Related';
import { BRAND, CONTACT_EMAIL, SITE_ORIGIN, UPSTREAM_REPO } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact & Corrections',
  description:
    'Contact DayTraderSkill.com for corrections, privacy questions, or site feedback. Independent paper-first education guide — not a broker, not financial advice, not the official Day Trader Skill project.',
  alternates: { canonical: '/contact/' },
};

const FAQ: FaqItem[] = [
  {
    q: 'How fast do you reply?',
    a: 'We aim to reply within a few business days. Privacy and data requests are prioritized. Broker, Claude, or upstream project support must go to those vendors.',
  },
  {
    q: 'Can you send me trading signals, installers, or trade for me?',
    a: "No. This site does not sell signals, host installers, or trade on anyone's behalf. Use official GitHub for the upstream skill pack, and your own broker for any real or paper account actions.",
  },
  {
    q: 'I found a factual error on a guide — what should I do?',
    a: `Email ${CONTACT_EMAIL} with the page URL and the correction. For bugs in the upstream Day Trader Skill software itself, prefer opening an Issue on the official GitHub repository.`,
  },
];

export default function ContactPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd(FAQ)) }}
      />
      <h1>Contact</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> Reach {BRAND} by email for corrections, privacy questions, and site
        feedback. We are an independent publisher — <strong>not</strong> a broker, not an advisory
        firm, and not the official Day Trader Skill project.
      </div>
      <p>
        <small>
          Last updated: <time dateTime="2026-11-06">6 November 2026</time>
        </small>
      </p>

      <h2>What to write about</h2>
      <ul>
        <li>Feedback about this site ({SITE_ORIGIN}).</li>
        <li>Corrections to steps, definitions, or citations published here.</li>
        <li>Privacy questions about {BRAND}.</li>
        <li>Partnership notes that fit our paper-first educational posture.</li>
      </ul>

      <h2>What not to send</h2>
      <ul>
        <li>Do not send passwords, API keys, brokerage credentials, or payment details.</li>
        <li>We do not buy or sell accounts, signals, or “guaranteed” strategies.</li>
        <li>
          We cannot recover broker, Claude, or GitHub accounts, and we do not process trades or
          payments on your behalf.
        </li>
        <li>
          Official Day Trader Skill product bugs belong on the upstream GitHub Issues — not as a
          request for us to ship patches or binaries.
        </li>
        <li>We do not email installers, mirror packages, or any cracked builds.</li>
      </ul>

      <h2>Email</h2>
      <p>
        <strong>Corrections, privacy &amp; site feedback:</strong>{' '}
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </p>
      <p>
        Include the page URL for factual fixes. For partnerships, say what you need in one short
        paragraph. Messages reach the site operator (same privacy@ pattern used across our other
        independent guides).
      </p>

      <h2>Corrections workflow</h2>
      <ol>
        <li>Email us the URL and the wrong/right fact.</li>
        <li>
          If the bug is in the upstream skill software itself, also open or cite an Issue on{' '}
          <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
            the official repository
          </a>
          .
        </li>
        <li>We update the guide when we can verify the change against official sources.</li>
      </ol>

      <h2>FAQ</h2>
      <FaqList items={FAQ} />

      <Related
        links={[
          { href: '/about/', label: 'About', description: 'Who publishes this independent guide.' },
          {
            href: '/privacy/',
            label: 'Privacy',
            description: 'Accounts, outbound links, and AdSense disclosure.',
          },
          {
            href: '/safety/',
            label: 'Safety checklist',
            description: 'Paper-first defaults and Needs approval posture.',
          },
        ]}
      />
      <p>
        <Link href="/about/">About</Link>
        {' · '}
        <Link href="/privacy/">Privacy</Link>
        {' · '}
        <Link href="/">Home</Link>
      </p>
    </>
  );
}
