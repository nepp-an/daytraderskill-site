import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { Related } from '@/components/Related';
import { SKILLS, getSkill } from '@/lib/skills';

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const skill = getSkill(params.slug);
  if (!skill) return { title: 'Skill' };
  return {
    title: { absolute: `Day Trader Skill: ${skill.name} (${skill.command})` },
    description: `${skill.summary} When to use, inputs/outputs, cautions. Not financial advice.`,
    alternates: { canonical: `/skills/${skill.slug}/` },
  };
}

export default function SkillPage({ params }: { params: { slug: string } }) {
  const skill = getSkill(params.slug);
  if (!skill) notFound();

  return (
    <>
      <JsonLd data={faqJsonLd(skill.faq)} />
      <p className="muted">
        <Link href="/skills/">Skills</Link> / {skill.name}
      </p>
      <h1>
        {skill.name}: <code>{skill.command}</code>
      </h1>
      <div className="tldr">
        <strong>TL;DR.</strong> {skill.summary}
      </div>
      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> This skill does not predict prices or guarantee
          outcomes. Paper trading remains the default for the pack.
        </p>
      </div>

      <h2>What it does</h2>
      <p>{skill.summary}</p>

      <h2>When to use it</h2>
      <p>{skill.when}</p>

      <h2>Inputs</h2>
      <p>{skill.inputs}</p>

      <h2>Outputs</h2>
      <p>{skill.outputs}</p>

      <h2>Upstream / downstream</h2>
      <ul>
        <li>
          <strong>Upstream:</strong> {skill.upstream}
        </li>
        <li>
          <strong>Downstream:</strong> {skill.downstream}
        </li>
      </ul>

      <h2>Cautions</h2>
      <ul>
        {skill.cautions.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>

      <h2>Short FAQ</h2>
      <FaqList items={skill.faq} />

      <Related
        links={[
          { href: '/skills/', label: 'All 11 skills' },
          { href: '/safety/', label: 'Safety checklist' },
          { href: '/install/', label: 'Install' },
          { href: '/paper-trading/', label: 'Paper trading' },
        ]}
      />
    </>
  );
}
