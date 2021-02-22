import { Input, SIZE } from "baseui/input";
import * as React from "react";
import { useSelector } from "react-redux";

import Note from "./Note";

export default ({ value }) => {
  const [notes, setNotes] = React.useState([]);
  const [query, setQuery] = React.useState("");
  const userId = useSelector((state) => state.userId);

  const searchNotes = (event) => {
    setQuery(event.target.value);
  };

  React.useEffect(() => {
    const fetchNotes = async () => {
      try {
        const url = `${process.env.REACT_APP_API_URL}/notes/u/${userId}`;
        const res = await fetch(url);
        const data = await res.json();
        setNotes(data.data.notes.map((note) => note));
      } catch (error) {
        console.error(error.stack);
      }
    };
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
        {notes
          .map((note) => note)
          .filter((note) => note.title.includes(query))
          .map((note) => (
            <Note
              key={note.id}
              className="note-item"
              note={note}
              title={note.title}
            />
          ))}
      </div>
    </>
  );
};
