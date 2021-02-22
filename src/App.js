import { BaseProvider, LightTheme } from "baseui";
import React from "react";
import { useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Client as Styletron } from "styletron-engine-atomic";
import { Provider as StyletronProvider } from "styletron-react";

import { setLogStatus, setUserId, setUsername } from "./actions";
import Navbar from "./components/Navbar";
import CreateNote from "./components/pages/CreateNote";
import Dashboard from "./components/pages/Dashboard";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import NotePage from "./components/pages/NotePage";
import Signup from "./components/pages/Signup";

const engine = new Styletron();

export default function App() {
  const dispatch = useDispatch();

  if (localStorage.getItem("uuid") !== null) {
    dispatch(setUsername(localStorage.getItem("username")));
    dispatch(setUserId(localStorage.getItem("uuid")));
    dispatch(setLogStatus(true));
  }

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
              <Home />
            </Route>
            <Route path="/n/:noteId">
              <NotePage />
            </Route>
          </Switch>
        </Router>
      </BaseProvider>
    </StyletronProvider>
  );
}
