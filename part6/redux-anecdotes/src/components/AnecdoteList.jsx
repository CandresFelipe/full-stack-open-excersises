import { useDispatch, useSelector } from "react-redux";
import { getFormattedAnecdotes } from "../reducers/selectors";
import { anecdoteAsyncActions } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(getFormattedAnecdotes);

  useEffect(() => {
    dispatch(anecdoteAsyncActions.initializeAnecdotes());
  }, [dispatch]);

  const vote = (id) => {
    dispatch(anecdoteAsyncActions.updateVote(id));
    const anecdoteContent = anecdotes.find(
      (anecdote) => anecdote.id === id
    ).content;
    dispatch(setNotification(`you voted ${anecdoteContent}`));
  };

  return (
    <div>
      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnecdoteList;
