import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../reducers/selectors";
import { clearNotification } from "../reducers/notificationReducer";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
};
const Notification = () => {
  const notification = useSelector(getNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    return () => clearTimeout(timer);
  }, [notification, dispatch]);

  return notification !== "" ? <div style={style}>{notification}</div> : null;
};

export default Notification;
