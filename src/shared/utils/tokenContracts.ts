import type { SupportedChainsType, SupportedTockensType } from '../../types'


type TokenType = {
  [key in string]: {
    'symbol': SupportedTockensType
    'decimals': number
    'fixed': number
  }
}

export const CONTRACTS: Record<SupportedChainsType, TokenType> = {
  Arbitrum: {
    '0x82af49447d8a07e3bd95bd0d56f35241523fbab1': {
      symbol: 'ETH',
      decimals: 18,
      fixed: 4
    },
    '0xaf88d065e77c8cc2239327c5edb3a432268e5831': {
      symbol: 'USDC',
      decimals: 6,
      fixed: 2
    },
    '0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9': {
      symbol: 'USDT',
      decimals: 6,
      fixed: 2
    },
    '0x2f2a2543b76a4166549f7aab2e75bef0aefc5b0f': {
      symbol: 'WBTC',
      decimals: 8,
      fixed: 6
    }
  },
  Base: {
    '0x4200000000000000000000000000000000000006': {
      symbol: 'ETH',
      decimals: 18,
      fixed: 4
    },
    '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913': {
      symbol: 'USDC',
      decimals: 6,
      fixed: 2
    }
  },
}
