export const SITE_ORIGIN = 'https://daytraderskill.com';
export const BRAND = 'DayTraderSkill.com';
export const BRAND_SHORT = 'Day Trader Skill Guide';
export const UPSTREAM_REPO = 'https://github.com/Jakeschincariol/day-trader-skill';
export const UPSTREAM_V1 = 'https://github.com/Jakeschincariol/trader-skill';
export const UPSTREAM_AUTHOR = 'Jake Schincariol';
export const UPSTREAM_LICENSE = 'MIT';

export const NAV = [
  { href: '/install/', label: 'Install' },
  { href: '/skills/', label: 'Skills' },
  { href: '/safety/', label: 'Safety' },
  { href: '/vs/', label: 'VS' },
  { href: '/faq/', label: 'FAQ' },
] as const;

export const FOOTER_NAV = [
  { href: '/install/', label: 'Install' },
  { href: '/install/troubleshoot/', label: 'Troubleshoot' },
  { href: '/safety/', label: 'Safety' },
  { href: '/paper-trading/', label: 'Paper trading' },
  { href: '/vs/', label: 'Comparisons' },
  { href: '/skills/', label: 'Skills' },
  { href: '/faq/', label: 'FAQ' },
  { href: '/changelog-watch/', label: 'Changelog watch' },
  { href: '/about/', label: 'About' },
  { href: '/privacy/', label: 'Privacy' },
] as const;

export const DISCLAIMER_SHORT =
  'Not financial advice. This independent guide covers open-source Claude skills for day-trading workflows. Paper trading is the default. Most people who day trade lose money.';

export const DISCLAIMER_LONG =
  'Not financial advice. DayTraderSkill.com is an independent information and tutorial site about the open-source Claude Day Trader Skill pack. We are not the official project site, not a broker, and not an investment adviser. Nothing here is an offer to trade on your behalf, a signal service, or a promise of profits. The upstream project defaults to paper trading and requires an explicit yes before any order path. You alone decide whether to install, configure, or use any software.';
