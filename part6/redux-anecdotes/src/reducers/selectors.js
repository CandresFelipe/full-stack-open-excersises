export const getSortedAnecdotes = (anecdotes) => anecdotes.sort((a, b) => b.votes - a.votes)

export const getFilteredAnecdotes = (state) => {
  const filter = state.filter;
  const anecdotes = getSortedAnecdotes(state.anecdotes);

  if(filter === '') {
    return anecdotes;
  }

  return anecdotes.filter((anecdote) =>
    anecdote.content.toLowerCase().includes(filter.toLowerCase())
  );
};