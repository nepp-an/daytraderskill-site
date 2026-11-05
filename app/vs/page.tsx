import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { UPSTREAM_REPO, UPSTREAM_V1 } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Claude Trading Skills Comparison',
  description:
    'Claude trading skills compared: Day Trader Skill vs trader-skill v1 and other packs — workflow fit, broker reach, update risk. Not a Claude agent skills / Superpowers homepage. NFA; no smear.',
  alternates: { canonical: '/vs/' },
};

export default function VsPage() {
  return (
    <>
      <ToolsNav current="/vs/" />
      <h1>Claude trading skills compared: Day Trader Skill vs other packs</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> Looking for <strong>Claude trading skills</strong> side-by-side?
        Day Trader Skill is the day-trading sequel to trader-skill v1: eleven skills, public-data
        Python helpers, paper default, human yes before orders. Other repos emphasize prompts,
        different brokers, or regional workflows. Choose by <em>workflow fit and maintenance
        risk</em>, not star-count theater — and never on profit claims. This page is not trying to
        rank broad Claude agent skills or Superpowers directories.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Comparisons here are about software shape and
          operational risk. They are not performance rankings. Most day traders lose money
          regardless of which skill pack they install.
        </p>
      </div>

      <h2>vs trader-skill v1 (same author line)</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Dimension</th>
            <th>trader-skill v1</th>
            <th>day-trader-skill (v2 sequel)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Primary job</td>
            <td>Investor-style workflows (e.g. 13F / screening / lots themes)</td>
            <td>Intraday scan → plan → simulate → size → risk → ticket</td>
          </tr>
          <tr>
            <td>Repo</td>
            <td>
              <a href={UPSTREAM_V1} rel="noopener noreferrer" target="_blank">
                Jakeschincariol/trader-skill
              </a>
            </td>
            <td>
              <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
                Jakeschincariol/day-trader-skill
              </a>
            </td>
          </tr>
          <tr>
            <td>Skill count (upstream framing)</td>
            <td>Earlier investor pack</td>
            <td>11 day-trading skills</td>
          </tr>
          <tr>
            <td>Order path emphasis</td>
            <td>Not the same intraday ticket chain</td>
            <td>Explicit broker skill + paper default + typed yes</td>
          </tr>
          <tr>
            <td>When to prefer</td>
            <td>Longer-horizon research / filing-oriented experiments</td>
            <td>Session-oriented planning drills on paper</td>
          </tr>
        </tbody>
      </table>
      <p>
        Upstream describes day-trader-skill as the day-trading sequel to trader-skill. You do not
        need both unless you personally want both workflows. Installing more skills does not
        improve expectancy.
      </p>

      <h2>vs other Claude / agent trading skill packs</h2>
      <p>
        The Agent Skills ecosystem moves quickly. Names below are <strong>examples of categories
        you will see in search results and GitHub</strong> (prompt packs, broker-tied agents,
        regional forks). Details change; always open the repo and read the date of the last push.
        We intentionally avoid smear language and fake “tier lists.”
      </p>
      <table className="data">
        <thead>
          <tr>
            <th>Lens</th>
            <th>Day Trader Skill</th>
            <th>Typical prompt-only packs</th>
            <th>Other broker/agent packs &amp; forks</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>What you get</td>
            <td>Skills + plain Python tools + shared trader/ files</td>
            <td>Mostly markdown prompts / checklists</td>
            <td>Varies: some wrap APIs, some localize symbols/tax notes</td>
          </tr>
          <tr>
            <td>Paid market-data API key</td>
            <td>Core flow framed around free public sources</td>
            <td>Usually none (no code)</td>
            <td>Often yes if they stream paid data or proprietary APIs</td>
          </tr>
          <tr>
            <td>Can reach a broker?</td>
            <td>Yes, via connector after dual approval; paper default</td>
            <td>Usually no (chat text only)</td>
            <td>Sometimes yes — audit carefully</td>
          </tr>
          <tr>
            <td>Human gate</td>
            <td>Typed yes + Needs approval posture</td>
            <td>You still execute manually everywhere</td>
            <td>Mixed; some over-automate — treat as higher ops risk</td>
          </tr>
          <tr>
            <td>Update risk</td>
            <td>
              High if upstream stays on a single-day push — see{' '}
              <Link href="/changelog-watch/">changelog watch</Link>
            </td>
            <td>Low code risk, high prompt drift</td>
            <td>Fork sprawl; verify parent commits</td>
          </tr>
          <tr>
            <td>Risk grade (ops)</td>
            <td>Medium if paper+approvals; high if live+Always allow</td>
            <td>Lower ops risk, still high trading risk if you act</td>
            <td>Wide range — read code before trust</td>
          </tr>
        </tbody>
      </table>
      <p className="muted" id="ecosystem">
        Category examples people compare in articles include investor-oriented packs, third-party
        “Claude day trader” write-ups, and regional forks. Broad terms like Claude agent skills or
        Superpowers Claude are adjacent ecosystem searches — useful context, not this site’s home
        intent. We link the canonical MIT repos above rather than ranking unaudited mirrors.
      </p>

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
          { href: '/install/', label: 'Day trader skill install' },
          { href: '/safety/', label: 'Claude day trader skill safety' },
          { href: '/skills/', label: '11 trader-* skill modules' },
          { href: '/changelog-watch/', label: 'Day trader skill GitHub update watch' },
        ]}
      />
    </>
  );
}
