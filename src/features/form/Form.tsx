import React, { useState } from 'react'
import cn from 'classnames'

import { positionsSettled } from '../../store/slices/positionsSlice'
import { selectPrices } from '../../store/slices/pricesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

import { useRequestPositions } from './hooks/useRequestPositions'
import { getFormattedPosition } from './utils'

import s from './styles.css'

export type StatusType = 'awaiting' | 'requesting' | 'error' | 'fullfiled'

export const Form = () => {
  const [userAddress, setUserAddress] = useState<string>('')
  const [status, setStatus] = useState<StatusType>('awaiting')

  const handleRequestClick = () => setStatus('requesting')
  const handleRequestError = () => setStatus('error')
  const handleRequestFullfil = () => setStatus('fullfiled')

  const dispatch = useAppDispatch()

  const prices = useAppSelector(selectPrices)

  // TODO: add validation by regex
  const handleSubmit = () => {
    handleRequestClick()

    useRequestPositions(userAddress)
      .then((rawPositions) => {
        const formattedPositions = rawPositions.map((pos) => getFormattedPosition(pos, prices))

        dispatch(positionsSettled(formattedPositions))

        handleRequestFullfil()
      })
      .catch(() => handleRequestError())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserAddress(e.target.value)

  const isLoading = status === 'requesting'

  return (
    <section className={s.root}>
      <form className={s.form}>
        <h4 className={s.title}>WHY</h4>

        <p className={s.subtitle}>
          Because Uniswap UI&nbsp;sucks, DeBank lacks important data and&nbsp;Revert Finance just bad for&nbsp;your eyes
        </p>

        <div className={s.inputWrapper}>
          <input
            type="text"
            placeholder="0x72040636d39713133b201957E0Fe9A801C056F00"
            onChange={handleInputChange}
            disabled={isLoading}
            className={cn(s.input, {
              [s.input_disabled]: isLoading,
            })}
          />

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={cn(s.button, {
              [s.button_disabled]: isLoading,
            })}
          >
            FIND
          </button>
        </div>

        <h4 className={s.title}>Limitations</h4>
        <p className={s.subtitle}>At&nbsp;the moment you can check only the following tokens and chais:</p>
        <p className={s.subtitle}>Arbitrum - USDT / USDC / ETH / WBTC</p>
        <p className={s.subtitle}>Base - USDT / ETH</p>
      </form>
    </section>
  )
}
