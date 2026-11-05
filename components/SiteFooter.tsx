import Link from 'next/link';
import { BRAND, FOOTER_NAV, UPSTREAM_REPO } from '@/lib/site';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <p>
          © {year} {BRAND}. Independent information / tutorial site —{' '}
          <strong>not</strong> the official Day Trader Skill project. Upstream source (MIT):{' '}
          <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
            github.com/Jakeschincariol/day-trader-skill
          </a>
          .
        </p>
        <p className="site-footer-links">
          {FOOTER_NAV.map((item, i) => (
            <span key={item.href}>
              {i > 0 ? ' · ' : null}
              <Link href={item.href}>{item.label}</Link>
            </span>
          ))}
        </p>
        <p className="muted">
          Not financial advice. Paper trading is the default. No profit promises. No trade-on-your-behalf
          service. Most people who day trade lose money.
        </p>
      </div>
    </footer>
  );
}
