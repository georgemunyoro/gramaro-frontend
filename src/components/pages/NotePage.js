import "../style/Note.css";
import "../react-draft-wysiwyg.css";

import { Button, KIND as ButtonKind } from "baseui/button";
import { ButtonGroup } from "baseui/button-group";
import { Input, SIZE } from "baseui/input";
import {
  Modal,
  ModalBody,
  ModalButton,
  ModalFooter,
  ModalHeader,
  ROLE,
} from "baseui/modal";
import { convertFromRaw, convertToRaw, EditorState, RichUtils } from "draft-js";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";
import { useSelector } from "react-redux";
import { Redirect, useParams } from "react-router-dom";

import NoteEditor from "../NoteEditor";
import Sidebar from "../Sidebar";

const NoteDeletionModal = ({ onConfirm, onModalClose }) => {
  // const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Modal
      onClose={onModalClose}
      isOpen={true}
      role={ROLE.dialog}
      autoFocus
      animate
      closeable
    >
      <ModalHeader>Confirm Deletion</ModalHeader>
      <ModalBody>Are you sure you want to delete this note?</ModalBody>
      <ModalFooter>
        <ModalButton
          kind={ButtonKind.tertiary}
          onClick={() => {
            onModalClose();
          }}
        >
          Cancel
        </ModalButton>
        <ModalButton
          onClick={() => {
            onConfirm();
            onModalClose();
          }}
        >
          Yes
        </ModalButton>
      </ModalFooter>
    </Modal>
  );
};

export default () => {
  const userId = useSelector((state) => state.userId);
  const { noteId } = useParams();

  const loggedIn = useSelector((state) => state.loggedIn);

  const [content, setContent] = React.useState("");
  const [editMode, setEditMode] = React.useState(false);
  const [title, setTitle] = React.useState("");
  const [deleted, setDeleted] = React.useState(false);

  const [
    showNoteDeletionConfirmation,
    setShowNoteDeletionConfirmation,
  ] = React.useState(false);

  const [editorState, setEditorState] = React.useState(() =>
    EditorState.createEmpty()
  );

  const cancelEditing = () => {
    setEditMode(false);
    const contentState = convertFromRaw(JSON.parse(content));
    setEditorState(() => EditorState.createWithContent(contentState));
  };

  const deleteNote = async () => {
    if (title === "") {
      // setAlertMessages(["You have not provided a title"]);
      return;
    }
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/notes/" + noteId,
        {
          method: "DELETE",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            noteId: noteId,
          }),
        }
      );
      const data = await res.json();
      setContent(data.data.note.content);
      setDeleted(true);
    } catch (error) {
      console.error(error);
    }
  };

  const saveNote = async (event) => {
    setEditMode(false);
    event.preventDefault();
    if (title === "") {
      // setAlertMessages(["You have not provided a title"]);
      return;
    }
    try {
      const res = await fetch(
        process.env.REACT_APP_API_URL + "/notes/" + noteId,
        {
          method: "PATCH",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: title,
            contents: JSON.stringify(
              convertToRaw(editorState.getCurrentContent())
            ),
          }),
        }
      );
      const data = await res.json();
      console.log(JSON.stringify(editorState.getCurrentContent()));
      console.log(data);
      setContent(data.data.note.content);
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    async function getNoteData() {
      try {
        const res = await fetch(
          process.env.REACT_APP_API_URL + "/notes/id/" + noteId
        );
        const data = await res.json();

        if (data.data.note.owner !== userId) return;
        setContent(data.data.note.content);

        const contentState = convertFromRaw(data.data.note.content);
        setEditorState(() => EditorState.createWithContent(contentState));

        setTitle(data.data.note.title);
      } catch (error) {
        console.error(error.stack);
      }
    }
    getNoteData();
  }, [noteId, userId]);

  if (loggedIn === false) return <Redirect to="/login" />;
  if (deleted) return <Redirect to="/dashboard" />;

  return (
    <div className="dashboard-container">
      {showNoteDeletionConfirmation && (
        <NoteDeletionModal
          onConfirm={() => {
            deleteNote();
          }}
          onModalClose={() => setShowNoteDeletionConfirmation(false)}
        />
      )}
      <div className="dashboard-sidebar-container">
        <Sidebar />
      </div>
      <div
        className="note-page-content dashboard-content-container"
        style={{
          width: "70%",
          zIndex: 0,
        }}
      >
        {title === "" ? (
          <></>
        ) : (
          <ButtonGroup>
            {editMode ? (
              <>
                <Button onClick={cancelEditing}>Cancel</Button>
                <Button onClick={saveNote}>Save</Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)}>Edit</Button>
            )}
            <Button onClick={() => setShowNoteDeletionConfirmation(true)}>
              Delete
            </Button>
          </ButtonGroup>
        )}
        {editMode ? (
          <div className="edit-note-title-container">
            <Input
              className="edit-note-title-input"
              onChange={(e) => setTitle(e.target.value)}
              autoFocus
              value={title}
              size={SIZE.large}
              placeholder="Click here to edit title"
              overrides={{
                Input: {
                  style: ({ $theme }) => {
                    return {
                      border: "none !important",
                      backgroundColor: "#fff",
                      fontFamily: "ubuntu",
                      fontSize: "2rem",
                    };
                  },
                },
              }}
            ></Input>
          </div>
        ) : (
          <h1>{title}</h1>
        )}
        <NoteEditor
          editMode={editMode}
          editorState={editorState}
          setEditorState={setEditorState}
        />
      </div>
    </div>
  );
};
