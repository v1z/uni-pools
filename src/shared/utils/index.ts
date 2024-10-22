import type { SupportedChainsType, TokenPricesType, SupportedTickersType, SupportedTockensType } from '../../types'

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

// TODO: tests
export const getTokenPrice = (token0: SupportedTockensType, token1: SupportedTockensType, prices: TokenPricesType): number | undefined => {
  const usdPrice0 = prices[TOKENS_MAP[token0]]
  const usdPrice1 = prices[TOKENS_MAP[token1]]

  return (usdPrice0 && usdPrice1) ? usdPrice0 / usdPrice1 : undefined
}
