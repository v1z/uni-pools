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


// TODO: tests
export const getTokenFixed = (chain: SupportedChainsType, contract: string): number => {
  const token = CONTRACTS[chain][contract]

  if (!token) {
    return 0
  }

  return token.fixed
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
