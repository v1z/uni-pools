import type {PositionType, LiquidityType, SupportedChainsType} from '../../types'

export type PoolType = {
  liquidity: LiquidityType
  positions: PositionType[]
}

export type SortedByPoolType = Record<string, PoolType>

export type SortedPositionsType = Record<SupportedChainsType, SortedByPoolType>

export type { SupportedChainsType, PositionType }
