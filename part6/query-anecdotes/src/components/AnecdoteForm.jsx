import { useContext } from "react";
import { useCreateAnecdoteMutation } from "../queries/query-anecdotes";
import { NotificationContext } from "../context/notification-context";

const AnecdoteForm = () => {
  const anecdoteMutation = useCreateAnecdoteMutation();
  const [, setNotification] = useContext(NotificationContext);

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;
    event.target.anecdote.value = "";
    anecdoteMutation.mutate(content, {
      onError: (error) => {
        const serializedError = String(error.response.data.error);
        setNotification(serializedError);
      },
      onSuccess: () => {
        setNotification(`you created '${content}'`);
      },
    });
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
