import React from 'react'

import { SupportedChainsType } from '../../../types'
import type { SortedByPoolType } from '../types'

import { Pool } from './Pool'

import s from '../styles.css'

type ChainPropsType = {
  name: SupportedChainsType
  pools: SortedByPoolType
}

export const Chain = (props: ChainPropsType) => {
  const { name, pools } = props

  // TODO: add sorting py liquidity USD value
  // TODO: make it prettier
  // empty pools go last
  const poolNames = Object.keys(pools).sort((a, b) => {
    const liqA = pools[a].liquidity
    const liqB = pools[b].liquidity

    if (liqA === undefined) return 1

    if (liqB === undefined) return -1

    return 1
  })

  return (
    <li className={s.chainItem}>
      <h4 className={s.chainTitle}>{name}</h4>

      <div className={s.chainInfoRow}>
        {/* TODO */}
        <span className={s.chainLogo} />

        <div className={s.chainHeaders}>
          <span className={s.chainPart} style={{ width: '40%' }}>
            Pool / Range
          </span>
          <span className={s.chainPart} style={{ width: '30%' }}>
            TVL
          </span>
          <span className={s.chainPart} style={{ width: '30%' }}>
            Fees
          </span>
        </div>
      </div>

      <ul>
        {poolNames.map((poolName) => {
          const pool = pools[poolName]

          return (
            <li key={poolName} className={s.pool}>
              <Pool name={poolName} {...pool} />
            </li>
          )
        })}
      </ul>
    </li>
  )
}
