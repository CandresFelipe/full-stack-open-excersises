import { useState } from "react";
import { Form } from "./Form";
import { loginService } from "../services/login";
import { setLocalStorageToken } from "../services/storage";
import { Notification } from "./Notification";

export const LogIn = ({ onActive }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(undefined);

  const onChangePassword = (event) => setPassword(event.target.value);
  const onChangeUsername = (event) => setUsername(event.target.value);

  const inputs = [
    {
      label: "Username",
      onChange: onChangeUsername,
      testId: "username",
      value: username,
    },
    {
      label: "Password",
      testId: "password",
      onChange: onChangePassword,
      value: password,
    },
  ];

  const onSubmit = async (event) => {
    event.preventDefault();
    if (!username || !password) {
      return;
    }

    try {
      const res = await loginService.login({ username, password });
      setLocalStorageToken(res.token);
      onActive(true);
    } catch (err) {
      console.log(`[Error login]: ${err}`);
      setError("error");
    } finally {
      setPassword("");
      setUsername("");
      setTimeout(() => {
        setError(undefined);
      }, 3000);
    }
  };

  return (
    <div>
      <Notification message={"Wrong username or password"} type={error} />
      <h2>log in to the application</h2>
      <Form inputs={inputs} onSubmit={onSubmit} buttonLabel={"submit"} />
    </div>
  );
};
