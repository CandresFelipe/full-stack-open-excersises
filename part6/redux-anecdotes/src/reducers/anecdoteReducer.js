import { createSlice } from '@reduxjs/toolkit'

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
      content: anecdote,
      id: getId(),
      votes: 0
  }
}

const initialState = []


const anecdoteReducer = createSlice({
  name: 'anecdotes',
  initialState,
  reducers: {
    increaseVote: (state, action) => {
      const id = action.payload
      const anecdoteToChange = state.find(a => a.id === id)
      anecdoteToChange.votes += 1
    },
    createAnecdote: (state, action) => {
      const content = action.payload
      const newAnecdote = asObject(content)
      state.push(newAnecdote)
    },
    setAnecdotes: (state, action) => {
      return action.payload
    },
  }
})

export const { increaseVote, createAnecdote, setAnecdotes } = anecdoteReducer.actions;

export default anecdoteReducer.reducer;