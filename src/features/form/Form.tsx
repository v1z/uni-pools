import React from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import cn from 'classnames'

import {
  positionsSettled,
  positionsRequestStageChanged,
  selectPositionsRequestStage,
} from '../../store/slices/positionsSlice'
import { selectPrices, selectPricesRequestStage } from '../../store/slices/pricesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

import { useRequestPositions } from './hooks/useRequestPositions'
import { getFormattedPosition } from './utils'

import s from './styles.css'

type Inputs = {
  userAddress: string
}

export const Form = () => {
  const positionsStatus = useAppSelector(selectPositionsRequestStage)
  const pricesStatus = useAppSelector(selectPricesRequestStage)

  const dispatch = useAppDispatch()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      // retrive the last user address from localStorage for better UX
      userAddress: localStorage.getItem('userAddress') || undefined,
    },
  })

  const prices = useAppSelector(selectPrices)

  const onSubmit: SubmitHandler<Inputs> = ({ userAddress }) => {
    // set form to loading styles
    dispatch(positionsRequestStageChanged('fetching'))

    // save the userAddress for later calls
    localStorage.setItem('userAddress', userAddress)

    useRequestPositions(userAddress)
      .then((rawPositions) => {
        const formattedPositions = rawPositions.map((pos) => getFormattedPosition(pos, prices))

        dispatch(positionsSettled(formattedPositions))
        dispatch(positionsRequestStageChanged('fullfiled'))
      })
      .catch(() => dispatch(positionsRequestStageChanged('failed')))
  }

  // block UI while positions are fetching or prices are not loaded once (on start)
  const isDisabled = positionsStatus === 'fetching' || pricesStatus === 'awaiting'

  return (
    <section className={s.root}>
      <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
        <h4 className={s.title}>WHY</h4>

        <p className={s.subtitle}>
          Because Uniswap UI&nbsp;sucks, DeBank lacks important data and&nbsp;Revert Finance just bad for&nbsp;your eyes
        </p>

        <div className={s.controlsWrapper}>
          <div className={s.inputWrapper}>
            <input
              type="text"
              placeholder="0xb1E87889b4bde8737c231810121Bc8a12A36C088"
              disabled={isDisabled}
              className={cn(s.input, {
                [s.input_disabled]: isDisabled,
                [s.input_hasError]: !!errors.userAddress,
              })}
              {...register('userAddress', { required: true, pattern: /^0x[\w\d]{40}$/ })}
            />

            {!!errors.userAddress && (
              <span className={s.inputError}>
                {errors.userAddress?.type === 'required' && 'Please fill in the address'}
                {errors.userAddress?.type === 'pattern' && 'Please use EVM-compatible address'}
              </span>
            )}
          </div>

          <button
            type="submit"
            disabled={isDisabled}
            className={cn(s.button, {
              [s.button_disabled]: isDisabled,
            })}
            tabIndex={0}
          >
            FIND
          </button>

          <span
            className={cn(s.inputStatus, {
              [s.inputStatus_visible]: isDisabled,
            })}
          >
            LOADING DATA...
          </span>
        </div>

        <h4 className={s.title}>Limitations</h4>
        <p className={s.subtitle}>At&nbsp;the moment you can check only the following tokens and chais:</p>
        <p className={s.subtitle}>Arbitrum - USDT / USDC / ETH / WBTC</p>
        {/* <p className={s.subtitle}>Base - USDT / ETH</p> */}
      </form>
    </section>
  )
}
