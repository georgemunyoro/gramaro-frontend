import "draft-js/dist/Draft.css";

import { Button } from "baseui/button";
import { EditorState, RichUtils } from "draft-js";
import * as React from "react";
import { Editor } from "react-draft-wysiwyg";

export default ({ editMode, editorState, setEditorState, style }) => {
  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState(newState);
      return "handled";
    }

    return "not-handled";
  };

  return (
    <div style={style} className="note-editor-container">
      <Editor
        autofocus
        editorState={editorState}
        onEditorStateChange={setEditorState}
        readOnly={!editMode}
        handleKeyCommand={handleKeyCommand}
      />
    </div>
  );
};
