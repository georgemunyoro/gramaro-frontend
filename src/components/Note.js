import * as React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './style/Note.css';

export default ({ title, note }) => {
  const userId = useSelector(state => state.userId);

  console.log(note);

  return (
	<Link to={`/n/${note.id}`}>
	  <div className="note-item">
		{ title }
	  </div>
	</Link>
  )
}

