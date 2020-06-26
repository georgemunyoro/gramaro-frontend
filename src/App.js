import React from 'react';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from 'react-router-dom';

import { Client as Styletron } from 'styletron-engine-atomic'
import { Provider as StyletronProvider } from 'styletron-react';
import { LightTheme, BaseProvider } from 'baseui';

import Dashboard from './components/pages/Dashboard';
import Navbar from './components/Navbar';
import Signup from './components/pages/Signup';
import Login from './components/pages/Login';
import CreateNote from './components/pages/CreateNote';
import NotePage from './components/pages/NotePage';

const engine = new Styletron();

export default function App() {
  return (
	<StyletronProvider value={engine}>
	  <BaseProvider theme={LightTheme}>
		<Router>
		  <Navbar />
		  <Switch>
			<Route exact path="/login">
			  <Login />
			</Route>
			<Route exact path="/signup">
			  <Signup />
			</Route>
			<Route exact path="/dashboard">
			  <Dashboard />
			</Route>
			<Route path="/create">
			  <CreateNote />
			</Route>
			<Route exact path="/">
			  <h1>Home</h1>
			</Route>
			<Route path="/n/:noteId">
			  <NotePage />
			</Route>
		  </Switch>
		</Router>
	  </BaseProvider>
	</StyletronProvider>
  )
}

