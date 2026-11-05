import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Claude Day Trader Skill Install Troubleshooting',
  description:
    'Fix Claude Day Trader Skill install failures: plugin namespaces, missing /trader-* commands, Python 3.8+, SEC_USER_AGENT errors, sandbox networking, and approval-card confusion. Not financial advice.',
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
];

export default function TroubleshootPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <h1>Claude Day Trader Skill: install troubleshooting matrix</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> Most “it won’t install” reports are actually namespace mismatches,
        missing Python, blocked public data/SEC calls, or confusion about approval cards — not a
        broken git clone. Use the matrix below, then re-check the{' '}
        <Link href="/install/">install paths</Link>.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Fixing tooling does not improve expected trading
          outcomes. Keep paper trading default while you debug.
        </p>
      </div>

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
          { href: '/install/', label: 'Back to install (4 paths)' },
          { href: '/safety/', label: 'Safety & Needs approval' },
          { href: '/paper-trading/', label: 'Paper trading rehearsal' },
          { href: '/faq/', label: 'General FAQ' },
        ]}
      />
    </>
  );
}
