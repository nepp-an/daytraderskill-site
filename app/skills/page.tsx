import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { SKILLS } from '@/lib/skills';

export const metadata: Metadata = {
  title: 'Day Trader Skill: 11 Modules Index',
  description:
    'Day trader skill modules index: trader-scanner, news, entry, exit, timemachine, budget, risk, broker, alerts, analyst, pelosi. Inputs/outputs — not trade ideas. Not financial advice.',
  alternates: { canonical: '/skills/' },
};

export default function SkillsIndexPage() {
  return (
    <>
      <ToolsNav current="/skills/" />
      <h1>Day Trader Skill modules: 11 trader-* commands</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> Each skill is a Claude command plus optional Python helpers. Use them
        as a checklist, not as autopilot. Typical chain: scanner → news → entry → exit →
        timemachine → budget → risk → broker; alerts in parallel.
      </div>
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
