'use client';

import { useMemo, useState } from 'react';
import {
  DEFAULT_CONFIG,
  advanceMark,
  createLedger,
  executeOrder,
  getMetrics,
  type LedgerState,
  type OrderSide,
} from '@/lib/paper-simulator/ledger';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

const usdPrecise = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 4,
});

const qtyFormat = new Intl.NumberFormat('en-US');

function signedUsd(value: number) {
  if (value > 0) return `+${usd.format(value)}`;
  if (value < 0) return `−${usd.format(Math.abs(value))}`;
  return usd.format(0);
}

function tone(value: number) {
  if (value > 0) return 'sim-positive';
  if (value < 0) return 'sim-negative';
  return '';
}

type Notice = { tone: 'error' | 'success'; text: string } | null;

export function PaperSimulator() {
  const [ledger, setLedger] = useState<LedgerState>(() => createLedger());
  const [quantity, setQuantity] = useState('100');
  const [notice, setNotice] = useState<Notice>(null);

  const metrics = useMemo(() => getMetrics(ledger), [ledger]);

  function placeOrder(side: OrderSide) {
    const result = executeOrder(ledger, side, quantity);
    if (!result.ok) {
      setNotice({ tone: 'error', text: result.reason });
      return;
    }

    setLedger(result.state);
    setNotice({
      tone: 'success',
      text: `${side === 'buy' ? 'Bought' : 'Sold'} ${qtyFormat.format(
        result.trade.quantity,
      )} at a simulated fill of ${usd.format(result.trade.fillPrice)}. Cash is now ${usd.format(
        result.trade.cashAfter,
      )}.`,
    });
  }

  function moveMark(steps: number) {
    setLedger((current) => advanceMark(current, steps));
    setNotice(null);
  }

  function resetScenario() {
    setLedger(createLedger());
    setQuantity('100');
    setNotice({
      tone: 'success',
      text: `Reset to the default synthetic scenario: ${usd.format(
        DEFAULT_CONFIG.initialCash,
      )} cash, ${usd.format(DEFAULT_CONFIG.initialMarkPrice)} mark, 100 shares in the ticket.`,
    });
  }

  return (
    <section
      id="synthetic-simulator"
      className="paper-simulator"
      aria-labelledby="synthetic-simulator-title"
    >
      <p className="eyebrow">Synthetic scenario · browser-only · no market data</p>
      <h2 id="synthetic-simulator-title">Synthetic single-asset practice ledger</h2>
      <p>
        A deliberately small order ticket for rehearsing the mechanics and the arithmetic. It uses
        one fictional asset, one made-up mark price, and a fixed set of costs. You can buy, sell,
        move the mark, and reset. Nothing is sent anywhere.
      </p>

      <div className="sim-banner" role="note">
        <strong>SYNTHETIC scenario.</strong> Not live or delayed market data. The mark price is a
        scenario variable moved only by the buttons below; it is not a quote from any market, and
        this is not a pretend live feed. No broker, API key, account, or real order is involved.
      </div>

      <div className="sim-grid">
        <div className="sim-panel">
          <h3>Order ticket</h3>

          <dl className="sim-specs">
            <div>
              <dt>Starting cash</dt>
              <dd>{usd.format(DEFAULT_CONFIG.initialCash)}</dd>
            </div>
            <div>
              <dt>Instrument</dt>
              <dd>SYN-1 (fictional)</dd>
            </div>
            <div>
              <dt>Starting mark</dt>
              <dd>{usd.format(DEFAULT_CONFIG.initialMarkPrice)}</dd>
            </div>
            <div>
              <dt>Buy slippage</dt>
              <dd>+{usd.format(DEFAULT_CONFIG.buySlippage)}</dd>
            </div>
            <div>
              <dt>Sell slippage</dt>
              <dd>−{usd.format(Math.abs(DEFAULT_CONFIG.sellSlippage))}</dd>
            </div>
            <div>
              <dt>Fee per order</dt>
              <dd>{usd.format(DEFAULT_CONFIG.feePerOrder)}</dd>
            </div>
            <div>
              <dt>Price step</dt>
              <dd>{usd.format(DEFAULT_CONFIG.priceStep)}</dd>
            </div>
          </dl>

          <div className="sim-field">
            <label htmlFor="sim-quantity">Share quantity</label>
            <input
              id="sim-quantity"
              type="text"
              inputMode="numeric"
              autoComplete="off"
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
              placeholder="100"
            />
            <p className="calc-hint">
              Whole shares only. The default 100 is the quantity used in the standard test below.
            </p>
          </div>

          <div className="sim-actions">
            <button className="btn primary small" type="button" onClick={() => placeOrder('buy')}>
              Buy at mark + slippage
            </button>
            <button className="btn small" type="button" onClick={() => placeOrder('sell')}>
              Sell at mark − slippage
            </button>
          </div>

          <div className="sim-mark">
            <span>Current synthetic mark</span>
            <strong>{usd.format(ledger.markPrice)}</strong>
          </div>

          <div className="sim-actions">
            <button className="btn small ghost" type="button" onClick={() => moveMark(1)}>
              Advance price +{usd.format(DEFAULT_CONFIG.priceStep)}
            </button>
            <button className="btn small ghost" type="button" onClick={() => moveMark(-1)}>
              Move price −{usd.format(DEFAULT_CONFIG.priceStep)}
            </button>
            <button className="btn small ghost" type="button" onClick={resetScenario}>
              Reset scenario
            </button>
          </div>

          <div
            className={`sim-notice${notice ? ` ${notice.tone}` : ''}`}
            role={notice?.tone === 'error' ? 'alert' : 'status'}
          >
            {notice
              ? notice.text
              : 'Ready. No order has been sent anywhere; the ledger updates in this browser tab only.'}
          </div>
        </div>

        <div className="sim-panel sim-ledger">
          <h3>Ledger</h3>
          <div className="sim-metrics">
            <div className="sim-metric">
              <span>Cash</span>
              <strong>{usd.format(metrics.cash)}</strong>
            </div>
            <div className="sim-metric">
              <span>Shares held</span>
              <strong>{qtyFormat.format(metrics.shares)}</strong>
            </div>
            <div className="sim-metric">
              <span>Cost per share</span>
              <strong>{metrics.shares > 0 ? usdPrecise.format(metrics.unitCost) : '—'}</strong>
            </div>
            <div className="sim-metric">
              <span>Realised P&amp;L</span>
              <strong className={tone(metrics.realizedPnl)}>{signedUsd(metrics.realizedPnl)}</strong>
            </div>
            <div className="sim-metric">
              <span>Unrealised P&amp;L</span>
              <strong className={tone(metrics.unrealizedPnl)}>
                {signedUsd(metrics.unrealizedPnl)}
              </strong>
            </div>
            <div className="sim-metric">
              <span>Fees paid</span>
              <strong>{usd.format(metrics.totalFees)}</strong>
            </div>
            <div className="sim-metric">
              <span>Last fill price</span>
              <strong>
                {metrics.lastFillPrice === null ? '—' : usd.format(metrics.lastFillPrice)}
              </strong>
            </div>
            <div className="sim-metric">
              <span>Equity</span>
              <strong>{usd.format(metrics.equity)}</strong>
            </div>
            <div className="sim-metric">
              <span>Net P&amp;L</span>
              <strong className={tone(metrics.netPnl)}>{signedUsd(metrics.netPnl)}</strong>
            </div>
          </div>

          <p className="sim-formula">
            Equity = cash + (mark × shares). Net P&amp;L = equity −{' '}
            {usd.format(DEFAULT_CONFIG.initialCash)} opening cash.
          </p>
        </div>
      </div>

      <h3>Simulated trade log</h3>
      <div className="sim-table-wrap">
        <table className="data sim-table">
          <caption className="muted">
            Every row is a synthetic fill against the scenario mark. No row represents a market
            execution.
          </caption>
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Side</th>
              <th scope="col">Qty</th>
              <th scope="col">Mark</th>
              <th scope="col">Slippage</th>
              <th scope="col">Fill</th>
              <th scope="col">Fee</th>
              <th scope="col">Cash flow</th>
              <th scope="col">Realised</th>
              <th scope="col">Cash after</th>
            </tr>
          </thead>
          <tbody>
            {ledger.trades.length === 0 ? (
              <tr>
                <td colSpan={10} className="sim-empty">
                  No simulated orders yet. With the default quantity of 100, click{' '}
                  <strong>Buy at mark + slippage</strong> to start.
                </td>
              </tr>
            ) : (
              ledger.trades.map((trade) => (
                <tr key={trade.id}>
                  <td>{trade.id}</td>
                  <td>{trade.side === 'buy' ? 'Buy' : 'Sell'}</td>
                  <td>{qtyFormat.format(trade.quantity)}</td>
                  <td>{usd.format(trade.markPrice)}</td>
                  <td>{signedUsd(trade.slippage)}</td>
                  <td>{usd.format(trade.fillPrice)}</td>
                  <td>{usd.format(trade.fee)}</td>
                  <td className={trade.cashFlow < 0 ? 'sim-negative' : 'sim-positive'}>
                    {signedUsd(trade.cashFlow)}
                  </td>
                  <td className={trade.side === 'sell' ? tone(trade.realizedPnl) : ''}>
                    {trade.side === 'sell' ? signedUsd(trade.realizedPnl) : '—'}
                  </td>
                  <td>{usd.format(trade.cashAfter)}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <p className="sim-basis">
        <strong>Accounting basis.</strong> Buy fees are capitalised into the per-share cost, a sell
        fee reduces only that sale&apos;s realised P&amp;L, and a partial sell carries the locked
        per-share cost; cash, equity, and net P&amp;L are the hard checks.
      </p>

      <div className="sim-standard">
        <h3>Reproduce the standard test</h3>
        <ol>
          <li>
            Click <strong>Reset scenario</strong>. Defaults: {usd.format(DEFAULT_CONFIG.initialCash)}{' '}
            cash, {usd.format(DEFAULT_CONFIG.initialMarkPrice)} mark, quantity 100, buy slippage +
            {usd.format(DEFAULT_CONFIG.buySlippage)}, sell slippage −
            {usd.format(Math.abs(DEFAULT_CONFIG.sellSlippage))}, fee{' '}
            {usd.format(DEFAULT_CONFIG.feePerOrder)}.
          </li>
          <li>
            Click <strong>Buy</strong>. Fill {usd.format(50.01)}; cash {usd.format(4998)}; cost per
            share {usd.format(50.02)}; at the unchanged {usd.format(50)} mark, unrealised is{' '}
            {signedUsd(-2)} and equity is {usd.format(9998)}.
          </li>
          <li>
            Click <strong>Advance price +{usd.format(DEFAULT_CONFIG.priceStep)}</strong>. Mark{' '}
            {usd.format(51)}; unrealised {signedUsd(98)}; equity {usd.format(10098)}.
          </li>
          <li>
            Click <strong>Sell</strong>. Fill {usd.format(50.99)}; net proceeds {usd.format(5098)};
            final cash {usd.format(10096)}; net realised {signedUsd(96)}; shares 0; unrealised{' '}
            {usd.format(0)}.
          </li>
        </ol>
        <p className="calc-hint">
          The same numbers are asserted by <code className="inline">node:test</code> in{' '}
          <code className="inline">lib/paper-simulator/ledger.test.mjs</code>. This measured test is
          arithmetic, not a browser end-to-end claim.
        </p>
      </div>

      <p className="journal-note">
        <strong>Paper only.</strong> Nothing here is saved, connected, or executed. The scenario is
        not evidence that a strategy works, and a simulated profit is not real money. Most people
        who day trade lose money.
      </p>
    </section>
  );
}
