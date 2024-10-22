export type SupportedChainsType = 'Base' | 'Arbitrum'

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

  symbol0: string // upperCase
  symbol1: string // upperCase

  fee: number

  url: string

  range: PriceRangeType
  liquidity: LiquidityType

  chain: SupportedChainsType
}
