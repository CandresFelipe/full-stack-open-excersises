import { useState } from "react";
import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import {
  useGetAnecdotesQuery,
  useUpdateVoteMutation,
} from "./queries/query-anecdotes";

const App = () => {
  const voteMutation = useUpdateVoteMutation();
  const handleVote = (anecdote) => {
    const vote = anecdote.votes + 1;
    voteMutation.mutate({
      id: anecdote.id,
      votes: vote,
    });
  };

  const { isLoading, data: anecdotes } = useGetAnecdotesQuery();

  if (isLoading) {
    return <div>Loading data...</div>;
  }

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
