import { removeLocalStorageToken } from "../services/storage";
import { Button } from "./Button";

export const Logout = ({ onInactive }) => {
  const onLogout = () => {
    removeLocalStorageToken();
    onInactive(false);
    console.log("[logout]: Token removed");
  };

  const buttonLabel = "logout";

  return <Button testId={buttonLabel} onClick={onLogout} label={buttonLabel} />;
};
