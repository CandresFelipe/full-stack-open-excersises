import { Fragment } from "react";
import { Part } from "./Part";

export const Content = (props) => {
  return (
    <Fragment>
      {Object.entries(props.options).map(([key, value], index) => (
        <Part name={key} value={value} key={index} />
      ))}
    </Fragment>
  );
};
