import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { NextPath } from '@/components/NextPath';
import { PaperJournal } from '@/components/PaperJournal';
import { Related } from '@/components/Related';
import { ChecklistIcon, ClockIcon, ShieldIcon } from '@/components/icons';
import { articleJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'Paper-first day trading simulator: practice before real money' },
  description:
    'A day trading simulator guide for this site’s practice entry: how simulated orders work, what a simulator cannot teach, and how to run a first paper session. Includes a checklist and printable journal. Not financial advice.',
  alternates: { canonical: '/paper-trading/' },
  openGraph: {
    title: 'Paper-first day trading simulator: practice before real money',
    description:
      'The practice entry for this site: simulated orders, the limits of a day trading simulator, and a first-session checklist. No live quotes or broker connection.',
    url: '/paper-trading/',
    images: [
      {
        url: '/og/paper-trading.svg',
        width: 1200,
        height: 630,
        alt: 'A day trading simulator practice guide with a checklist and journal',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Paper-first day trading simulator: practice before real money',
    description: 'Simulated orders, a first-session checklist, and a journal template.',
    images: ['/og/paper-trading.svg'],
  },
};

const faqs = [
  {
    q: 'Is paper trading real trading?',
    a: 'No. Paper trading uses simulated orders and simulated capital. You may see real or delayed market prices, but the fills are not executed in the market and no real money changes hands.',
  },
  {
    q: 'Can paper trading make money?',
    a: 'Not real money. A paper account can show a simulated profit or loss, but that number does not mean you would have achieved the same result with live orders. Fill assumptions, slippage, and psychology can all differ.',
  },
  {
    q: 'Does paper trading prepare you for live trading?',
    a: 'It prepares you for the mechanics and the checklist, and it lets you make cheap mistakes. It does not fully prepare you for real slippage, liquidity, or the emotional weight of losing actual money. Treat it as practice, not proof.',
  },
  {
    q: 'What is a paper trading account?',
    a: 'It is a simulator, often offered by a broker or a third-party platform, that lets you place orders against a fake balance. Some accounts use live market data; others use delayed data or model fills.',
  },
  {
    q: 'Is paper trading free?',
    a: 'Many paper accounts are free, but some platforms require an account, charge for real-time data, or limit features. Check the current terms directly with the provider rather than relying on an old tutorial.',
  },
  {
    q: 'Should I go live after a winning paper streak?',
    a: 'There is no rule that a paper streak qualifies you for live trading. A short run can be luck, and simulated fills can flatter a strategy. This site does not tell you to trade live; that is a personal decision to make carefully, with professional advice if needed.',
  },
  {
    q: 'What is the difference between paper trading and backtesting?',
    a: 'Backtesting applies rules to historical data. Paper trading applies them forward, in a simulated account, as the market unfolds. Both have limitations, but they test different things.',
  },
  {
    q: 'Is the day trading simulator on this site connected to live markets?',
    a: 'No. This page is the site’s practice entry and guide. It does not host a live trading screen, show live quotes, or connect to a broker. A synthetic practice workspace is planned for a later update; when it ships, its scenarios will be constructed examples rather than a real-time market feed.',
  },
];

export default function PaperTradingPage() {
  return (
    <article className="article">
      <JsonLd
        data={[
          articleJsonLd({
            headline: 'Paper-first day trading simulator: practice before real money',
            description:
              'The practice entry for this site: how simulated orders work, what a day trading simulator cannot teach, and how to run a first paper session.',
            path: '/paper-trading/',
            dateModified: '2026-11-10',
          }),
          faqJsonLd(faqs),
        ]}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Day trading simulator
      </nav>

      <header className="article-head">
        <p className="eyebrow">Practice entry</p>
        <h1>A day trading simulator for practice, not live trading</h1>
        <p className="article-meta">
          <span>Reviewed 10 November 2026</span>
          <span>8 min read</span>
          <span>Not financial advice</span>
        </p>
        <p className="lead">
          This is the site’s practice entry for day trading: what a simulator is, where simulated
          orders stop being useful, and how to run a first paper session. No live quotes, no broker
          connection, and no profit promise.
        </p>
      </header>

      <div className="tldr">
        <strong>TL;DR.</strong> A day trading simulator lets you place orders against simulated
        capital. It is the default way to learn a platform and rehearse a process without risking
        real money. It is useful for mechanics and discipline, but it cannot fully reproduce live
        fills, liquidity, or the pressure of losing actual capital. This page is the site’s practice
        entry, not a live trading screen.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> A paper profit is not evidence that a strategy will
          work live. Most people who day trade lose money. Paper trading is a rehearsal, not a
          guarantee.
        </p>
      </div>

      <div className="callout warn">
        <p>
          <strong>Practice workspace status.</strong> A synthetic practice workspace for this site is
          planned for a later update and is <strong>not yet available on this page</strong>. When it
          ships, its scenarios will be constructed examples, not live market quotes. This page shows
          no live prices and does not connect to a broker, so there is nothing here to mistake for a
          live order ticket.
        </p>
      </div>

      <figure className="page-visual">
        <img
          src="/illustrations/paper-flow.svg"
          alt="Simulation flow: open a paper account, write rules, place a simulated order, then review the journal."
          width={720}
          height={320}
          loading="lazy"
        />
        <figcaption>
          The loop for a first paper session. No real capital, no live order API, no signals.
        </figcaption>
      </figure>

      <ul className="icon-row">
        <li>
          <ClockIcon size={20} />
          <span>
            <strong>Short first session</strong>
            One instrument, one written rule, one reviewed decision.
          </span>
        </li>
        <li>
          <ChecklistIcon size={20} />
          <span>
            <strong>Checklist before the ticket</strong>
            Confirm paper mode, data timestamp, spread, and size.
          </span>
        </li>
        <li>
          <ShieldIcon size={20} />
          <span>
            <strong>Keep the gate closed</strong>
            Any order-capable tool stays on Needs approval.
          </span>
        </li>
      </ul>

      <h2 id="what-is-a-simulator">What is a day trading simulator?</h2>
      <p>
        A day trading simulator is a practice environment where you can enter, manage, and exit
        simulated trades without sending an order to a broker. On this site, the term also names
        this practice entry: the page you start from before using any simulator, checklist, or
        journal. The simulation itself might be a broker demo account, a third-party paper platform,
        or a guided scenario. It is not live trading, and it is not a signal service.
      </p>
      <p>
        A simulator is only as honest as its assumptions. Find out whether the data is live or
        delayed, how fills are modelled, and which costs are included. Then compare the simulator’s
        behaviour with the workflow you intend to use. A practice environment that hides slippage or
        ignores fees can teach the wrong lesson.
      </p>

      <h2 id="what-is-paper-trading">Paper trading: a plain-English definition</h2>
      <p>
        Paper trading is the practice of placing buy and sell orders in a simulated account. The
        platform records the orders and calculates a hypothetical profit or loss, but no real
        securities are exchanged and no real capital is at risk. It is sometimes called simulated
        trading or demo trading.
      </p>
      <p>
        The quality of the simulation varies. Some paper accounts stream live market data and model
        fills conservatively. Others use delayed data, simplified fills, or assumptions that make
        execution look easier than it is. Before you trust a result, find out what the simulator is
        actually doing.
      </p>

      <h2>Why paper trading is the default here</h2>
      <p>
        Beginners make operational mistakes: wrong order type, wrong quantity, wrong ticker, wrong
        session, or a stop that was never actually placed. Paper trading lets those mistakes happen
        without a financial loss. That is valuable.
      </p>
      <p>
        It also creates a low-pressure place to test whether you can follow a written process. You
        can practise the same checklist every session, journal the reason for each order, and review
        the decisions afterwards. Those habits transfer better than a lucky result.
      </p>
      <p>
        Finally, paper trading separates learning from earning. You do not need to “make it back” in
        a simulator, and you do not need to force a trade to justify the time you spent. The goal is
        to learn the workflow, not to manufacture a streak.
      </p>

      <h2 id="limits">What paper trading can and cannot teach</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Paper usually teaches</th>
            <th>Paper often misses</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Platform navigation and order entry.</td>
            <td>Real fills when liquidity is thin.</td>
          </tr>
          <tr>
            <td>The difference between order types.</td>
            <td>Slippage during fast markets and gaps.</td>
          </tr>
          <tr>
            <td>Following a written checklist.</td>
            <td>The emotion of losing real money.</td>
          </tr>
          <tr>
            <td>Journaling and reviewing decisions.</td>
            <td>Broker rejections, halts, and operational failures.</td>
          </tr>
          <tr>
            <td>Testing whether a process is understandable.</td>
            <td>Whether a strategy has a durable edge after costs.</td>
          </tr>
        </tbody>
      </table>
      <p>
        The last point matters. A simulator can show a positive hypothetical result while ignoring
        the exact costs that make a high-frequency approach unworkable. Always ask what fees,
        spreads, and fill assumptions the platform applied.
      </p>

      <h2>How to start paper trading</h2>
      <ol className="steps">
        <li>
          <strong>Choose a simulator or broker paper account.</strong> Use one that shows the order
          types, data, and market access you intend to study. Check whether the data is live or
          delayed.
        </li>
        <li>
          <strong>Set a realistic starting balance.</strong> A fantasy balance can encourage fantasy
          position sizes. Use an amount that would be meaningful but still entirely disposable in a
          learning context.
        </li>
        <li>
          <strong>Pick one instrument and one session.</strong> Write down what you are studying and
          when. Avoid jumping between markets before you can explain the first one.
        </li>
        <li>
          <strong>Write the process before the session.</strong> Include entry conditions,
          invalidation, position size, maximum loss, and a stop-trading rule. Keep it to one page.
        </li>
        <li>
          <strong>Use the same order types you would use live.</strong> If you plan to use limit
          orders, do not practise only with market orders. The mechanics should match the intended
          workflow.
        </li>
        <li>
          <strong>Journal every simulated order.</strong> Record the reason, the fill assumption, the
          outcome, and whether you followed the plan. Review the journal on a schedule.
        </li>
      </ol>

      <h2>A realistic first paper session</h2>
      <p>
        A useful first session is short. Open the platform, find the instrument, check the spread,
        place one small simulated order with a predefined invalidation, and close it according to
        your rule. Then write down what happened. Repeat the next day with the same process.
      </p>
      <ul className="checklist">
        <li>Confirm you are in a paper account, not a live account.</li>
        <li>Check the data timestamp and the current spread.</li>
        <li>Place the order with the size written in your plan.</li>
        <li>Record the entry, exit, and reason in the journal.</li>
        <li>Review whether the process or the outcome drove your decisions.</li>
      </ul>

      <PaperJournal />

      <h2>Paper trading versus live trading</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>Paper trading</th>
            <th>Live trading</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Capital</td>
            <td>Simulated; no real money at risk.</td>
            <td>Real capital at risk.</td>
          </tr>
          <tr>
            <td>Fills</td>
            <td>Model-dependent; may be optimistic.</td>
            <td>Subject to real liquidity and queue position.</td>
          </tr>
          <tr>
            <td>Psychology</td>
            <td>Lower stakes; easier to follow a plan.</td>
            <td>Fear and greed can change behaviour.</td>
          </tr>
          <tr>
            <td>Costs</td>
            <td>May be simplified or ignored.</td>
            <td>Commissions, fees, spreads, and slippage are real.</td>
          </tr>
          <tr>
            <td>Operational risk</td>
            <td>Limited; the simulator is not the market.</td>
            <td>Rejections, outages, halts, and data failures matter.</td>
          </tr>
          <tr>
            <td>Tax reporting</td>
            <td>No real taxable transactions.</td>
            <td>Depends on your jurisdiction and activity.</td>
          </tr>
        </tbody>
      </table>

      <div className="callout warn">
        <p>
          <strong>Do not treat paper results as a forecast.</strong> A simulator can be a useful
          training tool and still produce results that would not survive live costs and execution.
          Paper is where you learn the questions to ask, not where you prove an edge.
        </p>
      </div>

      <h2>Where software and AI tools fit</h2>
      <p>
        Paper trading is also the right place to test software that reads market data, drafts a
        plan, or prepares an order ticket. The useful question is not “can it place a trade?” but
        “can I see what it did, verify the inputs, and stop it before anything irreversible
        happens?”
      </p>
      <p>
        If you use Claude skills or another agent workflow, keep the trading account on paper, keep
        brokerage tools on <strong>Needs approval</strong>, and require a human confirmation for any
        order path. The <Link href="/tools/install-claude-skills/">Claude skills install guide</Link>{' '}
        covers the general setup. The independent{' '}
        <Link href="/install/">Day Trader Skill install guide</Link> covers one third-party pack; it
        is <strong>not the official project site</strong>.
      </p>
      <p>
        Before connecting anything, read the <Link href="/safety/">safety checklist</Link>. It
        covers paper defaults, approval settings, secret handling, and the claims this site refuses
        to make.
      </p>

      <div className="compliance-strip">
        <p>
          <strong>Paper-first rule:</strong> if you cannot explain the ticket, do not approve it.
          “Needs approval” is a feature, not friction to remove.
        </p>
        <Link className="btn small ghost" href="/safety/">
          Safety checklist
        </Link>
      </div>

      <h2>Frequently asked questions</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          {
            href: '/learn/day-trading-for-beginners/',
            label: 'Day trading for beginners',
            description: 'The concepts and costs to learn before your first session.',
          },
          {
            href: '/learn/how-to-start-day-trading/',
            label: 'How to start day trading',
            description: 'A paper-first roadmap from mechanics to review.',
          },
          {
            href: '/safety/',
            label: 'Safety and approval gates',
            description: 'Paper defaults, Needs approval, and secret handling.',
          },
          {
            href: '/tools/',
            label: 'Tools hub',
            description: 'Claude skills, simulators, and comparison guides.',
          },
        ]}
      />

      <NextPath
        links={[
          {
            href: '/tools/position-size-calculator/',
            label: 'Size the simulated order',
            description: 'Account size, risk %, entry, and stop distance → shares.',
          },
          {
            href: '/tools/risk-reward-calculator/',
            label: 'Check the simulated payoff',
            description: 'Compare entry, stop, and target before costs.',
          },
          {
            href: '/safety/',
            label: 'Review the safety gates',
            description: 'Paper defaults, Needs approval, and secret handling.',
          },
        ]}
      />
    </article>
  );
}
