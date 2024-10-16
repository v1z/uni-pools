import type { PositionType, PriceRangeType, SupportedChainsType } from '../../types'

export type HexValueType = {
  _isBigNumber: boolean
  _hex: string
}

export type RawPositionType = {
  tokenId: HexValueType
  nonce: HexValueType
  operator: string
  token0: string
  token1: string
  fee: number // 100 = 0.01%
  tickLower: number
  tickUpper: number
  liquidity: HexValueType
  feeGrowthInside0LastX128: HexValueType
  feeGrowthInside1LastX128: HexValueType
  tokensOwed0: HexValueType
  tokensOwed1: HexValueType
  chain: SupportedChainsType
}

export type { PositionType, PriceRangeType, SupportedChainsType }
