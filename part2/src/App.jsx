import { useEffect, useState } from "react";
import { Header } from "./components/Header";
import { Filter } from "./components/Filter";
import { Form } from "./components/Form";
import { Persons } from "./Persons";
import personService from "./services/personService";
import "./styles.css";
import { Notification } from "./components/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [message, setMessage] = useState({
    value: null,
    type: "error",
  });

  useEffect(() => {
    personService.getAllPersons().then((res) => setPersons(res));
  }, []);

  const clearNotificationMessage = () =>
    setTimeout(() => {
      setMessage({
        value: null,
        type: "error",
      });
    }, 5000);

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

      personService
        .updatePerson(editedPerson)
        .then(() => {
          //personService.getAllPersons().then((res) => setPersons(res)) another way for getting same result.
          setPersons(
            persons.map((p) => (p.id !== person.id ? p : editedPerson))
          );
          setNewName("");
          setNewNumber("");
          setMessage({
            value: `Phone number edited successfully for ${editedPerson.name}`,
            type: "success",
          });
          clearNotificationMessage();
        })
        .catch((error) => {
          if (error.status === 404) {
            setMessage({
              value: `Information of ${editedPerson.name} has already been removed from server`,
              type: "error",
            });
            personService.getAllPersons().then((res) => setPersons(res));
            clearNotificationMessage();
          }
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
      setMessage({
        type: "success",
        value: `Added ${newPerson.name}!`,
      });
      clearNotificationMessage();
    });
  };

  const deletePerson = (id) => {
    const toremovePerson = persons.find((p) => p.id === id);

    if (window.confirm(`Delete ${toremovePerson.name}`)) {
      personService.deletePerson(id).then(() => {
        setPersons(persons.filter((p) => p.id !== id));
        setMessage({
          value: `Person removed!`,
          type: "success",
        });
        clearNotificationMessage();
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
      <Notification messsage={message.value} type={message.type} />
      <Filter filterValue={filter} onFilter={onFilterChange} />
      <Header title="Add new" variant="h2" />
      <Form inputs={inputs} onSubmit={addPerson} />
      <Header title="Numbers" variant="h2" />
      <Persons persons={filteredPersons} onDelete={deletePerson} />
    </div>
  );
};

export default App;
