import React, { useState } from 'react'

import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'

import { positionsSettled } from '../../store/slices/positionsSlice'
import { useAppDispatch } from '../../store/store'

import { useRequestPositions } from './hooks/useRequestPositions'
import { getFormattedPosition } from './utils'

import s from './styles.css'

export type StatusType = 'awaiting' | 'requesting' | 'error' | 'fullfiled'

export const RequestForm = () => {
  const [userAddress, setUserAddress] = useState<string>('')
  const [status, setStatus] = useState<StatusType>('awaiting')

  const handleRequestClick = () => setStatus('requesting')
  const handleRequestError = () => setStatus('error')
  const handleRequestFullfil = () => setStatus('fullfiled')

  const dispatch = useAppDispatch()

  // TODO: add validation by regex
  const handleSubmit = () => {
    handleRequestClick()

    useRequestPositions(userAddress)
      .then((rawPositions) => {
        const formattedPositions = rawPositions.map(getFormattedPosition)

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
        <h4 className={s.formTitle}>Find Uniswap pools</h4>

        <TextField
          label='Address'
          variant='outlined'
          size='small'
          onChange={handleInputChange}
          sx={{
            marginBottom: '16px',
            flexGrow: 1,
            width: '100%',
            maxWidth: '440px',
          }}
          disabled={isLoading}
        />

        <Button
          variant='contained'
          type='button'
          size='medium'
          onClick={handleSubmit}
          sx={{
            width: '100px',
          }}
          disabled={isLoading}
        >
          Find
        </Button>
      </form>

      <div className={s.notification}>
        <h4 className={s.notificationTitle}>Limitations</h4>
        <span className={s.notificationSubtitle}>Supported chains: Base / Arbitrum</span>
        <span className={s.notificationSubtitle}>Supported tokens: ETH / USDT / USDC</span>
      </div>
    </section>
  )
}
