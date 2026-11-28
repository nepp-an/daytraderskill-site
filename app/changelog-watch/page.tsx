import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { Related } from '@/components/Related';
import { UPSTREAM_REPO } from '@/lib/site';
import { articleJsonLd, withPageOg } from '@/lib/seo';

const DESCRIPTION =
  'Day trader skill GitHub update watch: check the official repo commits, forks, and staleness yourself. Not a live feed or official site. Not financial advice.';

export const metadata: Metadata = withPageOg({
  title: 'Day Trader Skill GitHub Update Watch',
  description: DESCRIPTION,
  alternates: { canonical: '/changelog-watch/' },
  openGraph: {
    images: [
      {
        url: '/og/changelog-watch.svg',
        width: 1200,
        height: 630,
        alt: 'Day Trader Skill GitHub update watch — check the official repo yourself, not a live feed',
      },
    ],
  },
  twitter: {
    images: ['/og/changelog-watch.svg'],
  },
});

const faqs = [
  {
    q: 'Is this page a live GitHub feed?',
    a: 'No. It is a watcher’s checklist. This site does not auto-mirror commits, releases, or stars. Open the official repository and read the Commits tab yourself.',
  },
  {
    q: 'Is this the official Day Trader Skill site?',
    a: 'No. This is an independent install and safety guide. The official source is the upstream GitHub repository. When a page here and a README disagree, verify the repository.',
  },
  {
    q: 'How do I tell if the “Updated” date is a real code push?',
    a: 'Open the Commits tab and look at the date of the latest commit that changed files. The repository “Updated” stamp can move when stars, issues, or metadata change, even if no code was pushed.',
  },
  {
    q: 'What if the last commit is weeks or months old?',
    a: 'Quiet periods happen on small open-source packs. Treat maintenance as uncertain. Decide for yourself whether you are willing to keep using the last published code, wait, or inspect a fork carefully — still on paper, with approvals on.',
  },
  {
    q: 'How should I treat forks?',
    a: 'Prefer an audited diff against the repo you intended to clone. Confirm the organization and repository name in the clone URL. High-star originals attract mirrors that only rewrite marketing, or that change defaults and tracking.',
  },
  {
    q: 'Does this website update automatically when the repo changes?',
    a: 'No. Guides on this site are written and checked on dated snapshots. If upstream moves, re-read the official files before you assume a command, path, or default still matches a page here.',
  },
];

export default function ChangelogWatchPage() {
  return (
    <>
      <JsonLd
        data={[
          articleJsonLd({
            headline: 'Day Trader Skill GitHub Update Watch',
            description: DESCRIPTION,
            path: '/changelog-watch/',
            datePublished: '2026-11-05',
            dateModified: '2026-11-26',
          }),
          faqJsonLd(faqs),
        ]}
      />
      <h1>Day Trader Skill GitHub update watch</h1>
      <div className="tldr">
        <strong>In short.</strong> Star counts can rise while <em>code pushes</em> stay frozen. As of
        a 26 November 2026 Asia/Shanghai check of the GitHub API for this site, upstream{' '}
        <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          Jakeschincariol/day-trader-skill
        </a>{' '}
        still showed its latest code push on 20 October 2026 (commit 3d0f4ef). The repository
        “Updated” timestamp can move without a new push. Treat maintenance as uncertain; verify
        the Commits tab yourself before trusting new forks. This day trader skill GitHub watch is a
        checklist, not a live feed and not the official site.
      </div>
      <div className="callout warn">
        <p>
          This page is a <strong>watcher’s checklist</strong>, not a live commit feed. We do not
          auto-mirror GitHub. Always open the repo.
        </p>
      </div>

      <figure className="page-visual">
        <img
          src="/illustrations/changelog-check.svg"
          alt="Checklist for checking the official GitHub repository: latest code push on the Commits tab, inspect forks before cloning, and judge staleness yourself."
          width={720}
          height={320}
          loading="lazy"
        />
        <figcaption>
          Confirm a code push on GitHub. This page will not refresh itself when the repository
          does.
        </figcaption>
      </figure>

      <h2>What to check on GitHub</h2>
      <ul className="checklist">
        <li>Commits tab — date of latest code push (not just “Updated” from stars/issues).</li>
        <li>Issues / PRs — volume vs responses; security reports.</li>
        <li>Releases / tags — often none on skill packs; absence is normal but noted.</li>
        <li>Forks — prefer audited diffs; many forks only rename README marketing.</li>
        <li>Compare with trader-skill v1 if you also use the investor pack.</li>
      </ul>

      <h2>How to read the Commits tab</h2>
      <p>
        The Commits tab is the first place to look if you want to know whether the code you might
        install has actually moved. Open the official repository, switch to Commits, and read the
        date and message of the most recent commit that changed files. That date is the one this
        site means by “latest code push.” It is not the same thing as the “Updated” label on the
        repository header, which can change when people star the project, open or comment on
        issues, or when GitHub refreshes metadata.
      </p>
      <p>
        Click through a recent commit when you need more than a date. Look at which paths changed:
        a <code className="inline">SKILL.md</code> rewrite, a helper script, a default in a config
        example, or only documentation. A docs-only commit can be useful and still leave the
        command behavior you rehearsed last month unchanged. A change to broker, risk, or
        permission language deserves a slower read before you assume an older guide on this site
        still matches the files.
      </p>
      <p>
        You can also use the compare view between two commits or tags, or between the official
        default branch and a fork. The point is to see a diff, not to trust a marketing README that
        says “updated daily.” This website will not paste a running log of every SHA. Any snapshot
        mentioned here — including the 20 October 2026 push noted above — is a dated check, and it
        can be stale the next time you open GitHub.
      </p>

      <h2>How to judge whether a repo has gone quiet</h2>
      <p>
        Staleness is a judgment, not a single number this page can certify. A small educational
        pack may go weeks or months without a push and still be usable as the last published
        MIT-licensed code. The same quiet period can also mean the author has moved on, a
        dependency or brokerage API has drifted, or a security issue has not been triaged. You have
        to look at more than the calendar.
      </p>
      <p>
        Read Issues and pull requests for unanswered reports, especially anything that sounds like
        a safety or credential problem. Check whether Releases or tags exist; many skill packs
        never cut a formal release, so “no release” is common and not, by itself, a verdict. If the
        last meaningful code change is old, decide whether you are willing to keep rehearsing that
        snapshot on paper, wait, or inspect a fork. This site will not declare the project dead or
        healthy on a schedule, because that would pretend we have a live feed.
      </p>
      <p>
        Also separate popularity from maintenance. Stars, forks, and social posts can rise after
        the last push. That is exactly why this checklist starts with Commits. Attention is not
        evidence that someone is still reviewing changes or answering security mail.
      </p>

      <h2>Fork warning</h2>
      <p>
        High-star repos attract mirrors that add trackers, change broker defaults, or weaken
        approval language. Clone URLs should match the org/name you intend. When unsure, stay on
        paper and read <code className="inline">trader-broker</code> carefully.
      </p>
      <p>
        Before you clone a fork, open GitHub’s compare view against the official default branch and
        actually scroll the diff. Ask what was added: a renamed README, new analytics, a changed
        marketplace URL, loosened approval text, or a different default for paper versus live.
        A fork that only restyles documentation is noise. A fork that changes order-path defaults
        is a different product, even if it keeps the same command names.
      </p>
      <p>
        Confirm the account and repository name in the clone URL character by character. Similarly
        named organizations and typo-squatted forks show up around popular projects. If you cannot
        explain the diff in plain language, do not install the fork just because it shows a newer
        “Updated” stamp or a higher star count than the last time you looked.
      </p>

      <h2>How this site stays honest</h2>
      <p>
        We position as an independent install/safety hub. If upstream goes quiet, we lean on
        evergreen <Link href="/install/troubleshoot/">troubleshooting</Link>,{' '}
        <Link href="/safety/">safety</Link>, and <Link href="/vs/">comparisons</Link> — not on fake
        “latest signal” posts.
      </p>
      <p>
        This page is the place that says so out loud. Guides such as{' '}
        <Link href="/install/">the install walkthrough</Link> and the{' '}
        <Link href="/skills/">module index</Link> are written against files we could read on a
        check date. They are not a promise that the upstream tree is unchanged today. When we
        mention a commit, a plugin version, or a push date, treat those as citations to verify, not
        as a badge that this website is in sync with GitHub in real time.
      </p>
      <p>
        There is no on-site changelog that auto-imports upstream commits, and there is no
        notification feed for new stars or forks. If a later edit to this site refreshes a dated
        check, that edit will be a human update, not a hidden mirror. Until you open the repository
        yourself, assume any snapshot here may already be behind.
      </p>

      <h2>A practical pass you can repeat</h2>
      <p>
        When you come back to the project after a break, a short manual pass is enough. First, open
        the official repository from a URL you already trust — or type it — rather than a search
        ad. Second, read the Commits tab for the latest code push and glance at the files in that
        commit. Third, skim Issues for anything that would change how you install or how approvals
        work. Fourth, if you are tempted by a fork, diff it before you clone. Fifth, only then
        decide whether an install or an update is worth doing, still with paper defaults and Needs
        approval left on.
      </p>
      <p>
        If the official tree has not moved, you do not need a new ritual. Keep using the
        troubleshoot and safety pages, and keep rehearsing on paper. If the tree has moved, re-read
        the changed <code className="inline">SKILL.md</code> files and helper scripts instead of
        assuming an older screenshot or an older page on this site is still exact. That is the
        whole job of this watch: send you to GitHub, then send you back to the evergreen guides,
        without pretending this domain is the official source.
      </p>

      <h2>Frequently asked questions</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          { href: '/vs/', label: 'Claude trading skills comparison' },
          { href: '/about/', label: 'About this independent site' },
          { href: '/install/', label: 'Day trader skill install' },
        ]}
      />
    </>
  );
}
