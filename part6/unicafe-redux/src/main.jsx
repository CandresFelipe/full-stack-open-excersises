import React from "react";
import ReactDOM from "react-dom/client";

import { createStore } from "redux";
import reducer from "./reducer";

const store = createStore(reducer);

const App = () => {
  const onClickButton = (event) => {
    event.preventDefault();
    if (event.target.innerText === "reset stats") {
      store.dispatch({ type: "ZERO" });
      return;
    }
    store.dispatch({ type: String(event.target.innerText).toUpperCase() });
  };

  return (
    <div>
      <button onClick={onClickButton}>good</button>
      <button onClick={onClickButton}>ok</button>
      <button onClick={onClickButton}>bad</button>
      <button onClick={onClickButton}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));

const renderApp = () => {
  root.render(<App />);
};

renderApp();
store.subscribe(renderApp);
