import type { SupportedChainsType } from '../../types'

import { CONTRACTS } from './tokenContracts'

export const getTokenSymbol = (chain: SupportedChainsType, contract: string) => {
  console.log(chain, contract)
  const chainMap = CONTRACTS[chain]
  const entries = Object.entries(chainMap)

  return entries.filter((pair) => pair[1] === contract)[0][0]
}
