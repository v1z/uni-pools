import type { SupportedChainsType, TokenPricesType, SupportedTickersType, SupportedTockensType, TokensPairType, PositionType } from '../../types'

import { CONTRACTS } from './tokenContracts'

// TODO: tests
export const isTokenSupported = (chain: SupportedChainsType, contract: string): boolean => {
  const chainMap = CONTRACTS[chain]

  return Object.keys(chainMap).some(tokenContract => tokenContract === contract)
}

export const getTokenSymbol = (chain: SupportedChainsType, contract: string): SupportedTockensType => {
  return CONTRACTS[chain][contract].symbol
}

// TODO: tests
export const getTokenDecimal = (chain: SupportedChainsType, contract: string): number => {
  return CONTRACTS[chain][contract].decimals
}

// TODO: tests
export const getTokenFixed = (chain: SupportedChainsType, contract: string): number => {
  return CONTRACTS[chain][contract].fixed
}

export const getFormattedAmount = (amount: number | string): string => {
  let count = 1;

  const parts = amount.toString().split('.')

  const formatted = parts[0].toString().split('').reduceRight((acc, char) => {
    if (count === 3) {
      count = 1;

      return `${char},${acc}`
    }

    count++;

    return `${char}${acc}`
  })

  return `${formatted}${parts[1] ? `.${parts[1]}` : ''}`
}

const TOKENS_MAP: Record<SupportedTockensType, SupportedTickersType> = {
  'ETH': 'ETH',
  'WETH': 'ETH',
  'WBTC': 'BTC',
  'USDT': 'USD',
  'USDC': 'USD'
}

export const getTokenUSDValue = (token: SupportedTockensType, prices: TokenPricesType): number => {
  return prices[TOKENS_MAP[token]] || 0
}

// TODO: tests
export const getTokenPrice = (token0: SupportedTockensType, token1: SupportedTockensType, prices: TokenPricesType): number | undefined => {
  const usdPrice0 = prices[TOKENS_MAP[token0]]
  const usdPrice1 = prices[TOKENS_MAP[token1]]

  return (usdPrice0 && usdPrice1) ? usdPrice0 / usdPrice1 : undefined
}

// TODO: tests
export const addPairs = (pairCurr: TokensPairType, pairNew: TokensPairType): TokensPairType => {
  if (!pairCurr && !pairNew) return undefined

  if (!pairCurr) return pairNew

  if (!pairNew) return pairCurr

  return {
    token0: pairCurr.token0 + pairNew.token0,
    token1: pairCurr.token1 + pairNew.token1,
  }
}

export const getAPR = ({chain, token0, token1, prices, liquidity, fees}: {
  chain: PositionType['chain']
  token0: PositionType['token0']
  token1: PositionType['token1']
  prices: TokenPricesType
  liquidity: TokensPairType
  fees: TokensPairType
}): PositionType['apr'] => {
  if (!liquidity || !fees) {
    return undefined
  }

  const symbol0 = getTokenSymbol(chain, token0)
  const symbol1 = getTokenSymbol(chain, token1)

  const usdPrice0 = getTokenUSDValue(symbol0, prices)
  const usdPrice1 = getTokenUSDValue(symbol1, prices)

  const liquidityUSDValue = liquidity.token0 * usdPrice0 + liquidity.token1 * usdPrice1
  const feesUSDValue = fees.token0 * usdPrice0 + fees.token1 * usdPrice1

  return feesUSDValue / liquidityUSDValue * 100
}
