import type { SupportedChainsType, SupportedTokensType } from '../../types'

import { CONTRACTS } from './tokenContracts'

// TODO: tests
export const isTokenSupported = (chain: SupportedChainsType, contract: string): boolean => {
  const chainMap = CONTRACTS[chain]

  return Object.entries(chainMap).some(([_, data]) => data.contract === contract)
}

export const getTokenSymbol = (chain: SupportedChainsType, contract: string): SupportedTokensType => {
  const chainMap = CONTRACTS[chain]
  const entries = Object.entries(chainMap)

  return entries.find(([_, data]) => data.contract === contract)?.[0] as SupportedTokensType
}

// TODO: tests
export const getTokenDecimal = (chain: SupportedChainsType, contract: string): number => {
  const chainMap = CONTRACTS[chain]
  const entries = Object.entries(chainMap)

  return entries.find(([_, data]) => data.contract === contract)?.[1].decimals as number
}
