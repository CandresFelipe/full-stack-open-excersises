import { useDispatch } from "react-redux";
import { createAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";
import { anecdoteService } from "../services/anecdotes";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content === "") return;
    event.target.anecdote.value = "";
    const newAnnecdote = createAnecdote(content);
    await anecdoteService.createNew(newAnnecdote);
    dispatch(newAnnecdote);
    dispatch(setNotification(`you created '${content}'`));
  };

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addNewAnecdote}>
        <div>
          <input name="anecdote" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
