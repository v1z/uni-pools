import React, { useState } from 'react'
import cn from 'classnames'

import type { PoolType } from '../types'
import { getTokensToText } from '../utils'
import { getFormattedAmount } from '../../../shared/utils'

import { Item } from './Item'

import s from '../styles.css'
import ToggleIcon from '../icons/arrow-down.svg'

type PoolPropsType = {
  name: string
} & PoolType

export const Pool = (props: PoolPropsType) => {
  const { name, positions, fees, liquidity, range } = props

  const [isOpened, setIsOpened] = useState(!!liquidity && positions.length > 1)
  const [isEmptyOpened, setIsEmptyOpened] = useState(false)

  const handleTogglePool = () => setIsOpened(!isOpened)
  const handleToggleEmpty = () => setIsEmptyOpened(!isEmptyOpened)

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
        <button type="button" onClick={() => handleTogglePool()} className={s.actionControl}>
          {isOpened ? 'close' : 'open'}
          <ToggleIcon
            className={cn(s.actionIcon, {
              [s.actionIcon_reverse]: isOpened,
            })}
          />
        </button>

        <div className={s.content}>
          <span className={s.part}>
            {name}
            {range && (
              <>
                <div className={s.dot} />
                {getFormattedAmount(range.lower)}
                {' - '}
                {getFormattedAmount(range.upper)}
              </>
            )}
          </span>

          <span className={s.part}>
            {'Liquidity: '}
            {getTokensToText({ symbol0, symbol1, pair: liquidity })}
          </span>

          <span className={s.part}>
            {'Fees: '}
            {getTokensToText({ symbol0, symbol1, pair: fees })}
          </span>
        </div>
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

        {emptyPositions.length > 0 && (
          <li>
            {nonEmptyPositions.length > 0 && (
              <div className={s.emptyWrapper}>
                <button type="button" onClick={() => handleToggleEmpty()} className={s.actionControl}>
                  {isEmptyOpened ? 'close' : 'open'}
                  <ToggleIcon
                    className={cn(s.actionIcon, {
                      [s.actionIcon_reverse]: isEmptyOpened,
                    })}
                  />
                </button>

                <div className={s.content}>
                  <span className={s.part}>Positions without liquidity</span>
                </div>
              </div>
            )}

            <ul
              className={cn(s.poolItemsList, {
                [s.poolItemsList_closed]: nonEmptyPositions.length > 0 && !isEmptyOpened,
              })}
            >
              {emptyPositions.map((position) => (
                <li key={position.url}>
                  <Item {...position} />
                </li>
              ))}
            </ul>
          </li>
        )}
      </ul>
    </>
  )
}
