export const Total = (props) => {
  const total = props.parts.reduce((acc, curr) => curr.exercises + acc, 0);

  return <p>Number of exercises: {total}</p>;
};
