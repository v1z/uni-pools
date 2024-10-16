export type SupportedChainsType = 'Base' | 'Arbitrum'

export type SupportedTokensType = 'ETH' | 'USDC' | 'USDT' | 'WBTC'

export type PriceRangeType = {
  lower: number
  upper: number
}

export type PositionType = {
  token0: string
  token1: string
  fee: number
  // TODO: add allTimeFee
  url: string
  range: PriceRangeType
  chain: SupportedChainsType
  liquidity: number
  tokens0: number
  tokens1: number
}
