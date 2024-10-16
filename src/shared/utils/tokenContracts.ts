import type { SupportedChainsType, SupportedTokensType } from '../../types'

export const CONTRACTS: Record<SupportedChainsType, Record<SupportedTokensType, string>> = {
  Arbitrum: {
    ETH: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    USDC: '0xaf88d065e77c8cC2239327C5EDb3A432268e5831',
    USDT: '0xFd086bC7CD5C481DCC9C85ebE478A1C0b69FCbb9',
  },
  Base: {
    ETH: '0x4200000000000000000000000000000000000006',
    USDC: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
    USDT: '',
  },
}
