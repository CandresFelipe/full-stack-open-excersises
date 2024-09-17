import { useState } from "react";
import { Header } from "./components/Header";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const addPerson = (event) => {
    event.preventDefault();
    const newPerson = {
      name: newName,
    };
    setPersons(persons.concat(newPerson));
    setNewName("");
  };

  const onNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  return (
    <div>
      <Header title={"Phonebook"} variant="h2" />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={onNameInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>{person.name}</p>
      ))}
    </div>
  );
};

export default App;
