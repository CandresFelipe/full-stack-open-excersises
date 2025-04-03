import { createContext, useReducer } from "react";
import PropTypes from "prop-types";

const reducer = (state, action) => {
  switch (action.type) {
    case "SET_NOTIFICATION":
      return action.payload;
    case "CLEAR_NOTIFICATION":
      return "";
    default:
      return state;
  }
};

export const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, "");
  const setNotification = (message) => {
    console.log("message", message);
    dispatch({ type: "SET_NOTIFICATION", payload: message });
    setTimeout(() => {
      dispatch({ type: "CLEAR_NOTIFICATION" });
    }, 2000);
  };

  return (
    <NotificationContext.Provider value={[state, setNotification]}>
      {children}
    </NotificationContext.Provider>
  );
};

NotificationContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
