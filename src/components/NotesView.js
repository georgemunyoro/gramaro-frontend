import * as React from 'react';
import NotesList from './NotesList';

export default ({ userId }) => {

  const [value, setValue] = React.useState('');
  return (
	<div className="notes-view-container">
	  <NotesList userId={userId} filter={value} />
	</div>
	);
}
