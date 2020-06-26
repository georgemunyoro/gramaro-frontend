import * as React from 'react';
import { Input, SIZE } from "baseui/input";
import { newExpression } from '@babel/types';
import {
  List,
  arrayMove,
  arrayRemove
} from 'baseui/dnd-list';
import Note from './Note';
import { useSelector } from 'react-redux';

const API_URL = "http://192.168.43.1:3001";

export default ({ value }) => {
  const [notes, setNotes] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const userId = useSelector(state => state.userId);

  const searchNotes = (event) => {
	setQuery(event.target.value);
  }

  React.useEffect(() => {
	async function fetchNotes() {
	  try {
		const url = `${API_URL}/notes/u/${userId}`;
		const res = await fetch(url);
		const data = await res.json();
		setNotes(data.data.notes.map(note => note));
	  } catch (error) {
		console.error(error.stack);
	  }
	}
	fetchNotes();
  }, [userId]);

  return (
	<>
	  <Input
		value={value}
		size={SIZE.large}
		onChange={searchNotes}
		placeholder="Controlled Input"
		clearable
	  />
	  <div className="notes-list-container">
		{
		  notes.map(note => note).filter(note => note.title.includes(query)).map(note => <Note key={note.id} className="note-item" note={note} title={note.title}/>)
		}
	  </div>
	</>
  );
}

