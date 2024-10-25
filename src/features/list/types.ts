import type {PositionType, TokensPairType, SupportedChainsType, PriceRangeType} from '../../types'

export type PoolType = {
  liquidity: TokensPairType
  fees: TokensPairType
  range: PriceRangeType | undefined
  positions: PositionType[]
}

export type SortedByPoolType = Record<string, PoolType>

export type SortedPositionsType = Record<SupportedChainsType, SortedByPoolType>

export type { SupportedChainsType, PositionType, TokensPairType, PriceRangeType }
