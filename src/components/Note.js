import * as React from "react";
import { Link } from "react-router-dom";

import "./style/Note.css";

export default ({ title, note }) => {
  return (
    <Link to={`/n/${note.id}`}>
      <div className="note-item">{title}</div>
    </Link>
  );
};
