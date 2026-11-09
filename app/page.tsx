import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { NextPath } from '@/components/NextPath';
import { Related } from '@/components/Related';
import {
  BookIcon,
  CalculatorIcon,
  JournalIcon,
  PaperIcon,
  ScaleIcon,
  ShieldIcon,
  SparkIcon,
  ToolsIcon,
} from '@/components/icons';
import { BRAND, SITE_ORIGIN, UPSTREAM_REPO } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Day Trader Skill — Paper-First Day Trading Guide & Practice Hub' },
  description:
    'A paper-first day trading guide for beginners: learn the basics, practice in a simulator, study risk, and use free position-size and risk-reward calculators. Not financial advice.',
  alternates: { canonical: '/' },
  openGraph: {
    title: 'Day Trader Skill — Paper-First Day Trading Guide & Practice Hub',
    description:
      'Learn day trading, practice on paper, understand risk, and choose tools carefully. An independent, paper-first education hub. Not financial advice.',
    url: '/',
    images: [
      {
        url: '/og/home.svg',
        width: 1200,
        height: 630,
        alt: 'DayTraderSkill.com — learn on paper, build skill before risk',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day Trader Skill — Paper-First Day Trading Guide & Practice Hub',
    description: 'Learn day trading, practise on paper, and put risk before tools.',
    images: ['/og/home.svg'],
  },
};

const faqs = [
  {
    q: 'What is a day trading guide?',
    a: 'A useful day trading guide explains the mechanics of intraday trading, the costs involved, and the risk controls a beginner needs. It should help you understand order types, spreads, position sizing, and record-keeping — not tell you which stock to buy. This guide treats paper trading as the default place to learn the workflow.',
  },
  {
    q: 'Do I need a live account to learn day trading?',
    a: 'No. You can learn market mechanics, platform navigation, and checklist discipline in a simulator. A live account adds real financial risk and should be a separate decision, not a graduation requirement. This site does not tell you to trade live.',
  },
  {
    q: 'What should a beginner learn first?',
    a: 'Start with the definition of a day trade, then order types, bid-ask spreads, liquidity, and slippage. After that, write a one-page process and rehearse it on paper. Indicators and AI tools make more sense once you can explain the workflow they are meant to support.',
  },
  {
    q: 'Do the position-size and risk-reward calculators place trades?',
    a: 'No. Both calculators run entirely in your browser and are arithmetic aids for a paper-first plan. They have no broker connection, no login, no market data feed, and no order path. They do not recommend a trade or promise an outcome.',
  },
  {
    q: 'Is this day trading guide financial advice?',
    a: 'No. DayTraderSkill.com is an independent education site. It does not provide investment advice, stock picks, signals, or trade execution. Most people who day trade lose money. Speak to a licensed professional in your jurisdiction if you need personal financial advice.',
  },
  {
    q: 'How does AI fit into a paper-first workflow?',
    a: 'AI tools can help draft a plan, organise notes, or check a checklist, but they can also be wrong or act on stale data. Keep the account on paper, keep any order-capable tool on Needs approval, and require a human to verify the inputs and read the ticket before anything is submitted.',
  },
];

export default function HomePage() {
  return (
    <div className="hub-page">
      <JsonLd
        data={[
          {
            '@context': 'https://schema.org',
            '@type': 'WebSite',
            name: BRAND,
            url: SITE_ORIGIN,
            description:
              'An independent, paper-first day trading guide and tools hub for beginners. Not financial advice.',
            inLanguage: 'en',
            publisher: {
              '@type': 'Organization',
              name: BRAND,
              url: SITE_ORIGIN,
            },
          },
          faqJsonLd(faqs),
        ]}
      />

      <section className="hero" aria-labelledby="hero-heading">
        <div className="hero-grid">
          <div>
            <p className="eyebrow">Independent · Paper-first · Not financial advice</p>
            <h1 id="hero-heading">
              Day trading guide: <span className="accent">build skill on paper before real risk.</span>
            </h1>
            <p className="hero-lead">
              DayTraderSkill is a plain-English learning and tools hub for retail day traders. Start
              with market mechanics, rehearse a repeatable process in a simulator, and treat AI
              trading tools as software that still needs a human decision — never as a signal
              service.
            </p>

            <div className="cta-row">
              <Link className="btn primary" href="/learn/day-trading-for-beginners/">
                Start with the basics
              </Link>
              <Link className="btn" href="/paper-trading/">
                What is paper trading?
              </Link>
              <Link className="btn ghost" href="/tools/position-size-calculator/">
                Size a practice trade
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
          </div>

          <figure className="hero-visual">
            <img
              src="/illustrations/home-hero.svg"
              alt="Diagram of the paper-first loop: learn the mechanics, rehearse with simulated orders, then review the journal."
              width={640}
              height={420}
            />
            <figcaption>
              The loop this guide teaches: learn the mechanics, rehearse the workflow, review the
              decisions. No market connection.
            </figcaption>
          </figure>
        </div>
      </section>

      <section className="hub-section" aria-labelledby="guide-coverage-heading">
        <div className="section-head">
          <p className="eyebrow">How to use this page</p>
          <h2 id="guide-coverage-heading">What this day trading guide covers</h2>
          <p>
            This is a guide to the learning process, not a list of trades. It is written for a
            beginner who wants to understand the mechanics before deciding whether live trading is
            appropriate — or deciding that it is not.
          </p>
        </div>
        <div className="guide-prose">
          <p>
            A day trade is a position opened and closed within the same session. That simple
            definition hides a lot of work. You need to understand how orders are routed, what a
            bid-ask spread costs, why fills can differ from the price on screen, and how position
            size turns a stop distance into a real dollar risk. None of that requires a live account.
            All of it requires deliberate practice.
          </p>
          <p>
            The guide is organised around four paths: <strong>Learn</strong> the vocabulary,{' '}
            <strong>Paper</strong> the workflow, put <strong>Risk</strong> before the entry, and
            choose <strong>Tools</strong> only after the process makes sense. The order is
            deliberate. A calculator cannot fix an unclear plan, and a faster data feed cannot supply
            discipline. The tools on this site are built to support the sequence, not to replace it.
          </p>
          <p>
            You will also find two free calculators: one for position size and one for risk-reward.
            They are plain arithmetic, they run in your browser, and they do not connect to a broker.
            Use them to test a paper plan, then write down what you learned. If a number looks
            surprising, that is a reason to study the assumption behind it, not a reason to place a
            trade.
          </p>
          <ul className="guide-toc" aria-label="Guide sections">
            <li>
              <Link href="#paths">Four learning paths</Link>
            </li>
            <li>
              <Link href="#journey">The learn → rehearse → review loop</Link>
            </li>
            <li>
              <Link href="#risk-first">Risk before the entry</Link>
            </li>
            <li>
              <Link href="#calculators">The two paper-first calculators</Link>
            </li>
            <li>
              <Link href="#faq">Day trading questions</Link>
            </li>
          </ul>
        </div>
      </section>

      <section className="hub-section" id="paths" aria-labelledby="paths-heading">
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
            <span className="card-icon" aria-hidden="true">
              <BookIcon size={26} />
            </span>
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
            <span className="card-icon" aria-hidden="true">
              <PaperIcon size={26} />
            </span>
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
                <Link href="/paper-trading/#paper-journal">First-session checklist and journal</Link>
              </li>
              <li>
                <Link href="/safety/">Build a safety checklist</Link>
              </li>
            </ul>
          </article>

          <article className="hub-card risk">
            <span className="card-icon" aria-hidden="true">
              <ShieldIcon size={26} />
            </span>
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
                <Link href="/tools/position-size-calculator/">Position size calculator</Link>
              </li>
              <li>
                <Link href="/paper-trading/#limits">What paper cannot teach</Link>
              </li>
            </ul>
          </article>

          <article className="hub-card tools">
            <span className="card-icon" aria-hidden="true">
              <ToolsIcon size={26} />
            </span>
            <p className="card-kicker">04 · Tools</p>
            <h3>Choose tools carefully</h3>
            <p>
              Simulators, scanners, Claude skills, and agent workflows are only as useful as the
              process around them. Verify the source before you install.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/tools/">Tools hub</Link>
              </li>
              <li>
                <Link href="/tools/risk-reward-calculator/">Risk-reward calculator</Link>
              </li>
              <li>
                <Link href="/tools/install-claude-skills/">How to install Claude skills</Link>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="hub-section" id="journey" aria-labelledby="journey-heading">
        <div className="section-head">
          <p className="eyebrow">A sensible sequence</p>
          <h2 id="journey-heading">Learn → rehearse → review</h2>
          <p>
            A beginner does not need a live account on day one. This sequence keeps the feedback loop
            cheap and makes the decision to risk money a separate, deliberate step.
          </p>
        </div>

        <div className="journey-track" aria-label="Learning sequence: learn, rehearse, review">
          <span className="journey-track-step">
            <span className="journey-track-num">01</span>
            <BookIcon size={18} />
            <span className="journey-track-copy">
              <strong>Learn</strong>
              <small>Mechanics and costs</small>
            </span>
          </span>
          <span className="journey-track-arrow" aria-hidden="true">
            →
          </span>
          <span className="journey-track-step">
            <span className="journey-track-num">02</span>
            <PaperIcon size={18} />
            <span className="journey-track-copy">
              <strong>Rehearse</strong>
              <small>Same checklist, paper fills</small>
            </span>
          </span>
          <span className="journey-track-arrow" aria-hidden="true">
            →
          </span>
          <span className="journey-track-step">
            <span className="journey-track-num">03</span>
            <JournalIcon size={18} />
            <span className="journey-track-copy">
              <strong>Review</strong>
              <small>Journal the decisions</small>
            </span>
          </span>
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

      <section className="split-panel" id="risk-first" aria-labelledby="practice-heading">
        <div>
          <p className="eyebrow">Practice first</p>
          <h2 id="practice-heading">A day trading guide starts with the loss, not the entry.</h2>
          <p>
            A simulator lets you learn order types, platform quirks, and your own habits without
            risking real money. It is useful precisely because mistakes are cheap. It is not proof
            that a strategy will work live.
          </p>
          <p>
            Before you think about a target, define what happens if you are wrong: where the idea is
            invalidated, how many shares that implies, and what the total loss would be. If the
            answer is uncomfortable on paper, it will be worse with real money. The{' '}
            <Link href="/safety/#risk">risk basics</Link> and the{' '}
            <Link href="/tools/position-size-calculator/">position size calculator</Link> exist to
            make that arithmetic visible.
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

      <section className="hub-section" aria-labelledby="plan-heading">
        <div className="section-head">
          <p className="eyebrow">A study plan, not a target</p>
          <h2 id="plan-heading">Your first four weeks on paper</h2>
          <p>
            The goal is to produce evidence of a process: notes, checklists, and a journal you can
            review. It is not a return target, and there is no deadline for going live.
          </p>
        </div>
        <table className="data">
          <thead>
            <tr>
              <th>Week</th>
              <th>Focus</th>
              <th>Output to keep</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Definition, order types, spreads, liquidity, and risk vocabulary.</td>
              <td>A one-page glossary written in your own words.</td>
            </tr>
            <tr>
              <td>2</td>
              <td>One market, one session, and a platform tour in a simulator.</td>
              <td>A checklist for opening and closing a paper trade.</td>
            </tr>
            <tr>
              <td>3</td>
              <td>A one-page process with entry, invalidation, size, and a stop-trading rule.</td>
              <td>Three paper sessions using the same routine.</td>
            </tr>
            <tr>
              <td>4</td>
              <td>Review the journal and simplify. Change one variable at a time.</td>
              <td>A list of repeated mistakes and one question to test next.</td>
            </tr>
          </tbody>
        </table>
        <p>
          The <Link href="/learn/how-to-start-day-trading/">how to start day trading roadmap</Link>{' '}
          expands these steps, and the{' '}
          <Link href="/learn/day-trading-for-beginners/">beginner pillar</Link> explains the costs
          that are easy to miss.
        </p>
      </section>

      <section className="hub-section" id="calculators" aria-labelledby="calculators-heading">
        <div className="section-head">
          <p className="eyebrow">Free · browser-only · no login</p>
          <h2 id="calculators-heading">Two calculators for a paper-first plan</h2>
          <p>
            These are routing cards, not embedded calculators. Open the tool you need; both run
            locally, use no market data, and cannot place an order.
          </p>
        </div>
        <div className="tool-teaser-grid">
          <Link className="tool-teaser" href="/tools/position-size-calculator/">
            <span className="tool-teaser-icon" aria-hidden="true">
              <CalculatorIcon size={24} />
            </span>
            <h3>Position size calculator</h3>
            <p>
              Turn account size, risk percentage, entry, and stop distance into a suggested share
              count and position value.
            </p>
            <span className="tool-teaser-cta">Open the position size calculator →</span>
          </Link>
          <Link className="tool-teaser" href="/tools/risk-reward-calculator/">
            <span className="tool-teaser-icon" aria-hidden="true">
              <ScaleIcon size={24} />
            </span>
            <h3>Risk-reward calculator</h3>
            <p>
              Compare entry, stop, and target to see the R:R ratio and the potential profit or loss
              before costs.
            </p>
            <span className="tool-teaser-cta">Open the risk-reward calculator →</span>
          </Link>
        </div>
      </section>

      <section className="featured-tool" aria-labelledby="featured-heading">
        <div>
          <span className="featured-icon" aria-hidden="true">
            <SparkIcon size={26} />
          </span>
          <span className="featured-badge">Featured tool · Third party</span>
          <h2 id="featured-heading">A third-party tool, not the definition of this site</h2>
          <p>
            The Day Trader Skill pack is an open-source collection of Claude skills and Python
            helpers for scanning, planning, simulating, sizing, and risk-checking a trade workflow.
            It is one option in the Tools section. This guide remains about the learning process, not
            about one product.
          </p>
          <ul className="featured-points">
            <li>
              <strong>What it does:</strong> organises a workflow into small skills and helpers. It
              does not promise an edge or replace your judgment.
            </li>
            <li>
              <strong>Where the human gate sits:</strong> any broker-facing action should require
              explicit approval. Keep paper as the default and do not grant blanket permission.
            </li>
            <li>
              <strong>How to verify it:</strong> read the repository, check the licence and recent
              commits, and test in a sandbox before connecting anything that matters.
            </li>
          </ul>
          <div className="cta-row">
            <Link className="btn" href="/install/">
              Read the independent install guide
            </Link>
            <Link className="btn ghost" href="/skills/">
              See what each module does
            </Link>
            <a
              className="btn ghost"
              href={UPSTREAM_REPO}
              rel="noopener noreferrer"
              target="_blank"
            >
              Verify on GitHub
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

      <section className="hub-section" id="faq" aria-labelledby="faq-heading">
        <div className="section-head">
          <p className="eyebrow">Common questions</p>
          <h2 id="faq-heading">Day trading guide FAQ</h2>
          <p>
            Short answers to the questions beginners ask before they open a simulator. None of this
            is personal financial advice.
          </p>
        </div>
        <FaqList items={faqs} />
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

      <Related
        links={[
          {
            href: '/learn/day-trading-for-beginners/',
            label: 'Day trading for beginners',
            description: 'The pillar guide: concepts, costs, and common mistakes.',
          },
          {
            href: '/learn/how-to-start-day-trading/',
            label: 'How to start day trading',
            description: 'A paper-first roadmap from mechanics to review.',
          },
          {
            href: '/paper-trading/',
            label: 'What is paper trading?',
            description: 'Simulated orders, a first-session checklist, and a journal template.',
          },
          {
            href: '/safety/',
            label: 'Risk and safety checklist',
            description: 'Paper defaults, approvals, and secret handling.',
          },
        ]}
      />

      <NextPath
        links={[
          {
            href: '/learn/day-trading-for-beginners/',
            label: 'Start the beginner pillar',
            description: 'Learn the mechanics and costs before you practise.',
          },
          {
            href: '/paper-trading/',
            label: 'Rehearse on paper',
            description: 'Use the flow, checklist, and journal on a simulator.',
          },
          {
            href: '/tools/position-size-calculator/',
            label: 'Size the practice trade',
            description: 'Turn a risk budget and stop distance into share count.',
          },
        ]}
      />
    </div>
  );
}
