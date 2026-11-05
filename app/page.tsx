import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { SKILLS } from '@/lib/skills';
import { BRAND, UPSTREAM_REPO } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Day Trader Skill — Claude Pack Guide',
  description:
    'What is day trader skill / Claude day trader skill? Independent guide to the 11-skill pack (not an auto-trading bot), day trading skills Claude workflows, install, paper default, NFA.',
  alternates: { canonical: '/' },
};

export default function HomePage() {
  return (
    <>
      <h1>Day Trader Skill: Claude day trader skill pack — 11 skills, not an auto-trading bot</h1>

      <div className="tldr">
        <strong>TL;DR.</strong> <strong>Day trader skill</strong> (also searched as{' '}
        <strong>Claude day trader skill</strong> / day trading skills Claude) is a free MIT pack of{' '}
        <strong>11 Claude skills</strong> plus plain-Python helpers that read public market data. It
        helps you scan, research, plan, simulate, size, and — only after you type yes — send a
        ticket. <strong>It is not a set-and-forget trading bot.</strong> Paper trading is the
        default. This site ({BRAND}) is an <strong>independent</strong> install / safety /
        comparison guide — <strong>not</strong> the official project homepage. Not financial advice.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Most people who day trade lose money. You can lose
          money. Nothing on this site promises profits, win rates, signals, or trade-on-your-behalf
          service. Decide for yourself; talk to a licensed professional if you need advice.
        </p>
      </div>

      <div className="cta-row">
        <Link className="btn primary" href="/install/">
          Install guide (4 paths)
        </Link>
        <Link className="btn" href="/safety/">
          Safety checklist
        </Link>
        <a className="btn" href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          Upstream GitHub (source)
        </a>
      </div>

      <h2>What this pack actually is</h2>
      <ul>
        <li>
          <strong>Eleven named Claude skills</strong> (for example <code className="inline">/trader-scanner</code>,{' '}
          <code className="inline">/trader-broker</code>) that share a <code className="inline">trader/</code> workspace.
        </li>
        <li>
          <strong>Standard-library Python tools</strong> that read free public data (Yahoo Finance charts,
          Nasdaq Trader lists, SEC EDGAR, House Clerk disclosures) — no paid market-data API key required
          for the core flow described upstream.
        </li>
        <li>
          A <strong>human-in-the-loop order path</strong>: risk checks first; broker skill shows a ticket;
          you must type <em>yes</em>; Claude’s connector still asks Allow once / Deny. Paper is default.
        </li>
      </ul>
      <p>
        What it is <strong>not</strong>: a hosted auto-trader, a signal group, a broker, a prop firm, or
        an official Anthropic / Claude product page. Skills run where you already use Claude or Claude
        Code, on your machine and accounts.
      </p>

      <h2>Upstream source &amp; freshness risk</h2>
      <p>
        Canonical source:{' '}
        <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          github.com/Jakeschincariol/day-trader-skill
        </a>{' '}
        (MIT). This website is <strong>not affiliated</strong> with that repository’s authors and is{' '}
        <strong>not</strong> the official site.
      </p>
      <div className="callout warn">
        <p>
          As of early November 2026 Asia/Shanghai checks, the upstream repo was created and last{' '}
          <em>code-pushed</em> on the same day (2026-10-20) despite rapid star/fork growth. That means{' '}
          <strong>stale-maintainer risk is real</strong>: issues may pile up, and behavior can diverge
          across forks. Prefer the official GitHub URL above, read commits yourself, and track changes
          on our <Link href="/changelog-watch/">changelog watch</Link> page.
        </p>
      </div>

      <h2>The eleven skills (overview)</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Command</th>
            <th>Job</th>
            <th>One-line role</th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map((s) => (
            <tr key={s.slug}>
              <td>
                <Link href={`/skills/${s.slug}/`}>
                  <code>{s.command}</code>
                </Link>
              </td>
              <td>{s.name}</td>
              <td>{s.job}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Typical single-trade chain:{' '}
        <strong>
          scanner → news → entry → exit → timemachine → budget → risk → broker
        </strong>
        . Alerts run while a position is open. News / analyst / pelosi can also run on a schedule.
        Full index: <Link href="/skills/">Skills hub</Link>.
      </p>

      <h2>How this guide differs from copying the README</h2>
      <ul>
        <li>
          <Link href="/install/">Four install paths</Link> with when-to-use notes (Claude paste, Claude
          Code marketplace, copy folders, SKILL.md-only).
        </li>
        <li>
          A dedicated <Link href="/install/troubleshoot/">troubleshoot matrix</Link> for namespaces,
          Python, SEC user-agent, sandbox networking, and approval cards.
        </li>
        <li>
          A hard <Link href="/safety/">safety checklist</Link>: paper default, Needs approval, no Always
          allow, keys out of chat, stop ≠ guarantee.
        </li>
        <li>
          Honest <Link href="/vs/">comparisons</Link> vs trader-skill v1 and other Claude trading skill
          packs — no smear pieces, no “guaranteed edge” claims.
        </li>
      </ul>

      <h2>Link hub</h2>
      <div className="card-grid">
        <div className="card">
          <h3>
            <Link href="/install/">Install</Link>
          </h3>
          <p className="muted">Claude.ai, Claude Code plugin, folder copy, SKILL.md paste.</p>
        </div>
        <div className="card">
          <h3>
            <Link href="/install/troubleshoot/">Troubleshoot</Link>
          </h3>
          <p className="muted">Commands missing, SEC UA, Python, network, permissions.</p>
        </div>
        <div className="card">
          <h3>
            <Link href="/safety/">Safety</Link>
          </h3>
          <p className="muted">Paper first, dual approval, what we refuse to promote.</p>
        </div>
        <div className="card">
          <h3>
            <Link href="/vs/">VS other packs</Link>
          </h3>
          <p className="muted">When day-trader-skill fits — and when it does not.</p>
        </div>
        <div className="card">
          <h3>
            <Link href="/paper-trading/">Paper trading</Link>
          </h3>
          <p className="muted">Rehearse the full chain without live capital.</p>
        </div>
        <div className="card">
          <h3>
            <Link href="/faq/">FAQ</Link>
          </h3>
          <p className="muted">Auto-trade myths, Pro plans, PDT notes, taxes.</p>
        </div>
      </div>

      <Related
        links={[
          { href: '/install/', label: 'Day trader skill install (Claude Code)' },
          { href: '/safety/', label: 'Claude day trader skill safety & paper trading' },
          { href: '/vs/', label: 'Claude trading skills comparison' },
          { href: '/install/troubleshoot/', label: 'Day trader skill not working' },
        ]}
      />
    </>
  );
}
