import { DISCLAIMER_SHORT } from '@/lib/site';

export function DisclaimerBar() {
  return (
    <aside className="disclaimer-bar" role="note" aria-label="Compliance disclaimer">
      <strong>Not financial advice.</strong> {DISCLAIMER_SHORT.replace(/^Not financial advice\.\s*/, '')}{' '}
      <a href="/safety/">Safety checklist</a>
      {' · '}
      <a href="/paper-trading/">Paper trading</a>
    </aside>
  );
}
