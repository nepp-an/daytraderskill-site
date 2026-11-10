/**
 * Synthetic single-asset paper-trading ledger.
 *
 * This module is deliberately pure: it has no market-data feed, no network
 * access, no credentials, and no order path. Every price is supplied by the
 * caller, so the same state can be replayed and tested.
 *
 * Accounting basis for this workbook:
 * - A buy fee is capitalised into the cost basis. Unit cost = total buy cost
 *   including fees / shares bought, and it is locked at the time of the buy.
 * - A sell fee reduces only that sale's realised P&L. It is not spread back
 *   over the remaining position.
 * - A partial sell carries the locked unit cost proportionally. Remaining unit
 *   cost is not re-amortised.
 * - Cash conservation, equity (cash + mark x shares), and net P&L
 *   (equity - initial cash) are the hard checks.
 */

export type OrderSide = 'buy' | 'sell';

export type SimulatorConfig = {
  /** Starting simulated cash in USD. */
  initialCash: number;
  /** Starting synthetic mark price in USD. */
  initialMarkPrice: number;
  /** Signed price adjustment applied to a buy, e.g. +0.01. */
  buySlippage: number;
  /** Signed price adjustment applied to a sell, e.g. -0.01. */
  sellSlippage: number;
  /** Flat simulated fee charged on every order, in USD. */
  feePerOrder: number;
  /** How far the "advance price" controls move the synthetic mark. */
  priceStep: number;
};

export type PaperTrade = {
  id: number;
  side: OrderSide;
  quantity: number;
  markPrice: number;
  slippage: number;
  fillPrice: number;
  gross: number;
  fee: number;
  /** Signed cash movement: negative for a buy, positive for a sell. */
  cashFlow: number;
  /** Cost basis released by a sell; 0 for a buy. */
  costBasis: number;
  /** Net realised P&L for a sell; 0 for a buy. */
  realizedPnl: number;
  cashAfter: number;
  sharesAfter: number;
  unitCostAfter: number;
};

export type LedgerState = {
  config: SimulatorConfig;
  markPrice: number;
  cash: number;
  shares: number;
  /** Locked cost basis per share, including capitalised buy fees. */
  unitCost: number;
  realizedPnl: number;
  totalFees: number;
  trades: PaperTrade[];
};

export type LedgerMetrics = {
  cash: number;
  shares: number;
  unitCost: number;
  marketValue: number;
  equity: number;
  realizedPnl: number;
  unrealizedPnl: number;
  totalFees: number;
  netPnl: number;
  lastFillPrice: number | null;
};

export type OrderResult =
  | { ok: true; state: LedgerState; trade: PaperTrade }
  | { ok: false; state: LedgerState; reason: string };

export type QuantityResult =
  | { ok: true; value: number }
  | { ok: false; reason: string };

export const DEFAULT_CONFIG: SimulatorConfig = {
  initialCash: 10_000,
  initialMarkPrice: 50,
  buySlippage: 0.01,
  sellSlippage: -0.01,
  feePerOrder: 1,
  priceStep: 1,
};

/** Round a dollar amount to whole cents. */
export function roundMoney(value: number): number {
  return Math.round((value + Number.EPSILON) * 100) / 100;
}

/** Keep a per-share cost precise enough for weighted-average purchases. */
function roundUnitCost(value: number): number {
  return Math.round((value + Number.EPSILON) * 1_000_000) / 1_000_000;
}

export function createLedger(config: SimulatorConfig = DEFAULT_CONFIG): LedgerState {
  return {
    config: { ...config },
    markPrice: roundMoney(config.initialMarkPrice),
    cash: roundMoney(config.initialCash),
    shares: 0,
    unitCost: 0,
    realizedPnl: 0,
    totalFees: 0,
    trades: [],
  };
}

/**
 * Whole shares only. Empty, non-numeric, fractional, zero, and negative
 * quantities are rejected with a human-readable reason.
 */
export function parseQuantity(raw: string | number): QuantityResult {
  if (typeof raw === 'number') {
    if (!Number.isInteger(raw) || raw <= 0) {
      return {
        ok: false,
        reason: 'Enter a whole number of shares greater than 0.',
      };
    }
    return { ok: true, value: raw };
  }

  const trimmed = raw.trim();
  if (trimmed === '') {
    return {
      ok: false,
      reason: 'Enter a share quantity. The field is empty.',
    };
  }

  if (!/^\d+$/.test(trimmed)) {
    return {
      ok: false,
      reason: 'Enter a whole number of shares. Letters, symbols, and decimals are not accepted.',
    };
  }

  const value = Number(trimmed);
  if (!Number.isSafeInteger(value) || value <= 0) {
    return {
      ok: false,
      reason: 'Enter a whole number of shares greater than 0.',
    };
  }

  return { ok: true, value };
}

export function executeOrder(
  state: LedgerState,
  side: OrderSide,
  rawQuantity: string | number,
): OrderResult {
  const quantity = parseQuantity(rawQuantity);
  if (!quantity.ok) {
    return { ok: false, state, reason: quantity.reason };
  }

  return side === 'buy'
    ? executeBuy(state, quantity.value)
    : executeSell(state, quantity.value);
}

function executeBuy(state: LedgerState, quantity: number): OrderResult {
  const slippage = state.config.buySlippage;
  const fillPrice = roundMoney(state.markPrice + slippage);
  const gross = roundMoney(fillPrice * quantity);
  const fee = roundMoney(state.config.feePerOrder);
  const totalCost = roundMoney(gross + fee);

  if (totalCost > state.cash) {
    return {
      ok: false,
      state,
      reason: `Not enough cash. This buy needs $${totalCost.toFixed(
        2,
      )} including the fee, but the account has $${state.cash.toFixed(2)}.`,
    };
  }

  const sharesAfter = state.shares + quantity;
  // Capitalise the buy fee and any earlier basis into a locked unit cost.
  const unitCostAfter = roundUnitCost(
    (state.shares * state.unitCost + totalCost) / sharesAfter,
  );
  const cashAfter = roundMoney(state.cash - totalCost);
  const trade: PaperTrade = {
    id: state.trades.length + 1,
    side: 'buy',
    quantity,
    markPrice: state.markPrice,
    slippage,
    fillPrice,
    gross,
    fee,
    cashFlow: -totalCost,
    costBasis: 0,
    realizedPnl: 0,
    cashAfter,
    sharesAfter,
    unitCostAfter,
  };

  return {
    ok: true,
    trade,
    state: {
      ...state,
      cash: cashAfter,
      shares: sharesAfter,
      unitCost: unitCostAfter,
      totalFees: roundMoney(state.totalFees + fee),
      trades: [...state.trades, trade],
    },
  };
}

function shareLabel(quantity: number): string {
  return `${quantity} ${quantity === 1 ? 'share' : 'shares'}`;
}

function executeSell(state: LedgerState, quantity: number): OrderResult {
  if (quantity > state.shares) {
    return {
      ok: false,
      state,
      reason: `Cannot sell ${shareLabel(quantity)}. The account holds ${shareLabel(state.shares)}.`,
    };
  }

  const slippage = state.config.sellSlippage;
  const fillPrice = roundMoney(state.markPrice + slippage);
  const gross = roundMoney(fillPrice * quantity);
  const fee = roundMoney(state.config.feePerOrder);
  const netProceeds = roundMoney(gross - fee);
  // Partial sells release basis at the locked unit cost, not a new average.
  const costBasis = roundMoney(state.unitCost * quantity);
  const realizedPnl = roundMoney(netProceeds - costBasis);
  const cashAfter = roundMoney(state.cash + netProceeds);
  const sharesAfter = state.shares - quantity;
  const unitCostAfter = sharesAfter === 0 ? 0 : state.unitCost;
  const trade: PaperTrade = {
    id: state.trades.length + 1,
    side: 'sell',
    quantity,
    markPrice: state.markPrice,
    slippage,
    fillPrice,
    gross,
    fee,
    cashFlow: netProceeds,
    costBasis,
    realizedPnl,
    cashAfter,
    sharesAfter,
    unitCostAfter,
  };

  return {
    ok: true,
    trade,
    state: {
      ...state,
      cash: cashAfter,
      shares: sharesAfter,
      unitCost: unitCostAfter,
      realizedPnl: roundMoney(state.realizedPnl + realizedPnl),
      totalFees: roundMoney(state.totalFees + fee),
      trades: [...state.trades, trade],
    },
  };
}

/** Move the synthetic mark by a number of configured price steps. */
export function advanceMark(state: LedgerState, steps: number): LedgerState {
  const next = roundMoney(state.markPrice + steps * state.config.priceStep);
  return { ...state, markPrice: Math.max(0.01, next) };
}

export function getMetrics(state: LedgerState): LedgerMetrics {
  const marketValue = roundMoney(state.markPrice * state.shares);
  const equity = roundMoney(state.cash + marketValue);
  const lastTrade = state.trades.length > 0 ? state.trades[state.trades.length - 1] : null;

  return {
    cash: state.cash,
    shares: state.shares,
    unitCost: state.unitCost,
    marketValue,
    equity,
    realizedPnl: state.realizedPnl,
    unrealizedPnl: roundMoney((state.markPrice - state.unitCost) * state.shares),
    totalFees: state.totalFees,
    netPnl: roundMoney(equity - state.config.initialCash),
    lastFillPrice: lastTrade ? lastTrade.fillPrice : null,
  };
}
