export const Persons = ({ persons }) => {
  return (
    <div>
      <ul>
        {persons.map((person) => (
          <li key={person.id}>
            <p>
              {person.name} {person.number}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};
