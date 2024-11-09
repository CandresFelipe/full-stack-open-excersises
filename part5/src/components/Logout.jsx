import { removeLocalStorageToken } from "../services/storage";
import { Button } from "./Button";

export const Logout = ({ onInactive }) => {
  const onLogout = () => {
    removeLocalStorageToken();
    onInactive(false);
    console.log("[logout]: Token removed");
  };

  return <Button onClick={onLogout} label={"logout"} />;
};
