import { createSlice } from '@reduxjs/toolkit'
import { anecdoteService } from '../services/anecdotes'

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

const initializeAnecdotes = () => {
  return async (dispatch) => {
    const data = await anecdoteService.getAll()
    dispatch(setAnecdotes(data))
  }
}

const createNewAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = asObject(content)
    await anecdoteService.createNew(newAnecdote)
    dispatch(createAnecdote(newAnecdote))
  }
}

const updateVote = (id) => {
  return async (dispatch, getState) => {
    dispatch(increaseVote(id))
    const state = getState();
    const anecdoteToChange = state.anecdotes.find(a => a.id === id)
    await anecdoteService.updateVote(id, {votes: anecdoteToChange.votes})
  }
}

export const anecdoteAsyncActions = {
  initializeAnecdotes,
  createNewAnecdote,
  updateVote,
}
export const { increaseVote, createAnecdote, setAnecdotes } = anecdoteReducer.actions;

export default anecdoteReducer.reducer;