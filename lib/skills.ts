export type Skill = {
  slug: string;
  command: string;
  name: string;
  job: string;
  summary: string;
  when: string;
  inputs: string;
  outputs: string;
  upstream: string;
  downstream: string;
  cautions: string[];
  faq: { q: string; a: string }[];
};

export const SKILLS: Skill[] = [
  {
    slug: 'scanner',
    command: '/trader-scanner',
    name: 'Chart Scanner',
    job: 'Scan charts for setups',
    summary:
      'Scans a large US-equity universe for rule-based setups such as opening-range breakouts, flags, and oversold bounces. It is a screener, not a buy list.',
    when: 'Start of a session or when you want a shortlist before reading news or planning an entry.',
    inputs: 'Nasdaq Trader symbol lists; Yahoo Finance chart bars; optional time filters (for example ORB at a clock time).',
    outputs: 'Setup candidates written into the shared trader/ workspace for later skills.',
    upstream: 'None — usually the first step in a single-trade flow.',
    downstream: 'News → Entry → Exit → Time Machine → Budget → Risk → Broker.',
    cautions: [
      'Public chart data can lag, change shape, or rate-limit you.',
      'A setup match is not a recommendation to buy.',
      'Bars are 1- or 5-minute style aggregates, not every tick.',
    ],
    faq: [
      {
        q: 'Does the scanner place trades?',
        a: 'No. Only the broker skill can lead to an order, and only after risk checks and your explicit yes.',
      },
      {
        q: 'How large is the universe?',
        a: 'The upstream tools can pull on the order of thousands of US listings from Nasdaq Trader public lists. Treat counts as approximate; lists change.',
      },
    ],
  },
  {
    slug: 'news',
    command: '/trader-news',
    name: 'News Monitor',
    job: 'Track breaking headlines and filings',
    summary:
      'Pulls recent headlines and related public filings for watched tickers so you can see what might be moving a name before you treat a chart setup as actionable.',
    when: 'After a scanner shortlist, or on a schedule for a watchlist.',
    inputs: 'Ticker list; lookback window; public news/filing endpoints.',
    outputs: 'Tagged headlines and filing notes in the trader/ workspace.',
    upstream: 'Scanner (or a manual watchlist).',
    downstream: 'Entry / Exit planning; can also run on a schedule with analyst and pelosi.',
    cautions: [
      'Headlines are not verified investment theses.',
      'SEC tools expect a polite SEC_USER_AGENT identity string.',
      'Earnings week changes day-trade risk even if a chart looks clean.',
    ],
    faq: [
      {
        q: 'Is this insider information?',
        a: 'No. It reads public headlines and public filings only.',
      },
    ],
  },
  {
    slug: 'entry',
    command: '/trader-entry',
    name: 'Entry Timer',
    job: 'Watch a setup bar by bar',
    summary:
      'Watches a chosen setup until it is waiting, triggered, or expired. Useful for timing a planned breakout rather than guessing from a static screenshot.',
    when: 'After you have a ticker, setup type, and news context you accept.',
    inputs: 'Ticker, setup definition (for example ORB), bar stream from public charts.',
    outputs: 'Status updates: waiting / triggered / expired.',
    upstream: 'Scanner + News.',
    downstream: 'Exit planner should already have a stop/target plan before you act on a trigger.',
    cautions: [
      'A trigger is a rule firing, not a guarantee the move continues.',
      'If your feed lags, confirm against your broker chart before acting.',
    ],
    faq: [
      {
        q: 'Can entry auto-submit orders?',
        a: 'No. Entry only reports status. Orders stay behind risk checks and your yes in the broker skill.',
      },
    ],
  },
  {
    slug: 'exit',
    command: '/trader-exit',
    name: 'Exit Planner',
    job: 'Set stop and target before entry',
    summary:
      'Defines stop, target, and flat-by-time rules before you enter so risk is sized against a written plan, not after you are already in the trade.',
    when: 'Before or immediately with the entry decision — never after you are guessing mid-trade.',
    inputs: 'Setup context; stop style (for example range midpoint); reward multiple; session flat time.',
    outputs: 'A plan file (for example trader/plan.json) used by budget, risk, alerts, and broker ticket text.',
    upstream: 'Scanner / Entry context.',
    downstream: 'Time Machine → Budget → Risk → Broker; Alerts can mirror the plan.',
    cautions: [
      'A stop order is a plan, not a fill guarantee — gaps and fast markets can slip.',
      'Max loss figures assume a fill at the stop price.',
    ],
    faq: [
      {
        q: 'Does exit guarantee my max loss?',
        a: 'No. Stops can fill past the stop price. Treat stated max loss as the loss at the planned stop, not a hard cap.',
      },
    ],
  },
  {
    slug: 'timemachine',
    command: '/trader-timemachine',
    name: 'Time Machine',
    job: 'Replay outcomes before risking capital',
    summary:
      'Replays many simulated rest-of-session paths from the stock’s own recent bars, plus historical times the same rule fired, so you see honest odds — not a price prediction.',
    when: 'After you have an exit plan and before you size or send anything.',
    inputs: 'Plan context; recent intraday bars; historical sessions for the same rule.',
    outputs: 'Simulation summary (target-first / stop-first / still open style outcomes) and historical hit counts.',
    upstream: 'Exit plan.',
    downstream: 'Budget → Risk → Broker.',
    cautions: [
      'Simulation is not prediction. Future events can look nothing like the last ~60 sessions.',
      'Earnings, halts, and headlines can break the replay assumptions.',
      'Near coin-flip odds are a reason to skip, not a reason to force a trade.',
    ],
    faq: [
      {
        q: 'Is Time Machine a signal?',
        a: 'No. It is a reality check built from past bars. Treat odds as context, never as a promise.',
      },
    ],
  },
  {
    slug: 'budget',
    command: '/trader-budget',
    name: 'Budget Manager',
    job: 'Size positions to a max loss',
    summary:
      'Converts account size and max loss per trade into a share count and a bracket-style order sketch based on the planned stop distance.',
    when: 'After you accept the plan and simulation context.',
    inputs: 'Account budget, max loss per trade, stop distance from the plan.',
    outputs: 'Sized order sketch (for example trader/orders.json).',
    upstream: 'Exit plan (+ optional Time Machine context).',
    downstream: 'Risk → Broker.',
    cautions: [
      'Sizing math assumes the planned stop; slippage changes real P/L.',
      'Do not raise max loss to “make the share count look meaningful.”',
    ],
    faq: [
      {
        q: 'Does budget enable leverage?',
        a: 'Upstream defaults avoid options, margin, shorting, and leverage unless you deliberately turn them on. Leave them off for paper practice.',
      },
    ],
  },
  {
    slug: 'risk',
    command: '/trader-risk',
    name: 'Risk Manager',
    job: 'PASS or BLOCK against your limits',
    summary:
      'Checks each drafted order against limits such as max loss, daily loss, trades-per-day, reward-to-risk, entry window, size, and cash — then passes or blocks with a reason.',
    when: 'Immediately before any broker ticket is shown for approval.',
    inputs: 'Sized orders + your configured limits (including optional PDT-style day-trade counting).',
    outputs: 'PASS / BLOCK with reasons.',
    upstream: 'Budget.',
    downstream: 'Broker (only if PASS).',
    cautions: [
      'A PASS is not investment advice; it only means the draft fits your configured rules.',
      'Broker PDT / day-trade policies still vary — verify with your broker.',
    ],
    faq: [
      {
        q: 'Can I override a BLOCK in chat?',
        a: 'You can change your own limits, but the point of the skill is to stop oversized or out-of-window tickets. Do not train yourself to bypass risk for FOMO.',
      },
    ],
  },
  {
    slug: 'broker',
    command: '/trader-broker',
    name: 'Order Executor',
    job: 'Show tickets; send only after yes',
    summary:
      'Shows a plain-language ticket for an approved order. Paper trading is the default. Nothing is meant to go live until you type yes for that exact order and Claude’s own Allow once / Deny card agrees.',
    when: 'Only after Risk PASS — and preferably after days of paper rehearsal.',
    inputs: 'Risk-passed order tickets; brokerage connector configured for paper by default.',
    outputs: 'Ticket text; optional paper (or live, if you force it) submission after dual approval.',
    upstream: 'Risk.',
    downstream: 'Alerts while a position is open.',
    cautions: [
      'Never set brokerage tools to Always allow.',
      'Keys belong in environment variables, never in chat.',
      'This guide does not encourage live trading.',
    ],
    faq: [
      {
        q: 'Is this an auto-trading bot?',
        a: 'No. The pack is a set of Claude skills plus plain Python helpers. Orders require your typed yes and connector approval. Paper is default.',
      },
    ],
  },
  {
    slug: 'alerts',
    command: '/trader-alerts',
    name: 'Price Alerts',
    job: 'Ring on stop, target, or flat time',
    summary:
      'Creates alerts from the plan (stop, target, flatten-by-close) and checks which ones have hit so you are nudged to manage an open paper or live position.',
    when: 'While a position is open; can run in parallel with the main flow.',
    inputs: 'Plan-derived alert definitions.',
    outputs: 'One-shot rings when conditions hit.',
    upstream: 'Exit plan / open position context.',
    downstream: 'Human decision to flatten or hold per your rules.',
    cautions: [
      'Alerts are not fills. You still need to act (or let a resting order work).',
      'Do not ignore flatten-by-close alerts if your rule is flat before the bell.',
    ],
    faq: [
      {
        q: 'Can alerts place the exit for me?',
        a: 'Alerts notify. Exit orders still follow your broker setup and approval rules.',
      },
    ],
  },
  {
    slug: 'analyst',
    command: '/trader-analyst',
    name: 'Earnings Analyst',
    job: 'Summarize earnings facts',
    summary:
      'Reads public earnings-related facts (for example XBRL-style fundamentals) and summarizes what changed across quarters — useful context, not a valuation model.',
    when: 'On a schedule or when a name is near a report; not as a day-trade trigger by itself.',
    inputs: 'Ticker; SEC identity via SEC_USER_AGENT / config.',
    outputs: 'Fact summaries (growth, EPS-style fields depending on available data).',
    upstream: 'Watchlist / news context.',
    downstream: 'May change whether you even allow a day trade near a report.',
    cautions: [
      'Not tax advice, not a buy/sell rating.',
      'Identify yourself politely to SEC endpoints.',
    ],
    faq: [
      {
        q: 'Does analyst predict the post-earnings move?',
        a: 'No. It summarizes reported facts. Gap risk around earnings remains.',
      },
    ],
  },
  {
    slug: 'pelosi',
    command: '/trader-pelosi',
    name: 'Pelosi Tracker',
    job: 'Read public congressional trade disclosures',
    summary:
      'Reads House Clerk periodic transaction reports (PTRs) and related public disclosures when they post. These are delayed public filings under the STOCK Act — not insider tips.',
    when: 'On a schedule if you track disclosure flow; never as “secret intel.”',
    inputs: 'Public House Clerk indexes and PTR text; optional member filters.',
    outputs: 'Indexed disclosure notes.',
    upstream: 'Independent scheduled job.',
    downstream: 'Optional context only; disclosures can lag trades by many days.',
    cautions: [
      'Public disclosures are not inside information.',
      'Filings can lag the actual trade by up to the legal window (often discussed as up to ~45 days for covered trades).',
      'Copying a politician’s disclosed trade is still your own risk — and often too late to be a day-trade edge.',
    ],
    faq: [
      {
        q: 'Why is it named Pelosi?',
        a: 'The skill name follows popular search interest in one well-known filer’s disclosures. The tools read public STOCK Act filings more generally; the name is not an endorsement.',
      },
    ],
  },
];

export function getSkill(slug: string): Skill | undefined {
  return SKILLS.find((s) => s.slug === slug);
}
