import React, { useState } from 'react'
import cn from 'classnames'

import type { PoolType } from '../types'
import { getLiquidityText } from '../utils'

import { Item } from './Item'

import s from '../styles.css'
import ToggleIcon from '../icons/arrow-down.svg'

type PoolPropsType = {
  name: string
} & PoolType

export const Pool = (props: PoolPropsType) => {
  const { name, positions, liquidity } = props

  const [isOpened, setIsOpened] = useState(true)

  const handleToggle = () => setIsOpened(!isOpened)

  const symbol0 = positions[0].symbol0
  const symbol1 = positions[0].symbol1

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

        <span className={s.part}>{`LIQUIDITY: ${getLiquidityText({ symbol0, symbol1, liquidity })}`}</span>

        {/* <span className={s.part}>{`Fees: `}</span> */}
      </div>

      <ul
        className={cn(s.poolItemsList, {
          [s.poolItemsList_closed]: !isOpened,
        })}
      >
        {positions.map((position) => (
          <li key={position.url}>
            <Item {...position} />
          </li>
        ))}
      </ul>
    </>
  )
}
