export const Notification = ({ messsage, type }) => {
  if (messsage === null) {
    return null;
  }

  return (
    <div className={type === "error" ? "error" : "success"}>{messsage}</div>
  );
};
