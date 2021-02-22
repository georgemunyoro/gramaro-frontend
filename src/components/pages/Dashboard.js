import "../style/Dashboard.css";

import * as React from "react";
import {useSelector} from "react-redux";
import {Redirect} from "react-router-dom";

import NotesView from "../NotesView";
import Sidebar from "../Sidebar";

export default () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const userId = useSelector((state) => state.userId);

  if (!loggedIn)
    return <Redirect to = "/login" />;

  return (
      <div className = "dashboard-container">
      <div className = "dashboard-sidebar-container"><Sidebar />
      </div>
      <div className="dashboard-content-container">
        <NotesView userId={userId} />
      </div>
    </div>);
};
