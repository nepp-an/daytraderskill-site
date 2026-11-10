import test from 'node:test';
import assert from 'node:assert/strict';

import {
  DEFAULT_CONFIG,
  advanceMark,
  createLedger,
  executeOrder,
  getMetrics,
  parseQuantity,
} from './ledger.ts';

function assertClose(actual, expected, message = '') {
  assert.ok(
    Math.abs(actual - expected) < 1e-9,
    `${message} expected ${expected}, received ${actual}`,
  );
}

function buy(state, quantity) {
  const result = executeOrder(state, 'buy', quantity);
  assert.ok(result.ok, result.ok ? '' : result.reason);
  return result.state;
}

function sell(state, quantity) {
  const result = executeOrder(state, 'sell', quantity);
  assert.ok(result.ok, result.ok ? '' : result.reason);
  return result.state;
}

test('default scenario matches the documented test fixture', () => {
  assert.deepEqual(DEFAULT_CONFIG, {
    initialCash: 10000,
    initialMarkPrice: 50,
    buySlippage: 0.01,
    sellSlippage: -0.01,
    feePerOrder: 1,
    priceStep: 1,
  });

  const state = createLedger();
  assertClose(state.cash, 10000, 'default opening cash');
  assertClose(state.markPrice, 50, 'default opening mark');
  assertClose(state.shares, 0, 'default shares');
  assertClose(state.unitCost, 0, 'default unit cost');
  assert.equal(state.trades.length, 0, 'default trade log is empty');
});

test('standard full round trip matches the hard accounting baseline', () => {
  let state = createLedger();

  // Buy 100 at mark 50, buy slippage +0.01, fee 1.
  state = buy(state, '100');
  assertClose(state.cash, 4998, 'cash after buy');
  assertClose(state.shares, 100, 'shares after buy');
  assertClose(state.unitCost, 50.02, 'capitalised unit cost');
  assertClose(state.realizedPnl, 0, 'realised after buy');
  assertClose(state.totalFees, 1, 'fees after buy');

  const buyTrade = state.trades[0];
  assertClose(buyTrade.fillPrice, 50.01, 'buy fill price');
  assertClose(buyTrade.gross, 5001, 'buy gross');
  assertClose(buyTrade.cashFlow, -5002, 'buy cash outflow');

  // At the unchanged mark, the buy cost is visible as a small unrealised loss.
  let metrics = getMetrics(state);
  assertClose(metrics.unrealizedPnl, -2, 'unrealised at mark 50');
  assertClose(metrics.equity, 9998, 'equity at mark 50');

  // Advance the synthetic mark from 50 to 51.
  state = advanceMark(state, 1);
  assertClose(state.markPrice, 51, 'mark after advance');
  metrics = getMetrics(state);
  assertClose(metrics.unrealizedPnl, 98, 'unrealised at mark 51');
  assertClose(metrics.equity, 10098, 'equity at mark 51');
  assertClose(metrics.equity - DEFAULT_CONFIG.initialCash, 98, 'equity change');
  assertClose(metrics.netPnl, 98, 'net P&L at mark 51');

  // Sell 100 at mark 51, sell slippage -0.01, fee 1.
  state = sell(state, '100');
  assertClose(state.cash, 10096, 'final cash');
  assertClose(state.realizedPnl, 96, 'net realised P&L');
  assertClose(state.shares, 0, 'flat shares');
  assertClose(state.unitCost, 0, 'unit cost when flat');
  assertClose(state.totalFees, 2, 'total fees');

  const sellTrade = state.trades[1];
  assertClose(sellTrade.fillPrice, 50.99, 'sell fill price');
  assertClose(sellTrade.gross, 5099, 'sell gross');
  assertClose(sellTrade.fee, 1, 'sell fee');
  assertClose(sellTrade.cashFlow, 5098, 'net sell proceeds');
  assertClose(sellTrade.realizedPnl, 96, 'trade-level realised P&L');

  metrics = getMetrics(state);
  assertClose(metrics.unrealizedPnl, 0, 'unrealised when flat');
  assertClose(metrics.equity, 10096, 'final equity');
  assertClose(metrics.netPnl, 96, 'final net P&L');
  assertClose(metrics.equity - DEFAULT_CONFIG.initialCash, 96, 'final equity change');
});

test('partial close carries locked unit cost and charges only the sell fee', () => {
  let state = createLedger();
  state = buy(state, '100');
  state = advanceMark(state, 1);

  state = sell(state, '40');
  const trade = state.trades[1];

  assertClose(trade.fillPrice, 50.99, 'partial sell fill');
  assertClose(trade.costBasis, 2000.8, 'released cost basis');
  assertClose(trade.fee, 1, 'sell fee belongs to this sale');
  assertClose(trade.realizedPnl, (40 * 50.99 - 1) - 40 * 50.02, 'partial realised P&L formula');
  assertClose(trade.realizedPnl, 37.8, 'partial realised P&L');
  assertClose(state.realizedPnl, 37.8, 'cumulative realised P&L');
  assertClose(state.cash, 7036.6, 'cash after partial close');
  assertClose(state.cash, 4998 + 40 * 50.99 - 1, 'cash conservation');
  assertClose(state.shares, 60, 'remaining shares');
  assertClose(state.unitCost, 50.02, 'remaining unit cost is unchanged');

  const metrics = getMetrics(state);
  assertClose(metrics.unrealizedPnl, (51 - 50.02) * 60, 'remaining unrealised P&L');
  assertClose(metrics.equity, 7036.6 + 51 * 60, 'equity after partial close');
  assertClose(metrics.netPnl, 96.6, 'net P&L after partial close');
  assertClose(
    metrics.realizedPnl + metrics.unrealizedPnl,
    metrics.netPnl,
    'realised + unrealised equals equity change',
  );
  assertClose(state.totalFees, 2, 'buy fee plus sell fee');
});

test('two buys then a partial sell use weighted unit cost without re-amortising', () => {
  let state = createLedger({ ...DEFAULT_CONFIG, initialMarkPrice: 20 });

  // 10 shares at 20 + slippage 0.01 + fee 1 => 201.10.
  state = buy(state, '10');
  assertClose(state.unitCost, 20.11, 'unit cost after first buy');
  state = advanceMark(state, 10);

  // 10 shares at 30 + slippage 0.01 + fee 1 => 301.10.
  state = buy(state, '10');
  assertClose(state.cash, 9497.8, 'cash after two buys');
  assertClose(
    state.unitCost,
    (10 * 20.01 + 1 + 10 * 30.01 + 1) / 20,
    'weighted unit cost includes both buy fees',
  );
  assertClose(state.unitCost, 25.11, 'weighted unit cost');

  state = advanceMark(state, 10);
  state = sell(state, '5');

  const trade = state.trades[2];
  assertClose(trade.fillPrice, 39.99, 'sell fill after two buys');
  assertClose(trade.gross, 199.95, 'sell gross after two buys');
  assertClose(trade.fee, 1, 'sell fee');
  assertClose(trade.costBasis, 5 * 25.11, 'basis released at locked unit cost');
  assertClose(trade.realizedPnl, 198.95 - 5 * 25.11, 'realised after sell fee');
  assertClose(trade.realizedPnl, 73.4, 'realised after sell fee');
  assertClose(state.cash, 9696.75, 'cash after partial sell');
  assertClose(state.shares, 15, 'remaining shares');
  assertClose(state.unitCost, 25.11, 'remaining unit cost is not re-amortised');

  const metrics = getMetrics(state);
  assertClose(metrics.unrealizedPnl, (40 - 25.11) * 15, 'remaining unrealised');
  assertClose(metrics.equity, 9696.75 + 40 * 15, 'equity after partial sell');
  assertClose(metrics.netPnl, 296.75, 'net P&L after partial sell');
  assertClose(
    metrics.realizedPnl + metrics.unrealizedPnl,
    metrics.netPnl,
    'realised + unrealised equals equity change',
  );
});

test('invalid quantities are rejected without changing state', () => {
  const before = createLedger();
  const invalid = ['', '   ', 'abc', '1.5', '0', '-5', '1,000', 'Infinity'];

  for (const raw of invalid) {
    assert.equal(parseQuantity(raw).ok, false, `${JSON.stringify(raw)} should not parse`);
    for (const side of ['buy', 'sell']) {
      const result = executeOrder(before, side, raw);
      assert.equal(result.ok, false, `${side} ${JSON.stringify(raw)} should be rejected`);
      assert.ok(result.ok === false && result.reason.length > 0, 'reason should be shown');
      assert.equal(result.state, before, 'state object should be unchanged');
      assert.deepEqual(result.state, before, 'state values should be unchanged');
    }
  }

  assert.equal(parseQuantity('100').ok, true, 'whole positive quantity should parse');
  assert.equal(parseQuantity(100).ok, true, 'positive integer number should parse');
});

test('buying beyond available cash is rejected without changing state', () => {
  const before = createLedger();
  const result = executeOrder(before, 'buy', '1000');

  assert.equal(result.ok, false);
  assert.match(result.reason, /Not enough cash/i);
  assert.equal(result.state, before, 'state object should be unchanged');
  assert.deepEqual(result.state, before, 'state values should be unchanged');
  assertClose(result.state.cash, 10000, 'cash remains at the opening balance');
  assertClose(result.state.shares, 0, 'shares remain unchanged');
});

test('selling more than held is rejected without changing state', () => {
  const empty = createLedger();
  const flatResult = executeOrder(empty, 'sell', '1');
  assert.equal(flatResult.ok, false);
  assert.match(flatResult.reason, /Cannot sell 1 share/i);
  assert.equal(flatResult.state, empty);

  let state = buy(empty, '100');
  state = advanceMark(state, 1);
  const before = state;
  const oversell = executeOrder(state, 'sell', '101');

  assert.equal(oversell.ok, false);
  assert.match(oversell.reason, /Cannot sell 101 shares/i);
  assert.match(oversell.reason, /holds 100 shares/i);
  assert.equal(oversell.state, before, 'state object should be unchanged');
  assert.deepEqual(oversell.state, before, 'state values should be unchanged');
  assertClose(oversell.state.cash, 4998, 'cash remains unchanged');
  assertClose(oversell.state.shares, 100, 'shares remain unchanged');
  assertClose(oversell.state.realizedPnl, 0, 'realised P&L remains unchanged');
});

test('mark advancement and reset stay synthetic and deterministic', () => {
  const opening = createLedger();
  const up = advanceMark(opening, 1);
  const down = advanceMark(up, -1);

  assertClose(up.markPrice, 51, 'mark advances by the configured step');
  assertClose(down.markPrice, 50, 'mark can move back');
  assert.equal(opening.trades.length, 0, 'moving the mark records no trade');
  assertClose(opening.cash, 10000, 'moving the mark does not change cash');

  const reset = createLedger();
  assert.deepEqual(reset, opening, 'reset returns the exact default state');
  assertClose(reset.markPrice, 50, 'reset mark');
  assertClose(reset.cash, 10000, 'reset cash');
});
