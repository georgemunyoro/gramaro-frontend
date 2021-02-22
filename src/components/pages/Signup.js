import "../style/Signup.css";

import {Button} from "baseui/button";
import {Input} from "baseui/input";
import {Notification} from "baseui/notification";
import * as React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

export default () => {
  const [alertMessages, setAlertMessages] = React.useState([]);
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const loggedIn = useSelector((state) => state.loggedIn);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (username === "" || password === "" || email === "") {
      setAlertMessages([ "Youu must fill out the entire form" ]);
      return;
    }
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/signup", {
        method : "POST",
        headers : {
          Accept : "application/json",
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({
          username : username,
          password : password,
          email : email,
        }),
      });
      const data = await res.json();
      if (data.message === "ok") {
        alert(data.data.user.uuid);
      } else {
        setAlertMessages([ data.message ]);
      }
      console.dir(data);
    } catch (error) {
      console.error(error.stack);
    }
  };

  if (loggedIn)
    return <Redirect to = "/dashboard" />;

  return (
    <div className="signup-container">
      <h1>Signup</h1>
      {alertMessages.map((alertMessage) => {
        return <Notification>{alertMessage}</Notification>;
      })
}
<form>< Input
onChange = {(e) => setEmail(e.target.value)} name = "email"
type = "email"
placeholder = "peter.gregory@hooli.com"
className = "input" / > < Input
onChange = {(e) => setUsername(e.target.value)} name = "username"
type = "text"
placeholder = "name"
className = "input" / > < Input
onChange = {(e) => setPassword(e.target.value)} name = "password"
type = "password"
placeholder = "********"
          className="input"
        />
        <Button onClick={(e) => e.preventDefault()}>Login</Button>
        <Button onClick={handleFormSubmit}>Signup</Button>
      </form>
    </div>
  );
          }
          ;
