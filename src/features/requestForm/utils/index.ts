import type { PositionType, PriceRangeType, RawPositionType } from '../types'

const POOL_URL_BASE = 'https://app.uniswap.org/pools/'

// TODO: tests
export const getFormattedPosition = (position: RawPositionType): PositionType => {
  return {
    token0: position.token0,
    token1: position.token1,
    fee: position.fee / 10000,
    // TODO: for eth chain is "mainnet"
    url: `${POOL_URL_BASE}${Number(position.tokenId._hex)}?chain=${position.chain.toLocaleLowerCase()}`,
    range: getPriceRange(position),
    chain: position.chain,
    liquidity: Number(position.liquidity._hex),
    // uncollected fees
    tokens0: Number(position.tokensOwed0._hex),
    tokens1: Number(position.tokensOwed1._hex),
  }
}

const TICK_BASE = 1.0001

// TODO: move to shared?
const DECIMAL: Record<string, number> = {
  // Base
  // ETH
  '0x4200000000000000000000000000000000000006': 18,
  // USDC
  '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913': 6,

  // Arbitrum
  // ETH
  '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1': 18,
  // USDC
  '0xaf88d065e77c8cC2239327C5EDb3A432268e5831': 6,
}

// TODO: tests
export const getPriceRange = (position: RawPositionType): PriceRangeType => {
  const delta = Math.abs(DECIMAL[position.token0] - DECIMAL[position.token1])
  const deltaDecimals = Math.pow(10, delta)

  const lower = Math.pow(TICK_BASE, position.tickLower) * deltaDecimals
  const upper = Math.pow(TICK_BASE, position.tickUpper) * deltaDecimals

  return {
    lower: Math.round(lower),
    upper: Math.round(upper),
  }
}
