import React from 'react'
import cn from 'classnames'

import type { PositionType } from '../../../types'
import { getFormattedAmount } from '../../../shared/utils'
import { getTokensToText } from '../utils'

import s from '../styles.css'
import LinkIcon from '../icons/link.svg'

export const Item = (props: PositionType) => {
  const { url, range, liquidity, uncollectedFees, token0, token1, chain } = props

  return (
    <div
      className={cn(s.position, {
        [s.position_empty]: !liquidity,
        [s.position_active]: liquidity?.token0 && liquidity.token1,
      })}
    >
      <a href={url} target="_blank" className={s.actionControl} rel="noreferrer">
        {url}
        <LinkIcon className={s.actionIcon} />
      </a>

      <div className={s.content}>
        <span className={s.part}>
          {getFormattedAmount(range.lower)}
          {' - '}
          {getFormattedAmount(range.upper)}
        </span>

        <span className={s.part}>{`${getTokensToText({ token0, token1, chain, pair: liquidity })}`}</span>

        <span className={s.part}>{`${getTokensToText({
          token0,
          token1,
          chain,
          pair: uncollectedFees,
        })}`}</span>
      </div>
    </div>
  )
}
