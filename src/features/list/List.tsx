import React from 'react'

import { selectPositions } from '../../store/slices/positionsSlice'
import { useAppSelector } from '../../store/store'
import { SupportedChainsType } from '../../types'

import { Chain } from './components/Chain'
import { sortPositions } from './utils'

export const List = () => {
  const positions = useAppSelector(selectPositions)

  const sortedPositions = sortPositions(positions)
  const chains = Object.keys(sortedPositions)

  return (
    <section>
      <ul>
        {chains.map((chain: SupportedChainsType) => {
          return <Chain name={chain} pools={sortedPositions[chain]} key={chain} />
        })}
      </ul>
    </section>
  )
}
