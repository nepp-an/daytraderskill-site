import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';

export const metadata: Metadata = {
  title: { absolute: 'Day Trading Learning Guides for Beginners' },
  description:
    'Paper-first day trading lessons: what day trading is, how to start, and a beginner roadmap. Plain-English explanations without signals or profit promises. Not financial advice.',
  alternates: { canonical: '/learn/' },
};

export default function LearnHubPage() {
  return (
    <div className="hub-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Learn
      </nav>

      <header className="hub-intro">
        <p className="eyebrow">Learn</p>
        <h1>Day trading lessons that start before the first trade</h1>
        <p className="lead">
          Build the vocabulary first: what a day trade is, how costs and risk work, and how to
          practice a repeatable process without putting money at stake. No signals, no stock picks,
          no promises.
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

      <section aria-labelledby="lessons-heading">
        <div className="section-head">
          <h2 id="lessons-heading">Start with these three guides</h2>
          <p>Read them in order, or jump to the question you need answered today.</p>
        </div>

        <div className="index-grid">
          <article className="index-card">
            <p className="card-kicker">Guide 01</p>
            <h2>
              <Link href="/learn/day-trading-for-beginners/">Day trading for beginners</Link>
            </h2>
            <p>
              The starter pillar: the skills to build, a paper-first sequence, real costs, common
              beginner mistakes, and what to learn before risking capital.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/learn/day-trading-for-beginners/">Read the beginner guide →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <p className="card-kicker">Guide 02</p>
            <h2>
              <Link href="/learn/what-is-day-trading/">What is day trading?</Link>
            </h2>
            <p>
              A short, authoritative definition, how an intraday trade works, and the boundary
              between day trading, swing trading, and investing.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/learn/what-is-day-trading/">Read the definition →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <p className="card-kicker">Guide 03</p>
            <h2>
              <Link href="/learn/how-to-start-day-trading/">How to start day trading</Link>
            </h2>
            <p>
              A step-by-step roadmap: learn the mechanics, choose one market, open a paper account,
              write rules, journal, and review before any live decision.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/learn/how-to-start-day-trading/">Follow the roadmap →</Link>
              </li>
            </ul>
          </article>
        </div>
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
