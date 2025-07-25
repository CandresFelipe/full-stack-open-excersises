import { useState } from "react";
import { useResource } from "./hooks";

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const clear = () => setValue("");

  return {
    type,
    value,
    onChange,
    clear,
  };
};

const App = () => {
  const content = useField("text");
  const name = useField("text");
  const number = useField("text");

  const [notes, noteService] = useResource("http://localhost:3005/notes");
  const [persons, personService] = useResource("http://localhost:3005/persons");

  const handleNoteSubmit = (event) => {
    event.preventDefault();
    noteService.create({ content: content.value });
    content.clear();
  };

  const handlePersonSubmit = (event) => {
    event.preventDefault();
    const randomNumber = (100000 * Math.random()).toFixed(0);
    personService.create({
      name: name.value,
      number: number.value,
      id: randomNumber,
    });
    name.clear();
    number.clear();
  };

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>

      {!noteService.loading && notes.map((n) => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br />
        number <input {...number} />
        <button>create</button>
      </form>
      {!personService.loading &&
        persons.map((n) => (
          <p key={n.id}>
            {n.name} {n.number}
          </p>
        ))}
    </div>
  );
};

export default App;
