import React, { useEffect, useState } from "react";

import "./CoverInput.css";

const assetsUrl = process.env.REACT_APP_API_URL;

export const CoverInput = ({ value, onChange }) => {
  const [source, setSource] = useState("");

  useEffect(() => {
    if (value) {
      setSource(
        /^http[s]?:\/\//.test(value) ? value : `${assetsUrl}/uploads/${value}`
      );
    }
  }, [value]);

  const showPreview = (file) => {
    const reader = new FileReader();
    reader.onloadend = (event) => {
      setSource(event.target.result);
    };

    reader.readAsDataURL(file);
  };

  return (
    <div className="cover-input-container">
      <img src={source} alt="movie_poster" />
      <input
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          onChange(file);
          showPreview(file);
        }}
      />
    </div>
  );
};
