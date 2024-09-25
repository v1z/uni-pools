import React from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'

import { App } from './components/App'
import { store } from './store'
import { initFocusRing } from './utils/scripts/focusRing'

import './styles/default.css'

initFocusRing()

const container = document.getElementById('root')
const root = createRoot(container!)

root.render(
  <Provider store={store}>
    <App />
  </Provider>
)
