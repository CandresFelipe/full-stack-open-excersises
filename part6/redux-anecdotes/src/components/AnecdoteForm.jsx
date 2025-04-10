import { useDispatch } from "react-redux";
import { anecdoteAsyncActions } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

export const AnecdoteForm = () => {
  const dispatch = useDispatch();

  const addNewAnecdote = async (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    if (content === "") return;
    event.target.anecdote.value = "";
    dispatch(anecdoteAsyncActions.createNewAnecdote(content));
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
