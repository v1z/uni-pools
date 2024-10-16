import { useDispatch, useSelector } from 'react-redux'

import { configureStore } from '@reduxjs/toolkit'

import positionsSlice from './slices/positionsSlice'
import pricesSlice from './slices/pricesSlice'

export const store = configureStore({
  reducer: {
    positions: positionsSlice,
    prices: pricesSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})

export type AppStore = typeof store

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = AppStore['dispatch']

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()

export const useAppSelector = useSelector.withTypes<RootState>()
