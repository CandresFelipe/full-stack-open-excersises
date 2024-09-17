export const Total = (props) => {
  const total = props.parts.reduce((acc, curr) => curr.exercises + acc, 0);

  return (
    <p>
      <b>Number of exercises: {total}</b>
    </p>
  );
};
