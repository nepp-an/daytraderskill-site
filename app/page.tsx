import type { Metadata } from 'next';
import Link from 'next/link';
import { UPSTREAM_REPO } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Day Trading Guide & Paper-First Practice Hub' },
  description:
    'A paper-first day trading guide for beginners: learn the basics, practice in a simulator, study risk, and explore AI and agent tools. Not financial advice.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Day Trading Guide & Paper-First Practice Hub',
    description:
      'Learn day trading, practice on paper, understand risk, and choose tools carefully. An independent, paper-first education hub. Not financial advice.',
    url: '/',
  },
};

export default function HomePage() {
  return (
    <div className="hub-page">
      <section className="hero" aria-labelledby="hero-heading">
        <p className="eyebrow">Independent · Paper-first · Not financial advice</p>
        <h1 id="hero-heading">
          Learn day trading on paper. <span className="accent">Build skill before risk.</span>
        </h1>
        <p className="hero-lead">
          DayTraderSkill is a plain-English learning and tools hub for retail day traders. Start with
          market mechanics, rehearse a repeatable process in a simulator, and treat AI trading tools
          as software that still needs a human decision — never as a signal service.
        </p>

        <div className="cta-row">
          <Link className="btn primary" href="/learn/day-trading-for-beginners/">
            Start with the basics
          </Link>
          <Link className="btn" href="/paper-trading/">
            What is paper trading?
          </Link>
          <Link className="btn ghost" href="/tools/">
            Browse tools
          </Link>
        </div>

        <ul className="hero-points">
          <li>No trade ideas or profit promises</li>
          <li>Paper trading is the default</li>
          <li>AI order tools need approval</li>
        </ul>

        <p className="compliance-note">
          <strong>Risk note.</strong> Most people who day trade lose money. This site explains the
          workflow and the software; it does not tell you what to buy, sell, or hold.
        </p>
      </section>

      <section className="hub-section" aria-labelledby="paths-heading">
        <div className="section-head">
          <p className="eyebrow">Start here</p>
          <h2 id="paths-heading">Four paths through the hub</h2>
          <p>
            Learn the vocabulary, practice the workflow, understand the downside, and only then look
            at tools. That order matters more than any indicator.
          </p>
        </div>

        <div className="hub-grid">
          <article className="hub-card learn">
            <p className="card-kicker">01 · Learn</p>
            <h3>Learn the language</h3>
            <p>
              What day trading is, how orders and spreads work, and what a beginner should study
              before opening a live account.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/learn/day-trading-for-beginners/">Day trading for beginners</Link>
              </li>
              <li>
                <Link href="/learn/what-is-day-trading/">What is day trading?</Link>
              </li>
              <li>
                <Link href="/learn/how-to-start-day-trading/">How to start day trading</Link>
              </li>
            </ul>
          </article>

          <article className="hub-card practice">
            <p className="card-kicker">02 · Practice</p>
            <h3>Practice on paper</h3>
            <p>
              Use simulated orders to learn the platform, test your rules, and make cheap mistakes
              before real capital is involved.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/paper-trading/">What is paper trading?</Link>
              </li>
              <li>
                <Link href="/safety/">Build a safety checklist</Link>
              </li>
              <li>
                <Link href="/faq/">Read the common questions</Link>
              </li>
            </ul>
          </article>

          <article className="hub-card risk">
            <p className="card-kicker">03 · Risk</p>
            <h3>Put risk first</h3>
            <p>
              Position size, stop placement, slippage, and the possibility of being wrong belong in
              the plan before the entry.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/safety/#risk">Risk basics and hard rules</Link>
              </li>
              <li>
                <Link href="/safety/">Paper-first safety posture</Link>
              </li>
              <li>
                <Link href="/paper-trading/#limits">What paper cannot teach</Link>
              </li>
            </ul>
          </article>

          <article className="hub-card tools">
            <p className="card-kicker">04 · Tools</p>
            <h3>Choose tools carefully</h3>
            <p>
              Simulators, scanners, Claude skills, and agent workflows are only as useful as the
              process around them. Verify the source before you install.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/tools/install-claude-skills/">How to install Claude skills</Link>
              </li>
              <li>
                <Link href="/tools/">Tools hub</Link>
              </li>
              <li>
                <Link href="/vs/">Compare tool packs</Link>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="hub-section" aria-labelledby="journey-heading">
        <div className="section-head">
          <p className="eyebrow">A sensible sequence</p>
          <h2 id="journey-heading">Learn → rehearse → review</h2>
          <p>
            A beginner does not need a live account on day one. This sequence keeps the feedback loop
            cheap and makes the decision to risk money a separate, deliberate step.
          </p>
        </div>

        <div className="journey-grid">
          <article className="journey-card">
            <h3>Understand the game</h3>
            <p>
              Learn what a day trade is, what a spread costs, and why speed and leverage change the
              difficulty. Start with the definition, not a strategy list.
            </p>
            <p>
              <Link href="/learn/what-is-day-trading/">Read the definition →</Link>
            </p>
          </article>
          <article className="journey-card">
            <h3>Rehearse the process</h3>
            <p>
              Run the same checklist on a simulator: idea, entry, exit, size, risk check, ticket,
              journal. Repeat until the workflow is boring.
            </p>
            <p>
              <Link href="/paper-trading/">Open the paper trading guide →</Link>
            </p>
          </article>
          <article className="journey-card">
            <h3>Review before scaling</h3>
            <p>
              Journal the decisions, not just the result. If the process is unclear on paper, adding
              live money will make it harder, not easier.
            </p>
            <p>
              <Link href="/learn/how-to-start-day-trading/">Follow the start roadmap →</Link>
            </p>
          </article>
        </div>
      </section>

      <section className="split-panel" aria-labelledby="practice-heading">
        <div>
          <p className="eyebrow">Practice first</p>
          <h2 id="practice-heading">Paper trading is a rehearsal, not a scoreboard.</h2>
          <p>
            A simulator lets you learn order types, platform quirks, and your own habits without
            risking real money. It is useful precisely because mistakes are cheap. It is not proof
            that a strategy will work live.
          </p>
          <p>
            Use paper mode to test whether you can follow a written process, not to chase a streak.
            When simulated fills look easy, check the spread, liquidity, and assumptions behind them.
          </p>
          <div className="cta-row">
            <Link className="btn primary" href="/paper-trading/">
              How paper trading works
            </Link>
            <Link className="btn" href="/learn/day-trading-for-beginners/">
              Beginner roadmap
            </Link>
          </div>
        </div>
        <div>
          <ul className="checklist">
            <li>Write the entry, exit, and invalidation before the session.</li>
            <li>Size the position so one mistake is survivable.</li>
            <li>Log the reason for every simulated order.</li>
            <li>Review the journal weekly, not after every tick.</li>
            <li>Keep AI order tools on Needs approval.</li>
          </ul>
          <div className="callout warn">
            <p>
              <strong>Paper is not live.</strong> Fills, slippage, halts, and the feeling of losing
              real money can all differ. Do not treat a good paper week as a guarantee.
            </p>
          </div>
        </div>
      </section>

      <section className="featured-tool" aria-labelledby="featured-heading">
        <div>
          <span className="featured-badge">Featured tool · Third party</span>
          <h2 id="featured-heading">Day Trader Skill (Claude skills pack)</h2>
          <p>
            An open-source pack of Claude skills and Python helpers for scanning, planning,
            simulating, sizing, and risk-checking a trade workflow. It is one tool in the Tools
            section — not the definition of this site. The upstream project keeps paper trading as
            the default and expects a human confirmation before an order path.
          </p>
          <div className="cta-row">
            <Link className="btn" href="/install/">
              Read the install guide
            </Link>
            <Link className="btn ghost" href="/skills/">
              See the 11 modules
            </Link>
            <a
              className="btn ghost"
              href={UPSTREAM_REPO}
              rel="noopener noreferrer"
              target="_blank"
            >
              Canonical GitHub
            </a>
          </div>
          <p className="muted">
            Independent guide. This is <strong>not the official project site</strong> and we are not
            affiliated with its authors. Verify the repository and read the code before installing.
          </p>
        </div>
        <aside className="featured-note" aria-label="Day Trader Skill quick facts">
          <h3>Quick facts</h3>
          <ul>
            <li>Third-party, MIT-licensed GitHub project.</li>
            <li>Paper trading default; no profit promise.</li>
            <li>Broker actions require explicit approval.</li>
            <li>Public data can lag or fail; verify elsewhere.</li>
          </ul>
        </aside>
      </section>

      <section className="compliance-strip" aria-label="Editorial policy">
        <p>
          <strong>What this hub will not do:</strong> sell signals, promise returns, rank stocks, or
          trade on your behalf. Day trading is risky; most people who try it lose money.
        </p>
        <Link className="btn small ghost" href="/safety/">
          Read the safety policy
        </Link>
      </section>
    </div>
  );
}
