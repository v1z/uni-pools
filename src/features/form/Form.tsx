import React, { useEffect, useState } from 'react'
import cn from 'classnames'

import {
  positionsSettled,
  positionsRequestStageChanged,
  selectPositionsRequestStage,
} from '../../store/slices/positionsSlice'
import { selectPrices } from '../../store/slices/pricesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

import { useRequestPositions } from './hooks/useRequestPositions'
import { getFormattedPosition } from './utils'

import s from './styles.css'

export const Form = () => {
  const [userAddress, setUserAddress] = useState<string>('')
  const status = useAppSelector(selectPositionsRequestStage)

  const dispatch = useAppDispatch()

  const handleRequestClick = () => dispatch(positionsRequestStageChanged('fetching'))
  const handleRequestError = () => dispatch(positionsRequestStageChanged('failed'))
  const handleRequestFullfil = () => dispatch(positionsRequestStageChanged('fullfiled'))

  // retrive the last user address from localStorage for better UX
  useEffect(() => {
    const savedAddress = localStorage.getItem('userAddress')

    !!savedAddress && setUserAddress(savedAddress)
  }, [])

  const prices = useAppSelector(selectPrices)

  // TODO: add validation by regex
  const handleSubmit = () => {
    // set form to loading styles
    handleRequestClick()

    // save the userAddress for later calls
    localStorage.setItem('userAddress', userAddress)

    useRequestPositions(userAddress)
      .then((rawPositions) => {
        const formattedPositions = rawPositions.map((pos) => getFormattedPosition(pos, prices))

        dispatch(positionsSettled(formattedPositions))

        handleRequestFullfil()
      })
      .catch(() => handleRequestError())
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => setUserAddress(e.target.value)

  const isLoading = status === 'fetching'

  return (
    <section className={s.root}>
      <form className={s.form}>
        <h4 className={s.title}>WHY</h4>

        <p className={s.subtitle}>
          Because Uniswap UI&nbsp;sucks, DeBank lacks important data and&nbsp;Revert Finance just bad for&nbsp;your eyes
        </p>

        <div className={s.controlsWrapper}>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder="0x0000000000000000000000000000000000000000"
              onChange={handleInputChange}
              value={userAddress}
              disabled={isLoading}
              className={cn(s.input, {
                [s.input_disabled]: isLoading,
              })}
            />
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className={cn(s.button, {
              [s.button_disabled]: isLoading,
            })}
            tabIndex={0}
          >
            FIND
          </button>

          <span
            className={cn(s.inputStatus, {
              [s.inputStatus_visible]: isLoading,
            })}
          >
            LOADING DATA...
          </span>
        </div>

        <h4 className={s.title}>Limitations</h4>
        <p className={s.subtitle}>At&nbsp;the moment you can check only the following tokens and chais:</p>
        <p className={s.subtitle}>Arbitrum - USDT / USDC / ETH / WBTC</p>
        <p className={s.subtitle}>Base - USDT / ETH</p>
      </form>
    </section>
  )
}
