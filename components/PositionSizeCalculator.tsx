'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});

const num = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });
const pct = new Intl.NumberFormat('en-US', { maximumFractionDigits: 2 });

function parseNumber(value: string) {
  const cleaned = value.replace(/[$,\s]/g, '');
  if (cleaned === '') return Number.NaN;
  const parsed = Number(cleaned);
  return Number.isFinite(parsed) ? parsed : Number.NaN;
}

type Fields = {
  account: string;
  risk: string;
  entry: string;
  stop: string;
};

const EMPTY: Fields = { account: '', risk: '1', entry: '', stop: '' };

export function PositionSizeCalculator() {
  const [fields, setFields] = useState<Fields>(EMPTY);
  const [showResult, setShowResult] = useState(false);

  const result = useMemo(() => {
    const account = parseNumber(fields.account);
    const risk = parseNumber(fields.risk);
    const entry = parseNumber(fields.entry);
    const stop = parseNumber(fields.stop);
    const errors: string[] = [];

    if (!Number.isFinite(account) || account <= 0) {
      errors.push('Enter an account size greater than zero.');
    }
    if (!Number.isFinite(risk) || risk <= 0) {
      errors.push('Enter a risk percentage greater than zero.');
    } else if (risk > 100) {
      errors.push('Risk per trade cannot exceed 100% of the account.');
    }
    if (!Number.isFinite(entry) || entry <= 0) {
      errors.push('Enter an entry price greater than zero.');
    }
    if (!Number.isFinite(stop) || stop <= 0) {
      errors.push('Enter a stop distance greater than zero.');
    }
    if (Number.isFinite(entry) && Number.isFinite(stop) && stop >= entry) {
      errors.push('For this long example, the stop distance must be smaller than the entry price.');
    }

    if (errors.length > 0) {
      return { ok: false as const, errors };
    }

    const riskAmount = account * (risk / 100);
    const shares = Math.floor(riskAmount / stop);
    const positionValue = shares * entry;
    const stopPrice = entry - stop;
    const riskAtStop = shares * stop;
    const positionPercent = account > 0 ? (positionValue / account) * 100 : 0;
    const roundedDown = riskAmount - riskAtStop;

    return {
      ok: true as const,
      errors: [] as string[],
      account,
      risk,
      entry,
      stop,
      riskAmount,
      shares,
      positionValue,
      stopPrice,
      riskAtStop,
      positionPercent,
      roundedDown,
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
        Risk budget = account × risk % &nbsp;·&nbsp; Shares = floor(risk budget ÷ stop distance)
      </div>
      <div className="calc-grid">
        <div className="calc-form">
          <div className="calc-field">
            <label htmlFor="ps-account">Account size (USD)</label>
            <input
              id="ps-account"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="25000"
              value={fields.account}
              onChange={(event) => update('account', event.target.value)}
            />
            <p className="calc-hint">Use the paper account size, not a fantasy balance.</p>
          </div>

          <div className="calc-field">
            <label htmlFor="ps-risk">Risk per trade (%)</label>
            <input
              id="ps-risk"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="1"
              value={fields.risk}
              onChange={(event) => update('risk', event.target.value)}
            />
            <p className="calc-hint">
              The share of the account you accept losing if the stop is hit. Many educational
              frameworks use a small single-digit percentage; this is not personal advice.
            </p>
          </div>

          <div className="calc-field">
            <label htmlFor="ps-entry">Planned entry price (USD)</label>
            <input
              id="ps-entry"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="50.00"
              value={fields.entry}
              onChange={(event) => update('entry', event.target.value)}
            />
          </div>

          <div className="calc-field">
            <label htmlFor="ps-stop">Stop distance (USD per share)</label>
            <input
              id="ps-stop"
              type="text"
              inputMode="decimal"
              autoComplete="off"
              placeholder="2.50"
              value={fields.stop}
              onChange={(event) => update('stop', event.target.value)}
            />
            <p className="calc-hint">
              Entry minus planned stop. A $50 entry with a $47.50 stop has a $2.50 stop distance.
            </p>
          </div>

          <div className="calc-actions">
            <button className="btn primary small" type="button" onClick={() => setShowResult(true)}>
              Calculate position size
            </button>
            <button className="btn small ghost" type="button" onClick={reset}>
              Reset
            </button>
          </div>
        </div>

        <div className="calc-results" aria-live="polite">
          <h3>Suggested position</h3>
          {!result.ok ? (
            <>
              <p className="calc-empty">
                Fill in all four fields, then calculate. The result appears here without sending any
                data anywhere.
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
                <span>Suggested shares</span>
                <strong>{num.format(result.shares)}</strong>
              </div>
              <div className="calc-metric">
                <span>Position value at entry</span>
                <strong>{usd.format(result.positionValue)}</strong>
              </div>
              <div className="calc-metric">
                <span>Risk budget</span>
                <strong>{usd.format(result.riskAmount)}</strong>
              </div>
              <div className="calc-metric">
                <span>Risk at stop</span>
                <strong>{usd.format(result.riskAtStop)}</strong>
              </div>
              <div className="calc-metric">
                <span>Stop price</span>
                <strong>{usd.format(result.stopPrice)}</strong>
              </div>
              <div className="calc-metric">
                <span>Position vs account</span>
                <strong>{pct.format(result.positionPercent)}%</strong>
              </div>
              {result.shares === 0 ? (
                <p className="calc-error">
                  The risk budget is smaller than one share&apos;s stop risk. Do not round up by
                  risking more than the plan allows.
                </p>
              ) : null}
              {result.positionPercent > 100 ? (
                <p className="calc-error">
                  This notional value is larger than the account. That implies margin or leverage;
                  check the broker&apos;s rules and treat the extra risk carefully.
                </p>
              ) : null}
              <p className="calc-hint">
                Whole shares only; the unused risk budget is {usd.format(result.roundedDown)}. Fees,
                slippage, and gaps can make the real loss larger than this arithmetic.
              </p>

              <h3>Put the number to work</h3>
              <div className="calc-actions">
                <Link className="btn small" href="/learn/day-trading-for-beginners/">
                  Beginner pillar
                </Link>
                <Link className="btn small ghost" href="/learn/how-to-start-day-trading/">
                  How to start
                </Link>
                <Link className="btn small ghost" href="/safety/#risk">
                  Risk rules
                </Link>
              </div>
            </>
          )}
        </div>
      </div>

      <p className="journal-note">
        <strong>Not financial advice.</strong> This calculator is arithmetic for an educational plan.
        It has no broker connection, no market data, and no order path. It does not recommend a
        security, a position size, or a trade.
      </p>
    </div>
  );
}
