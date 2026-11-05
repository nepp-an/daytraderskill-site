import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { UPSTREAM_REPO } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Day Trader Skill Upstream Changelog Watch',
  description:
    'How to watch the Claude Day Trader Skill GitHub repo for commits, issues, and fork risk. Upstream may go stale — verify yourself. Not financial advice. Not the official site.',
  alternates: { canonical: '/changelog-watch/' },
};

export default function ChangelogWatchPage() {
  return (
    <>
      <h1>Upstream changelog watch (day-trader-skill)</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> Star counts can rise while <em>code pushes</em> stay frozen. As of
        2026-11-05 Asia/Shanghai research for this site, upstream{' '}
        <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          Jakeschincariol/day-trader-skill
        </a>{' '}
        showed create + push on 2026-10-20 with rapid stars/forks afterward. Treat maintenance as
        uncertain; verify commits yourself before trusting new forks.
      </div>
      <div className="callout warn">
        <p>
          This page is a <strong>watcher’s checklist</strong>, not a live commit feed. We do not
          auto-mirror GitHub. Always open the repo.
        </p>
      </div>
      <h2>What to check on GitHub</h2>
      <ul className="checklist">
        <li>Commits tab — date of latest code push (not just “Updated” from stars/issues).</li>
        <li>Issues / PRs — volume vs responses; security reports.</li>
        <li>Releases / tags — often none on skill packs; absence is normal but noted.</li>
        <li>Forks — prefer audited diffs; many forks only rename README marketing.</li>
        <li>Compare with trader-skill v1 if you also use the investor pack.</li>
      </ul>
      <h2>Fork warning</h2>
      <p>
        High-star repos attract mirrors that add trackers, change broker defaults, or weaken
        approval language. Clone URLs should match the org/name you intend. When unsure, stay on
        paper and read <code className="inline">trader-broker</code> carefully.
      </p>
      <h2>How this site stays honest</h2>
      <p>
        We position as an independent install/safety hub. If upstream goes quiet, we lean on
        evergreen <Link href="/install/troubleshoot/">troubleshooting</Link>,{' '}
        <Link href="/safety/">safety</Link>, and <Link href="/vs/">comparisons</Link> — not on fake
        “latest signal” posts.
      </p>
      <Related
        links={[
          { href: '/vs/', label: 'Comparisons' },
          { href: '/about/', label: 'About this site' },
          { href: '/install/', label: 'Install' },
        ]}
      />
    </>
  );
}
