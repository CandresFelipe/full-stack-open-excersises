import { Button } from "./components/Button";

export const Persons = ({ persons, onDelete }) => {
  return (
    <div>
      <ul>
        {persons?.map((person) => {
          return (
            <li key={person.id}>
              <p>
                {person.name} {person.number}{" "}
                <Button label="delete" onClick={() => onDelete(person.id)} />
              </p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
