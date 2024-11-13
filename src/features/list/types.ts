import type {PositionType, TokensPairType, SupportedChainsType, PriceRangeType} from '../../types'

export type PoolType = {
  range: PriceRangeType | undefined
  liquidity: TokensPairType
  fees: TokensPairType
  positions: PositionType[]
}

export type SortedByPoolType = Record<string, PoolType>

export type SortedPositionsType = Record<SupportedChainsType, SortedByPoolType>

export type { SupportedChainsType, PositionType, TokensPairType, PriceRangeType }
