import type { PositionType, PriceRangeType, RawPositionType, SupportedChainsType, LiquidityType } from '../types'
import {getTokenDecimal, getTokenSymbol} from '../../../shared/utils'

// TODO: tests
export const getFormattedPosition = (position: RawPositionType, prices): PositionType => {
  const {token0, token1, chain, fee} = position

  return {
    token0: token0.toLowerCase(),
    token1: token1.toLowerCase(),
    symbol0: getTokenSymbol(chain, token0.toLowerCase()),
    symbol1: getTokenSymbol(chain, token1.toLowerCase()),
    fee: fee / 10000,
    url: getPoolURL(position),
    range: getPriceRange(position),
    chain,
    liquidity: getLiquidity(position, prices),
    // uncollected fees
    // tokens0: Number(position.tokensOwed0._hex),
    // tokens1: Number(position.tokensOwed1._hex),
  }
}

const TICK_BASE = 1.0001

// TODO: tests
const getTokensDecimalMultiplier = ({
  token0,
  token1,
  chain
}: {
  token0: RawPositionType['token0']
  token1: RawPositionType['token1']
  chain: RawPositionType['chain']
}): number => {
  const decimal0 = getTokenDecimal(chain, token0.toLowerCase())
  const decimal1 = getTokenDecimal(chain, token1.toLowerCase())

  const delta = Math.abs(decimal0 - decimal1)

  return Math.pow(10, delta)
}

// TODO: tests
export const getPriceRange = (position: RawPositionType): PriceRangeType => {
  const {chain, token0, token1} = position

  const deltaDecimals = getTokensDecimalMultiplier({
    token0,
    token1,
    chain,
  })

  const lower = Math.pow(TICK_BASE, position.tickLower) * deltaDecimals
  const upper = Math.pow(TICK_BASE, position.tickUpper) * deltaDecimals

  return {
    lower: Math.round(lower),
    upper: Math.round(upper),
  }
}

const POOL_URL_BASE = 'https://app.uniswap.org/pools/'

const CHAIN_URL_MAP: Record<SupportedChainsType, string> = {
  'Arbitrum': 'arbitrum',
  'Base': 'base',
  // 'Ethereum': 'mainnet'
}

// TODO: tests
export const getPoolURL = (position: RawPositionType): string => {
  const chain = CHAIN_URL_MAP[position.chain]

  return `${POOL_URL_BASE}${Number(position.tokenId._hex)}?chain=${chain}`
}

export const getLiquidity = (position: RawPositionType, prices): LiquidityType => {
  const {chain, token0, token1} = position

  const deltaDecimals = getTokensDecimalMultiplier({
    token0,
    token1,
    chain
  })

  const symbol0 = getTokenSymbol(chain, token0.toLowerCase())
  const symbol1 = getTokenSymbol(chain, token1.toLowerCase())

  // TODO
  const usdPrice = prices[symbol0] || prices[symbol1]

  const currentTick = Math.log(usdPrice / deltaDecimals) / Math.log(TICK_BASE)

  const liquidity = Number(position.liquidity._hex)

  if (!liquidity) {
    return undefined
  }

  const sqrtLower = Math.pow(TICK_BASE, position.tickLower / 2)
  const sqrtUpper = Math.pow(TICK_BASE, position.tickUpper / 2)

  const sqrtCurrent = Math.pow(TICK_BASE, currentTick / 2)

  let amount0
  let amount1

  // TODO: tests
  if ((sqrtCurrent >= sqrtLower) && (sqrtCurrent <= sqrtUpper)) {
    amount0 = liquidity * (sqrtUpper - sqrtCurrent) / (sqrtUpper * sqrtCurrent)
    amount1 = liquidity * (sqrtCurrent - sqrtLower)
  } else if (sqrtCurrent < sqrtLower) {
    amount0 = liquidity * (sqrtUpper - sqrtLower) / (sqrtUpper * sqrtLower)
    amount1 = 0
  } else {
    amount0 = 0
    amount1 = liquidity * (sqrtUpper - sqrtLower)
  }

  const tokens0 = amount0 / Math.pow(10, getTokenDecimal(chain, token0.toLowerCase()))
  const tokens1 = amount1 / Math.pow(10, getTokenDecimal(chain, token1.toLowerCase()))

  return {
    token0: tokens0,
    token1: tokens1
  }
}
