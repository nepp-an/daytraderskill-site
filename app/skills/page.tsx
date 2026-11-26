import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { Related } from '@/components/Related';
import { ToolsNav } from '@/components/ToolsNav';
import { SKILLS } from '@/lib/skills';
import { articleJsonLd, withPageOg } from '@/lib/seo';

const DESCRIPTION =
  'Day trader skill modules: 11 trader-* commands, with inputs and outputs — not trade ideas. Not financial advice.';

export const metadata: Metadata = withPageOg({
  title: 'Day Trader Skill: 11 Modules Index',
  description: DESCRIPTION,
  alternates: { canonical: '/skills/' },
  openGraph: {
    images: [
      {
        url: '/og/skills.svg',
        width: 1200,
        height: 630,
        alt: 'Eleven trader-* modules with inputs and outputs — DayTraderSkill.com',
      },
    ],
  },
  twitter: {
    images: ['/og/skills.svg'],
  },
});

const faqs = [
  {
    q: 'What are the eleven modules?',
    a: 'They are slash commands in one open-source pack: scanner, news, entry, exit, Time Machine, budget, risk, broker, alerts, analyst, and the public-disclosure tracker. Each command has its own page with prerequisites, steps, and failure limits.',
  },
  {
    q: 'Do any of these commands place trades by themselves?',
    a: 'No. Only the broker module can lead to an order, and only after a risk PASS, your typed yes, and Claude’s Allow once / Deny card. Paper trading is the default. This is not an autopilot bot.',
  },
  {
    q: 'What is a typical order to run them?',
    a: 'For a single-trade rehearsal: scanner → news → entry → exit → Time Machine → budget → risk → broker, with alerts in parallel. Analyst and the disclosure tracker are usually scheduled jobs, not entry triggers.',
  },
  {
    q: 'If a command does not appear after install, what should I do?',
    a: 'Do not re-copy a screenshot. Use the install troubleshoot page. Missing namespaced commands, Python, or network limits are common setup issues, not a reason to skip safety defaults.',
  },
  {
    q: 'Is this website the official project?',
    a: 'No. This is an independent guide. The official source is the upstream GitHub repository. When a README and a page on this site disagree, verify the repository.',
  },
  {
    q: 'Do the modules give trade ideas or expected returns?',
    a: 'No. They explain inputs, outputs, and cautions. A scanner match, a trigger, or a risk PASS is not a recommendation and not a promise of profit.',
  },
];

export default function SkillsIndexPage() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            headline: 'Day Trader Skill: 11 Modules Index',
            description: DESCRIPTION,
            path: '/skills/',
            datePublished: '2026-11-05',
            dateModified: '2026-11-26',
          }),
          faqJsonLd(faqs),
        ]}
      />
      <ToolsNav current="/skills/" />
      <h1>Day Trader Skill modules: 11 trader-* commands</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> This is the module index for an open-source Claude command pack —
        eleven <code className="inline">trader-*</code> commands plus optional Python helpers. If
        you have not installed the pack yet, start with the <Link href="/install/">install guide</Link>.
        Use the modules as a checklist, not as autopilot. Typical chain: scanner → news → entry →
        exit → timemachine → budget → risk → broker; alerts in parallel.
      </div>
      <p>
        This website is an independent guide, not the official project. Each module page covers
        prerequisites, command-level steps, a labelled historical example, and failure limits — not
        trade ideas. If a command does not appear after install, use{' '}
        <Link href="/install/troubleshoot/">the troubleshoot page</Link> rather than re-copying a
        screenshot. The related links at the bottom of each module are skill-specific, so the
        scanner page does not send you to the same four places as the disclosure tracker page.
      </p>
      <p>
        Looking for a specific command? Time Machine is{' '}
        <Link href="/skills/timemachine/">
          <code className="inline">/trader-timemachine</code>
        </Link>
        . The table below lists all eleven. The sections after the table describe what each module
        accepts, what it writes, and what it will not do, so you can decide whether you need that
        command at all.
      </p>
      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Module pages explain inputs, outputs, and cautions —
          not trade ideas.
        </p>
      </div>

      <figure className="page-visual">
        <img
          src="/illustrations/skills-flow.svg"
          alt="Typical checklist order of the eleven trader-* modules: scanner through broker, with alerts in parallel and analyst and disclosure tools on a schedule."
          width={720}
          height={340}
          loading="lazy"
        />
        <figcaption>
          A usual rehearsal order, not an automated strategy. Only the broker module can lead to an
          order, and only after your explicit yes.
        </figcaption>
      </figure>

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

      <h2>What each module does, and what it does not do</h2>
      <p>
        The index table is a map. The notes below are the operating contract for each command:
        when it is useful, what it reads, what it writes, and the limits that matter before you
        treat an output as ready for the next step. None of these summaries replaces the dedicated
        module page, and none of them is a trade idea.
      </p>
      <p>
        A useful way to read the list is by job, not by marketing name. Some commands build a
        shortlist. Some write a plan or a size. One command can show a ticket. Scheduled tools
        summarize public facts. If you only need a definition of one command, open its page from
        the table and skip the rest.
      </p>

      {SKILLS.map((s) => (
        <section key={s.slug} aria-labelledby={`mod-${s.slug}`}>
          <h3 id={`mod-${s.slug}`}>
            <Link href={`/skills/${s.slug}/`}>{s.name}</Link>{' '}
            (<code className="inline">{s.command}</code>)
          </h3>
          <p>{s.summary}</p>
          <ul>
            <li>
              <strong>When to use it.</strong> {s.when}
            </li>
            <li>
              <strong>Inputs.</strong> {s.inputs}
            </li>
            <li>
              <strong>Outputs.</strong> {s.outputs}
            </li>
            <li>
              <strong>Usually comes after.</strong> {s.upstream}
            </li>
            <li>
              <strong>Typical next step.</strong> {s.downstream}
            </li>
          </ul>
          <p>
            <strong>Limits to keep in view.</strong> {s.cautions.join(' ')}
          </p>
        </section>
      ))}

      <h2>How the modules connect without becoming a bot</h2>
      <p>
        Shared workspace files are what tie the commands together. A scanner shortlist can feed
        news. A plan file can feed sizing, risk checks, alerts, and ticket text. That is a
        checklist with inspectable intermediates, not a closed system that trades while you look
        away.
      </p>
      <p>
        Two boundaries matter all the way down the chain. First, public data can lag, change
        shape, or rate-limit you; confirm anything you might act on against a source you trust,
        such as a broker chart or the original filing. Second, a risk PASS only means a draft fit
        the limits you configured. It is not investment advice and not permission to skip the
        typed yes or to set brokerage tools to Always allow.
      </p>
      <p>
        Analyst and the disclosure tracker sit beside the single-trade flow rather than at the
        front of it. Earnings facts can change whether you even allow a rehearsal near a report.
        Public congressional filings are delayed disclosures, not insider tips, and they are a
        poor basis for an intraday entry. If a command is missing after setup, stop and use the
        troubleshoot page instead of loosening safety defaults.
      </p>

      <h2>Frequently asked questions</h2>
      <FaqList items={faqs} />

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
