import type { PositionType, PriceRangeType, RawPositionType, SupportedChainsType, TokenPricesType, TokensPairType } from '../types'
import {getTokenDecimal, getTokenSymbol, getTokenFixed, getTokenPrice} from '../../../shared/utils'

// TODO: tests
export const getFormattedPosition = (position: RawPositionType, prices: TokenPricesType): PositionType => {
  const {token0: t0, token1: t1, chain, fee} = position

  const token0 = t0.toLowerCase()
  const token1 = t1.toLowerCase()

  return {
    token0,
    token1,
    symbol0: getTokenSymbol(chain, token0),
    symbol1: getTokenSymbol(chain, token1),
    fee: fee / 10000,
    url: getPoolURL(position),
    range: getPriceRange({...position, token0, token1}),
    chain,
    liquidity: getLiquidity({...position, token0, token1}, prices),
    uncollectedFees: getUncollectedFees(position),
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
  const decimal0 = getTokenDecimal(chain, token0)
  const decimal1 = getTokenDecimal(chain, token1)

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

export const getLiquidity = (position: RawPositionType, prices: TokenPricesType): TokensPairType => {
  const {chain, token0, token1, tickLower, tickUpper} = position

  const deltaDecimals = getTokensDecimalMultiplier({
    token0,
    token1,
    chain
  })

  const symbol0 = getTokenSymbol(chain, token0)
  const symbol1 = getTokenSymbol(chain, token1)

  const usdPrice = getTokenPrice(symbol0, symbol1, prices)
  const liquidity = Number(position.liquidity._hex)

  if (!usdPrice || !liquidity) {
    return undefined
  }

  const currentTick = Math.floor(Math.log(usdPrice / deltaDecimals) / Math.log(TICK_BASE))

  const sqrtLower = Math.pow(TICK_BASE, tickLower / 2)
  const sqrtUpper = Math.pow(TICK_BASE, tickUpper / 2)

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
    token0: Number(tokens0.toFixed(getTokenFixed(chain, token0))),
    token1: Number(tokens1.toFixed(getTokenFixed(chain, token1)))
  }
}

export const getUncollectedFees = (position: RawPositionType): TokensPairType => {
  const {chain, token0: t0, token1: t1, uncollectedFees} = position

  if (!uncollectedFees) {
    return undefined
  }

  const [amount0, amount1] = uncollectedFees

  const a0 = Number(amount0._hex)
  const a1 = Number(amount1._hex)

  if (a0 === 0 && a1 === 0) {
    return undefined
  }

  const token0 = t0.toLowerCase()
  const token1 = t1.toLowerCase()

  const tokens0 = a0 / Math.pow(10, getTokenDecimal(chain, token0))
  const tokens1 = a1 / Math.pow(10, getTokenDecimal(chain, token1))

  return {
    token0: Number(tokens0.toFixed(getTokenFixed(chain, token0))),
    token1: Number(tokens1.toFixed(getTokenFixed(chain, token1)))
  }
}
