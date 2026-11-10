import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { UPSTREAM_REPO } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Day Trader Skill Install (Claude Code)',
  description:
    'Day trader skill install: set up the open-source Claude Code trading skill through four paths — paste the repo URL, add the plugin, copy trader-* folders, or paste SKILL.md. Keep paper trading as the default. Not financial advice.',
  alternates: { canonical: '/install/' },
};

export default function InstallPage() {
  return (
    <>
      <ToolsNav current="/install/" />
      <h1>Day Trader Skill install: Claude Code trading skill &amp; four paths</h1>
      <p className="hero-lead">
        Install the <strong>Day Trader Skill</strong> — the open-source{' '}
        <strong>Claude Code trading skill</strong> — using whichever of the four paths matches your
        setup. All four install the same upstream pack; the install itself does not connect a
        broker or require a brokerage account. Start on paper, keep approvals on, and read the{' '}
        <Link href="/safety/">safety checklist</Link> before enabling any order-capable tool.
      </p>
      <div className="tldr">
        <strong>TL;DR.</strong> This is the <strong>day trader skill install</strong> guide —
        including the <strong>Claude Code trading skill</strong> plugin path. Path A (paste URL) is
        fastest for Claude chat. Path B is for Claude Code plugins. Path C copies folders for plain{' '}
        <code className="inline">/trader-*</code> commands. Path D pastes a single{' '}
        <code className="inline">SKILL.md</code> when you cannot install tools. Always set paper
        defaults and read the <Link href="/safety/">safety checklist</Link> before any broker
        connector. Source:{' '}
        <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          upstream GitHub
        </a>{' '}
        — this page is not the official site. Not financial advice.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Installing skills does not make day trading safe.
          The SEC’s{' '}
          <a href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html" rel="noopener noreferrer" target="_blank">
            2005 day-trading bulletin
          </a>{' '}
          warns that many traders suffer severe losses in their first months. Keep{' '}
          <strong>paper trading</strong> as the default.
        </p>
      </div>

      <div className="callout">
        <p>
          <strong>What install does not do.</strong> None of the four paths connects a broker,
          places an order, or requires a brokerage account. The helper scripts read public data and
          write local files. A broker connector is a separate, optional setup covered in{' '}
          <Link href="/skills/broker/">the Order Executor page</Link>; only that path can lead to an
          order, and only after a risk PASS, your typed yes and a Needs approval card.
        </p>
      </div>

      <h2>Before you start</h2>
      <ul className="checklist">
        <li>Claude account and/or Claude Code installed, depending on the path.</li>
        <li>
          <strong>Python 3.8+</strong> on the machine that will run the helper scripts (
          <code className="inline">python3 --version</code>).
        </li>
        <li>
          Nothing mandatory to <code className="inline">pip install</code> for the upstream
          standard-library tools.
        </li>
        <li>
          For SEC-facing tools (news filings / analyst), prepare a polite identity string:{' '}
          <code className="inline">Your Name you@example.com</code> for{' '}
          <code className="inline">SEC_USER_AGENT</code> or <code className="inline">trader/config.json</code>.
        </li>
        <li>
          Read <Link href="/safety/">Safety</Link> before enabling any brokerage MCP / connector.
        </li>
      </ul>

      <h2>Which path should I use?</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Path</th>
            <th>Best when</th>
            <th>Trade-off</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <a href="#path-a">A · Paste URL</a>
            </td>
            <td>You work in Claude chat and want the fewest steps</td>
            <td>Depends on Claude’s current skill-install UX</td>
          </tr>
          <tr>
            <td>
              <a href="#path-b">B · Claude Code plugin</a>
            </td>
            <td>You already live in Claude Code / terminal agents</td>
            <td>
              Commands are namespaced as{' '}
              <code className="inline">/day-trader-skill:trader-…</code>
            </td>
          </tr>
          <tr>
            <td>
              <a href="#path-c">C · Copy folders</a>
            </td>
            <td>You want plain <code className="inline">/trader-scanner</code> style names</td>
            <td>You maintain updates with git pull + re-copy</td>
          </tr>
          <tr>
            <td>
              <a href="#path-d">D · Paste SKILL.md</a>
            </td>
            <td>No Claude Code; you only need the method text</td>
            <td>You lose the Python tooling unless you run scripts yourself</td>
          </tr>
        </tbody>
      </table>

      <h2 id="path-a">Path A — Paste the repo URL into Claude</h2>
      <ol className="steps">
        <li>Open a Claude chat that supports skill install from a repository URL.</li>
        <li>
          Paste the upstream URL alone on a line:
          <pre>{UPSTREAM_REPO}</pre>
        </li>
        <li>
          On the next line, tell Claude to install the skill, for example:
          <pre>install skill</pre>
        </li>
        <li>
          Confirm the skills appear (scanner, news, entry, …). If the UI asks for permissions, allow
          only what you understand — never blanket-approve brokerage tools.
        </li>
        <li>
          Still configure paper defaults and SEC identity before any live-looking connector. See{' '}
          <Link href="/safety/">Safety</Link>.
        </li>
      </ol>

      <h2 id="path-b">Path B — Claude Code plugin marketplace</h2>
      <ol className="steps">
        <li>Open Claude Code in a terminal.</li>
        <li>
          Add the marketplace, then install the plugin:
          <pre>{`/plugin marketplace add Jakeschincariol/day-trader-skill
/plugin install day-trader-skill@day-trader-skill`}</pre>
        </li>
        <li>
          Expect namespaced commands such as{' '}
          <code className="inline">/day-trader-skill:trader-scanner</code>. If a tutorial shows bare{' '}
          <code className="inline">/trader-scanner</code>, either adjust for the namespace or use Path
          C.
        </li>
        <li>
          If a command “does nothing,” jump to the{' '}
          <Link href="/install/troubleshoot/">troubleshoot matrix</Link>.
        </li>
      </ol>

      <h2 id="path-c">Path C — Copy <code className="inline">trader-*</code> folders</h2>
      <ol className="steps">
        <li>
          Clone the upstream repository (verify the org/name — forks are numerous):
          <pre>{`git clone https://github.com/Jakeschincariol/day-trader-skill.git
cd day-trader-skill`}</pre>
        </li>
        <li>
          Global Claude skills directory:
          <pre>{`cp -r trader-* ~/.claude/skills/`}</pre>
        </li>
        <li>
          Or project-local (keeps skills with one repo):
          <pre>{`mkdir -p .claude/skills
cp -r trader-* .claude/skills/`}</pre>
        </li>
        <li>
          Restart / reload Claude Code if commands do not appear. You should get plain{' '}
          <code className="inline">/trader-scanner</code> style names.
        </li>
        <li>
          When upstream updates (if it does), <code className="inline">git pull</code> and re-copy —
          or track staleness on <Link href="/changelog-watch/">changelog watch</Link>.
        </li>
      </ol>

      <h2 id="path-d">Path D — Paste a single SKILL.md</h2>
      <ol className="steps">
        <li>
          Open any one skill folder on GitHub (for example <code className="inline">trader-scanner/SKILL.md</code>).
        </li>
        <li>Paste that markdown at the top of a Claude chat to run it as a mode / method prompt.</li>
        <li>
          Understand the limit: without the Python helpers you lose automated scan/news/sim scripts
          unless you run those files yourself from a clone.
        </li>
        <li>Still do not treat chat output as financial advice or as an approved order.</li>
      </ol>

      <h2>Python &amp; SEC identity</h2>
      <p>
        Helper scripts expect <strong>Python 3.8 or newer</strong>. Upstream emphasizes
        standard-library code — no mandatory pip stack for the core tools described in the README.
      </p>
      <p>Identify yourself for SEC endpoints, for example:</p>
      <pre>{`export SEC_USER_AGENT="Your Name you@example.com"`}</pre>
      <p>
        Or set <code className="inline">sec_user_agent</code> inside{' '}
        <code className="inline">trader/config.json</code> following upstream’s example config files.
        Be polite; do not hammer endpoints.
      </p>

      <h2 id="verify">Verify the install without placing anything</h2>
      <p>
        Run these from the repository root. They use the upstream Python tools, which are
        standard-library only; there is no <code className="inline">pip install</code> step for the
        core flow. The commands
        below are read-only or local-file checks, not order instructions.
      </p>
      <table className="data">
        <thead>
          <tr>
            <th>Check</th>
            <th>Command</th>
            <th>What a clean result looks like</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Python version</td>
            <td>
              <code className="inline">python3 --version</code>
            </td>
            <td>3.8 or newer. If the command is missing, the skill text can load but the helpers cannot run.</td>
          </tr>
          <tr>
            <td>Offline test suite</td>
            <td>
              <code className="inline">python3 -m unittest discover -s tests -v</code>
            </td>
            <td>
              The upstream fixtures exercise every skill; the suite is designed to run offline and
              needs no broker keys. Run it from the repo root so <code className="inline">tests/</code>{' '}
              is discovered.
            </td>
          </tr>
          <tr>
            <td>Build a universe (network)</td>
            <td>
              <code className="inline">python3 trader-scanner/scan.py universe</code>
            </td>
            <td>
              Writes <code className="inline">trader/universe.txt</code> with a list in the
              thousands. The exact count changes with Nasdaq Trader’s files.
            </td>
          </tr>
          <tr>
            <td>Daily scan, narrow list</td>
            <td>
              <code className="inline">python3 trader-scanner/scan.py daily --symbols TSLA,NVDA,AMD</code>
            </td>
            <td>
              Writes <code className="inline">trader/watchlist.json</code>. Run before the open or
              after the close; during the session the volume field is partial.
            </td>
          </tr>
          <tr>
            <td>Read-only ticket render</td>
            <td>
              <code className="inline">python3 trader-broker/ticket.py show</code>
            </td>
            <td>
              Prints the current tickets or says there are none. It never contacts a broker and
              never places anything.
            </td>
          </tr>
          <tr>
            <td>NYSE clock</td>
            <td>
              <code className="inline">python3 trader-alerts/alerts.py clock</code>
            </td>
            <td>Open or closed, with the next open. No key, no broker and no order path.</td>
          </tr>
        </tbody>
      </table>
      <p>
        A one-line message and exit code 1 from a market command usually means “no hit” or “could
        not run”, not a broken install: read the reason. For example, the opening-range scan writes
        nothing before 9:50 AM New York, on a weekend or holiday, or after the entry window.
      </p>
      <p>
        The open-source pack is MIT-licensed. The upstream README and each{' '}
        <code className="inline">trader-*/SKILL.md</code> are the official instructions; this page
        is an independent setup summary. Upstream’s latest code push at the time of this check was
        20 October 2026 (commit <code className="inline">3d0f4ef698</code>), with plugin version
        2.0.0; this page was checked 10 November 2026.
      </p>

      <h2>Next: when install “works” but feels broken</h2>
      <p>
        Namespaced commands, missing Python, SEC 403s, sandboxes without network, partial scans and
        Always-allow mistakes are covered on the dedicated page:{' '}
        <Link href="/install/troubleshoot/">Install troubleshooting</Link>.
      </p>

      <Related
        links={[
          { href: '/install/troubleshoot/', label: 'Day trader skill not working — fixes' },
          { href: '/safety/', label: 'Safety, paper trading & Needs approval' },
          { href: '/skills/', label: '11 day trader skill modules' },
          { href: '/vs/', label: 'Claude trading skills vs this pack' },
        ]}
      />
    </>
  );
}
