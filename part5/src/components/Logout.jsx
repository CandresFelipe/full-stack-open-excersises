import { removeLocalStorageToken } from "../services/storage";
import { Button } from "./Button";

export const Logout = () => {
  const onLogout = () => {
    removeLocalStorageToken();
    console.log("[logout]: Token removed");
  };

  return <Button onClick={onLogout} label={"logout"} />;
};
