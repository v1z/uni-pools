import React, { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

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
        <h4 className={s.title}>WHY?</h4>

        <p className={s.subtitle}>
          Because default Uniswap UX&nbsp;sucks and DeBank doesn&rsquo;t show the range of&nbsp;the positions
        </p>

        <div className={s.inputWrapper}>
          <TextField
            label="Address"
            variant="outlined"
            size="small"
            onChange={handleInputChange}
            sx={{
              marginRight: '16px',
              flexGrow: 1,
              width: '100%',
              maxWidth: '440px',
            }}
            disabled={isLoading}
          />

          <Button
            variant="contained"
            type="button"
            size="medium"
            onClick={handleSubmit}
            sx={{
              width: '100px',
            }}
            disabled={isLoading}
          >
            Find
          </Button>
        </div>

        <h4 className={s.title}>Limitations</h4>
        <p className={s.subtitle}>At the moment you can check only following tokens and chais:</p>
        <p className={s.subtitle}>Arbitrum - USDT / USDC / ETH / WBTC</p>
        <p className={s.subtitle}>Base - USDT / ETH</p>
      </form>
    </section>
  )
}
