import { getTokenSymbol, isTokenSupported, getFormattedAmount, addPairs } from '../../../shared/utils'
import type { PositionType, SortedPositionsType, SortedByPoolType, SupportedChainsType, TokensPairType, PoolType } from '../types'

// TODO: tests
export const filterBySupportedTokens = (positions: PositionType[]): PositionType[] => {
  return positions.filter(item => {
    const {chain, token0, token1} = item

    return isTokenSupported(chain, token0) && isTokenSupported(chain, token1)
  })
}

export const sortByPool = (positions: PositionType[]): SortedByPoolType => {
  return positions.reduce((acc, item) => {
    const { chain, token0, token1, fee, liquidity, uncollectedFees } = item

    const symbol0 = getTokenSymbol(chain, token0)
    const symbol1 = getTokenSymbol(chain, token1)

    const poolName = `${symbol0} / ${symbol1} ${fee}%`

    const currentItems: PoolType['positions'] = acc[poolName]
      ? acc[poolName]['positions']
      : []

    const positions = [...currentItems, item]

    const currentLiquidity: PoolType['liquidity'] = acc[poolName]
      ? acc[poolName]['liquidity']
      : undefined

    const poolLiquidity = addPairs(currentLiquidity, liquidity)

    const currentFees: PoolType['fees'] = acc[poolName]
      ? acc[poolName]['fees']
      : undefined

    const poolFees = addPairs(currentFees, uncollectedFees)

    const currentRange: PoolType['range'] = acc[poolName]
      ? acc[poolName]['range']
      : undefined

    const poolRange = getPoolRange(
      currentRange,
      item.liquidity ? item.range : undefined
    )

    return { ...acc, [poolName]: {liquidity: poolLiquidity, fees: poolFees, range: poolRange, positions} }
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
export const getTokensToText = ({symbol0, symbol1, pair}: {symbol0: PositionType['symbol0'], symbol1: PositionType['symbol1'], pair: TokensPairType}): string => {
  if (!pair) {
    return '-- / --'
  }

  const {token0, token1} = pair

  const part0 = token0 ? `${getFormattedAmount(token0)} ${symbol0}` : ''
  const part1 = token1 ? `${getFormattedAmount(token1)} ${symbol1}` : ''
  const hasBoth = !!part0 && !!part1

  return `${part0}${hasBoth ? ' / ' : ''}${part1}`
}

// TODO: tests
export const getPoolRange = (range0: PoolType['range'], range1: PoolType['range']): PoolType['range'] => {
  if (!range0 && !range1) return undefined

  if (!range0) return range1

  if (!range1) return range0

  return {
    lower: Math.min(range0.lower, range1.lower),
    upper: Math.max(range0.upper, range1.upper)
  }
}
