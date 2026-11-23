import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { SKILLS } from '@/lib/skills';
import { withPageOg } from '@/lib/seo';

export const metadata: Metadata = withPageOg({
  title: 'Day Trader Skill: 11 Modules Index',
  description:
    'Day trader skill modules index: trader-scanner, news, entry, exit, timemachine, budget, risk, broker, alerts, analyst, pelosi. Inputs/outputs — not trade ideas. Not financial advice.',
  alternates: { canonical: '/skills/' },
});

export default function SkillsIndexPage() {
  return (
    <>
      <ToolsNav current="/skills/" />
      <h1>Day Trader Skill modules: 11 trader-* commands</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> This is the module index for the open-source Day Trader Skill pack
        — eleven Claude commands plus optional Python helpers. If you have not installed the pack
        yet, start with the <Link href="/install/">install guide</Link>. Use the modules as a
        checklist, not as autopilot. Typical chain: scanner → news → entry → exit → timemachine →
        budget → risk → broker; alerts in parallel.
      </div>
      <p>
        This website is an independent guide, not the official project. Each module page covers
        prerequisites, command-level steps, a labelled historical example, and failure limits — not
        trade ideas. If a command does not appear after install, use{' '}
        <Link href="/install/troubleshoot/">the troubleshoot page</Link> rather than re-copying a
        screenshot. The related links at the bottom of each module are skill-specific, so the
        scanner page does not send you to the same four places as the Pelosi page.
      </p>
      <p>
        Looking for a specific command? Time Machine is{' '}
        <Link href="/skills/timemachine/">
          <code className="inline">/trader-timemachine</code>
        </Link>
        . The table below lists all eleven.
      </p>
      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Skill pages explain inputs/outputs and cautions —
          not trade ideas.
        </p>
      </div>
      <table className="data">
        <thead>
          <tr>
            <th>#</th>
            <th>Command</th>
            <th>Name</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {SKILLS.map((s, i) => (
            <tr key={s.slug}>
              <td>{i + 1}</td>
              <td>
                <Link href={`/skills/${s.slug}/`}>
                  <code>{s.command}</code>
                </Link>
              </td>
              <td>
                <Link href={`/skills/${s.slug}/`}>{s.name}</Link>
              </td>
              <td>{s.job}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Related
        links={[
          { href: '/install/', label: 'Day trader skill install' },
          { href: '/safety/', label: 'Safety & Needs approval' },
          { href: '/paper-trading/', label: 'Day trader skill paper trading' },
        ]}
      />
    </>
  );
}
