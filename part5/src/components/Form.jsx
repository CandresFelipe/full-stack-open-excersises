import PropTypes from "prop-types";
import { Button } from "./Button";

export const Form = ({ onSubmit, inputs, buttonLabel }) => {
  return (
    <form onSubmit={onSubmit}>
      <div>
        {inputs.map((input) => (
          <div key={input.label}>
            <label htmlFor={input.label}>{`${input.label}`}</label>
            <input
              id={input.label}
              data-testid={input.testId}
              value={input.value}
              onChange={input.onChange}
              type={input.label === "Password" ? "password" : "text"}
            />
          </div>
        ))}
      </div>
      <Button testId={buttonLabel} label={buttonLabel} />
    </form>
  );
};

Form.prototype = {
  onSubmit: PropTypes.func.isRequired,
  inputs: PropTypes.object.isRequired,
  buttonLabel: PropTypes.string.isRequired,
};
