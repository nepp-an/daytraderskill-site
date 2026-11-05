import Link from 'next/link';
import { BRAND_SHORT, NAV } from '@/lib/site';

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header-inner">
        <Link href="/" className="brand" aria-label="DayTraderSkill.com home">
          <span className="brand-mark" aria-hidden="true">
            DT
          </span>
          <span className="brand-copy">
            <span className="brand-name">DayTraderSkill</span>
            <span className="brand-sub">{BRAND_SHORT}</span>
          </span>
        </Link>
        <nav className="primary-nav" aria-label="Primary">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <Link href={item.href}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
