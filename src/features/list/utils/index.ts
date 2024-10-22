import { getTokenSymbol, isTokenSupported, getFormattedAmount } from '../../../shared/utils'
import type { PositionType, SupportedChainsType } from '../../../types'

export type SortedByPoolType = Record<string, PositionType[]>

// TODO: tests
export const filterBySupportedTokens = (positions: PositionType[]): PositionType[] => {
  return positions.filter(item => {
    const {chain, token0, token1} = item

    return isTokenSupported(chain, token0) && isTokenSupported(chain, token1)
  })
}

export const sortByPool = (positions: PositionType[]): SortedByPoolType => {
  return positions.reduce((acc, item) => {
    const { chain, token0, token1, fee } = item

    const symbol0 = getTokenSymbol(chain, token0)
    const symbol1 = getTokenSymbol(chain, token1)

    const poolName = `${symbol0} / ${symbol1} - ${fee}%`
    const poolItems = acc[poolName] || []

    return { ...acc, [poolName]: [...poolItems, item] }
  }, {} as SortedByPoolType)
}

// TODO: tests
export const sortByRange = (positions: PositionType[]): PositionType[] => {
  return positions.slice(0).sort((a, b) => {
    return b.range.lower - a.range.lower
  })
}

type SortedByChainPositionsType = Record<SupportedChainsType, PositionType[]>

// TODO: tests
export const sortByChain = (positions: PositionType[]): SortedByChainPositionsType => {
  return positions.reduce((acc, item) => {
    const chain = item.chain
    const currItems = acc[chain] || []

    return { ...acc, [chain]: [...currItems, item] }
  }, {} as SortedByChainPositionsType)
}

export type SortedPositionsType = Record<SupportedChainsType, SortedByPoolType>

export const sortPositions = (positions: PositionType[]): SortedPositionsType => {
  const filteredPositions = filterBySupportedTokens(positions)

  const sortedByRange = sortByRange(filteredPositions)
  const sortedByChain = sortByChain(sortedByRange)

  const chains = Object.keys(sortedByChain) as SupportedChainsType[]

  return chains.reduce((acc, chain) => {
    const sortedByPool = sortByPool(sortedByChain[chain])

    return { ...acc, [chain]: sortedByPool }
  }, {} as SortedPositionsType)
}

// TODO: test
export const getLiquidityText = (position: PositionType): string => {
  const {symbol0, symbol1, liquidity} = position

  if (!liquidity) {
    return ''
  }

  const {token0, token1} = liquidity

  return `${getFormattedAmount(token0)} ${symbol0} / ${getFormattedAmount(token1)} ${symbol1}`
}
