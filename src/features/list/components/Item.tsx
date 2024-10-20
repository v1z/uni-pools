import React from 'react'

import type { PositionType } from '../../../types'

import s from '../styles.css'
import LinkIcon from '../icons/link.svg'

export const Item = (props: PositionType) => {
  const { url, range, liquidity, tokens0, tokens1 } = props

  return (
    <div className={s.position}>
      <a href={url} target="_blank" className={s.actionControl} rel="noreferrer">
        {url}
        <LinkIcon className={s.actionIcon} />
      </a>

      <div className={s.content}>
        <span className={s.part}>
          {`Range: `}
          {range.lower}
          {' - '}
          {range.upper}
        </span>

        {liquidity !== 0 && (
          <span className={s.part}>
            {`Liquidity: `}
            {liquidity}
          </span>
        )}

        {/* {(tokens0 || tokens1) && (
          <span className={s.part}>
            {`Fees: `}
            {tokens0}
            {' - '}
            {tokens1}
          </span>
        )} */}
      </div>
    </div>
  )
}
