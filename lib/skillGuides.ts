export type SkillStep = {
  do: string;
  command?: string;
  detail?: string;
};

export type SkillGuide = {
  metaDescription: string;
  overview: string;
  prerequisites: string[];
  firstCommand: { command: string; note: string };
  steps: SkillStep[];
  artifacts: { name: string; detail: string }[];
  example: {
    title: string;
    setup: string;
    lines: string[];
    takeaway: string;
  };
  limits: string[];
  approval: string;
  source: string;
  faq: { q: string; a: string }[];
  related: { href: string; label: string; description: string }[];
};

/**
 * Per-skill deep notes. This is an independent summary of the upstream
 * trader-*-SKILL.md files and README (MIT), read on 10 November 2026.
 * It deliberately keeps the shared legal disclaimer short; the steps,
 * artifacts, examples and failure boundaries below are skill-specific.
 */
export const SKILL_GUIDES: Record<string, SkillGuide> = {
  scanner: {
    metaDescription:
      'How the Day Trader Skill Chart Scanner works: universe and daily scans, opening-range breakouts, partial results, Yahoo data limits, and a historical TSLA example. Read-only; no order path.',
    overview:
      'The Chart Scanner is a rule engine, not a ranking. It builds a US-listed universe, runs a pre-market daily scan of closing prices, and can run an opening-range breakout scan on completed 5-minute bars. The daily and opening-range modes write a shortlist to trader/watchlist.json for the news and entry skills; the universe mode writes trader/universe.txt. It never says which stock to buy, never sizes an order, and never calls a price real time.',
    prerequisites: [
      'Python 3.8 or newer and outbound access to nasdaqtrader.com and Yahoo Finance. No broker account, API key or pip package is required.',
      'For the opening-range scan: a live session after 9:50 AM New York time, with every 5-minute bar from 9:30 to the cutoff present. Weekends, holidays, a 1:00 PM early close and the after-hours window produce one line and no file.',
      'A universe file built with scan.py universe. The symbol lists change, so rebuild it periodically rather than trusting a stale trader/universe.txt.',
      'A chosen ticker remains your decision. The scanner will not pick one for you, and a hit is stale as soon as the price moves on.',
    ],
    firstCommand: {
      command: 'python3 trader-scanner/scan.py daily',
      note: 'run before the open (or after the close) from a clone; it writes trader/watchlist.json',
    },
    steps: [
      {
        do: 'Build or refresh the universe.',
        command: 'python3 trader-scanner/scan.py universe',
        detail:
          'It downloads the Nasdaq Trader symbol directories and filters out test issues, ETFs, units, warrants, rights, notes and most preferreds. On the 19–20 October 2026 files the rule kept 5,943 and 5,942 names. Expect the count to move with the files; do not treat either number as permanent.',
      },
      {
        do: 'Run the pre-market daily scan.',
        command: 'python3 trader-scanner/scan.py daily',
        detail:
          'It reads 20 daily closes per Yahoo spark request. The default liquidity floor is a $5 last price and 1,000,000 shares of prior-session volume. Five setups are computed from closes: a 20-day closing-high breakout, a bull flag, a reclaim of the 20-day average, RSI-14 oversold, and an oversold bounce. Tell the user the fetched, liquid, scanned and hit counts before naming any ticker.',
      },
      {
        do: 'Run the opening-range scan during the session.',
        command: 'python3 trader-scanner/scan.py orb --at 10:15',
        detail:
          'Stage 1 uses spark 5-minute closes to find candidates. Stage 2 confirms the range high and low from the chart endpoint with real highs and lows, capped at 200 names by default. If the cap skips charts, the tool prints PARTIAL with the count it skipped; never round that up to “the whole market”.',
      },
      {
        do: 'Inspect one hit, then hand it on.',
        detail:
          'Read the trigger time, the last price, the opening range and the percent over the range. Say “matched a rule”, not “a buy” or “a winner”. Ask the user to choose one chart, then run the news skill before the entry skill. Never choose for them.',
      },
    ],
    artifacts: [
      { name: 'trader/universe.txt', detail: 'One SYMBOL|Name per line, written by the universe mode and read by the scans.' },
      { name: 'trader/watchlist.json', detail: 'Mode, as_of, universe/scanned/failed counts, and hits[] with the symbol and setup fields.' },
      { name: 'trader/config.json', detail: 'Optional no_entries_after setting (default 15:30 New York time) used to expire the opening-range scan.' },
    ],
    example: {
      title: 'The reel: a fixture wall, not a live feed',
      setup:
        'Monday 19 October 2026, 10:15 AM New York, using the upstream test fixture wall. This is historical/educational data, not a current quote, not a real-time scan, and not a trade recommendation.',
      lines: [
        'Fetched 233 of 234 charts (1 failed or had no data); 231 usable.',
        '95 candidates, 95 confirmed with real highs and lows.',
        '42 of 231 charts closed above their opening-range high by 10:15 AM.',
        '10:15 AM  TSLA  $364.18  range 354.47 to 362.18  +0.55% over',
      ],
      takeaway:
        'The fixture used no price floor, so a $2.97 name appears among the 42. With the default $5 floor the count is 41. TSLA is a hit, not a recommendation: the next question is what the news says, then whether a completed bar confirms an entry.',
    },
    limits: [
      'Yahoo chart and spark endpoints are free, unofficial and can lag, change shape or rate-limit. The tool tries query2, then query1 on a 429 or 5xx, with one retry after a five-second wait.',
      'Bars are 1- or 5-minute aggregates, never every tick. A missing bar can mean a halt or a thin stock, and those charts are dropped rather than guessed.',
      'A partial scan is reported as partial. A finite --max-confirm cap can skip the least-traded candidates; --max-confirm 0 checks all of them, at the cost of time.',
      'The scanner never places, sizes or checks an order, never calls data real time, and never promises a setup works. A later breakout is closer to the current price and may be a different trade.',
    ],
    approval: 'No order tool and no permission card belong on this step. The only approval question is whether you want the scanner to make public network requests. If a tutorial wires the scanner directly to a broker tool, that is not the upstream design; remove it.',
    source: 'Upstream trader-scanner/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Why does the upstream universe show 5,943 names when the reel says 5,259?',
        a: 'The reel used a narrower ad hoc filter (names saying common or ordinary, no ADRs). The tool’s documented rule also keeps many ADRs, closed-end funds and partnership units. All 5,259 reel names are inside the larger list; the extra 684 are mostly those categories.',
      },
      {
        q: 'Can I run the opening-range scan at any time?',
        a: 'No. It needs a trading day, at least the first 15 minutes of complete bars, and a cutoff before no_entries_after (default 15:30 New York). Before 9:50, on a weekend or holiday, or after the close it prints one plain line and writes nothing.',
      },
      {
        q: 'Does a hit mean the setup is still valid?',
        a: 'Not necessarily. The scan is a snapshot of completed bars. If the price has moved on, re-run before acting, and treat a late trigger as a different trade rather than the original one.',
      },
    ],
    related: [
      { href: '/skills/news/', label: 'News Monitor', description: 'Check what may be moving the chart before you plan an entry.' },
      { href: '/skills/entry/', label: 'Entry Timer', description: 'Wait for a completed bar to close above the level, instead of guessing from a screenshot.' },
      { href: '/install/', label: 'Install and verify', description: 'Run the scanner from a clone, or use the namespaced plugin command.' },
      { href: '/paper-trading/', label: 'Paper practice', description: 'Rehearse the scan-to-plan workflow without a broker connection.' },
    ],
  },
  news: {
    metaDescription:
      'How the Day Trader Skill News Monitor works: Yahoo headlines, SEC 8-K filings, 30-day de-duplication, MOVING flags, source rules, and a historical TSLA briefing. Read-only.',
    overview:
      'The News Monitor reads two feeds for a watchlist: Yahoo Finance headline RSS and each company’s 8-K filings on SEC EDGAR. It prints only items it has not shown before, newest first in New York time, tags each item (earnings, analyst, deal, halt, regulatory and so on), and puts the day’s price move beside the headline. It is a reading aid, not a thesis generator.',
    prerequisites: [
      'A ticker list (--tickers), or a trader/watchlist.json from the scanner. A trader/plan.json or trader/portfolio.json is read when present.',
      'For SEC 8-Ks, a real identity string in SEC_USER_AGENT or trader/config.json sec_user_agent, for example “Your Name you@example.com”. Without it, filings are skipped with a note; headlines still work.',
      'Outbound access to feeds.finance.yahoo.com and sec.gov. No paid news API, no account and no broker key.',
      'A willingness to open the story or filing before repeating it. The tool itself only reports what was published.',
    ],
    firstCommand: {
      command: 'python3 trader-news/news.py --tickers TSLA --hours 12',
      note: 'reads headlines, 8-Ks and the move from yesterday’s close; add --no-sec to skip filings',
    },
    steps: [
      {
        do: 'Run the check.',
        command: 'python3 trader-news/news.py',
        detail:
          'With no flags it reads the scanner watchlist, the current plan and the portfolio. Exit code 1 means nothing new. --all shows already-seen items, --json makes the output machine-readable, and --dry-run leaves the state file alone.',
      },
      {
        do: 'Read the items that can change the trade first.',
        detail:
          'Start with every filing marked ! (important 8-K items such as results, an officer change, impairment, delisting notice, unreliable past financials, bankruptcy or a cyber incident), then anything tagged earnings, halt, legal, regulatory or risk, then every MOVING ticker (3% or more from yesterday’s close by default).',
      },
      {
        do: 'Open the source and write a short per-ticker brief.',
        detail:
          'Say what happened, link the story or filing, give the move and one line on why it matters to the setup. If a headline and an 8-K disagree, the filing is what the company told the SEC. If a story is paywalled and you could not read it, say so instead of summarising it.',
      },
      {
        do: 'Flag anything that lands inside the trade window.',
        detail:
          'An earnings date, a halt, an offering or a legal item can gap past a stop. Say it before the entry and exit skills write a plan. A move with no headline is still worth reporting: “no news” is a finding, not a gap to fill with speculation.',
      },
    ],
    artifacts: [
      { name: 'trader/state/news.json', detail: 'The items already shown (kept 30 days) and each ticker’s CIK, so the next check does not repeat them.' },
      { name: 'trader/watchlist.json', detail: 'Read for the default ticker list when --tickers is omitted.' },
      { name: 'trader/plan.json and trader/portfolio.json', detail: 'Optional context: the trade being planned and the positions already held.' },
    ],
    example: {
      title: 'The reel: TSLA headlines on a fixture morning',
      setup:
        'Monday 19 October 2026, a historical fixture check around the 10:15 opening-range trigger. Not live news, not a current quote, not a recommendation.',
      lines: [
        '16 TSLA headlines since 8:00, newest first, New York time.',
        '8:04  “Tesla-SpaceX Merger Mania Strikes Wall Street Ahead of Earnings”  tags: earnings, deal',
        '8:02  “Tech Stock Rebound Nudges US Equity Futures Mostly Higher Pre-Bell”  tags: macro',
        'No new 8-K.',
        '10:52  TSLA 366.48  +3.31% vs yesterday’s close 354.72  MOVING',
      ],
      takeaway:
        'The brief can say: Tesla reports this week, so an overnight gap can jump a stop; today’s planned trade is in and out before the close; no new 8-K. That is context for the plan, not a reason to buy or sell.',
    },
    limits: [
      'Headlines are leads, not facts. The skill never invents a story, quote or number, and never says what the stock will do next.',
      'SEC filings are skipped without a User-Agent. SEC’s public limit is 10 requests a second; the tool stays far below it and pauses between calls.',
      'The Yahoo feed and chart endpoint are unofficial and can lag or omit a story. A missing headline is not proof that nothing happened.',
      'The skill only reads and reports. Nothing here places an order; only the broker skill can lead to one, after risk PASS and an explicit yes.',
    ],
    approval: 'Read-only tools can reasonably be set to Always allow if you accept the network access. Do not grant any order, cancel or position-changing tool because a news workflow asked for it. The news skill has no order path.',
    source: 'Upstream trader-news/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Why were the SEC filings skipped?',
        a: 'Most often SEC_USER_AGENT or trader/config.json sec_user_agent is missing or is not a real name plus contact email. The tool skips filings with a visible note rather than calling SEC anonymously. Headlines are unaffected.',
      },
      {
        q: 'Is this insider information?',
        a: 'No. It reads public headlines and public SEC filings. A headline can still be wrong, stale or paywalled, which is why the next step is to open the source.',
      },
      {
        q: 'Can it run every 15 minutes?',
        a: 'Upstream documents /loop 15m /trader-news or a scheduled morning task. Each check reads only new items and de-duplicates for 30 days. It still needs network access and a polite SEC identity.',
      },
    ],
    related: [
      { href: '/skills/scanner/', label: 'Chart Scanner', description: 'Where the watchlist came from, and what “matched a rule” does and does not mean.' },
      { href: '/skills/analyst/', label: 'Earnings Analyst', description: 'Read the filed numbers behind an earnings headline instead of trading the press release.' },
      { href: '/skills/entry/', label: 'Entry Timer', description: 'Only after the news context is understood: wait for the completed bar.' },
      { href: '/safety/', label: 'Safety and permissions', description: 'Keep read-only feeds separate from order-capable connectors.' },
    ],
  },
  entry: {
    metaDescription:
      'How the Day Trader Skill Entry Timer works: opening-range and level triggers, closed-bar rule, volume check, entry.json, time windows and a historical TSLA example. No order placement.',
    overview:
      'The Entry Timer turns a setup into one moment: the first completed 1- or 5-minute bar that closes above the opening-range high or a level you name. A wick above the level does not count, and neither does a bar that is still forming. It reports waiting, triggered, expired or not open yet, and writes trader/entry.json for the exit skill. It is long-side only in v2 and never buys anything.',
    prerequisites: [
      'A ticker and a setup: the default 15-minute opening range, or a level such as a 20-day high from the scanner.',
      'A live session with complete bars, or a saved Yahoo chart file for an offline replay. The tool uses 5-minute bars by default and can use 1-minute bars for a shorter window.',
      'The entry window from trader/config.json: no entries before 09:45 and after 15:30 New York by default. A 1:00 PM early close moves the cutoff with the close.',
      'News context you accept. The skill does not read headlines for you; run the news skill first if the chart looks clean.',
    ],
    firstCommand: {
      command: 'python3 trader-entry/entry.py check TSLA --setup orb',
      note: 'one status line; add --write to save trader/entry.json',
    },
    steps: [
      {
        do: 'Choose the symbol and check the context.',
        detail:
          'Take the symbol from the user or from a scanner hit. Run the news skill before treating a clean chart as actionable. The entry timer does not choose a ticker or validate the thesis.',
      },
      {
        do: 'Ask for the current status.',
        command: 'python3 trader-entry/entry.py check TSLA',
        detail:
          'It prints waiting and how far the last close is from the level, triggered with the bar’s close time and price, expired, or no data. Before 9:30 it says not open yet; before 9:45 the opening range is still forming.',
      },
      {
        do: 'If you want to wait, watch instead of refreshing manually.',
        command: 'python3 trader-entry/entry.py watch TSLA --until 15:30',
        detail:
          'The watcher wakes just after each bar closes, prints one line per bar, and exits 0 on the trigger. A sleeping laptop pauses it and it catches up late when it wakes. For a lighter loop, run check --write every five minutes.',
      },
      {
        do: 'On a trigger, say what happened and what did not.',
        detail:
          'Give the time, the price and the bar. Say plainly that nothing was placed. If the trigger is more than a bar old, say that too: a late entry is a different trade. Then hand off to the exit skill to set the stop and target before anything is bought.',
      },
    ],
    artifacts: [
      { name: 'trader/entry.json', detail: 'Symbol, setup, status, time, bar, price, level and the opening range. Written by check --write or by a watch trigger.' },
      { name: 'trader/watchlist.json', detail: 'Read by the watchlist command for every scanner hit.' },
      { name: 'trader/config.json', detail: 'no_entries_before (09:45) and no_entries_after (15:30), New York time.' },
    ],
    example: {
      title: 'The reel: waiting, then a completed-bar trigger',
      setup:
        'TSLA, Monday 19 October 2026, 5-minute bars. Historical fixture data used for teaching. Not live, not a recommendation.',
      lines: [
        '10:12  WAITING  last close $361.68 (10:05 bar), $0.50 under the range high $362.18 (-0.14%).',
        '       The 10:10 bar is still forming ($364.18 so far, closes 10:15 AM); it does not count until it closes.',
        '10:15  TRIGGERED 10:15 AM at $364.18: the 10:10 bar (bar 8) closed above the range high $362.18 (+0.55%).',
        '       Nothing was placed.',
      ],
      takeaway:
        'With --min-volume-x 1 the 10:10 bar is too thin at 0.60x the range’s average volume, and the first qualifying trigger moves to 10:35 at 365.75 (7.98x). That is the same rule with a different input, not a better signal.',
    },
    limits: [
      'A trigger is a rule firing, not a guarantee the move continues. The tool never calls an entry early because a bar looks like it will close above the level.',
      'Only closed bars count. Yahoo’s live tick is never a bar; a bar that is still forming is shown with its temporary price and ignored.',
      'One trigger per setup per day: the first close above. Later closes do not reset it, and moving the level after the fact is not allowed.',
      'Long side only. It never places an order, never sizes a position, never sets the stop, and never runs the broker skill from a background watch: nobody would be there to say yes.',
    ],
    approval: 'No order permission is needed for the entry timer. If a background watch is running, it may make network requests but must not be allowed to call place_stock_order. The upstream design keeps the broker call in a separate, interactive skill after risk PASS.',
    source: 'Upstream trader-entry/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Does “TRIGGERED” mean I should buy?',
        a: 'No. It means a completed bar closed above the level you chose. The setup can fail immediately, the feed can lag, and the next step is still the exit plan, budget, risk check and your own decision.',
      },
      {
        q: 'Why does a wick above the range not count?',
        a: 'Upstream defines the trigger as the first completed bar that CLOSES above the level. A mid-bar poke can reverse before the bar finishes. The rule deliberately waits for the close, which means it can miss a fast move.',
      },
      {
        q: 'Can the watcher place the order when it triggers?',
        a: 'No. It writes entry.json and exits. The broker skill must not run from a scheduled or background task, because the typed yes and the Allow once card require a person in the loop.',
      },
    ],
    related: [
      { href: '/skills/exit/', label: 'Exit Planner', description: 'The next step: write the stop, target and flat-by time before anything is bought.' },
      { href: '/skills/scanner/', label: 'Chart Scanner', description: 'Where the setup and the shortlist came from.' },
      { href: '/skills/news/', label: 'News Monitor', description: 'Check for the gap risk that a clean chart cannot show.' },
      { href: '/paper-trading/', label: 'Paper practice', description: 'Rehearse a trigger without a broker connection or live order path.' },
    ],
  },
  exit: {
    metaDescription:
      'How the Day Trader Skill Exit Planner works: opening-range midpoint stops, 1R/2R targets, flat-by 15:55, refused plans, plan.json, and the historical TSLA numbers. No order placement.',
    overview:
      'The Exit Planner decides how a trade ends before it starts. It reads the entry trigger, puts the stop at the opening-range midpoint by default (or the range low, your price, a percent, or an ATR multiple), rounds the stop away from the entry, sets the target at 2R by default, and writes trader/plan.json for the Time Machine, Budget Manager and Price Alerts. It refuses a plan that does not make sense rather than quietly loosening a rule.',
    prerequisites: [
      'A triggered entry in trader/entry.json, or explicit --entry, --or-high and --or-low values when you are planning ahead.',
      'A stop style. An opening-range breakout has a natural default (or-mid); a level setup has no range, so you must name a stop.',
      'A target rule (2R by default, or 1R, 1.5R or a price) and a flat-by time (15:55 New York by default).',
      'Long-side context. v2 plans longs only; a short is refused rather than approximated.',
    ],
    firstCommand: {
      command: 'python3 trader-exit/exit.py plan --stop or-mid --target 1R --write',
      note: 'reads trader/entry.json and writes trader/plan.json',
    },
    steps: [
      {
        do: 'Run it right after the entry triggers.',
        detail:
          'Before a trigger you can still plan ahead with --entry PRICE at the level you expect. Do not wait until you are in the trade and guessing.',
      },
      {
        do: 'Choose the stop deliberately.',
        detail:
          'For an opening-range breakout, use or-mid unless the user names another stop. or-low is wider, so the same max loss buys fewer shares. price:X, pct:X and atr:K are explicit alternatives; a level setup needs one of them.',
      },
      {
        do: 'Write and read back the plan.',
        command: 'python3 trader-exit/exit.py plan --stop or-mid --target 1R --write',
        detail:
          'Read the entry, stop and its rule, target and its R, risk per share, reward:risk and flat-by time. The plan is a file, not a suggestion to be renegotiated in chat.',
      },
      {
        do: 'If it refuses, state the reason and the legitimate fix.',
        detail:
          'A stop at or above the entry, a target at or below it, risk under 0.05% of the price, an untriggered entry without --entry, or a short is refused. A wider stop or a farther target may fix it; loosening a limit to force a plan through does not.',
      },
      {
        do: 'Hand off in order.',
        detail:
          'Time Machine to replay the plan, Budget Manager to size it, Price Alerts to watch the stop/target/flat-by. Say once that the stop is a plan, not a guarantee: a gap or fast market can fill past it.',
      },
    ],
    artifacts: [
      { name: 'trader/plan.json', detail: 'Entry, stop and stop rule, target and target R, risk per share, reward:risk, setup, flat-by and the opening range.' },
      { name: 'trader/entry.json', detail: 'The trigger read by the default plan command: symbol, price, time, bar and opening range.' },
      { name: 'trader/config.json', detail: 'flat_by (15:55) and min_reward_risk (1.0, noted here and enforced by the risk skill).' },
    ],
    example: {
      title: 'The reel: a 1R plan written before the entry',
      setup:
        'TSLA, Monday 19 October 2026. Entry 364.18 at 10:15 AM; opening range 354.47 to 362.18. Historical/educational numbers, not live prices and not advice.',
      lines: [
        'Entry         $364.18 at 10:15 AM (bar 8)',
        'Stop          $358.32  opening-range midpoint: (362.18 + 354.47) / 2 = 358.325, rounded down',
        'Target        $370.04  1R (one times the risk)',
        'Risk a share  $5.86 (1.61% of the entry)',
        'Reward:risk   1.0',
        'Flat by       15:55 ET, win or lose: no overnight hold',
      ],
      takeaway:
        'The default 2R target would be 364.18 + 2 × 5.86 = 375.90. The budget skill then sizes the plan: a $50 max loss buys floor(50 / 5.86) = 8 shares. A 1R target is a plan, not a prediction that the price gets there.',
    },
    limits: [
      'A stop order is a plan, not a fill guarantee. In a fast market or across a gap it can fill well past the stop price; the stated max loss assumes a fill at the stop.',
      'The stop rounds away from the entry, and the tool refuses a risk under 0.05% of the price as too tight to survive the spread.',
      'Flat-by is strict. An entry at or after the flat-by time is refused; on a 1:00 PM early close the default moves to 12:55.',
      'It never places an order, never sizes a position, never widens a stop to make a plan pass, and never calls a stop a guarantee.',
    ],
    approval: 'No order permission is needed to write plan.json. Do not let an exit-planning prompt call a broker tool; the plan is an input to the risk check, not an order. The only order path remains the broker skill, after risk PASS and a typed yes.',
    source: 'Upstream trader-exit/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Can I move my stop further away once the trade is on?',
        a: 'Upstream says never move a stop further from the entry. A stop is where the setup has failed. Moving it to avoid a loss turns a planned risk into an open-ended one.',
      },
      {
        q: 'Why is the default target 2R but the reel uses 1R?',
        a: '2R is the default; 1R, 1.5R and price:X are supported. The reel uses 1R to match its teaching example. A different target changes the reward:risk and the break-even hit rate, so it is a different plan, not a cosmetic setting.',
      },
      {
        q: 'Does the plan guarantee my maximum loss?',
        a: 'No. It is the loss at the planned stop. Slippage, gaps and a fast market can produce a worse fill. That is also why the risk skill measures a market order from a fresh price when one is available.',
      },
    ],
    related: [
      { href: '/skills/timemachine/', label: 'Time Machine', description: 'Replay the written plan before sizing it.' },
      { href: '/skills/budget/', label: 'Budget Manager', description: 'Turn the stop distance into a whole-share proposal inside your limits.' },
      { href: '/skills/alerts/', label: 'Price Alerts', description: 'Watch the stop, target and flat-by time while the position is open.' },
      { href: '/safety/', label: 'Safety and permissions', description: 'Why a plan is not an order and why the broker step stays interactive.' },
    ],
  },
  timemachine: {
    metaDescription:
      'How the Day Trader Skill Time Machine works: 10,000 replays from 60 days of 5-minute bars, seed 19, past-session history, break-even verdict, refused runs, and the historical TSLA result.',
    overview:
      'The Time Machine sits between the plan and the money. It rebuilds the rest of the session 10,000 times from the stock’s own recent 5-minute bars, then re-runs the same rule on every full past session in the window. It prints target-first, stop-first and neither odds, the price distribution at the close, average R, the historical record and a verdict. It is a simulation built from past bars, not a prediction of today.',
    prerequisites: [
      'A current trader/plan.json from the exit skill, or explicit --symbol, --date, --entry, --stop, --target and --entry-time values.',
      'At least 20 full sessions in the 60-day 5-minute history. Half days, gaps and today are excluded from the pool.',
      'An entry on the 5-minute grid that has already closed. A future date, a wrong date, an in-progress bar or a nonsensical plan is refused in one plain line.',
      'One plan per run. A changed entry, stop, target or date is a new run, with a new seed if you choose one.',
    ],
    firstCommand: {
      command: 'python3 trader-timemachine/timemachine.py run --write',
      note: 'reads trader/plan.json, runs 10,000 replays with seed 19 and writes trader/timemachine.json',
    },
    steps: [
      {
        do: 'Confirm the plan is today’s plan.',
        detail:
          'If trader/plan.json is missing or stale, run the exit skill first. The Time Machine will not invent a plan, and it refuses a stop above a buy’s entry or an entry off the 5-minute grid.',
      },
      {
        do: 'Run the replay with the flat-by time when the plan has one.',
        command: 'python3 trader-timemachine/timemachine.py run --until 15:55 --write',
        detail:
          'The default end is 4:00 PM, or 1:00 PM on an NYSE early-close day. Using the plan’s flat-by time makes “neither” mean still open at the time you would actually get out.',
      },
      {
        do: 'Report the output in the upstream order.',
        detail:
          'The four odds, the median and 5–95 range of the price at the close, average R, the history line, then the verdict line and any line under it exactly as printed. Say the seed so the run can be repeated.',
      },
      {
        do: 'Say the uncomfortable part plainly.',
        detail:
          'If the verdict is a coin flip or close to break-even, do not dress it up. If the history and the replays disagree, say that too. Then say once that the pool is the last 60 days and that earnings, news and halts can do things those 60 days never did.',
      },
      {
        do: 'Only then hand off to budget.',
        detail:
          'A replay is context, not permission. The remaining steps are still sizing, the risk check and the human yes, in that order.',
      },
    ],
    artifacts: [
      { name: 'trader/plan.json', detail: 'The entry, stop, target, entry time/bar and opening range the replay is based on.' },
      { name: 'trader/timemachine.json', detail: 'The plan, mc (odds, percentiles, fan bands, sample paths and a close histogram), history and verdict.' },
      { name: 'Yahoo 60-day 5-minute bars', detail: 'One request, free and unofficial. Today’s in-progress bars are never mixed into the pool.' },
    ],
    example: {
      title: 'The reel: a coin-flip replay, stated as one',
      setup:
        'TSLA, Monday 19 October 2026. Entry 364.18 at 10:15 AM, stop 358.32, target 370.04 (1R). Historical fixture run, seed 19. Not a live forecast or a recommendation.',
      lines: [
        '10,000 replays of the rest of the session, 10:15 AM to 4:00 PM (69 five-minute bars), seed 19.',
        '  target first   29.4 %',
        '  stop first     25.5 %',
        '  neither        45.1 %   still open at 4:00 PM',
        '  green          51.7 %   target first, or above the entry at 4:00 PM',
        'Price at 4:00 PM: median 364.36, 90 % of replays between 355.54 and 373.54.',
        'Average R: +0.034',
        'History: the same rule on each of those 59 real sessions fired 33 times:',
        '13 target, 15 stop, 5 neither. Average R -0.062.',
        'Close to a coin flip: target first 29.4 % vs stop first 25.5 %.',
      ],
      takeaway:
        'At 1R the target has to come first in half of the replays that hit one side. It did in about 53.6% of those. The real history was slightly worse than even. That is the honest answer to report before the budget skill sizes 8 shares.',
    },
    limits: [
      '5-minute bars only. Yahoo keeps about 60 days of 5-minute bars but only about 7 days of 1-minute bars, too few sessions for a fair pool.',
      'The pool is only full sessions before the plan date. Half days, gaps and today are excluded; a live in-progress bar is never used.',
      'A gap through the stop still counts as −1R in the replay. A real fill can be worse, so the simulated average R is not a fill promise.',
      'The verdict compares the target-first share to the break-even rate 1/(1+R). It is not a win-rate claim, not a prediction, and not an order. The tool never prints a P&L or a profit.',
    ],
    approval: 'No order permission is needed for a simulation, and the Time Machine never places, sizes or changes a plan. Treat a broker permission card appearing during a replay as a configuration mistake: stop and inspect the connector.',
    source: 'Upstream trader-timemachine/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Is 29.4% the win rate of this strategy?',
        a: 'No. It is the share of 10,000 simulated replays in which the target was touched first. It is built from the stock’s last 60 days, not from live trading, and 45.1% of the replays hit neither side before 4:00 PM.',
      },
      {
        q: 'Why does the seed matter?',
        a: 'The draws come from Python’s random.Random(seed), seed 19 by default. The same plan, data and seed reproduce the same numbers on any machine. Report the seed so the user can repeat the run.',
      },
      {
        q: 'Can I use it on a 1-minute plan?',
        a: 'No. The Time Machine is 5-minute-only because that is the history Yahoo exposes for enough sessions. Use the entry timer for 1-minute triggers, but do not expect a 1-minute replay pool here.',
      },
    ],
    related: [
      { href: '/skills/budget/', label: 'Budget Manager', description: 'Size the plan only after you have heard the replay verdict.' },
      { href: '/skills/exit/', label: 'Exit Planner', description: 'The stop and target the replay is testing; rewrite the plan there, not here.' },
      { href: '/skills/news/', label: 'News Monitor', description: 'The events a 60-day bar pool cannot contain, such as earnings and halts.' },
      { href: '/paper-trading/', label: 'Paper practice', description: 'Keep the simulated-odds discussion separate from a live order path.' },
    ],
  },
  budget: {
    metaDescription:
      'How the Day Trader Skill Budget Manager works: whole-share sizing inside four limits, bracket order proposal, config rules, refusals, and the historical TSLA 8-share example. No broker call.',
    overview:
      'The Budget Manager turns a plan (“buy TSLA at 364.18, stop 358.32”) into an exact proposal (“buy 8 shares”) inside rules you set once. The stop distance decides the size: a wider stop means fewer shares. It checks four limits, says which one decided the size, and writes one bracket-order proposal to trader/orders.json in the shape Alpaca’s place_stock_order expects. It never calls a broker.',
    prerequisites: [
      'A trader/config.json copied from config.example.json, with a budget you can afford to lose, a cash buffer (default 10%), a max loss per trade (default $50), position/order caps and the day limits.',
      'A current trader/plan.json from the exit skill. A plan for another day is refused; make a new one rather than editing the date.',
      'Whole-share intent. Alpaca bracket orders do not take fractional shares, so the tool rounds to whole shares and refuses a zero-share result.',
      'Optional fresh prices and portfolio data. A fresh price above the plan entry raises the risk and reduces the size; portfolio cash can cap it further.',
    ],
    firstCommand: {
      command: 'python3 trader-budget/size.py --write',
      note: 'reads trader/plan.json and trader/config.json, writes one proposal to trader/orders.json',
    },
    steps: [
      {
        do: 'Set the rules once, in plain words.',
        detail:
          'Ask for the budget, cash buffer, max loss per trade, max position, max order and minimum order. Keep paper true. The example config uses $5,000, a 10% buffer, $50 max loss, a 75% position cap, a $4,000 max order and a $5 minimum.',
      },
      {
        do: 'Size the plan.',
        command: 'python3 trader-budget/size.py --write',
        detail:
          'The size is the smallest of four limits: max loss / risk per share, position cap / entry, max order / entry, and (budget − cash buffer) / entry, capped by portfolio cash. The tool prints which limit decided it.',
      },
      {
        do: 'Show the user the arithmetic, not just the share count.',
        detail:
          'Give the four limits, the deciding limit, the shares, the dollars and the max loss at the stop. Say plainly that a stop is an order, not a promise: in a fast market it can fill below the stop.',
      },
      {
        do: 'If it refuses, fix the plan or the budget, not the limit.',
        detail:
          'It refuses zero shares, an order under the minimum, reward:risk under the configured minimum, a stop not below the entry, a target not above it, another day’s plan, a blocked ticker or a short. A stop too far away for the max loss is a refusal, not a smaller order.',
      },
      {
        do: 'Hand the proposal to the risk skill.',
        detail:
          'The budget skill proposes; the risk skill checks; the broker skill asks for a yes. Do not skip the middle step because the arithmetic looks right.',
      },
    ],
    artifacts: [
      { name: 'trader/orders.json', detail: 'One proposed bracket: symbol, side, qty, type, time_in_force, order_class, take_profit_limit_price, stop_loss_stop_price, plus why and plan notes.' },
      { name: 'trader/config.json', detail: 'Budget, buffer, max loss, position/order caps, day limits, blocked tickers, paper flag and entry/flat-by windows.' },
      { name: 'trader/plan.json', detail: 'The entry, stop, target, setup and flat-by the proposal is based on.' },
      { name: 'trader/prices.json and trader/portfolio.json', detail: 'Optional fresh price and cash/holdings that can reduce the size.' },
    ],
    example: {
      title: 'The reel: four limits, one decider',
      setup:
        'TSLA, Monday 19 October 2026. Entry 364.18, stop 358.32, target 370.04, risk 5.86 per share. Example $5,000 budget, 10% cash buffer, $50 max loss. Historical/educational, not live and not advice.',
      lines: [
        'max loss      $50 / 5.86                      8 shares  (decides it)',
        'position cap  75% of $5,000 = $3,750 / 364.18  10 shares',
        'max order     $4,000 / 364.18                  10 shares',
        'cash          ($5,000 - $500) / 364.18         12 shares',
        '8 shares = $2,913.44. Max loss at the stop: 8 x 5.86 = $46.88.',
      ],
      takeaway:
        'At 10:52 the real quote was 366.48, so the same plan sizes to 6 shares at 8.16 a share and reward:risk falls to 0.44: refused, because the move it was waiting for has mostly happened. A bigger share count would not make that a better trade.',
    },
    limits: [
      'Proposals only. The budget skill never calls a broker tool, never approves an order and never schedules one.',
      'It never raises a limit on its own, never shrinks a stop to fit more shares, and never sizes options, margin or short positions.',
      'Whole shares only for a bracket. A fractional share count is not silently rounded up; it is outside the order shape.',
      'Free Yahoo prices are unofficial and can lag. The broker’s price is the one that fills, and a stop can fill worse than its price.',
    ],
    approval: 'No broker permission is needed to write orders.json. If a prompt asks you to “just place the sized order”, that is a different skill and a different gate. The proposal must pass the risk check and then a human yes in the broker skill.',
    source: 'Upstream trader-budget/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Why 8 shares when the position cap allows 10?',
        a: 'Because the max loss is the binding limit: 10 shares would risk $58.60 at the stop, over the $50 limit. The position cap is an upper bound, not a target. The tool names the deciding limit so the arithmetic is visible.',
      },
      {
        q: 'Can I use my whole account as the budget?',
        a: 'The config asks for money set aside for this practice, not your rent or emergency fund. The SEC bulletin upstream cites warns against using living expenses, retirement money or loans. Setting a large budget does not make the risk appropriate.',
      },
      {
        q: 'What happens if the price has moved since the plan?',
        a: 'A fresh price in trader/prices.json that is higher than the plan entry raises the measured risk at the same stop, so the tool sizes fewer shares. A lower price never shrinks the risk. A changed plan needs a new plan and a new risk check.',
      },
    ],
    related: [
      { href: '/skills/risk/', label: 'Risk Manager', description: 'The PASS/BLOCK gate the proposal must clear before a ticket exists.' },
      { href: '/skills/timemachine/', label: 'Time Machine', description: 'The replay context that should be heard before sizing.' },
      { href: '/tools/position-size-calculator/', label: 'Position size calculator', description: 'A manual calculator for the same arithmetic; it is not the simulator.' },
      { href: '/skills/broker/', label: 'Order Executor', description: 'The only step that can lead to an order, after the gates.' },
    ],
  },
  risk: {
    metaDescription:
      'How the Day Trader Skill Risk Manager works: PASS/BLOCK checks, entry vs exit rules, fresh-price measurement, daily loss, window, optional pdt_guard, and the historical TSLA PASS and BLOCK cases.',
    overview:
      'The Risk Manager is the gate between a proposal and the broker. It checks each drafted order against your configured limits — stop, max loss, reward:risk, daily loss, trades per day, entry window, size, position, cash, duplicates and optional PDT-style counting — and prints PASS or BLOCK with a reason. A BLOCK is final for that order: it does not go to the user for a yes and it does not go to the broker. A PASS is permission to show a ticket, not a recommendation.',
    prerequisites: [
      'A trader/orders.json proposal from the budget skill (or a flatten order from the broker skill) and a trader/config.json with the limits you actually intend to enforce.',
      'A trader/portfolio.json, or the tool will treat the account as freshly funded with the budget. Optional trader/prices.json can raise the entry risk is measured from.',
      'A trader/state/broker.json log for duplicates, trades per day, daily loss and day trades. Without it, the day counters start empty.',
      'New York time handling is internal. Weekends, NYSE holidays and 1:00 PM early closes are handled by the tool; the computer’s time zone is not trusted.',
    ],
    firstCommand: {
      command: 'python3 trader-risk/check.py',
      note: 'checks the trader/ files and writes verdicts to trader/state/risk.json',
    },
    steps: [
      {
        do: 'Refresh the price if the plan may be stale.',
        command: 'python3 trader-alerts/alerts.py quote TSLA --write',
        detail:
          'A market order is measured from the higher of the plan entry and a fresh price under 15 minutes old. An older price is not used, and the tool says so.',
      },
      {
        do: 'Run the check.',
        command: 'python3 trader-risk/check.py',
        detail:
          'Exit code 0 means every order passed; 1 means at least one was blocked. Orders are checked in file order as if each passed order had filled, so a batch that is fine one by one but breaches a limit together is caught.',
      },
      {
        do: 'Explain PASS or BLOCK order by order.',
        detail:
          'Give the max loss at the stop, reward:risk and how much of today’s limits the order uses. For a BLOCK, give the reason and the legitimate fix: fewer shares, a closer stop from the exit skill, wait for the window, or skip the trade.',
      },
      {
        do: 'Never edit a limit to force a PASS.',
        detail:
          'A limit is your own risk rule. Changing it can be a deliberate decision, but it is not a debugging step. Never disable risk to get a ticket through. If the order changes in any way, run the check again: the broker matches verdicts by fingerprint.',
      },
    ],
    artifacts: [
      { name: 'trader/orders.json', detail: 'The proposed orders; entries and exits are treated differently.' },
      { name: 'trader/config.json', detail: 'Stop requirement, max loss, daily loss, trades/day, reward:risk, entry window, size/position/cash caps, blocked list and optional pdt_guard.' },
      { name: 'trader/portfolio.json and trader/prices.json', detail: 'Cash, holdings and the fresh price used to measure a market order.' },
      { name: 'trader/state/risk.json', detail: 'Each verdict with a fingerprint of the exact order, so an edited order needs a new PASS.' },
      { name: 'trader/state/broker.json', detail: 'What was placed today: duplicates, trades, daily loss and day trades.' },
    ],
    example: {
      title: 'The reel: 8 shares PASS, 9 shares BLOCK',
      setup:
        'The TSLA bracket at 10:15 AM on Monday 19 October 2026, on a fresh $5,000 paper account with the example config. Historical/educational, not live and not advice.',
      lines: [
        'PASS  #1 buy TSLA 8 shares, entry',
        '          entry 364.18, stop 358.32, target 370.04: risk 5.86 a share',
        '          max loss $46.88 (limit $50), reward:risk 1.00 (min 1)',
        '          today before this: 0 of 3 trades, $0 of $150 daily loss',
        '',
        'BLOCK #1 buy TSLA 9 shares, entry',
        '          max loss $52.74 (limit $50)',
        '        - loss: 9 shares x 5.86 risk a share = $52.74 at the stop, over your $50 max loss per trade',
      ],
      takeaway:
        'At 10:55 with the real 10:52 quote of 366.48, the 8-share order is blocked twice: 8 × 8.16 = $65.28 at the stop, and reward:risk 0.44. At 9:40 it is blocked by the entry window. The 3:55 PM sell that closes the position passes even though it is after the 3:30 entry cutoff, because it is an exit.',
    },
    limits: [
      'A PASS only means the order fits your configured rules. It is not investment advice, not a guarantee and not the user’s yes.',
      'Exits are never blocked by the day limits, entry window, loss, reward:risk, blocked list, size or duplicates. Getting out must remain possible; those rules become warnings for an exit.',
      'Daily loss counts the full max loss of every entry placed today, win or lose. Three full-size trades can use up a $150 day even if two of them later break even.',
      'pdt_guard is off by default and counts only when enabled. Broker day-trade policies vary; verify with your broker rather than assuming a rule from a blog.',
    ],
    approval: 'The risk skill has no order tool. Its output is a verdict file, not an order. Do not grant it broker permissions, and do not treat a PASS as a substitute for the broker skill’s typed yes and Allow once card.',
    source: 'Upstream trader-risk/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Can I override a BLOCK in chat?',
        a: 'You can deliberately change your own configured limits, but that is a risk decision, not a fix. The skill will not edit the order or loosen a limit to make it pass. Do not train yourself to bypass risk for FOMO.',
      },
      {
        q: 'Why did a market order get blocked after the price moved?',
        a: 'For a market order the tool measures from the higher of the plan entry and a fresh price under 15 minutes old. If the stock ran up, the same stop is farther away in dollars, so the max loss and reward:risk can both fail. That is the rule working, not a bug.',
      },
      {
        q: 'Does a PASS mean the trade is safe?',
        a: 'No. It means the draft fits the limits you configured. The market can still gap, the stop can fill worse and the setup can fail. The SEC and CFTC sources on the safety page explain why a rules check is not a profit promise.',
      },
    ],
    related: [
      { href: '/skills/broker/', label: 'Order Executor', description: 'The only place a PASS can become a ticket, and only with your typed yes.' },
      { href: '/safety/', label: 'Safety and permissions', description: 'The risk rules, regulator citations and the Needs approval gate.' },
      { href: '/skills/budget/', label: 'Budget Manager', description: 'Where the size and stop distance came from; fix the plan there, not in risk.' },
      { href: '/install/troubleshoot/', label: 'Troubleshooting', description: 'What to check when risk always blocks without an obvious reason.' },
    ],
  },
  broker: {
    metaDescription:
      'How the Day Trader Skill Order Executor works: three gates, Alpaca MCP and IBKR setup, tool permissions, ticket approval, flattening, and the historical paper ticket. The only order-capable skill.',
    overview:
      'The Order Executor is the only skill in the pack that can lead to a real order, so it is the strictest. It shows a plain-language ticket and the exact JSON for Alpaca’s place_stock_order, records your yes word for word, then Claude’s own Allow once / Deny card asks again. An order reaches the market only after three gates: risk PASS for that exact order today, your explicit yes for that one order, and Allow once on a connector set to Needs approval. Paper trading is the default.',
    prerequisites: [
      'A trader-risk PASS from today for the exact order fingerprint, plus trader/orders.json and, for a flatten, the held quantity.',
      'A brokerage connector you configured yourself: Alpaca’s official MCP server in Claude Desktop (paper keys, uv/uvx, environment variables), or the Interactive Brokers connector from Claude’s directory with broker set to ibkr.',
      'The order tool and every tool that places, changes, cancels or closes on Needs approval. Destructive all-position / option / crypto tools should be Blocked unless you have a specific reason.',
      'A person present to type yes. The broker skill must never run from a scheduled or background task, because nobody would be there to approve it.',
    ],
    firstCommand: {
      command: 'python3 trader-broker/ticket.py show',
      note: 'read-only: renders every ticket as READY or not and never contacts a broker',
    },
    steps: [
      {
        do: 'Set up Alpaca paper, if that is your connector.',
        detail:
          'Create paper trading API keys in the Alpaca dashboard (separate from live keys), install uv, and add the alpaca MCP block to claude_desktop_config.json with ALPACA_PAPER_TRADE=true and the keys in the env block. Restart Claude Desktop. Keys never go in the chat.',
      },
      {
        do: 'Set each tool permission deliberately.',
        detail:
          'Customize > Connectors > tool permissions (Settings > Connectors in older versions). place_stock_order, cancel_order_by_id, replace_order_by_id, close_position and update_account_config: Needs approval. place_option_order, place_crypto_order, close_all_positions, cancel_all_orders, exercise_options_position: Blocked unless you have a reason. Read-only account, position, order, clock and quote tools: Always allow is acceptable.',
      },
      {
        do: 'Verify the connector is the paper account.',
        detail:
          'Ask Claude for read-only account info and confirm in the Alpaca dashboard that it is the paper account. In Claude Code, keep the order tool in permissions.ask, never in allow. For IBKR, add the directory connector, sign in there rather than in chat, and set its drafting tools to Needs approval too.',
      },
      {
        do: 'Show one ticket and ask for one yes.',
        command: 'python3 trader-broker/ticket.py show',
        detail:
          'Only READY tickets go to the user. Show one ticket and ask “Place this order? Reply yes or no.” Never offer “yes to all”. Run ticket.py approve --index N --reply with the user’s reply word for word. If it says “Not recorded”, the reply was not an explicit yes for that order: ask again; never turn it into a yes yourself.',
      },
      {
        do: 'Call the order tool only after the yes is recorded.',
        detail:
          'Use exactly the JSON the ticket printed. The Claude card appears: Allow once or Deny. Allow once sends it to the paper account. Record the result with ticket.py result, including broker id and fill, or denied/failed with a note. A failed order is not retried without a new check and a new yes.',
      },
      {
        do: 'Manage the open position and the close.',
        detail:
          'Alerts watch the stop, target and flat-by. The bracket’s own stop-loss and take-profit sit at the broker. By 15:55, if anything is still open, get the held quantity, build a flatten sell, run risk again (an exit is not blocked by the day limits), get a new yes, then cancel the bracket children before placing the sell if the broker requires it.',
      },
    ],
    artifacts: [
      { name: 'trader/orders.json', detail: 'The proposed order, or the flatten sell that replaces it.' },
      { name: 'trader/state/risk.json', detail: 'Only a PASS from today, matched by fingerprint, makes a ticket READY.' },
      { name: 'trader/state/broker.json', detail: 'Every yes, no, placed, failed and filled, with each entry’s max loss for the daily limit.' },
      { name: 'trader/portfolio.json', detail: 'Cash and shares updated by fill and by result --filled-qty.' },
      { name: 'trader/plan.json', detail: 'The flat-by time used by flatten.' },
    ],
    example: {
      title: 'The reel: a paper ticket with two gates left',
      setup:
        'The TSLA 8-share bracket after risk PASS on Monday 19 October 2026. Historical/educational ticket text, not a live order or a recommendation.',
      lines: [
        'ORDER 1 of 1, PAPER account, Alpaca',
        '  BUY 8 TSLA, market, good for today',
        '  stop-loss 358.32',
        '  take-profit 370.04',
        '  max loss about $46.88 if the stop fills at 358.32 (it can fill worse in a fast market)',
        '  why: opening-range breakout on TSLA: 8 shares, bound by your $50 max loss per trade',
        '  READY: trader-risk PASS, waiting for your yes',
      ],
      takeaway:
        'The user replies yes. The tool records it, calls place_stock_order with exactly the printed JSON, and the card reads Allow once / Deny. Allow once sends it to the paper account. The why and plan notes stay in the file; they are never sent to Alpaca.',
    },
    limits: [
      'No yes, no order. Never two orders on one yes, never a yes to all, and never a broker call from a scheduled or background task.',
      'Never ask for, read, store or repeat API keys or passwords. Never switch ALPACA_PAPER_TRADE or paper to live for the user; that is their own deliberate change.',
      'Never call close_all_positions, cancel_all_orders, option or crypto order tools on its own. A market order and a stop fill at whatever the market gives; no fill price is promised.',
      'The bracket’s stop-loss and take-profit are day orders and end at the close. A new sell can be rejected while those children still hold the shares; cancel them first when the broker requires it.',
    ],
    approval: 'This is the only skill that should ever see an order-capable tool. Keep the order tool on Needs approval, never Always allow. The typed yes is per order, and the Allow once card is a second check, not a formality. If you cannot explain why the card appeared, click Deny and inspect the configuration.',
    source: 'Upstream trader-broker/SKILL.md, claude_desktop_config.example.json and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Does ticket.py place the order?',
        a: 'No. It only renders tickets, validates that a reply is an explicit yes for that order, builds a flatten ticket and writes the local log. The actual call is made by Claude to the brokerage connector after all three gates.',
      },
      {
        q: 'Why is Alpaca not in Claude’s connector directory?',
        a: 'Upstream uses Alpaca’s official MCP server, which runs locally inside Claude Desktop via uvx and is configured in claude_desktop_config.json. IBKR, by contrast, publishes a connector in Claude’s directory. Both are documented by upstream; this site is not endorsing either broker.',
      },
      {
        q: 'Can I set place_stock_order to Always allow to save clicks?',
        a: 'No. That removes the second human gate. The upstream design expects Needs approval so the Allow once / Deny card appears for each order. If clicking is the problem, reduce order frequency, not permissions.',
      },
    ],
    related: [
      { href: '/safety/', label: 'Safety and permissions', description: 'The full permission map, paper default and credential rules.' },
      { href: '/install/', label: 'Install and verify', description: 'Set up the skills without connecting a broker, then verify before configuring one.' },
      { href: '/skills/risk/', label: 'Risk Manager', description: 'The PASS a ticket needs before it can become READY.' },
      { href: '/paper-trading/', label: 'Paper practice', description: 'Rehearse the workflow without a brokerage connector at all.' },
    ],
  },
  alerts: {
    metaDescription:
      'How the Day Trader Skill Price Alerts work: plan-derived stop, target and flat-by alerts, NYSE clock, delayed quotes, one-shot rules, prices.json and a historical TSLA check.',
    overview:
      'Price Alerts watches the numbers so you do not have to stare at a chart. It turns the plan into three rules in one go (stop, target and flat by the close), and can also watch a level, a percent move, a time of day or the opening bell. Each rule rings once, and the tool knows the NYSE calendar, holidays and 1:00 PM early closes. An alert is information, never an order.',
    prerequisites: [
      'A trader/plan.json for --from-plan, or explicit symbol/level flags for a manual rule.',
      'Outbound access to Yahoo’s chart endpoint (or Stooq, or a saved offline directory) for quotes. No broker key is needed.',
      'A checking rhythm: a /loop, a scheduled task, or a manual check while the position is open. A single check is a snapshot, not a watch.',
      'The NYSE clock is built in for 2026–2027. For another year the tool says the holiday list is unknown rather than guessing.',
    ],
    firstCommand: {
      command: 'python3 trader-alerts/alerts.py add --from-plan',
      note: 'creates the stop, target and flat-by rules from trader/plan.json',
    },
    steps: [
      {
        do: 'Add the plan alerts right after the exit plan is written.',
        command: 'python3 trader-alerts/alerts.py add --from-plan',
        detail:
          'Confirm the three rules back to the user: the stop, the target and the flat-by time. A plan rule carries the plan’s date, so yesterday’s stop does not ring today.',
      },
      {
        do: 'Check while the position is open.',
        command: 'python3 trader-alerts/alerts.py check',
        detail:
          'Exit code 0 means something rang. Each run fetches only the tickers in today’s rules and rings each alert once. A check reads the latest delayed quote; a price can pass a level between two checks.',
      },
      {
        do: 'Report what rang as a fact, then act through the proper gate.',
        detail:
          'A stop or target alert means the bracket order has probably filled: check get_open_position and record the fill with the broker skill. “Flat by close” means close anything still open: broker flatten, then risk, then the user’s yes. The alert itself never sells.',
      },
      {
        do: 'Refresh the price for sizing and risk when needed.',
        command: 'python3 trader-alerts/alerts.py quote TSLA --write',
        detail:
          'This writes trader/prices.json with a quote time. The budget and risk skills use a price under 15 minutes old; an older price is not used, and they say so.',
      },
    ],
    artifacts: [
      { name: 'trader/alerts.json', detail: 'The rules: above/below/stop/target, percent move, time, opening bell, with date and rearm settings.' },
      { name: 'trader/state/alerts.json', detail: 'Which rules have already rung and when, so each rings once.' },
      { name: 'trader/prices.json', detail: 'The latest merged quotes with timestamps, for budget and risk.' },
      { name: 'trader/plan.json and trader/portfolio.json', detail: 'The plan for --from-plan and the holdings for quote --holdings.' },
    ],
    example: {
      title: 'The reel: nothing hit at 10:53, then the flat-by ring',
      setup:
        'TSLA, Monday 19 October 2026. Entry 364.18, stop 358.32, target 370.04, flat by 15:55. Historical fixture check, not live and not advice.',
      lines: [
        'NYSE OPEN (2026-10-19 10:53 New York, regular session).',
        'Nothing hit. 3 rule(s) watched today, TSLA $366.48.',
        '',
        'ALERT Flat by close: it is 15:55 New York (set for 15:55), the market closes at 16:00.',
        'If TSLA is still open, close it: trader-broker flatten --symbol TSLA builds the sell ticket,',
        'then trader-risk and your yes.',
      ],
      takeaway:
        'The 10:52 quote sits between the stop and the target, so no price alert rings. The flat-by rule rings once at 15:55 and points back to the broker and risk flow. The next morning the plan’s three alerts are no longer watched.',
    },
    limits: [
      'An alert never places, cancels or changes an order. When a stop alert rings, nothing has been sold by the alerts skill.',
      'Free quotes are delayed and unofficial. They are fine for alerts and a size check, not for timing an order; the broker’s price is the one that fills.',
      'A rule rings once (unless rearm is set for a level). A price that crosses and comes back does not create a stream of notifications.',
      'The Stooq CSV fallback answered 404 on 13 October 2026; the parser remains for when it returns. Yahoo is the default and can rate-limit.',
    ],
    approval: 'No order permission is needed for alerts. Do not give the alerts process an order tool to “automate the exit”. The upstream design keeps flattening in the interactive broker skill, after a new risk check and a new yes.',
    source: 'Upstream trader-alerts/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Will the alert sell my position when the stop is hit?',
        a: 'No. It notifies. With a bracket order the broker-side stop-loss does the work; the alert tells you it probably happened and prompts you to check the position and record the fill. The alert itself has no order path.',
      },
      {
        q: 'Why did the price cross my level but no alert ring?',
        a: 'Check the checking interval and the quote delay. A single check is a snapshot; a price can pass a level between two checks. Also confirm the rule’s date matches today and that it has not already rung.',
      },
      {
        q: 'Does “flat by close” move on an early-close day?',
        a: 'Yes. A time rule with before_close true moves three hours earlier on a 1:00 PM early close, so 15:55 becomes 12:55. The NYSE calendar is built into the tool for 2026–2027.',
      },
    ],
    related: [
      { href: '/skills/exit/', label: 'Exit Planner', description: 'Where the stop, target and flat-by time come from.' },
      { href: '/skills/broker/', label: 'Order Executor', description: 'The interactive path that actually flattens a position, after risk and yes.' },
      { href: '/paper-trading/', label: 'Paper practice', description: 'Use alerts during a paper session without any order-capable connector.' },
      { href: '/safety/', label: 'Safety and permissions', description: 'Keep notifications separate from the tools that can change a position.' },
    ],
  },
  analyst: {
    metaDescription:
      'How the Day Trader Skill Earnings Analyst works: SEC XBRL facts, latest 10-Q and 8-K, margins and EPS, derived quarters, data-lag notes, and a historical TSLA Q2 2026 summary.',
    overview:
      'The Earnings Analyst reads a company’s reported numbers from SEC EDGAR: XBRL company facts from its 10-Qs and 10-K, plus the latest earnings 8-K and its press release. It lines up revenue, gross/operating/net margins, net income and diluted EPS quarter by quarter, against the same quarter a year earlier, with trailing twelve months. It reports what was filed; it does not rate the stock or predict the next move.',
    prerequisites: [
      'A real SEC identity string in SEC_USER_AGENT or trader/config.json sec_user_agent: “Your Name you@example.com”. The tool refuses to call SEC without one.',
      'Outbound access to data.sec.gov and the company’s submissions/8-K files. No paid data key and no broker account.',
      'A ticker, or a CIK for a company without one. The next earnings date is not in SEC data; it has to come from the news skill or investor relations.',
      'A willingness to open the latest 10-Q when the facts API lags the newest filing. The tool prints a NOTE with a link when it detects that.',
    ],
    firstCommand: {
      command: 'python3 trader-analyst/facts.py TSLA',
      note: 'reads SEC XBRL facts and the latest earnings filing; add --metrics trader/metrics.json to save a row',
    },
    steps: [
      {
        do: 'Run it for the companies in question.',
        command: 'python3 trader-analyst/facts.py TSLA NVDA AMD --metrics trader/metrics.json',
        detail:
          '--quarters 8 shows two years, --json gives everything machine-readable, and --cik handles a company without a ticker. The default is the latest reported quarters and trailing twelve months.',
      },
      {
        do: 'Open the source when the numbers need context.',
        detail:
          'Read the latest earnings press release (the EX-99.1 exhibit) and the 10-Q. Say which numbers came from XBRL and which came from the release. If the newest 10-Q is later than the newest facts quarter, read the 10-Q itself before summarising.',
      },
      {
        do: 'Write four short lines, not a rating.',
        detail:
          'One line on the quarter (revenue, EPS, growth), one on margins, one on anything unusual (a one-off, a derived quarter, data that lags) and the links. Plain words and real numbers; no adjectives the numbers do not support.',
      },
      {
        do: 'Check whether the next report is inside the trade.',
        detail:
          'If the report falls before the open or inside an overnight hold, say it before the exit plan sets the stop. A stop does not protect against an earnings gap; the stock can open past it.',
      },
    ],
    artifacts: [
      { name: 'trader/metrics.json', detail: 'Optional one-row-per-company output: TTM revenue, net income, diluted EPS, latest margins and growth.' },
      { name: 'SEC companyfacts JSON', detail: 'Every number the company has tagged in its filings, read from data.sec.gov.' },
      { name: 'Submissions and 8-K exhibit', detail: 'The newest 10-Q/10-K and the newest 8-K with item 2.02, plus its EX-99.1 press release.' },
    ],
    example: {
      title: 'The reel’s stock: TSLA Q2 2026 facts',
      setup:
        'A historical tool run on 20 October 2026 for the quarter ending 30 June 2026. Not a current quote, not a valuation and not a recommendation.',
      lines: [
        'Revenue            $28.24B   +25.5% vs the same quarter a year earlier',
        'Net income         $1.11B    -4.9%',
        'Diluted EPS        $0.32     -3.0%',
        'Gross margin       16.8%     -4.3 points on the quarter before',
        'Operating margin   1.4%',
        'Trailing 12 months $103.6B revenue, $1.08 diluted EPS',
        'Flag: net income is above operating income, so gains outside the business are inside it.',
        'Latest 10-Q filed 2026-07-23.',
      ],
      takeaway:
        'Monday’s headlines said Tesla reports this week, so the summary ends: “The next report is days away. A day trade that closes before the bell is not exposed to it; anything held overnight is.” That is a risk statement, not a forecast.',
    },
    limits: [
      'Not a valuation model and not a buy/sell rating. It never says a stock is cheap, expensive or a good trade.',
      'It never invents a number the filings do not have, and it does not estimate a quarter it cannot derive. A Q4 is the 10-K year minus the three reported quarters, marked derived and approximate.',
      'SEC’s facts API can trail a filing. When the newest 10-Q is later than the newest facts quarter, the tool says so with a link; the summary must read the filing, not paper over the gap.',
      'It does not fetch earnings-call transcripts. A pasted transcript can be summarised, with the source identified. The tool only reads filings and never places an order.',
    ],
    approval: 'No order permission is needed. The analyst only reads public filings, and SEC_USER_AGENT is an identity string, not a brokerage secret. Do not put a broker key in the config to “make the data complete”.',
    source: 'Upstream trader-analyst/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Does the analyst predict the post-earnings move?',
        a: 'No. It summarises reported facts: revenue, margins, net income and EPS against the prior-year quarter, plus trailing twelve months. Gap risk around earnings remains, and a stop does not protect against an overnight gap.',
      },
      {
        q: 'Why is gross margin blank for a bank?',
        a: 'Banks and insurers do not report a gross margin in the usual sense. The tool leaves it blank rather than printing a misleading zero. Read the filed statements for the metrics that apply to that business.',
      },
      {
        q: 'Where does the next earnings date come from?',
        a: 'Not from SEC data. Use the news skill’s headlines or the company’s investor relations page, and say where the date came from. A guessed date is worse than “not confirmed”.',
      },
    ],
    related: [
      { href: '/skills/news/', label: 'News Monitor', description: 'Where the next report date and the morning headlines usually surface.' },
      { href: '/skills/scanner/', label: 'Chart Scanner', description: 'The chart setup is separate from the filed numbers; neither one is a recommendation.' },
      { href: '/learn/what-is-day-trading/', label: 'What is day trading?', description: 'The baseline concepts behind the workflow, without a trade idea.' },
      { href: '/safety/', label: 'Safety and permissions', description: 'Why public-data tools and order-capable connectors stay separate.' },
    ],
  },
  pelosi: {
    metaDescription:
      'How the Day Trader Skill Pelosi Tracker works: House Clerk PTR index and PDFs, 30/45-day disclosure delay, amount ranges, options rows, Senate manual route, and a historical filing example.',
    overview:
      'The Pelosi Tracker reads the House Clerk’s public Periodic Transaction Reports: the yearly index ZIP and the individual PTR PDFs. It notices new filings, alerts once per report, and turns each PDF into rows with the member, owner, stock, ticker, buy/sell, option strike and expiry, trade date, amount range and days to disclosure. It also flags trades in stocks you hold. It is fast, but it is not early, and it is not inside information.',
    prerequisites: [
      'Outbound access to disclosures-clerk.house.gov. No login is needed for the House index or PTR PDFs.',
      'Optional pdftotext from poppler for local text extraction. Without it, open the saved PDF and read it directly.',
      'A local state file for seen DocIDs, and optionally trader/portfolio.json to flag holdings. No broker key is needed.',
      'For Senate reports, a manual route: the user accepts the efdsearch.senate.gov agreement in their own browser. The skill does not click or automate that agreement.',
    ],
    firstCommand: {
      command: 'python3 trader-pelosi/ptr.py index --member pelosi',
      note: 'lists the member’s filed PTRs from the House Clerk index',
    },
    steps: [
      {
        do: 'List what has been filed.',
        command: 'python3 trader-pelosi/ptr.py index --member pelosi',
        detail:
          '--member takes a last name, “First Last” or “Last, First”, and repeats. --since lists every member after a date; --type with an empty value lists every filing type (annual reports are type O).',
      },
      {
        do: 'Watch for new reports without repeating old ones.',
        command: 'python3 trader-pelosi/ptr.py new --member pelosi --read',
        detail:
          'The first run shows the last 45 days. After that it shows only PTRs not seen at the last check, downloads and reads them with --read, and records the DocIDs. Exit code 1 means nothing new. The Clerk rebuilds the index about once a day, so an hourly weekday check is plenty.',
      },
      {
        do: 'Read the filing, not a tracker.',
        command: 'python3 trader-pelosi/ptr.py fetch 20035143',
        detail:
          'fetch saves the PDF and, with pdftotext, prints the rows. parse turns pdftotext -layout text into rows; check the row count against the PDF for a multi-page report. Quote the DocID and link, and keep amounts as the filed range.',
      },
      {
        do: 'Say the delay, the owner and the instrument.',
        detail:
          'A PTR is due within 30 days of the member learning of the trade and never more than 45 days after it. SP is spouse, JT joint, DC a dependent child, blank the member. A call with a strike and expiry is not a share purchase; mark exercises separately.',
      },
      {
        do: 'If the user wants to act, take the long route.',
        detail:
          'A disclosure is weeks old, so it is a reason to look at a chart, not a setup. The scanner and entry timer decide whether there is a trade today; then shares only, sized by budget, checked by risk and placed by broker only after the user’s yes.',
      },
    ],
    artifacts: [
      { name: 'trader/state/pelosi.json', detail: 'The DocIDs already shown, so each PTR alerts once.' },
      { name: 'trader/state/ptr-pdfs/', detail: 'Downloaded PTR PDFs kept locally for reading and row-count checks.' },
      { name: 'trader/portfolio.json', detail: 'Optional holdings used to flag a disclosed trade in something you own.' },
      { name: 'House Clerk index and PTR PDF', detail: 'The public source of every row: member, filing type, filing date, DocID and the PDF itself.' },
    ],
    example: {
      title: 'A real public alert, kept as a filing',
      setup:
        'A historical House PTR example from 21 August 2026. Public disclosure, not live data, not inside information and not a recommendation.',
      lines: [
        'NEW Periodic Transaction Report: Hon. Nancy Pelosi (CA11) filed 2026-08-21, doc 20035143',
        '  spouse purchase, Bloom Energy Corporation Class A Common Stock (BE)',
        '  100 call options, $100 strike, expires 2027-06-17',
        '  $1,000,001 - $5,000,000',
        '  traded 2026-07-24, disclosed 28 days later',
      ],
      takeaway:
        'The same PTR also shows shares, a second option block, Intel shares and calls, and a private real estate LLC with no ticker. The honest close is: “This is a public disclosure filed 28 days after the trade. It says what Paul Pelosi bought in July, not what anyone will buy next.”',
    },
    limits: [
      'Public disclosures are not inside information. A PTR is filed up to 45 days after the trade, so copying it is usually too late to be a day-trade edge.',
      'Amounts are ranges. Never turn “$1,000,001 – $5,000,000” into “$3 million”. A third-party tracker’s date can differ from the PTR; the PTR wins.',
      'Options are options. The skill reads contracts, strike and expiry and marks exercises; it does not treat a call as a share purchase.',
      'The Senate site requires the user to accept its legal agreement personally. The skill does not automate that, any login or any agreement. It never places an order.',
    ],
    approval: 'No order permission is needed. The House Clerk data is public; the Senate agreement is a personal legal acknowledgement, not something to click on the user’s behalf. If a disclosure workflow asks for broker permissions, it is not the upstream design.',
    source: 'Upstream trader-pelosi/SKILL.md and README.md, read 10 November 2026.',
    faq: [
      {
        q: 'Is this insider information?',
        a: 'No. It reads public Periodic Transaction Reports filed under the STOCK Act. Members must disclose covered trades, but the filing can come up to 45 days after the trade, so the information is public and usually old.',
      },
      {
        q: 'Why is the skill named Pelosi?',
        a: 'The name follows search interest in one well-known filer’s disclosures. The tools read public House filings more generally; the name is not an endorsement and does not imply access to anything non-public.',
      },
      {
        q: 'Can it read Senate reports automatically?',
        a: 'No. The Senate efdsearch site asks the user to accept a legal agreement before searching. The skill gives a manual route: the user accepts it, searches, and pastes the table or saved page into the chat for the same write-up.',
      },
    ],
    related: [
      { href: '/skills/scanner/', label: 'Chart Scanner', description: 'If a disclosure is interesting, the chart still has to produce a today setup.' },
      { href: '/skills/news/', label: 'News Monitor', description: 'Public headlines and filings that may explain a move in a disclosed name.' },
      { href: '/safety/', label: 'Safety and permissions', description: 'Public disclosure, personal data and order permissions kept in their lanes.' },
      { href: '/editorial-policy/', label: 'Editorial policy', description: 'How this independent site handles sources, dates and corrections.' },
    ],
  },
};

export function getSkillGuide(slug: string): SkillGuide | undefined {
  return SKILL_GUIDES[slug];
}
