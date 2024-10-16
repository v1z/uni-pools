import React from 'react'

import type { PositionType } from '../../../types'

import { Item } from './Item'

import s from '../styles.css'

type PoolPropsType = {
  name: string
  positions: PositionType[]
}

export const Pool = (props: PoolPropsType) => {
  const { name, positions } = props

  return (
    <>
      <h5 className={s.poolTitle}>{name}</h5>

      <ul>
        {positions.map((position) => (
          <li key={position.url}>
            <Item {...position} />
          </li>
        ))}
      </ul>
    </>
  )
}
