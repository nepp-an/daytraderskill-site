import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Claude Day Trader Skill Safety: Permissions, Paper Defaults, Needs Approval',
  description:
    'Claude day trader skill safety: paper trading default, Needs approval (never Always allow), typed yes before orders, keys in env. A skill-permission checklist with SEC, Investor.gov, and CFTC sources. Not financial advice.',
  alternates: { canonical: '/safety/' },
};

const faqs = [
  {
    q: 'Is the pack allowed to place orders by itself?',
    a: 'No. Upstream design: only the broker skill leads to an order path, and only after risk PASS plus your typed yes for that exact ticket, plus Claude’s Allow once / Deny card when connectors are set correctly.',
  },
  {
    q: 'Why do you keep saying paper trading?',
    a: 'Because live mistakes are expensive and paper is the upstream default. The SEC’s 2005 investor bulletin on day trading warns that traders often suffer severe losses in their first months, so this independent guide treats live trading as something you might disable later at your own risk — not something we push.',
  },
  {
    q: 'Can I set brokerage tools to Always allow?',
    a: 'You can technically misconfigure many tools that way. Do not. Needs approval keeps a human gate. Always allow removes the second check this pack expects.',
  },
];

export default function SafetyPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <h1>Claude skill safety checklist: paper-trading defaults and the Needs approval gate</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> <strong>Claude day trader skill safety</strong> means treating the
        pack as <strong>assisted workflow software</strong>, not a profit engine. Keep{' '}
        <strong>paper trading</strong> on, require a typed <strong>yes</strong> per ticket, set
        connectors to <strong>Needs approval</strong> (never Always allow), keep API keys out of
        chat, and remember: simulations and stops are not guarantees. Compliance-first on purpose.
        Not financial advice.
      </div>

      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> The SEC’s{' '}
          <a
            href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            Day Trading: Your Dollars at Risk
          </a>{' '}
          (April 19, 2005; last reviewed April 20, 2005) warns that day trading is risky, that most
          individual investors do not have the wealth, time, or temperament to profit from it and
          withstand severe losses, and that traders often suffer severe losses in their first months;
          many never become profitable. You can lose money. We do not promise returns, win rates,
          “alpha,” signal groups, or trading on your behalf.
        </p>
      </div>

      <h2 id="risk">Risk rules we will not soften</h2>
      <ul className="checklist">
        <li>
          <strong>Not financial advice</strong> — arithmetic and public data ≠ a plan for your life
          or portfolio.
        </li>
        <li>
          <strong>Paper trading is the default</strong> — rehearse the full chain before any live
          switch you might make yourself.
        </li>
        <li>
          <strong>No yes → no order</strong> — do not bypass the typed confirmation for “speed.”
        </li>
        <li>
          <strong>Needs approval, never Always allow</strong> on brokerage connectors in Claude.
        </li>
        <li>
          <strong>No profit promises</strong> and no copy-trading / signal-subscription framing on
          this site.
        </li>
        <li>
          <strong>No trade-on-your-behalf</strong> service — we do not take discretionary control of
          accounts.
        </li>
      </ul>

      <h2>Recommended configuration posture</h2>
      <table className="data">
        <thead>
          <tr>
            <th>Setting / habit</th>
            <th>Recommended</th>
            <th>Why</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>paper</code> / paper account
            </td>
            <td>
              <strong>true / paper</strong>
            </td>
            <td>Matches upstream default; mistakes stay educational</td>
          </tr>
          <tr>
            <td>Claude connector tool permission</td>
            <td>
              <strong>Needs approval</strong>
            </td>
            <td>Preserves Allow once / Deny as a second gate</td>
          </tr>
          <tr>
            <td>Broker API keys</td>
            <td>Environment variables only</td>
            <td>Never paste secrets into chat, screenshots, or git</td>
          </tr>
          <tr>
            <td>Options / margin / short / leverage</td>
            <td>Leave off unless you truly understand them</td>
            <td>Upstream notes these stay off unless you enable them</td>
          </tr>
          <tr>
            <td>
              Optional <code>pdt_guard</code>
            </td>
            <td>On if your broker still counts day trades strictly</td>
            <td>
              Regulatory and broker policies change; verify with your broker, not a blog
            </td>
          </tr>
        </tbody>
      </table>

      <h2>Dual approval mental model</h2>
      <ol className="steps">
        <li>
          <strong>Risk skill</strong> must PASS the exact draft (size, window, limits).
        </li>
        <li>
          <strong>Broker skill</strong> shows a plain-language ticket — you type yes for that ticket
          only.
        </li>
        <li>
          <strong>Claude connector card</strong> still asks Allow once / Deny when permissions are
          set correctly.
        </li>
        <li>
          If any step is unclear, <strong>stop</strong>. Ambiguity is a reason to stay on paper.
        </li>
      </ol>

      <h2>Things the software cannot promise</h2>
      <ul>
        <li>
          <strong>Time Machine</strong> replays from recent bars — it is a simulation / reality
          check, not a prediction of the next print.
        </li>
        <li>
          <strong>Stop orders</strong> can slip in fast markets or across gaps. “Max loss” at the
          stop price is not a hard cap.
        </li>
        <li>
          <strong>Public data</strong> (including unofficial chart endpoints) can lag, change, or
          rate-limit. Confirm anything that matters on your broker’s platform.
        </li>
        <li>
          <strong>Congressional disclosures</strong> are public and often delayed — not insider
          information.
        </li>
        <li>
          <strong>Taxes</strong>: frequent trading raises short-term gain and wash-sale issues.
          Nothing here is tax advice.
        </li>
      </ul>

      <h2>Regulator notes on leverage and simulated results</h2>
      <p>
        Investor.gov’s{' '}
        <a
          href="https://www.investor.gov/additional-resources/spotlight/formerdirectorlorischock-directors-take/thinking-day-trading-know-risks"
          rel="noopener noreferrer"
          target="_blank"
        >
          Thinking of Day Trading? Know the Risks.
        </a>{' '}
        by Lori Schock, former Director of the SEC’s Office of Investor Education and Assistance, warns
        that leverage — including margin and some options — can lead to losses larger than the amount
        invested, that day trading is not something to do casually, and that you should not put money
        into products you do not understand. The page itself states: “This document is no longer
        being updated and may include information that is out-of-date.”
      </p>
      <p>
        The CFTC’s{' '}
        <a
          href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/fraudadv_tradingsystem.html"
          rel="noopener noreferrer"
          target="_blank"
        >
          Fraud Advisory: Commodity Trading Systems Sold on the Internet
        </a>{' '}
        (the page shows no last-reviewed date; checked 10 November 2026) explains that hypothetical
        or simulated results — including “real time” computer trading — have inherent limitations.
        They may not reflect consecutive losses, margin calls, slippage, bid-ask spreads, or the
        effect of actual fills on market prices. The advisory warns that simulated performance must
        not be presented as live performance, and that no system can guarantee profits. This is why
        this site labels its simulator synthetic and treats a simulated result as practice, not a
        live forecast.
      </p>

      <h2>Language this site refuses</h2>
      <div className="callout warn">
        <p>
          You will not find “make money with Claude,” guaranteed win rates, VIP signal funnels, or
          “we’ll trade your account” copy here. If another site uses this pack’s name that way,
          treat it as a red flag — and prefer the upstream MIT repo plus your own reading of the
          code.
        </p>
      </div>

      <h2>Pre-flight checklist (print / save)</h2>
      <ul className="checklist">
        <li>Installed from the canonical GitHub repo (or a fork you audited).</li>
        <li>Python 3.8+ available for helpers you intend to run.</li>
        <li>Paper account / paper flag confirmed.</li>
        <li>Brokerage tools set to Needs approval.</li>
        <li>Secrets only in environment variables.</li>
        <li>You understand stop slippage and data lag.</li>
        <li>
          You have read the{' '}
          <a
            href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            SEC’s day-trading risk bulletin
          </a>{' '}
          (2005) and accept that losses are possible.
        </li>
        <li>
          You know how to <Link href="/install/troubleshoot/">troubleshoot</Link> without disabling
          risk gates.
        </li>
      </ul>

      <div className="callout compliance">
        <p>
          <strong>Practice entry.</strong> Rehearse this checklist on paper before any live switch.
          The site’s <Link href="/paper-trading/">day trading simulator guide</Link> covers the
          first-session flow and journal; that page has no broker connection and shows no live
          quotes.
        </p>
      </div>

      <h2>Primary sources and dates</h2>
      <ul>
        <li>
          <a
            href="https://www.sec.gov/reportspubs/investor-publications/investorpubsdaytipshtm.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            SEC, Day Trading: Your Dollars at Risk
          </a>{' '}
          — published April 19, 2005; last reviewed or updated April 20, 2005.
        </li>
        <li>
          <a
            href="https://www.investor.gov/additional-resources/spotlight/formerdirectorlorischock-directors-take/thinking-day-trading-know-risks"
            rel="noopener noreferrer"
            target="_blank"
          >
            Investor.gov, Thinking of Day Trading? Know the Risks.
          </a>{' '}
          — Lori Schock; the page states it is no longer being updated and may be out-of-date; checked
          10 November 2026.
        </li>
        <li>
          <a
            href="https://www.cftc.gov/LearnAndProtect/AdvisoriesAndArticles/fraudadv_tradingsystem.html"
            rel="noopener noreferrer"
            target="_blank"
          >
            CFTC, Fraud Advisory: Commodity Trading Systems Sold on the Internet
          </a>{' '}
          — no last-reviewed date shown on the page; checked 10 November 2026.
        </li>
      </ul>

      <h2>Short FAQ</h2>
      <FaqList items={faqs} />

      <Related
        links={[
          { href: '/paper-trading/', label: 'Day trading simulator' },
          { href: '/install/', label: 'Day trader skill install' },
          { href: '/vs/', label: 'Claude trading skills comparison' },
          { href: '/faq/', label: 'Is day trader skill financial advice?' },
        ]}
      />
    </>
  );
}
