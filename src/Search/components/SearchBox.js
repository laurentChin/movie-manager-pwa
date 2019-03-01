import React, { useState } from "react";
import "./SearchBox.css";

const box = ({ search, reset, matches }) => {
  const [isSearching, setSearching] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);

  return (
    <div className="searchbox">
      <input
        type="search"
        onChange={e => {
          const { value } = e.currentTarget;
          clearTimeout(debounceTimeout);
          const isFieldEmpty = !/\S/.test(value);

          setSearching(!isFieldEmpty && value.length >= 2);
          if (value.length < 2) return reset();
          if (isFieldEmpty) return reset();

          setDebounceTimeout(
            setTimeout(() => {
              search(value.trim());
            }, 400)
          );
        }}
      />
      {isSearching && <span>{matches.length} results.</span>}
    </div>
  );
};

export default box;
