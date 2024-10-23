import React, { useState } from 'react'
import cn from 'classnames'

import type { PoolType } from '../types'
import { getTokensToText } from '../utils'

import { Item } from './Item'

import s from '../styles.css'
import ToggleIcon from '../icons/arrow-down.svg'

type PoolPropsType = {
  name: string
} & PoolType

export const Pool = (props: PoolPropsType) => {
  const { name, positions, fees } = props

  const [isOpened, setIsOpened] = useState(true)

  const handleToggle = () => setIsOpened(!isOpened)

  const symbol0 = positions[0].symbol0
  const symbol1 = positions[0].symbol1

  const nonEmptyPositions = [] as PoolType['positions']
  const emptyPositions = [] as PoolType['positions']

  positions.map((pos) => {
    pos.liquidity ? nonEmptyPositions.push(pos) : emptyPositions.push(pos)
  })

  return (
    <>
      <div className={s.poolWrapper}>
        <button type="button" onClick={() => handleToggle()} className={s.actionControl}>
          {isOpened ? 'close' : 'open'}
          <ToggleIcon
            className={cn(s.actionIcon, {
              [s.actionIcon_reverse]: isOpened,
            })}
          />
        </button>

        <span className={s.part}>{name}</span>

        {/* {liquidity && (
          <span className={s.part}>{`Liquidity: ${getTokensToText({ symbol0, symbol1, pair: liquidity })}`}</span>
        )} */}

        {fees && <span className={s.part}>{`Fees: ${getTokensToText({ symbol0, symbol1, pair: fees })}`}</span>}
      </div>

      <ul
        className={cn(s.poolItemsList, {
          [s.poolItemsList_closed]: !isOpened,
        })}
      >
        {nonEmptyPositions.map((position) => (
          <li key={position.url}>
            <Item {...position} />
          </li>
        ))}

        {emptyPositions.map((position) => (
          <li key={position.url}>
            <Item {...position} />
          </li>
        ))}
      </ul>
    </>
  )
}
