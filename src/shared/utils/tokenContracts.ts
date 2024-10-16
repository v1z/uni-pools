import type { SupportedChainsType, SupportedTokensType } from '../../types'

type TokenType = {
  [key in SupportedTokensType]: {
    'contract': string
    'decimals': number
  }
}

export const CONTRACTS: Record<SupportedChainsType, Partial<TokenType>> = {
  Arbitrum: {
    'ETH': {
      contract: '0x82af49447d8a07e3bd95bd0d56f35241523fbab1',
      decimals: 18,
    },
    USDC: {
      contract: '0xaf88d065e77c8cc2239327c5edb3a432268e5831',
      decimals: 6,
    },
    USDT: {
      contract: '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9',
      decimals: 6,
    },
    WBTC: {
      contract: '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f',
      decimals: 8
    }
  },
  Base: {
    ETH: {
      contract: '0x4200000000000000000000000000000000000006',
      decimals: 18,
    },
    USDC: {
      contract: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
      decimals: 6,
    }
  },
}
