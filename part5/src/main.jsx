import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../src/reducers/notificationReducer.js'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
  },
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
