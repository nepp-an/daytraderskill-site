import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { SKILLS } from '@/lib/skills';

export const metadata: Metadata = {
  title: '11 Claude Day Trader Skills Index',
  description:
    'Index of all 11 Claude Day Trader Skill commands: scanner, news, entry, exit, timemachine, budget, risk, broker, alerts, analyst, pelosi. Not financial advice.',
  alternates: { canonical: '/skills/' },
};

export default function SkillsIndexPage() {
  return (
    <>
      <h1>Eleven Claude Day Trader Skills — index</h1>
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
          { href: '/install/', label: 'Install' },
          { href: '/safety/', label: 'Safety' },
          { href: '/paper-trading/', label: 'Paper trading' },
        ]}
      />
    </>
  );
}
