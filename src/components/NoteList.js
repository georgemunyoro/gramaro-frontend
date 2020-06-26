import * as React from 'react';

export default ({ notes }) => {
  return (
	notes.map(note => <li key={note.id}>{note.title}</li>)
  )
}
