import { useDispatch, useSelector } from "react-redux";
import { getFormattedAnecdotes } from "../reducers/selectors";
import { increaseVote, setAnecdotes } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { useEffect } from "react";
import { anecdoteService } from "../services/anecdotes";

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(getFormattedAnecdotes);

  useEffect(() => {
    const fetchAnecdotes = async () => {
      const data = await anecdoteService.getAll();
      dispatch(setAnecdotes(data));
    };
    fetchAnecdotes();
  }, [dispatch]);

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
