import { Fragment } from "react";
import { Part } from "./Part";

export const Content = (props) => {
  return (
    <Fragment>
      <Part item={props.parts[0]} />
      <Part item={props.parts[1]} />
      <Part item={props.parts[2]} />
    </Fragment>
  );
};
