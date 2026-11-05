import Link from 'next/link';

export function Related({ links }: { links: { href: string; label: string }[] }) {
  return (
    <section className="related" aria-labelledby="related-heading">
      <h2 id="related-heading">Related</h2>
      <ul>
        {links.map((l) => (
          <li key={l.href}>
            <Link href={l.href}>{l.label}</Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
