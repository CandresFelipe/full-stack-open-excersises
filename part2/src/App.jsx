import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { Persons } from "./Persons";
import personService from "./services/personService";
const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personService.getAllPersons().then((res) => setPersons(res));
  }, []);

  const editPersonNumber = (person) => {
    if (
      window.confirm(
        `${person.name} is already added to the phonebook. Do you want to replace older phone with new one?`
      )
    ) {
      const editedPerson = {
        ...person,
        number: newNumber,
      };

      personService.updatePerson(editedPerson).then(() => {
        //personService.getAllPersons().then((res) => setPersons(res)) another way for getting same result.
        setPersons(persons.map((p) => (p.id !== person.id ? p : editedPerson)));
        setNewName("");
        setNewNumber("");
      });
    }
  };

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      const person = persons.find((person) => person.name === newName);
      editPersonNumber(person);
      return;
    }
    const newPerson = {
      name: newName,
      number: newNumber,
      id: String(persons.length + 1),
    };
    if (!(newPerson.name && newPerson.number)) {
      window.alert("Inputs are not fully completed");
      return;
    }

    personService.createPerson(newPerson).then((res) => {
      setPersons(persons.concat(res));
      setNewName("");
      setNewNumber("");
    });
  };

  const deletePerson = (id) => {
    const toremovePerson = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${toremovePerson.name}`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
      });
    }
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

  const inputs = [
    {
      label: "Name",
      onChange: onNameInputChange,
      value: newName,
    },
    {
      label: "Number",
      onChange: onNumberInputChange,
      value: newNumber,
    },
  ];

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
      <Filter filterValue={filter} onFilter={onFilterChange} />
      <Header title="Add new" variant="h2" />
      <Form inputs={inputs} onSubmit={addPerson} />
      <Header title="Numbers" variant="h2" />
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
