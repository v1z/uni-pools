import React from 'react'

import type { PositionType } from '../../../types'

import s from '../styles.css'

export const Item = (props: PositionType) => {
  const { url, range, liquidity, tokens0, tokens1 } = props

  return (
    <div className={s.position}>
      <a href={url} target="_blank" className={s.positionLink} rel="noreferrer">
        {url}
      </a>

      <div className={s.content}>
        <span>
          {range.lower}
          {' - '}
          {range.upper}
        </span>

        {liquidity !== 0 && (
          <>
            <div className={s.separator} />
            <span>
              liq:
              {liquidity}
            </span>
            <div className={s.separator} />
          </>
        )}

        {/* <span>{tokens0}</span>
        <div className={s.separator} />
        <span>{tokens1}</span> */}
      </div>
    </div>
  )
}
