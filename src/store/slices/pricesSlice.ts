import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { RootState } from '../store'
import type { TokenPricesType } from '../../types'

type PricesRequestStageType = 'awaiting' | 'fetching' | 'failed' | 'fullfiled'

type PricesState = {
  value: TokenPricesType
  requestStage: PricesRequestStageType
}

const initialState: PricesState = {
  value: {
    BTC: undefined,
    ETH: undefined,
    USD: 1
  },
  requestStage: 'awaiting'
}

const pricesSlice = createSlice({
  name: 'prices',
  initialState,
  reducers: {
    pricesSettled: (state, action: PayloadAction<TokenPricesType>) => {
      state.value = {...action.payload, USD: 1}
    },
    pricesRequestStateChanged: (state, action: PayloadAction<PricesRequestStageType>) => {
      state.requestStage = action.payload
    }
  },
})

export const { pricesSettled, pricesRequestStateChanged } = pricesSlice.actions

export const selectPrices = (state: RootState) => state.prices.value
export const selectPricesRequestStage = (state: RootState) => state.prices.requestStage

export default pricesSlice.reducer
