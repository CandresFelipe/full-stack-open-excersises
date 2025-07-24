import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: '',
  type: null,
}

const notificationReducer = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setNotificationState: (state, action) => action.payload,
    clearMessage: () => initialState,
  },
})

export const { setNotificationState, clearMessage } =
  notificationReducer.actions

export default notificationReducer.reducer
