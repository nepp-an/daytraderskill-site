import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { NextPath } from '@/components/NextPath';
import { PositionSizeCalculator } from '@/components/PositionSizeCalculator';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { articleJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'Position Size Calculator: Risk-Based Share Count' },
  description:
    'Free position size calculator: enter account size, risk percentage, entry price, and stop distance to estimate shares and position value. No login, no broker connection. Not financial advice.',
  alternates: { canonical: '/tools/position-size-calculator/' },
  openGraph: {
    title: 'Position Size Calculator: Risk-Based Share Count',
    description:
      'Turn account size, risk %, and stop distance into a suggested share count and position value. Browser-only and paper-first.',
    url: '/tools/position-size-calculator/',
    images: [
      {
        url: '/og/position-size-calculator.svg',
        width: 1200,
        height: 630,
        alt: 'Position Size Calculator from DayTraderSkill.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Position Size Calculator',
    description: 'Account size × risk % ÷ stop distance → suggested shares.',
    images: ['/og/position-size-calculator.svg'],
  },
};

const faqs = [
  {
    q: 'How does the position size calculator work?',
    a: 'It multiplies the account size by the risk percentage to get a dollar risk budget. It then divides that budget by the stop distance to estimate how many whole shares fit within the planned loss. Position value is the share count multiplied by the planned entry price.',
  },
  {
    q: 'Should I round the share count up or down?',
    a: 'The calculator rounds down. Rounding up would exceed the risk budget you entered. If the budget is smaller than one share of risk, the result is zero rather than a smaller-than-one-share position.',
  },
  {
    q: 'Does this calculator connect to my broker?',
    a: 'No. It runs entirely in your browser with no login, no market data feed, and no broker or order connection. It cannot place, modify, or close a trade.',
  },
  {
    q: 'Is the result a recommendation?',
    a: 'No. It is arithmetic based on the numbers you enter. It does not know your financial situation, the instrument, liquidity, fees, or whether the trade idea makes sense. It is not financial advice.',
  },
  {
    q: 'Why does position value exceed my account sometimes?',
    a: 'A small stop distance can imply a large share count. If the resulting notional value is above the account size, the position would require margin or leverage at many brokers. That adds risk and is not automatically appropriate for a learning account.',
  },
];

export default function PositionSizeCalculatorPage() {
  return (
    <article className="article">
      <JsonLd
        data={[
          articleJsonLd({
            headline: 'Position Size Calculator: Risk-Based Share Count',
            description:
              'A free browser-only calculator that turns account size, risk percentage, entry price, and stop distance into a suggested share count.',
            path: '/tools/position-size-calculator/',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Position Size Calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            url: 'https://daytraderskill.com/tools/position-size-calculator/',
            description:
              'A paper-first position size calculator for educational use. No broker connection, no market data, and no order path.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          faqJsonLd(faqs),
        ]}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/tools/">Tools</Link> / Position size calculator
      </nav>

      <ToolsNav current="/tools/position-size-calculator/" />

      <header className="article-head">
        <p className="eyebrow">Tools · Free calculator</p>
        <h1>Position Size Calculator</h1>
        <p className="article-meta">
          <span>Reviewed 5 November 2026</span>
          <span>Browser-only</span>
          <span>Not financial advice</span>
        </p>
      </header>

      <div className="tldr">
        <strong>TL;DR.</strong> Enter a paper account size, the percentage you are willing to risk on
        one trade, the planned entry price, and the stop distance. The calculator estimates a share
        count that keeps the loss at the stop inside that risk budget. It is arithmetic, not a trade
        recommendation.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> This tool does not recommend a stock, a position
          size, or a trade. It has no broker connection, no market data feed, and no order path. The
          SEC’s{' '}
          <a href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html" rel="noopener noreferrer" target="_blank">
            2005 day-trading bulletin
          </a>{' '}
          warns that many traders suffer severe losses in their first months.
        </p>
      </div>

      <figure className="page-visual">
        <img
          src="/illustrations/position-size.svg"
          alt="Position size formula: account size times risk percent equals the risk budget, divided by stop distance to estimate shares."
          width={720}
          height={300}
          loading="lazy"
        />
        <figcaption>
          Risk-first arithmetic: the stop distance and the risk budget set the share count, not the
          buying power.
        </figcaption>
      </figure>

      <PositionSizeCalculator />

      <h2>How the position size calculator works</h2>
      <p>
        Position sizing starts with the loss you are prepared to accept, not with the number of
        shares you can afford. The calculator uses three steps. First, it converts the account size
        and risk percentage into a dollar risk budget. Second, it divides that budget by the stop
        distance to see how many whole shares would lose approximately that amount if the stop were
        reached. Third, it multiplies the share count by the entry price to show the notional
        position value.
      </p>
      <div className="formula-strip">
        risk budget = account × (risk % ÷ 100)
        <br />
        suggested shares = floor(risk budget ÷ stop distance)
        <br />
        position value = suggested shares × entry price
      </div>
      <p>
        For example, a $25,000 paper account with a 1% risk budget gives $250 of risk. If the planned
        entry is $50.00 and the stop is $47.50, the stop distance is $2.50 per share. Dividing $250 by
        $2.50 gives 100 shares, with a notional value of $5,000. That example is arithmetic only; it
        is not a recommendation to trade that stock or that size.
      </p>
      <p>
        The calculator rounds down to whole shares. If the risk budget is too small to buy even one
        share at the chosen stop distance, it shows zero. Rounding up would quietly exceed the risk
        you entered, which defeats the purpose of sizing from a loss limit.
      </p>

      <h2>Why stop distance matters more than share price</h2>
      <p>
        A cheap stock is not automatically a small risk. If a $5 stock can move $1 against you, the
        stop distance is $1 per share, which is 20% of the entry price. A $100 stock with a $1 stop
        has the same dollar risk per share. Position size depends on the distance to invalidation,
        not on whether the quoted price looks low.
      </p>
      <p>
        This is why the calculator asks for the stop distance rather than a vague “small stop.” A
        stop that is too tight may be hit by ordinary noise; a stop that is too wide may make the
        position impractically small. Both are planning questions. Paper sessions are the place to
        study how the instrument actually moves and how the simulation fills orders.
      </p>

      <h2>What the result does not include</h2>
      <ul>
        <li>
          <strong>Fees and commissions.</strong> The calculator does not know your broker&apos;s
          charges, exchange fees, or data costs.
        </li>
        <li>
          <strong>Slippage and gaps.</strong> A stop is not a guarantee of the exit price. A fast
          market can fill beyond it.
        </li>
        <li>
          <strong>Liquidity.</strong> A large position in a thin instrument may be difficult to exit
          at the quoted price.
        </li>
        <li>
          <strong>Borrow and margin rules.</strong> Short selling, leverage, and pattern-day-trader
          requirements vary by broker and jurisdiction.
        </li>
        <li>
          <strong>Your personal situation.</strong> The tool has no idea whether risking that amount
          is appropriate for you.
        </li>
      </ul>
      <p>
        Read the <Link href="/safety/#risk">risk basics</Link> and the{' '}
        <Link href="/learn/day-trading-for-beginners/">beginner pillar</Link> before treating a
        number as a plan. The{' '}
        <Link href="/learn/how-to-start-day-trading/">how to start day trading roadmap</Link> explains
        where sizing fits in the wider process, and the{' '}
        <Link href="/tools/risk-reward-calculator/">risk-reward calculator</Link> helps you compare
        the planned loss with the planned target.
      </p>

      <div className="callout compliance">
        <p>
          <strong>Compliance note.</strong> DayTraderSkill.com is not a broker, investment adviser, or
          signal service. This calculator does not execute trades and does not provide personalised
          advice. Paper trading remains the default.
        </p>
      </div>

      <h2>Frequently asked questions</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          {
            href: '/tools/risk-reward-calculator/',
            label: 'Risk-reward calculator',
            description: 'Compare the distance to the stop with the distance to the target.',
          },
          {
            href: '/paper-trading/',
            label: 'What is paper trading?',
            description: 'Use the checklist and journal to rehearse the number in a simulator.',
          },
          {
            href: '/learn/how-to-start-day-trading/',
            label: 'How to start day trading',
            description: 'The roadmap from mechanics and rules to review.',
          },
          {
            href: '/safety/#risk',
            label: 'Risk basics and hard rules',
            description: 'The guardrails that belong around any size decision.',
          },
        ]}
      />

      <NextPath
        links={[
          {
            href: '/tools/risk-reward-calculator/',
            label: 'Check the risk-reward ratio',
            description: 'Compare entry, stop, and target before costs.',
          },
          {
            href: '/paper-trading/',
            label: 'Rehearse the size on paper',
            description: 'Run the checklist and journal against a simulator.',
          },
          {
            href: '/safety/',
            label: 'Review the safety checklist',
            description: 'Paper defaults, approvals, and secret handling.',
          },
        ]}
      />
    </article>
  );
}
