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

export const { setNotification, clearNotification } = notificationReducer.actions;

export default notificationReducer.reducer;