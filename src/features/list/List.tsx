import React from 'react'

import { selectPositions } from '../../store/slices/positionsSlice'
import { useAppSelector } from '../../store/store'
import { SupportedChainsType } from '../../types'

import { Chain } from './components/Chain'
import { sortPositions } from './utils'

import s from './styles.css'

export const List = () => {
  const positions = useAppSelector(selectPositions)

  if (positions.length === 0) return null

  const sortedPositions = sortPositions(positions)
  const chains = Object.keys(sortedPositions)

  return (
    <section className={s.root}>
      <ul>
        {chains.map((chain: SupportedChainsType) => {
          return <Chain name={chain} pools={sortedPositions[chain]} key={chain} />
        })}
      </ul>
    </section>
  )
}
