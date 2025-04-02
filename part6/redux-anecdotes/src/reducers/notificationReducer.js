import { createSlice } from "@reduxjs/toolkit";

const initialState = ''

const notificationReducer = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => action.payload,
        clearNotification: () => initialState,
    }
})

const cleanNotificationState = (time) => {
  return async (dispatch) => {
    setTimeout(() => {
      dispatch(clearNotification())
    }, time)
  }
}

export const notificationAsyncActions = {
    cleanNotificationState,
}

export const { setNotification, clearNotification } = notificationReducer.actions;

export default notificationReducer.reducer;