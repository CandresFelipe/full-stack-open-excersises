import { createSlice } from '@reduxjs/toolkit'
import {
  removeLocalStorageToken,
  setLocalStorageToken,
} from '../services/storage'

const initialState = {
  username: undefined,
  token: null,
}

const userReducer = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setToken: (state, action) => {
      setLocalStorageToken(action.payload.token)
      return action.payload
    },
    deleteToken: (state, action) => {
      removeLocalStorageToken()
      state.token = null
    },
  },
})

export const { setToken, deleteToken } = userReducer.actions

export default userReducer.reducer
