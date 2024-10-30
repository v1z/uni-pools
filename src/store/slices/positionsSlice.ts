import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

import type { PositionType } from '../../types'
import type { RootState } from '../store'

export type PositionsRequestStageType = 'awaiting' | 'fetching' | 'failed' | 'fullfiled'

type PositionsState = {
  value: PositionType[]
  requestStage: PositionsRequestStageType
}

const initialState: PositionsState = {
  value: [],
  requestStage: 'awaiting'
}

const positionsSlice = createSlice({
  name: 'positions',
  initialState,
  reducers: {
    positionsSettled: (state, action: PayloadAction<PositionType[]>) => {
      state.value = action.payload
    },
    positionsRequestStageChanged: (state, action: PayloadAction<PositionsRequestStageType>) => {
      state.requestStage = action.payload
    },
  },
})

export const { positionsSettled, positionsRequestStageChanged } = positionsSlice.actions

export const selectPositions = (state: RootState) => state.positions.value
export const selectPositionsRequestStage = (state: RootState) => state.positions.requestStage

export default positionsSlice.reducer
