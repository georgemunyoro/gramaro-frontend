import * as React from 'react';
import { useParams, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'baseui/button';
import { ButtonGroup } from 'baseui/button-group';
import { Editor, EditorState, convertFromRaw, convertToRaw } from 'draft-js';
import { Input, SIZE } from 'baseui/input';

import '../style/Note.css';

import Sidebar from '../Sidebar';

export default () => {
  const userId = useSelector(state => state.userId);
  const { noteId } = useParams();

  const loggedIn = useSelector(state => state.loggedIn);

  const [content, setContent] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [deleted, setDeleted] = React.useState(false);

  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty()
  )

  const cancelEditing = () => {
    setEditMode(false);
    const contentState = convertFromRaw(JSON.parse(content));
    setEditorState(
      () => EditorState.createWithContent(contentState)
    );
  }

  const deleteNote = async () => {
    if (title === "") {
      // setAlertMessages(["You have not provided a title"]);
      return;
    }
    try {
      const API_CALL_URL = 'http://192.168.43.1:3001/notes/'+noteId;
      const res = await fetch(API_CALL_URL, {
        method: "DELETE",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          noteId: noteId
        })
      });
      const data = await res.json();
      setContent(data.data.note.content);
      setDeleted(true);
    } catch (error) {
      console.error(error);
    }
  }

  const saveNote = async (event) => {
    setEditMode(false);
    event.preventDefault();
    if (title === "") {
      // setAlertMessages(["You have not provided a title"]);
      return;
    }
    try {
      const API_CALL_URL = 'http://192.168.43.1:3001/notes/'+noteId;
      const res = await fetch(API_CALL_URL, {
        method: "PATCH",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: title,
          contents: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
        })
      });
      const data = await res.json();
      setContent(data.data.note.content);
    } catch (error) {
      console.error(error);
    }
  }


  React.useEffect(() => {
    async function getNoteData() {
      try {
        const API_URL = 'http://192.168.43.1:3001/notes/id/'+noteId
        const res = await fetch(API_URL);
        const data = await res.json();

        if (data.data.note.owner !== userId) return;
        setContent(data.data.note.content);

        const contentState = convertFromRaw(JSON.parse(data.data.note.content));
        setEditorState(
          () => EditorState.createWithContent(contentState)
        )

        setTitle(data.data.note.title);
      } catch (error) {
        console.error(error.stack);
      }
    }
    getNoteData();
  }, [noteId, userId]);

  if (loggedIn === false) return <Redirect to="/login"/>;
  if (deleted) return <Redirect to="/dashboard"/>;

  return (
	<div className="dashboard-container">
	  <div className="dashboard-sidebar-container">
		<Sidebar />
	  </div>
	  <div className="note-page-content dashboard-content-container">
		{
		  title === "" 
		  ? <></> 
		  : <ButtonGroup>
			  {
				  editMode
				  ? <><Button onClick={cancelEditing}>Cancel</Button>
            <Button onClick={saveNote}>Save</Button></>
				  : <Button onClick={() => setEditMode(true)}>Edit</Button>
        }
        <Button onClick={deleteNote}>Delete</Button>
			</ButtonGroup>
    }
    {
      editMode
      ? <div className="edit-note-title-container">
        <Input
          className="edit-note-title-input"
          onChange={e => setTitle(e.target.value)}
          autoFocus
          value={title}
          size={SIZE.large}
          placeholder="Click here to edit title"
          overrides={{
          Input: {
            style: ({ $theme }) => {
              return {
                border: 'none !important',
                backgroundColor: '#fff',
                fontFamily: 'ubuntu',
                fontSize: '2rem'
              }
            }
          }
          }}
        >
        </Input>
        </div>
      : <h1>{ title }</h1>
    }
		<Editor
      autofocus
		  editorState={editorState}
		  onChange={setEditorState}
		  readOnly={!editMode}
		/>
	  </div>
	</div>
  )
}
