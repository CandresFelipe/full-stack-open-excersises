import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from '../src/reducers/notificationReducer.js'
import blogReducer from '../src/reducers/blogsReducer.js'
import userReducer from '../src/reducers/userReducer.js'
import { Provider } from 'react-redux'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer,
  },
})

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)
