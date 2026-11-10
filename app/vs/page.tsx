import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { UPSTREAM_REPO, UPSTREAM_V1 } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Claude Trading Skills Comparison',
  description:
    'Claude trading skills compared: Day Trader Skill v2 vs trader-skill v1, with the real 11-command lists, workflow differences and verified dates. Not a performance ranking, not financial advice.',
  alternates: { canonical: '/vs/' },
};

const V1_COMMANDS = [
  { command: '/trader-copycat', job: 'Reverse Engineer', detail: 'Reads an investor’s 13F-HR on SEC EDGAR and rebuilds the portfolio as weights, with what changed since last quarter.' },
  { command: '/trader-news', job: 'News Monitor', detail: 'Watches headlines and 8-K filings for stocks held and flags what touches them.' },
  { command: '/trader-budget', job: 'Budget Manager', detail: 'Sizes positions to a budget, keeps a cash buffer and caps any one stock.' },
  { command: '/trader-pelosi', job: 'Pelosi Tracker', detail: 'Reads House PTRs as they post, turns each PDF into rows and alerts once per new filing.' },
  { command: '/trader-analyst', job: 'Earnings Analyst', detail: 'Pulls reported numbers from SEC XBRL and the latest earnings release.' },
  { command: '/trader-screener', job: 'Stock Screener', detail: 'Screens companies against the user’s rules and ranks what passes.' },
  { command: '/trader-risk', job: 'Risk Manager', detail: 'Checks proposed orders against limits and blocks anything over them.' },
  { command: '/trader-broker', job: 'Order Executor', detail: 'Turns an approved order into the exact ticket a brokerage connector receives, and records the yes.' },
  { command: '/trader-tax', job: 'Tax Optimizer', detail: 'Tracks cost-basis lots, gains and losses, tax-loss harvesting candidates and wash sales.' },
  { command: '/trader-alerts', job: 'Price Alerts', detail: 'Rings on a price target, a stop or the opening bell, with the NYSE calendar.' },
  { command: '/trader-rebalance', job: 'Rebalancer', detail: 'Brings a portfolio back to target weights when it drifts past a band.' },
];

const V2_COMMANDS = [
  { command: '/trader-scanner', job: 'Chart Scanner', detail: 'Scans a US-equity universe for closing-high breakouts, flags, oversold names and opening-range breakouts.' },
  { command: '/trader-news', job: 'News Monitor', detail: 'Headlines, 8-K filings and the move from yesterday’s close, de-duplicated between checks.' },
  { command: '/trader-entry', job: 'Entry Timer', detail: 'Waits for the first completed bar to close above the opening-range high or a level; long side only.' },
  { command: '/trader-exit', job: 'Exit Planner', detail: 'Sets the stop, target and flat-by time before entry, and writes plan.json.' },
  { command: '/trader-timemachine', job: 'Time Machine', detail: 'Replays the rest of the session 10,000 times from the stock’s own 5-minute bars, plus the past-session history.' },
  { command: '/trader-risk', job: 'Risk Manager', detail: 'PASS or BLOCK each drafted order against the configured limits, with a reason.' },
  { command: '/trader-budget', job: 'Budget Manager', detail: 'Sizes a whole-share bracket proposal to a max loss, position cap, order cap and cash.' },
  { command: '/trader-broker', job: 'Order Executor', detail: 'Shows the ticket, records the typed yes, then Claude’s Allow once / Deny card asks again. Paper default.' },
  { command: '/trader-alerts', job: 'Price Alerts', detail: 'Turns the plan into stop, target and flat-by alerts; each rings once.' },
  { command: '/trader-analyst', job: 'Earnings Analyst', detail: 'Reads SEC XBRL facts and the latest earnings 8-K, quarter by quarter and trailing twelve months.' },
  { command: '/trader-pelosi', job: 'Pelosi Tracker', detail: 'Reads House Clerk PTRs, flags holdings and keeps Senate reports on a manual route.' },
];

export default function VsPage() {
  return (
    <>
      <ToolsNav current="/vs/" />
      <h1>Claude trading skills compared: Day Trader Skill vs other packs</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> Day Trader Skill is the day-trading sequel to trader-skill v1:
        eleven commands, public-data Python helpers, paper default, human yes before orders. The two
        packs share seven commands but are built for different horizons. v2 adds scanner, entry,
        exit and Time Machine; v1 keeps copycat, screener, tax and rebalance. This page shows the
        real command lists and the verified dates, not a performance ranking or a competitor feature
        guess. Not financial advice.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Comparisons here are about software shape and
          operational risk. They are not performance rankings. The SEC’s{' '}
          <a href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html" rel="noopener noreferrer" target="_blank">
            2005 day-trading bulletin
          </a>{' '}
          warns that many traders suffer severe losses in their first months, regardless of which
          skill pack they install.
        </p>
      </div>

      <h2>What is actually being compared</h2>
      <p>
        The comparison is between two public MIT repositories, not between two sets of marketing
        claims. Both are linked below. The v1 command list comes from the{' '}
        <a href={UPSTREAM_V1} rel="noopener noreferrer" target="_blank">
          trader-skill README
        </a>
        ; the v2 list comes from the{' '}
        <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          day-trader-skill repository
        </a>{' '}
        and its eleven <code className="inline">SKILL.md</code> files. The commands are the product,
        so they are the first thing to compare. Neither repo promises returns, and neither is the
        official site of this independent guide.
      </p>

      <h2>v1: eleven commands, verified from the v1 README</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Command</th>
            <th>Name</th>
            <th>What it is for</th>
          </tr>
        </thead>
        <tbody>
          {V1_COMMANDS.map((row) => (
            <tr key={row.command}>
              <td>
                <code className="inline">{row.command}</code>
              </td>
              <td>{row.job}</td>
              <td>{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>v2: eleven commands, verified from the day-trader-skill repo</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Command</th>
            <th>Name</th>
            <th>What it is for</th>
          </tr>
        </thead>
        <tbody>
          {V2_COMMANDS.map((row) => (
            <tr key={row.command}>
              <td>
                <code className="inline">{row.command}</code>
              </td>
              <td>{row.job}</td>
              <td>{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>What changed, and what did not</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Lens</th>
            <th>trader-skill v1</th>
            <th>day-trader-skill v2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary horizon</td>
            <td>Investor-style workflows: copy a 13F, screen, maintain a portfolio</td>
            <td>Intraday: scan → news → entry → exit → replay → size → risk → ticket</td>
          </tr>
          <tr>
            <td>Commands unique to the pack</td>
            <td>
              <code className="inline">/trader-copycat</code>,{' '}
              <code className="inline">/trader-screener</code>,{' '}
              <code className="inline">/trader-tax</code>,{' '}
              <code className="inline">/trader-rebalance</code>
            </td>
            <td>
              <code className="inline">/trader-scanner</code>,{' '}
              <code className="inline">/trader-entry</code>,{' '}
              <code className="inline">/trader-exit</code>,{' '}
              <code className="inline">/trader-timemachine</code>
            </td>
          </tr>
          <tr>
            <td>Shared commands</td>
            <td colSpan={2}>
              <code className="inline">/trader-news</code>,{' '}
              <code className="inline">/trader-budget</code>,{' '}
              <code className="inline">/trader-pelosi</code>,{' '}
              <code className="inline">/trader-analyst</code>,{' '}
              <code className="inline">/trader-risk</code>,{' '}
              <code className="inline">/trader-broker</code>,{' '}
              <code className="inline">/trader-alerts</code>
            </td>
          </tr>
          <tr>
            <td>Order path</td>
            <td>Broker ticket plus recorded yes; not the same intraday ticket chain</td>
            <td>
              Risk PASS today + typed yes for that order + Allow once on a Needs approval connector.
              Paper is the default.
            </td>
          </tr>
          <tr>
            <td>Shared data shape</td>
            <td colSpan={2}>
              Both write a local <code className="inline">trader/</code> folder and pass files
              between skills. Both are plain Python plus SKILL.md, not a hosted service.
            </td>
          </tr>
          <tr>
            <td>Best fit</td>
            <td>Longer-horizon research, screening and portfolio maintenance experiments</td>
            <td>Session-oriented planning drills and paper rehearsal of an intraday workflow</td>
          </tr>
        </tbody>
      </table>
      <p>
        The v2 README describes the repo as “its day-trading sequel: the Trader skill v2.” That is a
        positioning statement, not a performance claim. You do not need both packs unless you
        personally want both workflows. Installing more skills does not improve expectancy.
      </p>

      <h2>Choose v1, v2, or neither</h2>
      <table className="data">
        <thead>
          <tr>
            <th>If your question is…</th>
            <th>Start with</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>“What does this investor hold, and what changed?”</td>
            <td>v1 <code className="inline">/trader-copycat</code></td>
            <td>13F reconstruction is a v1 command; v2 does not carry it.</td>
          </tr>
          <tr>
            <td>“Can I rehearse one intraday trade end to end?”</td>
            <td>v2 scanner → news → entry → exit → timemachine</td>
            <td>That chain is the v2 design, including a written plan and a replay before sizing.</td>
          </tr>
          <tr>
            <td>“How do I keep a long-term portfolio balanced?”</td>
            <td>v1 <code className="inline">/trader-rebalance</code></td>
            <td>Rebalancing is a v1 command; v2 is built around a single session trade.</td>
          </tr>
          <tr>
            <td>“I want tax-lot and wash-sale tracking.”</td>
            <td>v1 <code className="inline">/trader-tax</code></td>
            <td>v2 does not carry the tax optimizer. Neither pack is tax advice.</td>
          </tr>
          <tr>
            <td>“I want a hands-off bot that trades while I sleep.”</td>
            <td>Neither</td>
            <td>
              Both repos are explicit that only the broker skill can lead to an order, and only
              with a human yes. That is not an automation product.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Other packs: what this page will not claim</h2>
      <p>
        The Agent Skills ecosystem changes quickly, and a feature list copied from a search result
        is stale before it is published. This page does not score unnamed competitor packs, does not
        invent their features or returns, and does not call one pack “best.” Instead, use the same
        checklist on any repo you are considering:
      </p>
      <ul className="checklist">
        <li>
          <strong>Canonical source and license.</strong> Open the repo, confirm the owner and read
          the license. A fork can be useful, but verify what changed from its parent.
        </li>
        <li>
          <strong>Last code push, not last README edit.</strong> A polished README with an old code
          tree is a maintenance signal, not a feature.
        </li>
        <li>
          <strong>What actually executes.</strong> Separate prompt-only packs from packs with
          scripts. If there are scripts, read what they fetch, where they write and what they send.
        </li>
        <li>
          <strong>Order path and defaults.</strong> Does the pack have any order-capable tool? Is
          paper the default? Is there a human confirmation, and is it per order? Can it run from a
          scheduled task?
        </li>
        <li>
          <strong>Data sources and cost.</strong> Public endpoints, a paid feed, or a broker API?
          Free data can lag; paid data is not a profit guarantee. Check for required keys.
        </li>
        <li>
          <strong>Tests and failure behavior.</strong> Offline fixtures, a test command, and plain
          refusal messages are better than a demo that only works on a good day.
        </li>
      </ul>

      <h2>Dates and evidence for this comparison</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Item</th>
            <th>What was checked</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>v2 latest code push</td>
            <td>
              20 October 2026, commit <code className="inline">3d0f4ef698</code> (“The Trader skill
              v2: 11 day-trading skills”).
            </td>
          </tr>
          <tr>
            <td>v2 plugin manifest</td>
            <td>
              <code className="inline">.claude-plugin/plugin.json</code> version 2.0.0, eleven
              skills, MIT.
            </td>
          </tr>
          <tr>
            <td>v1 command list</td>
            <td>Read from the public v1 README on 10 November 2026. This page does not claim a v1 push date.</td>
          </tr>
          <tr>
            <td>This page</td>
            <td>
              Checked 10 November 2026 against the two public repos and their SKILL.md files. The
              site’s <Link href="/changelog-watch/">update watch</Link> records the same upstream
              snapshot; it is a watcher’s checklist, not a live commit feed.
            </td>
          </tr>
        </tbody>
      </table>

      <h2>When day-trader-skill is a reasonable fit</h2>
      <ul>
        <li>You already use Claude or Claude Code and want a structured intraday checklist.</li>
        <li>You want scripts that write intermediate files (plan, orders) you can inspect.</li>
        <li>You are willing to stay on <Link href="/paper-trading/">paper</Link> while learning.</li>
        <li>You accept public-data limitations and will verify on a broker platform.</li>
      </ul>

      <h2>When to skip it (or pick something else)</h2>
      <ul>
        <li>You want a hands-off bot that trades while you sleep — this pack is explicitly not that.</li>
        <li>You need guaranteed vendor support / SLA — it is MIT software on GitHub.</li>
        <li>You only wanted longer-horizon 13F-style workflows — look at trader-skill v1 instead.</li>
        <li>
          You are chasing “Claude make money” content — stop; that intent is how people ignore{' '}
          <Link href="/safety/">safety</Link>.
        </li>
        <li>Upstream looks abandoned for your risk tolerance — wait, fork carefully, or use paper-only prompts.</li>
      </ul>

      <h2>Honest bottom line</h2>
      <div className="callout">
        <p>
          Stars measure attention, not edge. A thoughtful paper rehearsal with boring risk limits
          beats a flashy live misconfiguration every time. If you install anything, install from
          the canonical GitHub URL, keep Needs approval, and use this site’s{' '}
          <Link href="/install/troubleshoot/">troubleshoot</Link> matrix when slash commands
          disagree with screenshots.
        </p>
      </div>

      <Related
        links={[
          { href: '/install/', label: 'Day trader skill install', description: 'Four paths plus a read-only verification ladder.' },
          { href: '/safety/', label: 'Claude day trader skill safety', description: 'Paper default, Needs approval and the credential boundary.' },
          { href: '/skills/', label: '11 trader-* skill modules', description: 'Each command with its own inputs, steps and failure limits.' },
          { href: '/changelog-watch/', label: 'Day trader skill GitHub update watch', description: 'The upstream snapshot this comparison is based on.' },
        ]}
      />
    </>
  );
}
