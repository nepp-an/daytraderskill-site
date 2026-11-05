import Link from 'next/link';
import { BRAND, FOOTER_GROUPS, UPSTREAM_REPO } from '@/lib/site';

export function SiteFooter() {
  const year = new Date().getFullYear();
  return (
    <footer className="site-footer">
      <div className="site-footer-inner">
        <div className="footer-top">
          <div className="footer-brand">
            <p className="footer-wordmark">{BRAND}</p>
            <p>
              Independent, paper-first education for retail day traders. We explain the workflow,
              the tools, and the risk — without signals or profit promises.
            </p>
            <p className="footer-compliance">
              <strong>Not financial advice.</strong> Paper trading is the default. AI order tools
              require <strong>Needs approval</strong>. Most people who day trade lose money.
            </p>
          </div>
          <nav className="footer-nav" aria-label="Footer">
            {FOOTER_GROUPS.map((group) => (
              <div className="footer-group" key={group.title}>
                <h2>{group.title}</h2>
                <ul>
                  {group.links.map((item) => (
                    <li key={item.href}>
                      <Link href={item.href}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        <div className="footer-legal">
          <p>
            © {year} {BRAND}. Independent information / tutorial site — <strong>not</strong> the
            official Day Trader Skill project and not affiliated with its authors. Upstream source
            (MIT):{' '}
            <a href={UPSTREAM_REPO} rel="noopener noreferrer" target="_blank">
              github.com/Jakeschincariol/day-trader-skill
            </a>
            .
          </p>
          <p>
            No trade-on-your-behalf service. No signal groups. No guaranteed outcomes. Market data
            can be delayed or wrong; verify anything important with your broker and a licensed
            professional.
          </p>
        </div>
      </div>
    </footer>
  );
}
