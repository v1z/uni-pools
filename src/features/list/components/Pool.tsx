import React, { useState } from 'react'
import cn from 'classnames'

import type { PositionType } from '../../../types'

import { Item } from './Item'

import s from '../styles.css'
import ToggleIcon from '../icons/arrow-down.svg'

type PoolPropsType = {
  name: string
  positions: PositionType[]
}

export const Pool = (props: PoolPropsType) => {
  const { name, positions } = props

  const [isOpened, setIsOpened] = useState(true)

  const handleToggle = () => setIsOpened(!isOpened)

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

        <span className={s.part}>{`Liqudity: `}</span>

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
