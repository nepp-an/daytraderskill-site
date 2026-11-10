import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { NextPath } from '@/components/NextPath';
import { Related } from '@/components/Related';
import { CalculatorIcon, PaperIcon, ScaleIcon } from '@/components/icons';
import { articleJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'How to Start Day Trading: A Paper-First Roadmap' },
  description:
    'How to start day trading without rushing into live risk: learn mechanics, choose a market, practise on paper, write rules, and journal each session. NFA.',
  alternates: { canonical: '/learn/how-to-start-day-trading/' },
  openGraph: {
    title: 'How to Start Day Trading: A Paper-First Roadmap',
    description:
      'A step-by-step, paper-first roadmap for beginning day traders, from mechanics and rules to journaling and review.',
    url: '/learn/how-to-start-day-trading/',
    images: [
      {
        url: '/og/how-to-start.svg',
        width: 1200,
        height: 630,
        alt: 'How to start day trading — a paper-first roadmap',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'How to Start Day Trading: A Paper-First Roadmap',
    description: 'From the definition to a reviewed paper session.',
    images: ['/og/how-to-start.svg'],
  },
};

const faqs = [
  {
    q: 'How do I start day trading with no experience?',
    a: 'Start with market mechanics, not stock tips. Learn order types, spreads, liquidity, and risk; choose one market and one session; write a one-page process; then rehearse it in a paper account and review the journal. Live trading is optional and should be a separate decision.',
  },
  {
    q: 'Do I need a lot of money to start day trading?',
    a: 'This site does not give personal financial advice or a required account size. You can start learning with a paper account and no trading capital. If you ever consider live trading, only money you can afford to lose entirely should be at risk, and leverage makes losses larger as well as gains.',
  },
  {
    q: 'What is the best market for a beginner?',
    a: 'There is no universal best market. Beginners often benefit from studying a liquid instrument with understandable trading hours and a simulator that matches the intended workflow. Avoid complexity such as thin markets, unusual instruments, or leverage before you can explain the basics.',
  },
  {
    q: 'How long should I paper trade before going live?',
    a: 'There is no fixed number of days or trades that certifies readiness. A more useful test is whether you can explain and follow your process, journal honestly, and review mistakes without changing the rules after every loss. Paper results still do not guarantee live results.',
  },
  {
    q: 'Do I need a mentor or a paid course?',
    a: 'Not necessarily. Free documentation, broker demos, exchange education pages, and books can teach the mechanics. Be cautious with anyone who promises returns, sells signals, or pressures you to trade live quickly. This site does not sell mentoring or signals.',
  },
  {
    q: 'Is day trading legal?',
    a: 'Rules vary by country and by broker. Some jurisdictions require specific licenses or registrations to advise others, and tax treatment depends on your situation. This is not legal or tax advice; verify the current rules where you live and speak to a qualified professional.',
  },
];

export default function HowToStartDayTradingPage() {
  return (
    <article className="article">
      <JsonLd
        data={[
          articleJsonLd({
            headline: 'How to Start Day Trading: A Paper-First Roadmap',
            description:
              'A step-by-step, paper-first roadmap for beginning day traders, from mechanics and rules to journaling and review.',
            path: '/learn/how-to-start-day-trading/',
            dateModified: '2026-11-10',
          }),
          faqJsonLd(faqs),
        ]}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/learn/">Learn</Link> / How to start day trading
      </nav>

      <header className="article-head">
        <p className="eyebrow">Step-by-step roadmap</p>
        <h1>How to start day trading without rushing into live risk</h1>
        <p className="article-meta">
          <span>Reviewed 10 November 2026</span>
          <span>9 min read</span>
          <span>Not financial advice</span>
        </p>
      </header>

      <div className="tldr">
        <strong>TL;DR.</strong> Start with mechanics, then a written process, then paper practice,
        then review. Choose one market and one session. Keep a journal. Do not treat a live account
        as the finish line — it is a separate decision with real financial consequences. Most people
        who day trade lose money.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> This roadmap is educational. It does not recommend a
          market, strategy, broker, or position size. Trading can lose money quickly, especially with
          leverage.
        </p>
      </div>

      <figure className="page-visual">
        <img
          src="/illustrations/start-roadmap.svg"
          alt="Five-stage roadmap: learn the definition, study mechanics, choose one market, write a one-page plan, then practise on paper and review."
          width={720}
          height={340}
          loading="lazy"
        />
        <figcaption>
          A paper-first roadmap. The human gate stays in place: simulator first, approvals before any
          order path.
        </figcaption>
      </figure>

      <ul className="icon-row">
        <li>
          <PaperIcon size={20} />
          <span>
            <strong>Simulator first</strong>
            Learn the ticket and the routine without real capital.
          </span>
        </li>
        <li>
          <CalculatorIcon size={20} />
          <span>
            <strong>Size the risk</strong>
            Convert a risk budget and stop distance into shares.
          </span>
        </li>
        <li>
          <ScaleIcon size={20} />
          <span>
            <strong>Compare the payoff</strong>
            Check R:R before the trade, not after the outcome.
          </span>
        </li>
      </ul>

      <h2>The short answer</h2>
      <p>
        If you are starting from zero, the useful order is: learn the vocabulary, pick a narrow
        market, write a one-page plan, practise it on paper, and review the decisions. Only after
        that should you decide whether live trading is appropriate for you. Many people decide it is
        not, and that is a valid outcome.
      </p>
      <p>
        Starting does not require a paid signal group, a “pro” indicator pack, or a live account on
        day one. Those things can add cost and complexity before you have a process to test.
      </p>

      <h2>Before step one: a readiness check</h2>
      <ul className="checklist">
        <li>I understand that most people who day trade lose money.</li>
        <li>I can set aside regular time to study and review, not just watch screens.</li>
        <li>I am willing to practise on paper without pretending it is live.</li>
        <li>I know that leverage and frequent trading increase the consequences of mistakes.</li>
        <li>I will not use money I cannot afford to lose for speculative trading.</li>
        <li>I will verify tax and regulatory rules with a qualified professional.</li>
      </ul>

      <h2>How to start day trading: the roadmap, step by step</h2>
      <ol className="steps">
        <li>
          <strong>Step 1 — Learn what a day trade is.</strong>
          <p>
            Read the <Link href="/learn/what-is-day-trading/">plain-English definition</Link> and
            learn how it differs from swing trading and investing. Understand that a day trade is
            normally closed within the same session, and that the holding period changes the costs
            and the risks.
          </p>
        </li>
        <li>
          <strong>Step 2 — Learn the mechanics.</strong>
          <p>
            Study market and limit orders, bid-ask spreads, liquidity, slippage, halts, and
            rejections. Learn how to read the order ticket and how to verify that a stop is actually
            working. If a term is unclear, stop and look it up before adding another indicator.
          </p>
        </li>
        <li>
          <strong>Step 3 — Choose one market and one session.</strong>
          <p>
            Pick a single instrument and a defined time window. Write down the trading hours, the
            data source, and the conditions you will ignore. A narrow study is easier to review than
            a scattered tour of everything that moves.
          </p>
        </li>
        <li>
          <strong>Step 4 — Write a one-page process.</strong>
          <p>
            Include the setup you are studying, the entry trigger, invalidation, position size,
            maximum loss, and a stop-trading rule. Add a rule for what you will do when the market
            is unclear: usually, no trade. Use the{' '}
            <Link href="/tools/position-size-calculator/">position size calculator</Link> to turn the
            risk budget into shares, and the{' '}
            <Link href="/tools/risk-reward-calculator/">risk-reward calculator</Link> to record the
            payoff you intend to test. The plan should be short enough to follow under pressure.
          </p>
        </li>
        <li>
          <strong>Step 5 — Open a paper account.</strong>
          <p>
            Use a simulator or broker paper account that shows the order types and data you need.
            Confirm the data is live or delayed and understand how fills are modelled. Read{' '}
            <Link href="/paper-trading/">what paper trading is</Link> before your first session.
          </p>
        </li>
        <li>
          <strong>Step 6 — Run the same routine every session.</strong>
          <p>
            Check the account mode, the data timestamp, the spread, and the plan. Place only the
            orders your plan allows. Journal the reason, the fill, the outcome, and whether you
            followed the process. Repeated routine beats a dramatic first day.
          </p>
        </li>
        <li>
          <strong>Step 7 — Review weekly.</strong>
          <p>
            Look for repeated mistakes: oversized positions, moving stops, trading outside the
            session, or entering without a defined invalidation. Change one thing at a time, then
            test the change on paper. Do not rewrite the whole plan after one loss.
          </p>
        </li>
        <li>
          <strong>Step 8 — Treat live trading as a separate decision.</strong>
          <p>
            There is no certificate that makes live trading suitable. If you ever consider it, use
            only risk capital, keep position sizes small relative to the account, and understand
            that paper results can flatter a strategy. This site does not recommend that you make
            that switch.
          </p>
        </li>
      </ol>

      <h2>A two-week starter schedule</h2>
      <p>
        This is a study schedule, not a profit target. The aim is to make the workflow familiar and
        to produce a journal you can review.
      </p>
      <table className="data">
        <thead>
          <tr>
            <th>Days</th>
            <th>Focus</th>
            <th>Output</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1–3</td>
            <td>Definitions, order types, spreads, and risk vocabulary.</td>
            <td>A one-page glossary in your own words.</td>
          </tr>
          <tr>
            <td>4–5</td>
            <td>Platform tour and simulated order entry.</td>
            <td>A checklist for opening and closing a paper trade.</td>
          </tr>
          <tr>
            <td>6–8</td>
            <td>One market, one session, one written setup.</td>
            <td>A one-page process with invalidation and size.</td>
          </tr>
          <tr>
            <td>9–12</td>
            <td>Paper sessions using the same routine.</td>
            <td>Four journal entries with screenshots or notes.</td>
          </tr>
          <tr>
            <td>13–14</td>
            <td>Review and simplify.</td>
            <td>A list of repeated mistakes and one change to test.</td>
          </tr>
        </tbody>
      </table>
      <p>
        The hub also keeps a four-week version of this sequence:{' '}
        <Link href="/#plan-heading">Your first four weeks on paper</Link>. Use this two-week schedule
        for a quick start, or the four-week view when you want more time between review cycles. Both
        produce the same kind of evidence — notes, checklists, and a journal.
      </p>

      <h2>What starting does not require</h2>
      <ul>
        <li>
          <strong>A live account.</strong> You can learn mechanics and process on paper.
        </li>
        <li>
          <strong>An expensive course.</strong> Free documentation can teach the basics; verify the
          source and the date.
        </li>
        <li>
          <strong>A signal group.</strong> A call to buy or sell is not a process and does not
          transfer the reasoning.
        </li>
        <li>
          <strong>A complex indicator stack.</strong> Complexity can hide a weak plan.
        </li>
        <li>
          <strong>A guarantee.</strong> No tool, course, or mentor can promise a market outcome.
        </li>
      </ul>

      <h2>Common mistakes at the start</h2>
      <ul>
        <li>Changing the plan after every loss instead of collecting enough decisions to review.</li>
        <li>Using a simulator with unrealistic fills and then assuming live results will match.</li>
        <li>Increasing size to make a small account “worth trading.”</li>
        <li>Adding leverage before understanding how it changes the loss profile.</li>
        <li>Confusing screen time with deliberate practice.</li>
        <li>Letting a chatbot or signal service make the decision without verifying the ticket.</li>
      </ul>

      <div className="callout warn">
        <p>
          <strong>Stop rule.</strong> If you cannot explain why you are in a trade, how you will
          exit, and what happens if you are wrong, you are not ready to place it. That rule applies
          on paper too.
        </p>
      </div>

      <h2>The first milestone that matters</h2>
      <p>
        The first useful milestone is not a percentage return. It is being able to run the same
        process repeatedly and review it honestly. If you can do that on paper, you have learned
        something real. If you cannot, a live account will not supply the missing discipline.
      </p>
      <p>
        For a broader foundation, read the{' '}
        <Link href="/learn/day-trading-for-beginners/">beginner pillar</Link>. For the guardrails,
        read the <Link href="/safety/">safety checklist</Link>.
      </p>

      <div className="callout compliance">
        <p>
          <strong>Compliance note.</strong> No stock picks, signals, profit promises, or
          trade-on-your-behalf service. Day trading is risky; most people who try it lose money.
        </p>
      </div>

      <h2>Frequently asked questions</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          {
            href: '/learn/day-trading-for-beginners/',
            label: 'Day trading for beginners',
            description: 'The pillar guide: concepts, costs, and common mistakes.',
          },
          {
            href: '/paper-trading/',
            label: 'What is paper trading?',
            description: 'How to rehearse the workflow without real capital.',
          },
          {
            href: '/learn/what-is-day-trading/',
            label: 'What is day trading?',
            description: 'The definition and how it differs from investing.',
          },
          {
            href: '/safety/',
            label: 'Safety and risk rules',
            description: 'The non-negotiables before any live decision.',
          },
        ]}
      />

      <NextPath
        links={[
          {
            href: '/paper-trading/',
            label: 'Run the first paper session',
            description: 'Use the simulator flow, checklist, and printable journal.',
          },
          {
            href: '/tools/position-size-calculator/',
            label: 'Size the position from the stop',
            description: 'Turn risk percentage and stop distance into shares.',
          },
          {
            href: '/tools/risk-reward-calculator/',
            label: 'Check the risk-reward ratio',
            description: 'Compare entry, stop, and target before costs.',
          },
        ]}
      />
    </article>
  );
}
