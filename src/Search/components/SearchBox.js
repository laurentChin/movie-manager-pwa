import React, { useState } from "react";
import "./SearchBox.css";

const box = ({ search, reset, matches }) => {
  const [isSearching, setSearching] = useState(false);

  return (
    <div className="searchbox">
      <input
        type="search"
        onChange={e => {
          const { value } = e.currentTarget;
          const isFieldEmpty = !/\S/.test(value);

          setSearching(!isFieldEmpty);

          if (isFieldEmpty) {
            reset();
          } else {
            search(value.trim());
          }
        }}
      />
      {isSearching && <span>{matches.length} results.</span>}
    </div>
  );
};

export default box;
