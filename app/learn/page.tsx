import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { Related } from '@/components/Related';
import { articleJsonLd, withPageOg } from '@/lib/seo';

const DESCRIPTION =
  'Day trading guides that start on paper: what day trading is, how to start, and a beginner roadmap. No signals or profit promises. Not financial advice.';

export const metadata: Metadata = withPageOg({
  title: { absolute: 'Day Trading Guides for Beginners' },
  description: DESCRIPTION,
  alternates: { canonical: '/learn/' },
  openGraph: {
    images: [
      {
        url: '/og/learn.svg',
        width: 1200,
        height: 630,
        alt: 'Day trading guides for beginners — a paper-first reading order from DayTraderSkill.com',
      },
    ],
  },
  twitter: {
    images: ['/og/learn.svg'],
  },
});

const faqs = [
  {
    q: 'What order should I read these day trading guides?',
    a: 'A useful default is the definition first, then the beginner pillar, then the how-to-start roadmap. If you already know the definition, skip ahead. The child pages are the full guides; this hub only explains what each one is for.',
  },
  {
    q: 'Do these guides tell me what to buy or sell?',
    a: 'No. They do not provide signals, stock picks, entries, or profit targets. They explain mechanics, costs, risk, and a paper-first practice sequence. Nothing here is a recommendation to trade.',
  },
  {
    q: 'How is this hub different from the beginner guide?',
    a: 'This page is the directory. Day trading for beginners is the long starter pillar covering skills, costs, and common mistakes. Use the hub to choose a path; open the child page when you want the full lesson.',
  },
  {
    q: 'Do I need a brokerage account to start?',
    a: 'Not to study these lessons. The path this site teaches begins with vocabulary and paper practice. Broker and account rules vary by firm and jurisdiction, and this site does not tell you which account to open.',
  },
  {
    q: 'Is paper trading the same as being ready to trade live?',
    a: 'No. A simulator can teach process and record-keeping, but it cannot fully reproduce fills, emotions, or account rules. A green paper day can still contain a weak process. This site does not set a date when someone should go live.',
  },
  {
    q: 'Are these day trading guides financial advice?',
    a: 'No. They are educational. The SEC’s 2005 investor bulletin warns that many traders suffer severe losses in their first months. You alone decide whether to practice, install software, or use a broker.',
  },
];

export default function LearnHubPage() {
  return (
    <div className="hub-page">
      <JsonLd
        data={[
          articleJsonLd({
            headline: 'Day Trading Guides for Beginners',
            description: DESCRIPTION,
            path: '/learn/',
            datePublished: '2026-11-05',
            dateModified: '2026-11-26',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'CollectionPage',
            name: 'Day Trading Guides for Beginners',
            description: DESCRIPTION,
            url: 'https://daytraderskill.com/learn/',
            hasPart: [
              {
                '@type': 'WebPage',
                name: 'What is day trading?',
                url: 'https://daytraderskill.com/learn/what-is-day-trading/',
              },
              {
                '@type': 'WebPage',
                name: 'Day trading for beginners',
                url: 'https://daytraderskill.com/learn/day-trading-for-beginners/',
              },
              {
                '@type': 'WebPage',
                name: 'How to start day trading',
                url: 'https://daytraderskill.com/learn/how-to-start-day-trading/',
              },
            ],
          },
          faqJsonLd(faqs),
        ]}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Learn
      </nav>

      <header className="hub-intro">
        <p className="eyebrow">Learn</p>
        <h1>Day trading guides that start before the first trade</h1>
        <p className="lead">
          Start with the definition, then the beginner guide, then the how-to-start roadmap — or
          skip to the one you need. The full lessons are on the cards below; this page is just
          the map. No signals or stock picks.
        </p>
        <p className="compliance-note">
          <strong>Not financial advice.</strong> The SEC’s{' '}
          <a href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html" rel="noopener noreferrer" target="_blank">
            2005 day-trading bulletin
          </a>{' '}
          warns that many traders suffer severe losses in their first months. These lessons are
          educational and do not tell you what to trade.
        </p>
      </header>

      <figure className="page-visual">
        <img
          src="/illustrations/learn-guides.svg"
          alt="Reading order for the three day trading guides: the definition, the beginner pillar, and the how-to-start roadmap."
          width={720}
          height={320}
          loading="lazy"
        />
        <figcaption>
          Use this hub to choose a starting point. Each card links to a full guide; this page is
          only the map.
        </figcaption>
      </figure>

      <section aria-labelledby="lessons-heading">
        <div className="section-head">
          <h2 id="lessons-heading">Start with these three day trading guides</h2>
          <p>Read them in order, or jump to the question you need answered today.</p>
        </div>

        <div className="index-grid">
          <article className="index-card">
            <p className="card-kicker">Guide 01</p>
            <h2>
              <Link href="/learn/what-is-day-trading/">What is day trading?</Link>
            </h2>
            <p>
              The definition page. Open it when you need a plain-English meaning of an intraday
              trade, and a clear boundary between day trading, swing trading, and investing. It is
              the vocabulary lesson, not the full beginner curriculum and not a how-to sequence.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/learn/what-is-day-trading/">Read the definition →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <p className="card-kicker">Guide 02</p>
            <h2>
              <Link href="/learn/day-trading-for-beginners/">Day trading for beginners</Link>
            </h2>
            <p>
              The starter pillar. Open it when you want the broader picture: the skills to build,
              real costs, common beginner mistakes, and what to study before risking capital. It is
              longer than the definition and more thematic than the step-by-step roadmap.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/learn/day-trading-for-beginners/">Read the beginner guide →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <p className="card-kicker">Guide 03</p>
            <h2>
              <Link href="/learn/how-to-start-day-trading/">How to start day trading</Link>
            </h2>
            <p>
              The roadmap. Open it when you want a numbered sequence: learn the mechanics, choose
              one market and session, open a paper account, write rules, journal, and review. It
              tells you in what order to practice; it does not replace the definition or the pillar.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/learn/how-to-start-day-trading/">Follow the roadmap →</Link>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section aria-labelledby="hub-heading">
        <h2 id="hub-heading">What this directory is for</h2>
        <p>
          A learning hub should make the next click obvious. These day trading guides are split so
          each child page owns one job: a definition, a beginner pillar, or a starting sequence.
          This directory exists to point you to the right job and to keep the lessons from blending
          into one undifferentiated article. If you need the full argument, leave this page and
          open the guide that matches the question.
        </p>
        <p>
          The hub also sets expectations before you read. The tone is educational and paper-first.
          You will see risk language early, including a link to the SEC’s 2005 bulletin, because
          beginners are often sold speed and certainty. You will not find a paid signal list or a
          claim that a particular routine produces a return. If a later page on this site discusses
          software, that is a separate tools path, not a hidden fourth lesson in this series.
        </p>
        <p>
          Read at the depth you need. Some people only want the definition and then stop. Some want
          the pillar once, then keep the roadmap as a checklist beside a paper journal. Returning
          readers can skip the cards they already finished. The value of a directory is that you do
          not have to reread everything to find the one page that answers today’s question.
        </p>
      </section>

      <section aria-labelledby="order-heading">
        <h2 id="order-heading">A reading order that does not swallow the child pages</h2>
        <p>
          If you are new to the subject, start with{' '}
          <Link href="/learn/what-is-day-trading/">what day trading is</Link>. That page exists to
          settle the holding-period definition and the contrast with other approaches. Once the
          words are clear, move to{' '}
          <Link href="/learn/day-trading-for-beginners/">day trading for beginners</Link> for
          skills, costs, and mistakes. When you are ready to rehearse a process, use{' '}
          <Link href="/learn/how-to-start-day-trading/">how to start day trading</Link> as the
          checklist. This hub will not copy those lessons here; repeating them would compete with
          the pages written to answer each question in full.
        </p>
        <p>
          You can also enter through a single question. “What does the term mean?” belongs on the
          definition page. “What should a beginner actually study, and which costs get ignored?”
          belongs on the pillar. “What do I do first, second, and third?” belongs on the roadmap.
          If two pages seem to overlap, use the narrower one for that question and leave the other
          closed.
        </p>
        <p>
          After the three guides, the natural next stop is not a live account. It is{' '}
          <Link href="/paper-trading/">what paper trading is</Link> and the{' '}
          <Link href="/safety/">safety and risk checklist</Link>. Those pages are linked at the
          bottom so this learning hub stays a map of lessons, not a trading desk.
        </p>
      </section>

      <section className="split-panel" aria-labelledby="approach-heading">
        <div>
          <p className="eyebrow">How to use this hub</p>
          <h2 id="approach-heading">Learn the mechanics before the tactics</h2>
          <p>
            Order types, bid-ask spreads, liquidity, fees, and position sizing are not advanced
            topics. They are the cost of doing business. A beginner who understands them is harder
            to sell a fantasy.
          </p>
          <p>
            Then rehearse in a simulator. Use the same written checklist every session and review
            the decisions you made, not only the outcome. A green paper day can still contain a bad
            process.
          </p>
          <p>
            Software can help you keep that checklist consistent, but it is optional at this stage.
            If you later look at Claude commands or calculators, start from the{' '}
            <Link href="/tools/">tools hub</Link> and keep paper as the default. The learning pages
            do not depend on installing anything.
          </p>
        </div>
        <div>
          <ul className="checklist">
            <li>Define the instrument and session you are studying.</li>
            <li>Learn the order types you will actually use.</li>
            <li>Write a risk rule before you write an entry rule.</li>
            <li>Practice on paper until the workflow is familiar.</li>
            <li>Keep a journal and review it on a schedule.</li>
          </ul>
          <div className="callout">
            <p>
              Ready to rehearse? Continue to{' '}
              <Link href="/paper-trading/">what paper trading is and how to start</Link>.
            </p>
          </div>
        </div>
      </section>

      <section aria-labelledby="scope-heading">
        <h2 id="scope-heading">What these day trading guides will not do</h2>
        <p>
          This site publishes education, not a signal service. The guides will not name a stock to
          buy, a time to enter, a profit target, or an expected return. They will not rank brokers,
          promise that paper results will transfer to a live account, or tell you that a particular
          account size makes day trading safe.
        </p>
        <p>
          They also will not replace a regulator, a licensed adviser, or the current rules at your
          broker. Account minimums, pattern-day-trader style policies, and margin terms change and
          vary. When a lesson mentions a rule, treat it as context to verify, not as a personal
          clearance to trade.
        </p>
        <p>
          If you want practice tools after the lessons, use the paper-trading page and the
          calculators from the tools hub. If you want an independent setup summary for a third-party
          Claude pack, that lives under <Link href="/install/">install</Link> and{' '}
          <Link href="/skills/">the module index</Link> — those are software guides, not extra
          chapters of the learning path.
        </p>
      </section>

      <section aria-labelledby="why-paper-heading">
        <h2 id="why-paper-heading">Why the path stays on paper</h2>
        <p>
          Intraday trading compresses decisions into a short window. Costs that look small on a
          long-term chart — the spread, fees, slippage, and the habit of overtrading — show up
          quickly when positions are opened and closed in the same session. Paper practice is how
          this site lets you see those frictions without putting capital at stake.
        </p>
        <p>
          Paper is also an honesty check. If a session was “green” only because you ignored a stop,
          resized after a loss, or traded a setup you had not defined in writing, the journal should
          say so. The roadmap asks you to review the process, not to collect a simulated streak.
        </p>
        <p>
          None of that makes paper a guarantee. A simulator can understate emotion, miss real-world
          fills, and hide broker-specific rules. The point of starting here is to learn the language
          and the workflow first. Whether anyone later uses a live account is a separate decision
          this site will not make for you.
        </p>
      </section>

      <h2>Frequently asked questions</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          {
            href: '/paper-trading/',
            label: 'What is paper trading?',
            description: 'Definition, limits, and a first practice session.',
          },
          {
            href: '/safety/',
            label: 'Safety and risk checklist',
            description: 'Hard rules for paper defaults and approval gates.',
          },
          {
            href: '/tools/',
            label: 'Tools hub',
            description: 'Simulators, Claude skills, and comparison guides.',
          },
        ]}
      />
    </div>
  );
}
