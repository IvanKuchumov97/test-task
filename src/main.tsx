import React from 'react'
import ReactDOM from 'react-dom/client'
import {Provider} from 'react-redux'


import {App} from './App.tsx'
import './index.css'
import {setupStore} from './store/setupStore'

const store = setupStore()

ReactDOM.createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <App />
  </Provider>
)
