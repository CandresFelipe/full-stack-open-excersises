import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import PersonService from "./services/personService";
import { Persons } from "./Persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    PersonService.getAllPersons().then((data) => setPersons(data));
  }, []);

  const addPerson = (event) => {
    event.preventDefault();

    if (persons.some((person) => person.name === newName)) {
      PersonService.updatePerson({ name: newName, number: newNumber }).then(
        () =>
          PersonService.getAllPersons().then((data) =>
            setPersons((oldData) => (oldData !== data ? data : oldData))
          )
      );

      setNewName("");
      setNewNumber("");
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
    PersonService.createPerson(newPerson);
    PersonService.getAllPersons().then((data) => {
      setPersons((prev) => (prev !== data ? data : prev));
    });
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

  const onDelete = (id) => {
    PersonService.deletePerson(id);
    PersonService.getAllPersons().then((data) => setPersons(data));
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
    ? persons?.filter((person) => {
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
      <Persons persons={filteredPersons} onDelete={onDelete} />
    </div>
  );
};

export default App;
