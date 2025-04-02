import { createSelector } from "@reduxjs/toolkit";
const filterState = (state) => state.filter;
const anecdotesState = (state) => state.anecdotes;
const notificationState = (state) => state.notification;

const getSortedAnecdotes = (anecdotes) => [...anecdotes].sort((a, b) => b.votes - a.votes)
const getFilteredAnecdotes = (filter, anecdotes) => {
  if(filter === '') {
    return anecdotes;
  }
  return anecdotes.filter((anecdote) => anecdote.content.toLowerCase().includes(filter.toLowerCase()));
}

export const getFormattedAnecdotes = createSelector(filterState, anecdotesState, (filter, anecdotes) => {
  const sortedAnecdotes = getSortedAnecdotes(anecdotes);
  const filteredAnecdotes = getFilteredAnecdotes(filter, anecdotes);
  return filter === '' ? sortedAnecdotes : filteredAnecdotes;
});

export const getNotification = createSelector(notificationState, (notification) => ( notification  === '' ? null : notification));