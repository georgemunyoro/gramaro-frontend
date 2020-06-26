import * as React from 'react';
import { Navigation } from 'baseui/side-navigation';

export default () => {
  const [activeItemId, setActiveItemId] = React.useState("#notes");

  return (
	<Navigation
	  items={[
		{ title: "Notes", itemId: "#notes" },
		{ title: "Archive", itemId: "#archive" },
		{ title: "Trash", itemId: "#trash" }
	  ]}

	  activeItemId={activeItemId}
	  onChange={({item}) => setActiveItemId(item.itemId)}

	/>
  )
}

