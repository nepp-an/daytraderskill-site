import Link from 'next/link';

export function DisclaimerBar() {
  return (
    <aside className="disclaimer-bar" role="note" aria-label="Compliance disclaimer">
      <span className="disclaimer-inner">
        <strong>Not financial advice.</strong> Independent, paper-first education.{' '}
        <Link href="/safety/">Safety</Link>{' '}
        <span className="disclaimer-sep" aria-hidden="true">
          ·
        </span>{' '}
        <Link href="/paper-trading/">Paper</Link>{' '}
        <span className="disclaimer-sep" aria-hidden="true">
          ·
        </span>{' '}
        <span>AI order tools: Needs approval</span>
      </span>
    </aside>
  );
}
