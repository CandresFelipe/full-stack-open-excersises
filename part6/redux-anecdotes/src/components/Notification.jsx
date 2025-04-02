import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotification } from "../reducers/selectors";
import { notificationAsyncActions } from "../reducers/notificationReducer";

const style = {
  border: "solid",
  padding: 10,
  borderWidth: 1,
};
const Notification = () => {
  const notification = useSelector(getNotification);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(notificationAsyncActions.cleanNotificationState(3000));
  }, [notification, dispatch]);

  return notification === null ? null : <div style={style}>{notification}</div>;
};

export default Notification;
