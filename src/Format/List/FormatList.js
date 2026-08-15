import React from "react";

import "./FormatList.css";

import { Format } from "../";

function FormatList({ formats }) {
  return (
    <div className="format-list">
      {formats.map((format) => {
        return (
          <Format key={format.id} label={format.name} logo={format.logo} />
        );
      })}
    </div>
  );
}

export default FormatList;
