export const Notification = ({ message, type }) => {
  if (!message || !type) {
    return null;
  }
  return (
    <div className={type === "error" ? "error" : "success"}>{message}</div>
  );
};
