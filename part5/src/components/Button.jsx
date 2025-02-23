export const Button = (props) => {
  const { label, testId, ...rest } = props;
  return (
    <button type="submit" data-testid={`button-${testId}`} {...rest}>
      {label}
    </button>
  );
};
