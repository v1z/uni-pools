import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import type { TokenPricesType } from '../../types'

type PricesState = {
  value: TokenPricesType
}

const initialState: PricesState = {
  value: {
    BTC: undefined,
    ETH: undefined,
    USD: 1
  },
}

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    pricesSettled: (state, action: PayloadAction<TokenPricesType>) => {
      state.value = {...action.payload, USD: 1}
    },
  },
})

export const { pricesSettled } = pricesSlice.actions

export const selectPrices = (state: RootState) => state.prices.value

export default pricesSlice.reducer
