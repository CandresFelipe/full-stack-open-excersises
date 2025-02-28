export const getAnecdotes = (state) => state.anecdotes
export const getSortedAnecdotes = (state) => getAnecdotes(state).sort((a, b) => b.votes - a.votes)