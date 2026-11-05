'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const pct = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

function parseNumber(value: string) {
  const cleaned = value.replace(/[$,\s]/g, '');
  if (cleaned === '') return Number.NaN;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

type Fields = {
  entry: string;
  stop: string;
  target: string;
  shares: string;
};

const EMPTY: Fields = { entry: '', stop: '', target: '', shares: '' };

export function RiskRewardCalculator() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const entry = parseNumber(fields.entry);
    const stop = parseNumber(fields.stop);
    const target = parseNumber(fields.target);
    const sharesInput = fields.shares.trim();
    const shares = sharesInput === '' ? Number.NaN : parseNumber(fields.shares);
    const errors: string[] = [];

    if (!Number.isFinite(entry) || entry <= 0) {
      errors.push('Enter an entry price greater than zero.');
    }
    if (!Number.isFinite(stop) || stop <= 0) {
      errors.push('Enter a stop price greater than zero.');
    }
    if (!Number.isFinite(target) || target <= 0) {
      errors.push('Enter a target price greater than zero.');
    }
    if (Number.isFinite(entry) && Number.isFinite(stop) && stop >= entry) {
      errors.push('For this long example, the stop must be below the entry.');
    }
    if (Number.isFinite(entry) && Number.isFinite(target) && target <= entry) {
      errors.push('For this long example, the target must be above the entry.');
    }
    if (sharesInput !== '' && (!Number.isFinite(shares) || shares <= 0)) {
      errors.push('The optional share count must be greater than zero.');
    }

    if (errors.length > 0) {
      return { ok: false as const, errors };
    }

    const riskPerShare = entry - stop;
    const rewardPerShare = target - entry;
    const ratio = rewardPerShare / riskPerShare;
    const breakEven = (1 / (1 + ratio)) * 100;
    const hasShares = Number.isFinite(shares) && shares > 0;
    const potentialLoss = hasShares ? riskPerShare * shares : riskPerShare;
    const potentialProfit = hasShares ? rewardPerShare * shares : rewardPerShare;

    return {
      ok: true as const,
      errors: [] as string[],
      entry,
      stop,
      target,
      riskPerShare,
      rewardPerShare,
      ratio,
      breakEven,
      hasShares,
      shares,
      potentialLoss,
      potentialProfit,
    };
  }, [fields]);

  function update(field: keyof Fields, value: string) {
    setFields((current) => ({ ...current, [field]: value }));
    setShowResult(false);
  }

  function reset() {
    setFields(EMPTY);
    setShowResult(false);
  }

  return (
    <div className="calc-shell">
      <div className="formula-strip">
        Risk/share = entry − stop &nbsp;·&nbsp; Reward/share = target − entry &nbsp;·&nbsp; R:R =
        reward ÷ risk
      </div>
      <div className="calc-grid">
        <div className="calc-form">
          <div className="calc-field">
            <label htmlFor="rr-entry">Planned entry (USD)</label>
            <input
              id="rr-entry"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="50.00"
              value={fields.entry}
              onChange={(event) => update('entry', event.target.value)}
            />
          </div>

          <div className="calc-field">
            <label htmlFor="rr-stop">Stop price (USD)</label>
            <input
              id="rr-stop"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="47.50"
              value={fields.stop}
              onChange={(event) => update('stop', event.target.value)}
            />
            <p className="calc-hint">The price at which the idea is invalidated in this long example.</p>
          </div>

          <div className="calc-field">
            <label htmlFor="rr-target">Target price (USD)</label>
            <input
              id="rr-target"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="57.50"
              value={fields.target}
              onChange={(event) => update('target', event.target.value)}
            />
          </div>

          <div className="calc-field">
            <label htmlFor="rr-shares">Share count (optional)</label>
            <input
              id="rr-shares"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="100"
              value={fields.shares}
              onChange={(event) => update('shares', event.target.value)}
            />
            <p className="calc-hint">
              Leave blank to see the risk and reward per share. Add shares for the full position.
            </p>
          </div>

          <div className="calc-actions">
            <button className="btn primary small" type="button" onClick={() => setShowResult(true)}>
              Calculate risk-reward
            </button>
            <button className="btn small ghost" type="button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        <div className="calc-results" aria-live="polite">
          <h3>Risk-reward result</h3>
          {!result.ok ? (
            <>
              <p className="calc-empty">
                Fill in the entry, stop, and target. The ratio appears here; no data leaves your
                browser.
              </p>
              {showResult
                ? result.errors.map((error) => (
                    <p className="calc-error" key={error}>
                      {error}
                    </p>
                  ))
                : null}
            </>
          ) : (
            <>
              <div className="calc-metric primary">
                <span>Reward : risk</span>
                <strong>{pct.format(result.ratio)} : 1</strong>
              </div>
              <div className="calc-metric">
                <span>Risk per share</span>
                <strong>{usd.format(result.riskPerShare)}</strong>
              </div>
              <div className="calc-metric">
                <span>Reward per share</span>
                <strong>{usd.format(result.rewardPerShare)}</strong>
              </div>
              <div className="calc-metric">
                <span>{result.hasShares ? 'Potential loss at stop' : 'Loss per share'}</span>
                <strong>{usd.format(result.potentialLoss)}</strong>
              </div>
              <div className="calc-metric">
                <span>{result.hasShares ? 'Potential profit at target' : 'Profit per share'}</span>
                <strong>{usd.format(result.potentialProfit)}</strong>
              </div>
              {result.hasShares ? (
                <div className="calc-metric">
                  <span>Shares used</span>
                  <strong>{pct.format(result.shares)}</strong>
                </div>
              ) : null}
              <div className="calc-metric">
                <span>Break-even hit rate, before costs</span>
                <strong>{pct.format(result.breakEven)}%</strong>
              </div>
              <p className="calc-hint">
                Break-even hit rate is 1 ÷ (1 + R:R). It is arithmetic, not a prediction of how often
                the setup wins, and it ignores fees, slippage, and taxes.
              </p>

              <h3>Keep going</h3>
              <div className="calc-actions">
                <Link className="btn small" href="/learn/how-to-start-day-trading/">
                  How to start
                </Link>
                <Link className="btn small ghost" href="/paper-trading/">
                  Paper practice
                </Link>
                <Link className="btn small ghost" href="/tools/position-size-calculator/">
                  Size the trade
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="journal-note">
        <strong>Not financial advice.</strong> This calculator is arithmetic for an educational plan.
        It has no broker connection, no market data, and no order path. A higher R:R does not mean a
        setup is more likely to win, and it does not promise a profit.
      </p>
    </div>
  );
}
