import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Related } from '@/components/Related';
import { articleJsonLd } from '@/lib/seo';
import { BRAND, UPSTREAM_REPO, UPSTREAM_LICENSE } from '@/lib/site';

export const metadata: Metadata = {
  title: { absolute: 'Editorial Policy: Independent, Paper-First, AI-Assisted' },
  description:
    'DayTraderSkill.com editorial policy: independent and unofficial, not a broker or adviser; paper-first; AI-assisted drafting with human review; no affiliate links this cycle. As of 10 November 2026.',
  alternates: { canonical: '/editorial-policy/' },
  openGraph: {
    title: 'Editorial Policy: Independent, Paper-First, AI-Assisted',
    description:
      'How this independent guide is researched, drafted with AI assistance, reviewed by the site editorial team, dated, and kept free of affiliate links this cycle.',
    url: '/editorial-policy/',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Editorial Policy: Independent, Paper-First, AI-Assisted',
    description:
      'Independence, AI-assisted authorship, review dates, advertising, and affiliate rules for DayTraderSkill.com.',
  },
};

const policyDescription =
  'Independence, AI-assisted authorship, review dates, advertising, affiliate rules, and ranking limits for DayTraderSkill.com.';

export default function EditorialPolicyPage() {
  return (
    <article className="article">
      <JsonLd
        data={articleJsonLd({
          headline: 'Editorial Policy: Independent, Paper-First, AI-Assisted',
          description: policyDescription,
          path: '/editorial-policy/',
          datePublished: '2026-11-10',
          dateModified: '2026-11-10',
        })}
      />

      <nav className="breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link> / Editorial policy
      </nav>

      <header className="article-head">
        <p className="eyebrow">Site standards</p>
        <h1>Editorial policy: independent, paper-first, AI-assisted</h1>
        <p className="article-meta">
          <span>DayTraderSkill editorial team</span>
          <span>AI-assisted · human-reviewed</span>
          <span>As of 10 November 2026 (Asia/Shanghai)</span>
        </p>
      </header>

      <div className="tldr">
        <strong>TL;DR.</strong> {BRAND} is an independent education site. We are not the official Day
        Trader Skill project, not a broker, and not an investment adviser. Pages are drafted with AI
        assistance and reviewed by the site editorial team, with paper trading as the default. This
        policy is dated 10 November 2026 and applies to the pages published on this site.
      </div>

      <h2>Independence and status</h2>
      <p>
        This site is independent of every third-party project it discusses. We are not affiliated
        with, endorsed by, or sponsored by the upstream authors of the open-source Day Trader Skill
        pack. Where the site names or links an upstream author or repository, it is only to identify
        the public GitHub project and to help readers verify it. That is not an endorsement, and the
        upstream author is not a writer, editor, adviser, or endorser of this site.
      </p>
      <p>
        We are not a broker-dealer, investment adviser, portfolio manager, or signal provider. We do
        not offer personalized investment advice, trade recommendations, copy trading, or a
        trade-on-your-behalf service. Nothing on this site is an offer to manage money or execute an
        order.
      </p>
      <p>
        No financial credentials are claimed for the site or its editorial team. We do not publish
        invented author names, biographies, licences, or professional designations.
      </p>

      <h2>Who writes and reviews</h2>
      <p>
        Content is produced by the DayTraderSkill editorial team using AI-assisted drafting,
        outlining, and copy-editing. A human member of the editorial team reviews each page before
        publication and is responsible for what is published. AI tools are not listed as authors,
        and their output is not treated as a source or as financial advice.
      </p>
      <p>
        We do not use AI to invent people, credentials, quotations, prices, rankings, endorsements,
        or market data. When a page describes software behaviour, a date, or a source, the editorial
        team is expected to check the claim against a primary source or to label it clearly as an
        observation.
      </p>

      <h2>Sources, review dates, and freshness</h2>
      <p>
        We prefer primary sources: the upstream repository and its licence, official product
        documentation, and regulator or broker documentation for rules and costs. We link out
        instead of mirroring other sites. For the upstream project, the canonical public repository
        is{' '}
        <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
          {UPSTREAM_REPO}
        </a>{' '}
        ({UPSTREAM_LICENSE}). The site’s{' '}
        <Link href="/changelog-watch/">update watch</Link> records the latest code push it observed,
        2026-10-20, as of 2026-11-10. That is a dated observation, not a live feed or a claim about
        the project’s current state.
      </p>
      <p>
        A reviewed date means a human checked that page on that date. We change the date only when a
        page is actually revised or rechecked; we do not refresh every date because a new month
        started. The sitemap uses a new last-modified date only for URLs changed in that batch. Pages
        without a visible review date are general explanations, not dated market observations.
      </p>
      <p>
        Market rules, fees, data terms, and software behaviour change. Verify anything time-sensitive
        with the primary source or your broker before relying on it. Paper trading cannot guarantee
        live results.
      </p>

      <h3>How we cite risk claims</h3>
      <p>
        Risk claims are tied to a primary source, a date, and the scope the source actually covers.
        Where a page is no longer maintained, we say so in the same sentence. The sources used for
        the risk statements on this site are:
      </p>
      <ul>
        <li>
          <a
            href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            SEC, Day Trading: Your Dollars at Risk
          </a>{' '}
          — published April 19, 2005; last reviewed or updated April 20, 2005. We do not attribute
          any blanket loss statistic to this page; we paraphrase only the claims the page actually
          makes.
        </li>
        <li>
          <a
            href="https://www.investor.gov/additional-resources/spotlight/formerdirectorlorischock-directors-take/thinking-day-trading-know-risks"
            rel="noopener noreferrer"
            target="_blank"
          >
            Investor.gov, Thinking of Day Trading? Know the Risks.
          </a>{' '}
          — by Lori Schock, former Director of the SEC’s Office of Investor Education and Assistance.
          The page states that it is no longer being updated and may include information that is
          out-of-date; we repeat that caveat whenever we cite it. Checked 10 November 2026.
        </li>
        <li>
          <a
            href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/fraudadv_tradingsystem.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            CFTC, Fraud Advisory: Commodity Trading Systems Sold on the Internet
          </a>{' '}
          — no last-reviewed date is shown on the page; checked 10 November 2026. We use it for the
          limits of hypothetical and simulated results, not as a claim about live returns.
        </li>
        <li>
          <a
            href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/CustomerAdvisory_MustKnowForex.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            CFTC, Customer Advisory: Eight Things You Should Know Before Trading Forex
          </a>{' '}
          — no last-reviewed date is shown on the page; checked 10 November 2026. Its customer-loss
          figure applies only to OTC forex customer accounts in Q2 2021–Q1 2022, and we do not apply
          it to stock day trading.
        </li>
      </ul>

      <h2>Paper-first and risk</h2>
      <p>
        Paper trading is the default we teach. A day trading simulator is a practice environment,
        not a promise that a strategy works with real capital. We do not publish profit promises,
        win-rate guarantees, “signals,” or claims that a tool can remove risk. The SEC’s{' '}
        <a
          href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          Day Trading: Your Dollars at Risk
        </a>{' '}
        (April 19, 2005; last reviewed April 20, 2005) warns that day trading is risky, that most
        individual investors do not have the wealth, time, or temperament to profit from it and
        withstand its severe losses, and that many traders never become profitable. Leverage can
        make losses arrive faster.
      </p>
      <p>
        Our calculators are arithmetic aids only. They run in the browser, use no market data, and
        cannot place an order. The site does not tell you what to buy, sell, or hold. If you need
        personal financial, tax, or legal advice, consult a qualified professional in your
        jurisdiction.
      </p>

      <h2>Advertising and affiliate policy</h2>
      <p>
        This site displays Google AdSense advertising under publisher{' '}
        <code className="inline">ca-pub-3175943774981621</code>; <code className="inline">ads.txt</code>{' '}
        lists the same publisher. Ads are served by Google and do not constitute our endorsement of
        an advertiser or product.
      </p>
      <p>
        In this publishing cycle we do not participate in affiliate programs and we do not place
        affiliate or referral outbound links on our pages. There is no affiliate application form,
        recruitment funnel, or “partner” offer on this site. If that changes, we will disclose the
        relationship clearly before any affiliate link appears, and a link will never change the
        editorial conclusion of a page.
      </p>

      <h2>Search performance and rankings</h2>
      <p>
        We do not publish current keyword rankings or guarantee a search position. Search and
        AI-answer visibility may be reviewed later as an observation, not as a promise, a ranking
        claim, or a score on this page. No page should be read as a commitment that a particular
        query will produce a particular result.
      </p>

      <h2>Corrections and contact</h2>
      <p>
        If a page is wrong, outdated, or unclear, use the{' '}
        <Link href="/contact/">contact page</Link> and include the URL and the specific issue. We
        review corrections, update the page when warranted, and change its reviewed date only when
        the content actually changes. We do not remove a correction simply because it is
        inconvenient.
      </p>

      <Related
        links={[
          { href: '/about/', label: 'About this site' },
          { href: '/contact/', label: 'Contact and corrections' },
          { href: '/privacy/', label: 'Privacy policy' },
          { href: '/changelog-watch/', label: 'Upstream update watch' },
        ]}
      />
    </article>
  );
}
