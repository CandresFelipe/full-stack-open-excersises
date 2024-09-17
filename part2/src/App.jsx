import { useState } from "react";
import { Header } from "./components/Header";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      window.alert(`Person with name ${newName} already was added.`);
      setNewName("");
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
    };
    if (!(newPerson.name && newPerson.number)) {
      window.alert("Inputs are not fully completed");
      return;
    }
    setPersons(persons.concat(newPerson));
    setNewName("");
    setNewNumber("");
  };

  const onNameInputChange = (event) => {
    setNewName(event.target.value);
  };

  const onNumberInputChange = (event) => {
    setNewNumber(event.target.value);
  };

  return (
    <div>
      <Header title={"Phonebook"} variant="h2" />
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={onNameInputChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={onNumberInputChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
