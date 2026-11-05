import type { Metadata } from 'next';
import Link from 'next/link';
import { FaqList, faqJsonLd } from '@/components/Faq';
import { JsonLd } from '@/components/JsonLd';
import { Related } from '@/components/Related';

export const metadata: Metadata = {
  title: 'Claude Day Trader Skill FAQ',
  description:
    'FAQ: Is Claude Day Trader Skill an auto-bot? Paper trading? Financial advice? Claude Pro? PDT? SEC_USER_AGENT? Stops? Taxes? Not financial advice.',
  alternates: { canonical: '/faq/' },
};

const faqs = [
  {
    q: 'Is Day Trader Skill an auto-trading bot?',
    a: 'No. It is eleven Claude skills plus Python helpers. Orders require risk PASS, your typed yes, and (with correct settings) Claude’s Allow once / Deny card. Paper trading is the default.',
  },
  {
    q: 'Is this financial advice?',
    a: 'No. Not financial advice. This independent site explains software install and safety. Most people who day trade lose money.',
  },
  {
    q: 'Do I need Claude Pro?',
    a: 'You need whatever Claude / Claude Code plan supports the skill or plugin features you use. Exact plan gates change — check Anthropic’s current product docs. The Python helpers themselves are just local scripts.',
  },
  {
    q: 'Must I use a live broker?',
    a: 'No. Prefer paper. This guide does not encourage live trading. If you ever change that yourself, keep Needs approval and understand stop slippage.',
  },
  {
    q: 'Why do plugin commands look different from screenshots?',
    a: 'Claude Code namespaces plugin skills (for example /day-trader-skill:trader-scanner). Copying folders yields bare /trader-* names. See the troubleshoot page.',
  },
  {
    q: 'What is SEC_USER_AGENT for?',
    a: 'SEC endpoints expect you to identify yourself (name + contact). Set the env var or config field before news/filing/analyst style tools.',
  },
  {
    q: 'Does Time Machine predict prices?',
    a: 'No. It simulates paths from recent bars and historical rule fires. Treat odds as a reality check, never a promise.',
  },
  {
    q: 'Do stop losses guarantee my max loss?',
    a: 'No. Gaps and fast markets can fill past the stop. Stated max loss is typically the loss at the planned stop price.',
  },
  {
    q: 'Did FINRA remove the PDT $25k rule?',
    a: 'Upstream notes regulatory changes and phased broker adoption windows. Your broker’s current policy is what matters — verify with them, and consider pdt_guard if they still count day trades strictly.',
  },
  {
    q: 'Is the Pelosi skill insider trading?',
    a: 'No. It reads public STOCK Act disclosures, which can lag actual trades. Public ≠ a day-trade edge.',
  },
  {
    q: 'Is this the official website?',
    a: 'No. DayTraderSkill.com is independent. Upstream source is the MIT GitHub repository by Jake Schincariol’s day-trader-skill project.',
  },
  {
    q: 'Can you trade my account or sell signals?',
    a: 'No. We do not offer trade-on-your-behalf service, signal groups, or profit promises.',
  },
];

export default function FaqPage() {
  return (
    <>
      <JsonLd data={faqJsonLd(faqs)} />
      <h1>Claude Day Trader Skill — FAQ</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> Short answers for the questions install guides skip: bot myths,
        paper defaults, approvals, data limits, and “is this official?”
      </div>
      <FaqList items={faqs} />
      <Related
        links={[
          { href: '/install/troubleshoot/', label: 'Troubleshoot matrix' },
          { href: '/safety/', label: 'Safety checklist' },
          { href: '/vs/', label: 'Comparisons' },
        ]}
      />
    </>
  );
}
