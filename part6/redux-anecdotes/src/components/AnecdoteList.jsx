import { useDispatch, useSelector } from "react-redux";
import { getFormattedAnecdotes } from "../reducers/selectors";
import { increaseVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(getFormattedAnecdotes);

  const vote = (id) => {
    dispatch(increaseVote(id));
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
