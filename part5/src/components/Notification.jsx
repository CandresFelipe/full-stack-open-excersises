export const Notification = ({ message, type }) => {
  if (!message || !type) {
    return null;
  }
  return (
    <div
      data-testid={`notification-${type}`}
      className={type === "error" ? "error" : "success"}
    >
      {message}
    </div>
  );
};
