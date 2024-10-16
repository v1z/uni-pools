import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'

export type PricesPayloadType = Record<'ETH' | 'BTC', number | undefined>

type PricesState = {
  value: PricesPayloadType
}

const initialState: PricesState = {
  value: {
    BTC: undefined,
    ETH: undefined,
  },
}

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    pricesSettled: (state, action: PayloadAction<PricesPayloadType>) => {
      state.value = action.payload
    },
  },
})

export const { pricesSettled } = pricesSlice.actions

export const selectPrices = (state: RootState) => state.prices.value

export default pricesSlice.reducer
