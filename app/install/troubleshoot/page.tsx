import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Day Trader Skill Not Working — Fixes',
  description:
    'Day trader skill not working? Fix namespace mismatches, sandbox/network blocks, permissions, Python, SEC_USER_AGENT, and Needs approval confusion. Intent guide — no fabricated search volume. Not financial advice.',
  alternates: { canonical: '/install/troubleshoot/' },
};

const faqs = [
  {
    q: 'Claude Code installed the plugin but /trader-scanner does nothing',
    a: 'Plugin installs are namespaced. Try /day-trader-skill:trader-scanner (and the same pattern for other skills). Or copy folders (install Path C) for bare /trader-* names.',
  },
  {
    q: 'SEC tools fail or get blocked',
    a: 'Set SEC_USER_AGENT or trader/config.json sec_user_agent to a real name + contact email. Be polite with rate. Corporate networks may still block EDGAR.',
  },
  {
    q: 'python3: command not found',
    a: 'Install Python 3.8+ and ensure python3 is on PATH. The helpers are plain Python; without an interpreter the scripts will not run even if the skill text loads.',
  },
  {
    q: 'Skills appear but market data is empty',
    a: 'Public Yahoo/Nasdaq endpoints can lag, change, or rate-limit. Check outbound network from the environment Claude Code runs in. Sandboxed CI-like environments often have no market access.',
  },
  {
    q: 'Do I need a brokerage account just to install?',
    a: 'No. All four install paths and the read-only Python checks work without a broker. A connector such as Alpaca’s MCP server or IBKR is a separate optional setup, and paper is the default when you do configure one.',
  },
];

export default function TroubleshootPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <ToolsNav current="/install/troubleshoot/" />
      <h1>Day Trader Skill not working: namespace, sandbox &amp; permissions</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> When <strong>day trader skill</strong> looks installed but{' '}
        <strong>not working</strong>, it is usually a namespace mismatch, sandbox without network,
        missing permissions/Python, blocked SEC calls, or approval-card confusion — not a broken
        clone. Use the matrix below, then re-check the <Link href="/install/">install paths</Link>.
        Not financial advice.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Fixing tooling does not improve expected trading
          outcomes. Keep paper trading default while you debug.
        </p>
      </div>

      <h2>Five-minute verification ladder</h2>
      <p>
        Before changing permissions or reinstalling, separate “the files are there” from “the
        helper can run” and from “the market is open”. Run these from the repository root and stop
        at the first failure.
      </p>
      <ol className="steps">
        <li>
          <strong>Interpreter and tests</strong>
          <pre>{`python3 --version
python3 -m unittest discover -s tests -v`}</pre>
          <p>
            The suite is offline and fixture-based. If it fails, the problem is the clone, the
            Python version or an edited fixture — not the broker or the market.
          </p>
        </li>
        <li>
          <strong>Read-only local tools</strong>
          <pre>{`python3 trader-broker/ticket.py show
python3 trader-alerts/alerts.py clock`}</pre>
          <p>
            These need no broker. An empty ticket list is normal before a budget proposal exists.
            The clock proves the NYSE calendar code can run.
          </p>
        </li>
        <li>
          <strong>One network call</strong>
          <pre>python3 trader-scanner/scan.py universe</pre>
          <p>
            If this fails, fix outbound network or the Nasdaq Trader endpoint before blaming the
            skill. An SEC-only failure is usually a missing identity string instead.
          </p>
        </li>
        <li>
          <strong>One command that can legitimately say “nothing”</strong>
          <pre>python3 trader-scanner/scan.py orb --at 10:15</pre>
          <p>
            Before 9:50 AM New York, on a weekend or holiday, after the entry window, or without
            complete 5-minute bars, this writes nothing and prints one line. That is a market-clock
            result, not an install failure.
          </p>
        </li>
      </ol>

      <h2>Failure matrix</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Symptom</th>
            <th>Likely cause</th>
            <th>What to try</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>/trader-scanner</code> not found after plugin install
            </td>
            <td>Claude Code namespaces plugin skills</td>
            <td>
              Call <code>/day-trader-skill:trader-scanner</code>, or switch to folder copy for bare
              names (<Link href="/install/#path-c">Path C</Link>)
            </td>
          </tr>
          <tr>
            <td>Paste URL does nothing</td>
            <td>Chat surface lacks skill-from-URL, or typo’d fork</td>
            <td>
              Confirm you used the canonical{' '}
              <code>Jakeschincariol/day-trader-skill</code> URL; try Path B/C; avoid random forks
            </td>
          </tr>
          <tr>
            <td>Skill text runs, scripts crash</td>
            <td>No Python 3.8+ on PATH</td>
            <td>
              <code>python3 --version</code>; install 3.8+; re-open the terminal Claude Code uses
            </td>
          </tr>
          <tr>
            <td>SEC / analyst / filings errors</td>
            <td>Missing polite User-Agent identity</td>
            <td>
              Set <code>SEC_USER_AGENT=&quot;Name email@domain&quot;</code> or config equivalent; retry
              slowly
            </td>
          </tr>
          <tr>
            <td>Empty charts / news</td>
            <td>Network egress blocked or endpoint rate-limit</td>
            <td>
              Test <code>curl</code>/browser access from the same machine; wait and retry; do not
              hammer
            </td>
          </tr>
          <tr>
            <td>Broker ticket never sends</td>
            <td>By design without your yes + Allow once</td>
            <td>
              This is correct. Do <strong>not</strong> switch tools to Always allow. See{' '}
              <Link href="/safety/">Safety</Link>
            </td>
          </tr>
          <tr>
            <td>Risk always BLOCK</td>
            <td>Limits tighter than the draft order</td>
            <td>
              Read the BLOCK reason; fix size/window/budget — do not disable risk to force a trade
            </td>
          </tr>
          <tr>
            <td>Commands differ from a blog screenshot</td>
            <td>Plugin namespace vs copied folders; upstream may be stale</td>
            <td>
              Match your install path; check <Link href="/changelog-watch/">changelog watch</Link>{' '}
              / commits
            </td>
          </tr>
          <tr>
            <td>Tests fail offline</td>
            <td>Incomplete clone or altered fixtures</td>
            <td>
              Re-clone upstream; run <code>python3 -m unittest discover -s tests -v</code> from repo
              root
            </td>
          </tr>
          <tr>
            <td>Opening-range scan writes no file</td>
            <td>Market clock or incomplete bars</td>
            <td>
              Run after 9:50 AM New York on a trading day, before the entry window. Missing 5-minute
              bars (halt, thin stock) make a chart unusable; the tool prints one line instead of
              guessing. See <Link href="/skills/scanner/">Chart Scanner</Link>.
            </td>
          </tr>
          <tr>
            <td>Scan output says PARTIAL</td>
            <td>The stage-2 confirmation cap skipped charts</td>
            <td>
              The default <code>--max-confirm 200</code> checks the most traded candidates first.
              Raise it or use <code>--max-confirm 0</code> for all, and expect a slower scan. Do not
              call a partial scan “the whole market”.
            </td>
          </tr>
          <tr>
            <td>Daily scan volume looks too low</td>
            <td>Run during the session</td>
            <td>
              The daily scan is designed for before the open or after the close. During the session
              its volume is the day so far and today’s bar is incomplete. Re-run later instead of
              treating the partial number as a full session.
            </td>
          </tr>
          <tr>
            <td><code>ticket.py show</code> lists nothing</td>
            <td>No proposal or no risk PASS yet</td>
            <td>
              Run <Link href="/skills/budget/">Budget Manager</Link> to write an order proposal, then{' '}
              <Link href="/skills/risk/">Risk Manager</Link>. A ticket is READY only after a PASS
              from today. <code>ticket.py</code> never contacts the broker.
            </td>
          </tr>
          <tr>
            <td>Entry timer keeps saying waiting</td>
            <td>Price has not closed above the level</td>
            <td>
              Check the opening range, the level and the bar interval. A wick above the level is not
              a trigger; only a completed bar closing above it counts. If the setup expired, that is
              a valid result — do not move the level after the fact.
            </td>
          </tr>
          <tr>
            <td>Unclear whether paper or live</td>
            <td>Connector misconfiguration</td>
            <td>
              Verify paper flags / paper account in connector settings before any yes; read{' '}
              <Link href="/paper-trading/">Paper trading</Link>
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Namespace cheat sheet</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Install style</th>
            <th>Example invoke</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Claude Code plugin</td>
            <td>
              <code>/day-trader-skill:trader-news</code>
            </td>
          </tr>
          <tr>
            <td>Copied <code>trader-*</code> folders</td>
            <td>
              <code>/trader-news</code>
            </td>
          </tr>
          <tr>
            <td>Single SKILL.md paste</td>
            <td>No slash command — follow the pasted instructions in chat</td>
          </tr>
        </tbody>
      </table>

      <h2>Approval-card confusion (not an install bug)</h2>
      <div className="callout warn">
        <p>
          If Claude shows Allow once / Deny on a brokerage tool, that is the second safety gate
          working. Denying is success for a paper-only rehearsal. Switching the connector to Always
          allow is the failure mode — see the <Link href="/safety/">safety checklist</Link>.
        </p>
      </div>

      <h2>Quick FAQ</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          { href: '/install/', label: 'Day trader skill install (4 paths)' },
          { href: '/safety/', label: 'Safety & Needs approval' },
          { href: '/paper-trading/', label: 'Day trader skill paper trading' },
          { href: '/faq/', label: 'Day trader skill FAQ' },
        ]}
      />
    </>
  );
}
