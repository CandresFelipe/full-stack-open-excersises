export const Button = (props) => {
  const { label, ...rest } = props;
  return (
    <button type="submit" {...rest}>
      {label}
    </button>
  );
};
