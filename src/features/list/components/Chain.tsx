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

  const poolNames = Object.keys(pools)

  return (
    <li className={s.chainItem}>
      <h4 className={s.chainTitle}>{name}</h4>

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
