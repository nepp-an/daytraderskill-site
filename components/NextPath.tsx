import Link from 'next/link';
import { ArrowIcon } from '@/components/icons';
import type { RelatedLink } from '@/components/Related';

/**
 * A short, fixed "what to read next" path at the end of every key page.
 * Kept to two or three links so the next step stays obvious.
 */
export function NextPath({ links }: { links: RelatedLink[] }) {
  const path = links.slice(0, 3);
  return (
    <section className="next-path" aria-labelledby="next-path-heading">
      <div className="section-head">
        <p className="eyebrow">Keep the loop going</p>
        <h2 id="next-path-heading">Next path</h2>
        <p>Two or three sensible next steps — no signals, no trade ideas.</p>
      </div>
      <ol className="next-path-list">
        {path.map((link, index) => (
          <li key={link.href}>
            <span className="next-path-step" aria-hidden="true">
              {String(index + 1).padStart(2, '0')}
            </span>
            <Link href={link.href}>{link.label}</Link>
            {link.description ? <span className="next-path-desc">{link.description}</span> : null}
            <span className="next-path-arrow" aria-hidden="true">
              <ArrowIcon size={16} />
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
