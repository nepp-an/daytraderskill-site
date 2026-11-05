import Link from 'next/link';

export type RelatedLink = {
  href: string;
  label: string;
  description?: string;
};

export function Related({ links }: { links: RelatedLink[] }) {
  return (
    <section className="related" aria-labelledby="related-heading">
      <div className="section-head">
        <h2 id="related-heading">Related reading</h2>
        <p>Keep going with the next useful guide — no trade ideas, just the workflow.</p>
      </div>
      <div className="related-grid">
        {links.map((l) => (
          <Link className="related-card" href={l.href} key={l.href}>
            <span className="related-arrow" aria-hidden="true">
              →
            </span>
            <h3>{l.label}</h3>
            {l.description ? <p>{l.description}</p> : null}
          </Link>
        ))}
      </div>
    </section>
  );
}
