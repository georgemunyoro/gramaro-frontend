import * as React from 'react';
import { Editor, EditorState, RichUtils } from 'draft-js';
import { Button } from "baseui/button"

import 'draft-js/dist/Draft.css';

export default ({ value }) => {
  const [editorState, setEditorState] = React.useState(
    () => EditorState.createEmpty()
  );

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);

    if (newState) {
      setEditorState({ newState });
      return 'handled';
    }

    return 'not-handled';
  }

  return (
    <div className="note-editor-container">
      <Button>B</Button>
      <Editor
        editorState={editorState}
        handleKeyCommand={handleKeyCommand}
        onChange={(newEditorState) => setEditorState(newEditorState)}
      />
    </div>
  );
}
