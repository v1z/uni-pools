import type {PositionType, TokensPairType, SupportedChainsType} from '../../types'

export type PoolType = {
  liquidity: TokensPairType
  fees: TokensPairType
  positions: PositionType[]
}

export type SortedByPoolType = Record<string, PoolType>

export type SortedPositionsType = Record<SupportedChainsType, SortedByPoolType>

export type { SupportedChainsType, PositionType, TokensPairType }
