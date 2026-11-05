import type { Metadata } from 'next';
import Link from 'next/link';
import { Related } from '@/components/Related';

export const metadata: Metadata = {
  title: 'Day Trader Skill Paper Trading Guide',
  description:
    'Day trader skill paper trading: rehearse scanner→broker on a paper account with Needs approval. Claude day trader paper broker defaults — not live capital. Not financial advice.',
  alternates: { canonical: '/paper-trading/' },
};

export default function PaperTradingPage() {
  return (
    <>
      <h1>Day Trader Skill paper trading: rehearse before any live risk</h1>
      <div className="tldr">
        <strong>TL;DR.</strong> Run the full chain on a paper account until tickets, risk BLOCKs, and
        alerts feel boring. Do not “just try live once.” Most people who day trade lose money —
        paper is how you learn the software without paying tuition to the market on day one.
      </div>
      <div className="callout danger">
        <p>
          <strong>Not financial advice.</strong> Paper success does not imply live success. Slippage,
          psychology, and partial fills differ.
        </p>
      </div>
      <h2>Rehearsal flow</h2>
      <ol className="steps">
        <li>Confirm paper flags / paper brokerage account and Needs approval.</li>
        <li>
          Run scanner → news → entry → exit → timemachine → budget → risk on a single name.
        </li>
        <li>If risk BLOCKs, fix the draft — do not disable limits.</li>
        <li>Show the broker ticket; practice typing yes only when the text matches intent.</li>
        <li>Deny the connector card sometimes on purpose to prove the gate works.</li>
        <li>Let alerts fire on stop/target/flat time; journal what you would have done.</li>
        <li>Repeat across multiple sessions before considering any live change yourself.</li>
      </ol>
      <h2>What “good paper” looks like</h2>
      <ul>
        <li>You can explain every field on the ticket without Claude summarizing it away.</li>
        <li>You have seen BLOCK reasons and fixed sizing instead of overriding.</li>
        <li>Secrets never appeared in chat logs.</li>
        <li>You still treat Time Machine odds as a skip filter, not a green light cult.</li>
      </ul>
      <Related
        links={[
          { href: '/safety/', label: 'Claude day trader skill safety' },
          { href: '/skills/broker/', label: 'trader-broker skill notes' },
          { href: '/install/', label: 'Day trader skill install' },
        ]}
      />
    </>
  );
}
