import * as React from "react";
import { RichUtils } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

import "draft-js/dist/Draft.css";

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
