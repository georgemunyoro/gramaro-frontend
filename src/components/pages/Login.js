import * as React from "react";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Notification } from "baseui/notification";
import { Redirect } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { setUserId, setLogStatus, setUsername } from "../../actions";

import "../style/Login.css";

export default () => {
  const dispatch = useDispatch();
  const [alertMessages, setAlertMessages] = React.useState([]);

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const loggedIn = useSelector((state) => state.loggedIn);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/login", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: password,
          email: email,
        }),
      });
      const data = await res.json();
      if (data.message === "ok") {
        setAlertMessages([]);
        dispatch(setUserId(data.data.uuid));
        dispatch(setUsername(data.data.username));
        dispatch(setLogStatus(true));
        localStorage.setItem("uuid", data.data.uuid);
        localStorage.setItem("username", data.data.username);
      } else {
        setAlertMessages(["Incorrect login info"]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  if (loggedIn) return <Redirect to="/dashboard" />;
  if (localStorage.getItem("uuid") !== null) {
    dispatch(setUsername(localStorage.getItem("username")));
    dispatch(setUserId(localStorage.getItem("uuid")));
    dispatch(setLogStatus(true));
    return <Redirect to="/dashboard" />;
  }

  return (
    <div className="login-container">
      <h1>Login</h1>
      {alertMessages.map((alert) => (
        <Notification>{alert}</Notification>
      ))}
      <form>
        <Input
          onChange={(e) => setEmail(e.target.value)}
          name="username"
          type="email"
          placeholder="peter.gregory@hooli.com"
          className="input"
        />
        <Input
          onChange={(e) => setPassword(e.target.value)}
          name="password"
          type="password"
          placeholder="********"
          className="input"
        />
        <Button onClick={handleFormSubmit}>Login</Button>
        <Button onClick={(e) => e.preventDefault()}>Signup</Button>
      </form>
    </div>
  );
};
