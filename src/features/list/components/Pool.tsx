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

  const { token0, token1, chain } = positions[0]

  const nonEmptyPositions = [] as PoolType['positions']
  const emptyPositions = [] as PoolType['positions']

  positions.map((pos) => {
    pos.liquidity ? nonEmptyPositions.push(pos) : emptyPositions.push(pos)
  })

  const liquidityText = getTokensToText({ token0, token1, chain, pair: liquidity })
  const feesText = getTokensToText({ token0, token1, chain, pair: fees })

  return (
    <>
      <div className={s.poolWrapper}>
        <div className={s.actionWrapper}>
          <button type="button" onClick={() => handleTogglePool()} className={s.actionControl} tabIndex={0}>
            {isOpened ? 'close' : 'open'}

            <ToggleIcon
              className={cn(s.actionIcon, {
                [s.actionIcon_reverse]: isOpened,
              })}
            />
          </button>
        </div>

        <div className={s.content}>
          <span className={s.part} style={{ width: '40%' }}>
            {name}
            {range && (
              <>
                <span>
                  {getFormattedAmount(range.lower)}
                  {' - '}
                  {getFormattedAmount(range.upper)}
                </span>
              </>
            )}
          </span>

          <span className={s.part} style={{ width: '30%' }}>
            {/* {'Liquidity: '} */}
            <span className={s.pairValue}>{liquidityText.part0}</span>
            <span className={s.pairValue}>{liquidityText.part1}</span>
          </span>

          <span className={s.part} style={{ width: '30%' }}>
            {/* {'Fees: '} */}
            <span className={s.pairValue}>{feesText.part0}</span>
            <span className={s.pairValue}>{feesText.part1}</span>
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
          <li className={s.emptyList}>
            <div className={s.position}>
              <div className={s.actionWrapper}>
                <button type="button" onClick={() => handleToggleEmpty()} className={s.actionControl} tabIndex={0}>
                  {isEmptyOpened ? 'close' : 'open'}

                  <ToggleIcon
                    className={cn(s.actionIcon, {
                      [s.actionIcon_reverse]: isEmptyOpened,
                    })}
                  />
                </button>
              </div>

              <div className={s.content}>
                <span className={s.part}>Ranges without liquidity</span>
              </div>
            </div>

            <ul
              className={cn(s.poolItemsList, {
                [s.poolItemsList_closed]: !isEmptyOpened,
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
