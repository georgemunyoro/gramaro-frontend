import * as React from 'react';
import { Editor, EditorState } from 'draft-js';

import 'draft-js/dist/Draft.css';

export default ({ value }) => {
  const [editorState, setEditorState] = React.useState(
	() => EditorState.createEmpty()
  );

  return (
	<div className="note-editor-container">
	  <Editor 
		editorState={ editorState } 
		onChange={ setEditorState }
	  />
	</div>
  );
}

