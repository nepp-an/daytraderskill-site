import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { Related } from '@/components/Related';
import { SKILLS, getSkill } from '@/lib/skills';
import { getSkillGuide } from '@/lib/skillGuides';
import { UPSTREAM_REPO } from '@/lib/site';

export function generateStaticParams() {
  return SKILLS.map((s) => ({ slug: s.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const skill = getSkill(params.slug);
  const guide = getSkillGuide(params.slug);
  if (!skill) return { title: 'Skill' };
  return {
    title: { absolute: `Day Trader Skill: ${skill.name} (${skill.command})` },
    description:
      guide?.metaDescription ??
      `${skill.summary} When to use, inputs/outputs, cautions. Not financial advice.`,
    alternates: { canonical: `/skills/${skill.slug}/` },
  };
}

export default function SkillPage({ params }: { params: { slug: string } }) {
  const skill = getSkill(params.slug);
  const guide = getSkillGuide(params.slug);
  if (!skill || !guide) notFound();

  const allFaq = [...skill.faq, ...guide.faq];

  return (
    <>
      <JsonLd data={faqJsonLd(allFaq)} />
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
          outcomes. Paper trading remains the default for the pack. Examples below are historical
          or fixture data, clearly labelled, and are never live recommendations.
        </p>
      </div>

      <h2>What it actually does</h2>
      <p>{guide.overview}</p>

      <h2>Before you start</h2>
      <ul className="checklist">
        {guide.prerequisites.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <p className="muted">
        From a local clone, the first command is usually{' '}
        <code className="inline">{guide.firstCommand.command}</code> — {guide.firstCommand.note}.
        Commands on this page assume the cloned folders. A plugin install is namespaced as{' '}
        <code className="inline">/day-trader-skill:trader-…</code>; see{' '}
        <Link href="/install/">install paths</Link>.
      </p>

      <h2>Step by step</h2>
      <ol className="steps">
        {guide.steps.map((step) => (
          <li key={step.do}>
            <strong>{step.do}</strong>
            {step.command ? <pre>{step.command}</pre> : null}
            {step.detail ? <p>{step.detail}</p> : null}
          </li>
        ))}
      </ol>

      <h2>Inputs and outputs</h2>
      <table className="data">
        <thead>
          <tr>
            <th>File or feed</th>
            <th>What it carries</th>
          </tr>
        </thead>
        <tbody>
          {guide.artifacts.map((row) => (
            <tr key={row.name}>
              <td>
                <code className="inline">{row.name}</code>
              </td>
              <td>{row.detail}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Worked example (historical)</h2>
      <div className="callout warn">
        <p>
          <strong>Historical / educational example.</strong> {guide.example.setup}
        </p>
      </div>
      <p>{guide.example.title}</p>
      <pre>{guide.example.lines.join('\n')}</pre>
      <p>{guide.example.takeaway}</p>

      <h2>Limits and failure modes</h2>
      <ul>
        {guide.limits.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>

      <h2>Approval boundary</h2>
      <div className="callout">
        <p>{guide.approval}</p>
      </div>

      <p className="muted">
        Basis: {guide.source} Read the{' '}
        <a
          href={`${UPSTREAM_REPO}/blob/main/trader-${skill.slug}/SKILL.md`}
          rel="noopener noreferrer"
          target="_blank"
        >
          upstream {skill.slug} SKILL.md
        </a>{' '}
        and the{' '}
        <a href={`${UPSTREAM_REPO}/blob/main/README.md`} rel="noopener noreferrer" target="_blank">
          upstream README
        </a>
        . This page is an independent summary, not the official documentation and not an
        endorsement of any broker or data provider.
      </p>

      <h2>Short FAQ</h2>
      <FaqList items={allFaq} />

      <Related
        links={[
          ...guide.related,
          {
            href: '/skills/',
            label: 'All 11 skills',
            description: 'The full command list, from scanner to Pelosi tracker.',
          },
        ]}
      />
    </>
  );
}
