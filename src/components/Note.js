import "./style/Note.css";

import * as React from "react";
import { Link } from "react-router-dom";

export default ({ title, note }) => {
  return (
    <Link to={`/n/${note.id}`}>
      <div className="note-item">{title}</div>
    </Link>
  );
};
