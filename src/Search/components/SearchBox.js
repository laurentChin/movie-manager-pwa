import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { selectMatches } from "Search/Search.selectors";

import { reset, search } from "Search/actions";

import "./SearchBox.css";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const [isSearching, setSearching] = useState(false);
  const [debounceTimeout, setDebounceTimeout] = useState(null);
  const matches = useSelector(selectMatches);

  return (
    <div className="searchbox">
      <input
        type="search"
        onChange={(e) => {
          const { value } = e.currentTarget;
          clearTimeout(debounceTimeout);
          const isFieldEmpty = !/\S/.test(value);

          setSearching(!isFieldEmpty && value.length >= 2);
          if (value.length < 2 || isFieldEmpty) return dispatch(reset());

          setDebounceTimeout(
            setTimeout(() => {
              dispatch(search(value.trim()));
            }, 400)
          );
        }}
      />
      {isSearching && <span>{matches.length} results.</span>}
    </div>
  );
};
