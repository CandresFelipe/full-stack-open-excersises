import { createSlice } from '@reduxjs/toolkit'

const blogReducer = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs: (state, action) => action.payload,
    addBlog: (state, action) => [...state, action.payload],
    updateBlog: (state, action) =>
      state.map((b) => (action.payload.id === b.id ? action.payload : b)),
    deleteBlog: (state, action) => state.filter((b) => b.id !== action.payload),
  },
})

export const { setBlogs, addBlog, updateBlog, deleteBlog } = blogReducer.actions

export default blogReducer.reducer
