import Link from 'next/link';

const LINKS = [
  { href: '/tools/install-claude-skills/', label: 'Install Claude skills' },
  { href: '/install/', label: 'Day Trader Skill install' },
  { href: '/skills/', label: '11 modules' },
  { href: '/vs/', label: 'Comparisons' },
  { href: '/safety/', label: 'Safety' },
];

export function ToolsNav({ current }: { current?: string }) {
  return (
    <nav className="subnav" aria-label="Tools sections">
      {LINKS.map((link) => {
        const active = current === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={active ? 'active' : undefined}
            aria-current={active ? 'page' : undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
