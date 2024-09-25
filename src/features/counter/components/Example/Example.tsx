import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import cn from 'classnames'

import type { RootState } from '../../../../store'
import { counterIncremented } from '../../counterSlice'

import s from './Example.css'

type Props = {
  className?: string
  incBy?: number
}

export const Example: React.FC<Props> = ({ className, incBy = 1 }) => {
  const stateValue = useSelector((state: RootState) => state.counter.value)
  const dispatchAction = useDispatch()

  const handleClick = () => dispatchAction(counterIncremented(incBy))

  return (
    <button
      className={cn(s.root, className)}
      type='button'
      onClick={handleClick}
    >
      {`state value is: ${stateValue}`}
    </button>
  )
}
