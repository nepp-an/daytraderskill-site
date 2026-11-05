import type { Metadata } from 'next';
import Link from 'next/link';
import { NextPath } from '@/components/NextPath';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { CalculatorIcon, ScaleIcon } from '@/components/icons';
import { UPSTREAM_REPO } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Day Trading Tools, Calculators & Claude Skills Guides' },
  description:
    'A paper-first tools hub: free position-size and risk-reward calculators, a paper session journal, Claude skills install guides, and software comparisons without signals or hype. Not financial advice.',
  alternates: { canonical: '/tools/' },
  openGraph: {
    title: 'Day Trading Tools, Calculators & Claude Skills Guides',
    description:
      'Free paper-first calculators, a session journal, and independent guides to trading software. No signals or profit promises.',
    url: '/tools/',
    images: [
      {
        url: '/og/tools.svg',
        width: 1200,
        height: 630,
        alt: 'DayTraderSkill.com tools hub — paper-first calculators and guides',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Day Trading Tools & Calculators',
    description: 'Calculators, checklists, and independent software guides.',
    images: ['/og/tools.svg'],
  },
};

export default function ToolsHubPage() {
  return (
    <div className="hub-page">
      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Tools
      </nav>

      <header className="hub-intro">
        <p className="eyebrow">Tools</p>
        <h1>Tools should support a process — not replace judgment</h1>
        <p className="lead">
          Guides to Claude skills, simulators, scanners, and the open-source Day Trader Skill pack.
          Every tool here is presented as software with limits. None of it is a signal service, a
          broker, or a promise of profit.
        </p>
        <p className="compliance-note">
          <strong>Needs approval:</strong> if a tool can reach an order path, keep a human
          confirmation and do not set it to Always allow. Paper trading remains the default.
        </p>
      </header>

      <ToolsNav current="/tools/" />

      <section aria-labelledby="calculators-heading">
        <div className="section-head">
          <p className="eyebrow">Free · no login · no market data</p>
          <h2 id="calculators-heading">Paper-first calculators</h2>
          <p>
            Two browser-only arithmetic tools for a written plan. Neither one connects to a broker,
            reads a quote, or places an order.
          </p>
        </div>

        <div className="index-grid">
          <article className="index-card">
            <span className="tool-teaser-icon" aria-hidden="true">
              <CalculatorIcon size={22} />
            </span>
            <p className="card-kicker">Risk sizing</p>
            <h2>
              <Link href="/tools/position-size-calculator/">Position size calculator</Link>
            </h2>
            <p>
              Account size, risk percentage, entry price, and stop distance become a suggested share
              count and position value.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/tools/position-size-calculator/">Open the position size calculator →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <span className="tool-teaser-icon" aria-hidden="true">
              <ScaleIcon size={22} />
            </span>
            <p className="card-kicker">Payoff check</p>
            <h2>
              <Link href="/tools/risk-reward-calculator/">Risk-reward calculator</Link>
            </h2>
            <p>
              Entry, stop, and target become an R:R ratio, potential profit and loss, and a
              break-even hit rate before costs.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/tools/risk-reward-calculator/">Open the risk-reward calculator →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <span className="tool-teaser-icon" aria-hidden="true">
              <CalculatorIcon size={22} />
            </span>
            <p className="card-kicker">Practice record</p>
            <h2>
              <Link href="/paper-trading/#paper-journal">Paper checklist and journal</Link>
            </h2>
            <p>
              A first-session checklist and a printable journal embedded in the paper trading guide.
              No account is created.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/paper-trading/#paper-journal">Open the paper journal →</Link>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section aria-labelledby="tool-guides-heading">
        <div className="section-head">
          <h2 id="tool-guides-heading">Tool guides</h2>
          <p>Start with the general skill setup, then choose a specific workflow only if it fits.</p>
        </div>

        <div className="index-grid">
          <article className="index-card">
            <p className="card-kicker">Setup guide</p>
            <h2>
              <Link href="/tools/install-claude-skills/">How to install Claude skills</Link>
            </h2>
            <p>
              A vendor-neutral walkthrough: repository install, Claude Code plugins, manual skill
              folders, permission checks, testing, updates, and removal.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/tools/install-claude-skills/">Read the install guide →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <p className="card-kicker">Featured tool</p>
            <h2>
              <Link href="/install/">Day Trader Skill install</Link>
            </h2>
            <p>
              Four install paths for the third-party Claude skills pack, plus Python and SEC
              identity notes. Independent guide; not the official project site.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/install/">Open the install guide →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <p className="card-kicker">Reference</p>
            <h2>
              <Link href="/skills/">The 11 skill modules</Link>
            </h2>
            <p>
              What each <code className="inline">trader-*</code> command does, what it reads, what it
              writes, and where the human approval gate sits.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/skills/">Browse the module index →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <p className="card-kicker">Comparison</p>
            <h2>
              <Link href="/vs/">Claude trading tools compared</Link>
            </h2>
            <p>
              Workflow fit, broker reach, and update risk — compared without star-count theater or
              performance rankings.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/vs/">Read the comparison →</Link>
              </li>
            </ul>
          </article>

          <article className="index-card">
            <p className="card-kicker">Guardrail</p>
            <h2>
              <Link href="/safety/">Safety and approval gates</Link>
            </h2>
            <p>
              Paper default, typed confirmation, Needs approval, secret handling, and the claims this
              site refuses to make.
            </p>
            <ul className="card-links">
              <li>
                <Link href="/safety/">Review the safety checklist →</Link>
              </li>
            </ul>
          </article>
        </div>
      </section>

      <section className="split-panel" aria-labelledby="selection-heading">
        <div>
          <p className="eyebrow">Before you install</p>
          <h2 id="selection-heading">A five-minute tool check</h2>
          <p>
            A tool can be useful and still be a bad fit. Check the source, the permissions, and the
            failure modes before you connect it to anything that matters.
          </p>
          <p>
            For trading workflows, test on paper first. A tool that cannot explain its output, or
            that asks for blanket approval, is not a shortcut — it is a new risk.
          </p>
        </div>
        <div>
          <ul className="checklist">
            <li>Who maintains it, and when was the last code push?</li>
            <li>Does it run code or make network requests?</li>
            <li>What permissions does it need, and can they be narrower?</li>
            <li>Does it require a typed confirmation before an order?</li>
            <li>Can you remove it cleanly and audit what it wrote?</li>
          </ul>
        </div>
      </section>

      <div className="tool-note">
        <strong>Independence note.</strong>
        <p>
          Day Trader Skill is a third-party MIT project on GitHub. DayTraderSkill.com is an
          independent guide, <strong>not the official project site</strong> and not affiliated with
          its authors. Canonical source:{' '}
          <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
            github.com/Jakeschincariol/day-trader-skill
          </a>
          .
        </p>
      </div>

      <Related
        links={[
          {
            href: '/tools/install-claude-skills/',
            label: 'How to install Claude skills',
            description: 'General setup, testing, and permissions.',
          },
          {
            href: '/paper-trading/',
            label: 'Practice before real money',
            description: 'What a simulator can and cannot teach.',
          },
          {
            href: '/safety/',
            label: 'Safety checklist',
            description: 'The non-negotiables for trading tools.',
          },
        ]}
      />

      <NextPath
        links={[
          {
            href: '/tools/position-size-calculator/',
            label: 'Size a paper position',
            description: 'Risk budget and stop distance → suggested shares.',
          },
          {
            href: '/tools/risk-reward-calculator/',
            label: 'Check the planned payoff',
            description: 'Entry, stop, and target → R:R before costs.',
          },
          {
            href: '/paper-trading/',
            label: 'Rehearse the workflow',
            description: 'Flow, checklist, and journal for a simulated session.',
          },
        ]}
      />
    </div>
  );
}
