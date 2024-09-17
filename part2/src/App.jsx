import { useState } from "react";
import { Header } from "./components/Header";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "040-123456", id: 1 },
    { name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
    { name: "Dan Abramov", number: "12-43-234345", id: 3 },
    { name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

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

  const onFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = filter
    ? persons.filter((person) => {
        const descomposedName = person.name.toLowerCase().includes(filter);
        if (descomposedName) {
          return person;
        }
      })
    : persons;

  return (
    <div>
      <Header title={"Phonebook"} variant="h2" />
      <div>
        Filter shown with : <input value={filter} onChange={onFilterChange} />{" "}
      </div>
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
      {filteredPersons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
        </p>
      ))}
    </div>
  );
};

export default App;
