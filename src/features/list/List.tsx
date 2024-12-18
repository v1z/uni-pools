import React from 'react'

import { selectPositions, selectPositionsRequestStage } from '../../store/slices/positionsSlice'
import { useAppSelector } from '../../store/store'
import { SupportedChainsType } from '../../types'

import { Chain, Skeletons } from './components'
import { sortPositions } from './utils'

import s from './styles.css'

export const List = () => {
  const positions = useAppSelector(selectPositions)
  const requestStatus = useAppSelector(selectPositionsRequestStage)

  if (requestStatus === 'awaiting') return null

  if (requestStatus === 'fetching') {
    return <Skeletons />
  }

  if (requestStatus === 'failed') {
    return (
      <section className={s.root}>
        <h3 className={s.failedTitle}>Oops! Something gone wrong, please try again</h3>
      </section>
    )
  }

  if (!positions) return null

  if (positions.length === 0) {
    return (
      <section className={s.root}>
        <h3 className={s.failedTitle}>
          There are no&nbsp;positions on&nbsp;supported chains with supported tokens for the provided wallet address
        </h3>
      </section>
    )
  }

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
