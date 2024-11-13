import React from 'react'
import cn from 'classnames'

import type { PositionType } from '../../../types'
import { getFormattedAmount } from '../../../shared/utils'
import { getTokensToText, getFormattedAPR } from '../utils'
import { COLUMN_WIDTH } from './index'

import s from '../styles.css'
import LinkIcon from '../icons/link.svg'

export const Item = (props: PositionType) => {
  const { url, range, liquidity, fees, token0, token1, chain, apr } = props

  const liquidityText = getTokensToText({ token0, token1, chain, pair: liquidity })
  const feesText = getTokensToText({ token0, token1, chain, pair: fees })

  return (
    <div
      className={cn(s.position, {
        [s.position_empty]: !liquidity,
        [s.position_active]: liquidity?.token0 && liquidity.token1,
      })}
    >
      <div className={s.actionWrapper} />

      <div className={s.content}>
        <a href={url} target="_blank" className={s.part} style={{ width: COLUMN_WIDTH['range'] }}>
          {getFormattedAmount(range.lower)}
          {' - '}
          {getFormattedAmount(range.upper)}

          {/* <LinkIcon className={s.rangeIcon} /> */}
        </a>

        {!!liquidity && (
          <>
            <div className={s.part} style={{ width: COLUMN_WIDTH['tvl'] }}>
              <span>{liquidityText.part0}</span>
              <span>{liquidityText.part1}</span>
            </div>

            <div className={s.part} style={{ width: COLUMN_WIDTH['fees'] }}>
              <span>{feesText.part0}</span>
              <span>{feesText.part1}</span>
            </div>

            <div className={s.part} style={{ width: COLUMN_WIDTH['apr'] }}>
              <span>{getFormattedAPR(apr)}</span>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
