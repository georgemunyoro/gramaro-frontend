import * as React from 'react';
import { Input, SIZE } from 'baseui/input';
import { Button } from 'baseui/button';
import { Notification } from 'baseui/notification';
import { Redirect } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { setUserId, setLogStatus } from '../../actions';

import '../style/Login.css';

export default () => {
  const dispatch = useDispatch();
  const [auth, setAuth] = React.useState(false);
  const [alertMessages, setAlertMessages] = React.useState([]);

  const [password, setPassword] = React.useState("");
  const [email, setEmail] = React.useState("");

  const loggedIn = useSelector(state => state.loggedIn);

  const handleFormSubmit = async (event) => {
	event.preventDefault();
	try {
	  const API_CALL_URL = 'http://192.168.43.1:3001/login';
	  const res = await fetch(API_CALL_URL, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		  body: JSON.stringify({
		  password: password,
		  email: email
		})
	  });
	  const data = await res.json();
	  if (data.message == "ok") {
		setAlertMessages([]);
		dispatch(setUserId(data.data.uuid));
		dispatch(setLogStatus(true));
	  } else {
		setAlertMessages(["Incorrect login info"])
	  }
	} catch (error) {
	  console.error(error.stack);
	}
  }

  if (loggedIn) return <Redirect to="/dashboard"/>

  return (
	<div className="login-container">
	  <h1>Login</h1>
	  {
		alertMessages.map(alert => <Notification>{ alert }</Notification>)
	  }
	  <form>
		<Input onChange={e => setEmail(e.target.value)} name="username" type="email" placeholder="peter.gregory@hooli.com"  className="input"/>
		<Input onChange={e => setPassword(e.target.value)} name="password" type="password" placeholder="********" className="input"/>
		<Button onClick={handleFormSubmit}>Login</Button>
		<Button onClick={e => e.preventDefault()}>Signup</Button>
	  </form>
	</div>
  )
}

