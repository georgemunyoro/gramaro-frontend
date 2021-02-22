import * as React from "react";
import { Redirect } from "react-router-dom";
import { useSelector } from "react-redux";

import "../style/Dashboard.css";

import Sidebar from "../Sidebar";
import NotesView from "../NotesView";

export default () => {
  const loggedIn = useSelector((state) => state.loggedIn);
  const userId = useSelector((state) => state.userId);

  if (!loggedIn) return <Redirect to="/login" />;

  return (
    <div className="dashboard-container">
      <div className="dashboard-sidebar-container">
        <Sidebar />
      </div>
      <div className="dashboard-content-container">
        <NotesView userId={userId} />
      </div>
    </div>
  );
};
