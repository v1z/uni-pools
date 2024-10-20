import React, { useEffect } from 'react'

import { Container } from '../../shared/components/Container'
import { pricesSettled, selectPrices } from '../../store/slices/pricesSlice'
import { useAppDispatch, useAppSelector } from '../../store/store'

import { useRequestTokenPrices } from './hooks/useRequestTokenPrices'

import s from './styles.css'

const NO_PRICE_TEXT = '-- / --'

export const Header = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    useRequestTokenPrices().then((prices) => dispatch(pricesSettled(prices)))
  }, [])

  const prices = useAppSelector(selectPrices)

  return (
    <header className={s.root}>
      <Container>
        <ul className={s.wrapper}>
          {Object.entries(prices).map((pair) => {
            const [token, tokenPrice] = pair
            const priceText = tokenPrice ? `$${tokenPrice}` : NO_PRICE_TEXT

            return (
              <li className={s.item} key={token}>
                <span className={s.tokenName}>{`${token}:`}</span>
                <span>{priceText}</span>
              </li>
            )
          })}
        </ul>
      </Container>
    </header>
  )
}
