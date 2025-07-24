import { createSelector } from '@reduxjs/toolkit'

const blogState = (state) => state.blogs

export const getAllBlogs = createSelector(blogState, (blogs) => blogs)
