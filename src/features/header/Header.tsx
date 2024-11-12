import React, { useEffect } from 'react'
import cn from 'classnames'

import { Container } from '../../shared/components'
import { getFormattedAmount } from '../../shared/utils'
import {
  pricesSettled,
  pricesRequestStateChanged,
  selectPrices,
  selectPricesRequestStage,
} from '../../store/slices/pricesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

import { useRequestTokenPrices } from './hooks/useRequestTokenPrices'

import s from './styles.css'

const NO_PRICE_TEXT = '-- / --'
const INTERVAL_TIME_SECONDS = 30

export const Header = () => {
  const dispatch = useAppDispatch()

  const handleRequestInitiation = () => dispatch(pricesRequestStateChanged('fetching'))
  const handleRequestError = () => dispatch(pricesRequestStateChanged('failed'))
  const handleRequestFullfil = () => dispatch(pricesRequestStateChanged('fullfiled'))

  useEffect(() => {
    const fetchPrices = async (isFirstRun = false) => {
      try {
        // keep 'awaiting' status while first run
        !isFirstRun && handleRequestInitiation()

        const prices = await useRequestTokenPrices()

        handleRequestFullfil()

        dispatch(pricesSettled(prices))
      } catch (error) {
        handleRequestError()
      }
    }

    fetchPrices(true)

    const intervalId = setInterval(fetchPrices, INTERVAL_TIME_SECONDS * 1000)

    return () => clearInterval(intervalId)
  }, [])

  const prices = useAppSelector(selectPrices)
  const requestStatus = useAppSelector(selectPricesRequestStage)

  return (
    <header className={s.root}>
      <Container>
        <ul className={s.wrapper}>
          {Object.entries(prices).map((pair) => {
            const [token, tokenPrice] = pair
            if (token === 'USD') return null

            const priceText = tokenPrice ? `$${getFormattedAmount(tokenPrice)}` : NO_PRICE_TEXT

            return (
              <li className={s.item} key={token}>
                <span className={s.tokenName}>{`${token}:`}</span>

                <span
                  className={cn(s.tokenPrice, {
                    [s.tokenPrice_fetching]: requestStatus === 'fetching' || requestStatus === 'awaiting',
                  })}
                >
                  {priceText}
                </span>
              </li>
            )
          })}
        </ul>
      </Container>
    </header>
  )
}
