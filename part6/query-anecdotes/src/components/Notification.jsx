import { useContext } from "react";
import { NotificationContext } from "../context/notification-context";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
  marginBottom: 5,
};
const Notification = () => {
  const [state] = useContext(NotificationContext);
  console.log("state", state);
  if (state === "") return null;

  return <div style={style}>{state}</div>;
};

export default Notification;
