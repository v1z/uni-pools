import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { PositionType } from '../../types'
import type { RootState } from '../store'

type PositionsState = {
  value: PositionType[]
}

const initialState: PositionsState = {
  value: [],
}

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    positionsSettled: (state, action: PayloadAction<PositionType[]>) => {
      state.value = action.payload
    },
  },
})

export const { positionsSettled } = positionsSlice.actions

export const selectPositions = (state: RootState) => state.positions.value

export default positionsSlice.reducer
