import type { PositionType, PriceRangeType, RawPositionType } from '../types'
import {getTokenDecimal} from '../../../shared/utils'

const POOL_URL_BASE = 'https://app.uniswap.org/pools/'

// TODO: tests
export const getFormattedPosition = (position: RawPositionType): PositionType => {
  return {
    token0: position.token0.toLowerCase(),
    token1: position.token1.toLowerCase(),
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

// TODO: tests
export const getPriceRange = (position: RawPositionType): PriceRangeType => {
  const {chain, token0, token1} = position

  const decimal0 = getTokenDecimal(chain, token0.toLowerCase())
  const decimal1 = getTokenDecimal(chain, token1.toLowerCase())

  const delta = Math.abs(decimal0 - decimal1)
  const deltaDecimals = Math.pow(10, delta)

  const lower = Math.pow(TICK_BASE, position.tickLower) * deltaDecimals
  const upper = Math.pow(TICK_BASE, position.tickUpper) * deltaDecimals

  return {
    lower: Math.round(lower),
    upper: Math.round(upper),
  }
}
