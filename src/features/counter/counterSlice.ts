import type { PayloadAction } from '@reduxjs/toolkit'
import { createSlice } from '@reduxjs/toolkit'

type CounterState = {
  value: number
}

const initialState: CounterState = {
  value: 0,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    counterIncremented(state, action: PayloadAction<number>) {
      state.value += action.payload
    },
  },
})

export const { counterIncremented } = counterSlice.actions

export default counterSlice.reducer
