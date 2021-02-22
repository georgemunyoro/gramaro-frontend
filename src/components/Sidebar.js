import { Navigation } from "baseui/side-navigation";
import React, { useState } from "react";

export default () => {
  const [activeItemId, setActiveItemId] = useState("#notes");

  const onChange = ({ item }) => {
    setActiveItemId(item.itemId);
  };

  return (
    <Navigation
      items={[
        { title: "Notes", itemId: "#notes" },
        { title: "Archive", itemId: "#archive" },
        { title: "Trash", itemId: "#trash" },
      ]}
      activeItemId={activeItemId}
      onChange={onChange}
    />
  );
};
