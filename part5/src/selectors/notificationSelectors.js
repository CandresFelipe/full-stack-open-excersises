import { createSelector } from '@reduxjs/toolkit'

const notificationState = (state) => state.notification

export const getNotificationSelector = createSelector(
  notificationState,
  (notification) => notification
)
