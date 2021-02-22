import "../react-draft-wysiwyg.css";
import "../style/CreateNote.css";

import { Button } from "baseui/button";
// Icons
import { Hide, Upload } from "baseui/icon";
import DeleteAlt from "baseui/icon/delete-alt";
import { Input, SIZE } from "baseui/input";
import { Notification } from "baseui/notification";
import { convertToRaw, EditorState, RichUtils } from "draft-js";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from "react-redux";
import { Redirect } from "react-router-dom";

export default () => {
  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const userId = useSelector((state) => state.userId);
  const loggedIn = useSelector((state) => state.loggedIn);

  const [alertMessages, setAlertMessages] = React.useState([]);
  const [title, setTitle] = React.useState("");

  const [created, setCreated] = React.useState(false);

  const saveNote = async (event) => {
    event.preventDefault();
    if (title === "") {
      setAlertMessages(["You have not provided a title"]);
      return;
    }
    try {
      const res = await fetch(process.env.REACT_APP_API_URL + "/notes", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          owner: userId,
          title: title,
          contents: JSON.stringify(
            convertToRaw(editorState.getCurrentContent())
          ),
        }),
      });
      const data = await res.json();
      setCreated(true);
    } catch (error) {
      console.error(error);
    }
  };

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  const archiveNote = async (event) => {
    event.preventDefault();
  };

  const deleteNote = async (event) => {
    event.preventDefault();
  };

  if (loggedIn === false) return <Redirect to="/login" />;
  if (created) return <Redirect to="/dashboard" />;

  return (
    <div className="create-note-container">
      {alertMessages.map((alertMessage) => {
        return <Notification key={1}>{alertMessage}</Notification>;
      })}
      <Input
        className="create-note-title-input"
        onChange={(e) => setTitle(e.target.value)}
        autoFocus
        size={SIZE.large}
        placeholder="Click here to edit title"
        overrides={{
          Input: {
            style: ({ $theme }) => {
              return {
                backgroundColor: "#fff",
                fontFamily: "ubuntu",
                marginBottom: "0.2rem",
                fontSize: "2rem",
              };
            },
          },
        }}
      ></Input>
      <form>
        <div className="note-editor-container">
          <Editor
            autofocus
            editorState={editorState}
            onEditorStateChange={setEditorState}
            handleKeyCommand={handleKeyCommand}
          />
        </div>
        <Button onClick={saveNote} startEnhancer={Upload}>
          Save
        </Button>
        <Button onClick={archiveNote} startEnhancer={Hide}>
          Archive
        </Button>
        <Button onClick={deleteNote} startEnhancer={DeleteAlt}>
          Delete
        </Button>
      </form>
    </div>
  );
};
