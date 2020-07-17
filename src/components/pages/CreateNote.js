import * as React from 'react';
import { Input, SIZE } from 'baseui/input';
import { Button } from 'baseui/button';
import { Notification } from 'baseui/notification';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { Editor, EditorState, convertToRaw } from 'draft-js';
import 'draft-js/dist/Draft.css';

// Icons
import { Upload, Hide } from 'baseui/icon';
import DeleteAlt from 'baseui/icon/delete-alt';

import '../style/CreateNote.css';

export default () => {
  const [editorState, setEditorState] = React.useState(
	() => EditorState.createEmpty()
  );

  const userId = useSelector(state => state.userId);
  const loggedIn = useSelector(state => state.loggedIn);

  const [alertMessages, setAlertMessages] = React.useState([]);
  const [title, setTitle] = React.useState("");
  const saveNote = async (event) => {
	event.preventDefault();
	if (title === "") {
	  setAlertMessages(["You have not provided a title"]);
	  return;
	}
	try {
	  const API_CALL_URL = 'http://192.168.43.1:3001/notes';
	  const res = await fetch(API_CALL_URL, {
		method: "POST",
		headers: {
		  'Accept': 'application/json',
		  'Content-Type': 'application/json'
		},
		  body: JSON.stringify({
			owner: userId,
			title: title,
			contents: JSON.stringify(convertToRaw(editorState.getCurrentContent()))
		  })
	  });
	  const data = await res.json();
	  console.clear();
	  console.log(editorState.getCurrentContent().getPlainText())
	  console.log(data);
	} catch (error) {
	  console.error(error);
	}
  }

  const archiveNote = async (event) => {
	event.preventDefault();
  }

  const deleteNote = async (event) => {
	event.preventDefault();
  }

  if (loggedIn === false) return <Redirect to="/login"/>

  return (

	<div className="create-note-container">
	  {
		alertMessages.map(alertMessage => {
		  return <Notification key={1}>{ alertMessage }</Notification>
		})
	  }
	  <Input
		  className="create-note-title-input"
		  onChange={e => setTitle(e.target.value)}
		  autoFocus
		  size={SIZE.large}
		  placeholder="Click here to edit title"
		  overrides={{
			Input: {
			  style: ({ $theme }) => {
				return {
				  backgroundColor: '#fff',
				  fontFamily: 'ubuntu',
				  marginBottom: '0.2rem',
				  fontSize: '2rem'
				}
			  }
			}
		  }}
		>
	  </Input>
	  <form>
		<div className="note-editor-container">
		  <Editor 
			editorState={ editorState } 
			onChange={ setEditorState }
		  />
		</div>
		<Button onClick={saveNote} startEnhancer={Upload}>Save</Button>
		<Button onClick={archiveNote} startEnhancer={Hide}>Archive</Button>
		<Button onClick={deleteNote} startEnhancer={DeleteAlt}>Delete</Button>
	  </form>
	</div>
  )

}

