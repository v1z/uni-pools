import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { MainPage } from './pages/MainPage'
import { store } from './store/store'
import { initFocusRing } from './utils/scripts/focusRing'

import './styles/default.css'

initFocusRing()

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <MainPage />
  </Provider>
)
