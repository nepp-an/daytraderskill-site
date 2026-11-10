export const SITE_ORIGIN = 'https://daytraderskill.com';
export const CONTACT_EMAIL = 'privacy@daytraderskill.com';
export const BRAND = 'DayTraderSkill.com';

/**
 * GA4 Measurement ID for THIS site only (daytraderskill.com — "Day Trader Skill",
 * stream 16285240322). Never use OCA G-LVEKXCFCER or E7 G-QY1D1CDXDZ.
 */
export const GA4_MEASUREMENT_ID = 'G-CFQ8JV652G';
export const BRAND_SHORT = 'Paper-first day trading guide';
export const SITE_TAGLINE = 'Learn day trading. Practice on paper. Understand the risk.';
export const REVIEWED = '2026-11-05';

export const UPSTREAM_REPO = 'https://github.com/Jakeschincariol/day-trader-skill';
export const UPSTREAM_V1 = 'https://github.com/Jakeschincariol/trader-skill';
export const UPSTREAM_AUTHOR = 'Jake Schincariol';
export const UPSTREAM_LICENSE = 'MIT';

export type NavItem = {
  href: string;
  label: string;
};

/** Primary hub navigation: Learn · Paper · Risk · Tools · Safety. */
export const NAV: NavItem[] = [
  { href: '/learn/', label: 'Learn' },
  { href: '/paper-trading/', label: 'Paper' },
  { href: '/safety/#risk', label: 'Risk' },
  { href: '/tools/', label: 'Tools' },
  { href: '/safety/', label: 'Safety' },
];

export type FooterGroup = {
  title: string;
  links: NavItem[];
};

export const FOOTER_GROUPS: FooterGroup[] = [
  {
    title: 'Learn',
    links: [
      { href: '/learn/', label: 'Learning hub' },
      { href: '/learn/day-trading-for-beginners/', label: 'Day trading for beginners' },
      { href: '/learn/what-is-day-trading/', label: 'What is day trading?' },
      { href: '/learn/how-to-start-day-trading/', label: 'How to start day trading' },
    ],
  },
  {
    title: 'Practice & risk',
    links: [
      { href: '/paper-trading/', label: 'Day trading simulator' },
      { href: '/safety/', label: 'Safety checklist' },
      { href: '/safety/#risk', label: 'Risk basics' },
      { href: '/faq/', label: 'FAQ' },
    ],
  },
  {
    title: 'Tools',
    links: [
      { href: '/tools/', label: 'Tools hub' },
      { href: '/tools/position-size-calculator/', label: 'Position size calculator' },
      { href: '/tools/risk-reward-calculator/', label: 'Risk/reward calculator' },
      { href: '/tools/install-claude-skills/', label: 'Install Claude skills' },
      { href: '/install/', label: 'Day Trader Skill install' },
      { href: '/skills/', label: '11 skill modules' },
      { href: '/vs/', label: 'Tool comparisons' },
    ],
  },
  {
    title: 'Site',
    links: [
      { href: '/about/', label: 'About' },
      { href: '/editorial-policy/', label: 'Editorial policy' },
      { href: '/contact/', label: 'Contact' },
      { href: '/changelog-watch/', label: 'Update watch' },
      { href: '/privacy/', label: 'Privacy' },
    ],
  },
];

export const DISCLAIMER_SHORT =
  'Independent, paper-first day trading education and tool guides. Not financial advice.';

export const DISCLAIMER_LONG =
  'Not financial advice. DayTraderSkill.com is an independent education and tutorial site about retail day trading, paper practice, risk, and trading software. We are not a broker, an investment adviser, or the official site of any third-party project we discuss. Nothing here is an offer to trade on your behalf, a signal service, or a promise of profits. Paper trading is the default we teach. Software that can reach an order path should require a human confirmation and a Needs approval permission setting. You alone decide whether to install, configure, or use any software.';
