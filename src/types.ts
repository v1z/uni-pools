export type SupportedChainsType = 'Base' | 'Arbitrum' // | 'Avalanche'

export type SupportedTickersType = 'USD' | 'ETH' | 'BTC' // | 'AVAX'

export type SupportedTockensType = 'WBTC' | 'ETH' | 'WETH' | 'USDC' | 'USDT'

export type TokenPricesType = {
  [key in SupportedTickersType]: undefined | number
}

export type PriceRangeType = {
  lower: number
  upper: number
}

export type LiquidityType = undefined | {
  token0: number
  token1: number
}

export type PositionType = {
  token0: string // lowerCase
  token1: string // lowerCase

  symbol0: SupportedTockensType
  symbol1: SupportedTockensType

  fee: number

  url: string

  range: PriceRangeType
  liquidity: LiquidityType

  chain: SupportedChainsType
}
