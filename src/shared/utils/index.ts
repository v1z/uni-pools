import type { SupportedChainsType } from '../../types'

import { CONTRACTS } from './tokenContracts'

// TODO: tests
export const isTokenSupported = (chain: SupportedChainsType, contract: string): boolean => {
  const chainMap = CONTRACTS[chain]

  return Object.keys(chainMap).some(tokenContract => tokenContract === contract)
}

export const getTokenSymbol = (chain: SupportedChainsType, contract: string): string => {
  const token = CONTRACTS[chain][contract]

  if (!token) {
    return ''
  }

  return token.symbol
}

// TODO: tests
export const getTokenDecimal = (chain: SupportedChainsType, contract: string): number => {
  const token = CONTRACTS[chain][contract]

  if (!token) {
    return 0
  }

  return token.decimals
}

export const getFormattedPrice = (price: number): string => {
  let count = 1;

  return price.toString().split('').reduceRight((acc, char) => {
    if (count === 3) {
      count = 1;

      return `${char},${acc}`
    }

    count++;

    return `${char}${acc}`
  })
}
