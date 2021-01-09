import * as React from 'react';
import { EditorState, RichUtils } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import { Button } from "baseui/button";

import 'draft-js/dist/Draft.css';

export default ({ editMode, editorState, setEditorState }) => {
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return 'handled';
    }

    return 'not-handled';
  }

  return (
    <div className="note-editor-container">
      <Editor
        autofocus
        editorState={editorState}
        onEditorStateChange={setEditorState}
        readOnly={!editMode}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
}
