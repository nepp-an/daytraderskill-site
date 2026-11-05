import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { NextPath } from '@/components/NextPath';
import { Related } from '@/components/Related';
import { RiskRewardCalculator } from '@/components/RiskRewardCalculator';
import { ToolsNav } from '@/components/ToolsNav';
import { articleJsonLd } from '@/lib/seo';

export const metadata: Metadata = {
  title: { absolute: 'Risk-Reward Calculator: R:R and Payoff Ratio' },
  description:
    'Free risk-reward calculator: enter entry, stop, and target to see the R:R ratio, potential profit and loss, and break-even hit rate. No login, no signals. NFA.',
  alternates: { canonical: '/tools/risk-reward-calculator/' },
  openGraph: {
    title: 'Risk-Reward Calculator: R:R and Payoff Ratio',
    description:
      'Compare entry, stop, and target to see the risk-reward ratio and potential payoff before costs. Browser-only.',
    url: '/tools/risk-reward-calculator/',
    images: [
      {
        url: '/og/risk-reward-calculator.svg',
        width: 1200,
        height: 630,
        alt: 'Risk / Reward Calculator from DayTraderSkill.com',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Risk-Reward Calculator',
    description: 'Entry, stop, and target → the R:R ratio before costs.',
    images: ['/og/risk-reward-calculator.svg'],
  },
};

const faqs = [
  {
    q: 'How is the risk-reward ratio calculated?',
    a: 'Risk per share is the entry price minus the stop price. Reward per share is the target price minus the entry price. The ratio divides reward by risk, so a $2 risk and a $6 reward gives a 3:1 reward-to-risk ratio.',
  },
  {
    q: 'What does a 2:1 risk-reward ratio mean?',
    a: 'It means the planned reward is twice the planned risk, before fees and slippage. It does not mean the trade is twice as likely to work. A high ratio can still lose money if the setup rarely reaches the target.',
  },
  {
    q: 'Is the break-even hit rate a prediction?',
    a: 'No. It is the arithmetic win rate needed to break even at that ratio, ignoring costs. It is not a forecast, and it says nothing about the quality of the setup or the probability of reaching the target.',
  },
  {
    q: 'Does this calculator place trades?',
    a: 'No. It runs entirely in your browser with no broker connection, no login, and no market data feed. It cannot place, modify, or close an order, and it does not recommend a trade.',
  },
  {
    q: 'Should I use a wider target to improve the ratio?',
    a: 'Not automatically. Moving a target farther away can make the ratio look better while making it less likely to be reached. The target should come from the plan and the market structure you are studying, not from a number that looks attractive in a calculator.',
  },
];

export default function RiskRewardCalculatorPage() {
  return (
    <article className="article">
      <JsonLd
        data={[
          articleJsonLd({
            headline: 'Risk-Reward Calculator: R:R and Payoff Ratio',
            description:
              'A free browser-only calculator that compares entry, stop, and target to show the risk-reward ratio and potential payoff.',
            path: '/tools/risk-reward-calculator/',
          }),
          {
            '@context': 'https://schema.org',
            '@type': 'WebApplication',
            name: 'Risk-Reward Calculator',
            applicationCategory: 'FinanceApplication',
            operatingSystem: 'Any',
            url: 'https://daytraderskill.com/tools/risk-reward-calculator/',
            description:
              'A paper-first risk-reward calculator for educational use. No broker connection, no market data, and no order path.',
            offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
          },
          faqJsonLd(faqs),
        ]}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / <Link href="/tools/">Tools</Link> / Risk-reward calculator
      </nav>

      <ToolsNav current="/tools/risk-reward-calculator/" />

      <header className="article-head">
        <p className="eyebrow">Tools · Free calculator</p>
        <h1>Risk-Reward Calculator</h1>
        <p className="article-meta">
          <span>Reviewed 5 November 2026</span>
          <span>Browser-only</span>
          <span>Not financial advice</span>
        </p>
      </header>

      <div className="tldr">
        <strong>TL;DR.</strong> Enter a planned entry, stop, and target to see the reward-to-risk
        ratio and the potential profit or loss per share. Add an optional share count for the full
        position. A ratio is arithmetic, not a probability, and a high ratio does not promise a win.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> This tool does not recommend a trade, a target, or a
          position size. It has no broker connection, no market data feed, and no order path. Most
          people who day trade lose money.
        </p>
      </div>

      <figure className="page-visual">
        <img
          src="/illustrations/risk-reward.svg"
          alt="Diagram comparing a one-risk-unit stop distance with a three-risk-unit target distance."
          width={720}
          height={300}
          loading="lazy"
        />
        <figcaption>
          Risk is the distance to invalidation; reward is the distance to the planned target. A ratio
          is not a forecast.
        </figcaption>
      </figure>

      <RiskRewardCalculator />

      <h2>How the risk-reward calculator works</h2>
      <p>
        The calculator compares two distances. Risk per share is the entry price minus the stop price.
        Reward per share is the target price minus the entry price. Dividing reward by risk gives the
        reward-to-risk ratio. If the planned risk is $2.00 per share and the planned reward is $6.00
        per share, the ratio is 3:1.
      </p>
      <div className="formula-strip">
        risk per share = entry − stop
        <br />
        reward per share = target − entry
        <br />
        R:R = reward per share ÷ risk per share
        <br />
        break-even hit rate = 1 ÷ (1 + R:R)
      </div>
      <p>
        The optional share count turns the per-share figures into a full-position loss and profit.
        That can be useful for a paper plan: it shows whether the arithmetic fits the risk budget you
        set with the <Link href="/tools/position-size-calculator/">position size calculator</Link>.
        It still does not account for fees, slippage, or the chance that the stop fills at a worse
        price.
      </p>

      <h2>What the ratio does not tell you</h2>
      <p>
        A 3:1 ratio sounds attractive, but it says nothing about how often the target is reached. A
        strategy with a large target and a low hit rate can lose money. A strategy with a small target
        and a high hit rate can also lose money after costs. The ratio is one input into a plan, not
        a verdict on the plan.
      </p>
      <p>
        The break-even hit rate shown in the result is the mathematical win rate needed to break even
        at that ratio, before costs. It is useful for understanding the trade-off between risk,
        reward, and frequency. It is not a prediction, and it should not be treated as a probability
        of success.
      </p>
      <p>
        Targets are especially easy to fit to a narrative after the fact. A target should come from
        the setup and the conditions you are studying, not from a desire to make the ratio look
        better. If moving the target farther away makes the idea less plausible, the higher ratio is
        not an improvement.
      </p>

      <h2>Putting the ratio into a paper-first process</h2>
      <ul>
        <li>
          Write the entry, stop, and target before the session. Do not adjust them to fit a result.
        </li>
        <li>
          Size the position from the stop distance and a risk budget, not from the ratio.
        </li>
        <li>
          Journal the planned ratio and the realised outcome separately. They answer different
          questions.
        </li>
        <li>
          Review a series of decisions, not one trade. A single ratio or outcome says very little.
        </li>
        <li>
          Include fees and slippage in the review even when the calculator does not.
        </li>
      </ul>
      <p>
        Use the <Link href="/paper-trading/">paper trading guide</Link> to rehearse the full loop,
        then read the <Link href="/learn/how-to-start-day-trading/">how to start day trading roadmap</Link>{' '}
        for the order of study. The <Link href="/safety/">safety checklist</Link> covers the approval
        and paper-default rules around trading software.
      </p>

      <div className="callout compliance">
        <p>
          <strong>Compliance note.</strong> DayTraderSkill.com is not a broker, investment adviser, or
          signal service. This calculator does not execute trades and does not provide personalised
          advice. No profit is promised.
        </p>
      </div>

      <h2>Frequently asked questions</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          {
            href: '/tools/position-size-calculator/',
            label: 'Position size calculator',
            description: 'Turn the stop distance and risk budget into a share count.',
          },
          {
            href: '/paper-trading/',
            label: 'What is paper trading?',
            description: 'Rehearse the plan in a simulator and journal the decisions.',
          },
          {
            href: '/learn/how-to-start-day-trading/',
            label: 'How to start day trading',
            description: 'A paper-first roadmap from mechanics to review.',
          },
          {
            href: '/safety/#risk',
            label: 'Risk basics and hard rules',
            description: 'The guardrails that belong around the arithmetic.',
          },
        ]}
      />

      <NextPath
        links={[
          {
            href: '/learn/how-to-start-day-trading/',
            label: 'Follow the start roadmap',
            description: 'Put entry, invalidation, and review in a written process.',
          },
          {
            href: '/paper-trading/',
            label: 'Rehearse the plan on paper',
            description: 'Use the flow, checklist, and printable journal.',
          },
          {
            href: '/tools/position-size-calculator/',
            label: 'Size the same plan',
            description: 'Convert the risk budget into a suggested share count.',
          },
        ]}
      />
    </article>
  );
}
