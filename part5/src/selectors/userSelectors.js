import { createSelector } from '@reduxjs/toolkit'

const userState = (state) => state.user

export const getUserAuthenticated = createSelector(
  userState,
  (user) => !!user.token
)

export const getUsername = createSelector(userState, (user) => user.username)
