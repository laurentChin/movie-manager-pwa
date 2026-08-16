import React from "react";
import { render, screen } from "@testing-library/react";

import FormatList from "./FormatList";

test("FormatList renders one logo per format", () => {
  const formats = [
    { id: 1, name: "Blu-ray", logo: "bluray.svg" },
    { id: 2, name: "DVD", logo: "dvd.svg" },
    { id: 3, name: "4K", logo: "4k.svg" },
  ];

  render(<FormatList formats={formats} />);

  expect(screen.getAllByRole("img")).toHaveLength(3);
  expect(screen.getByAltText("Blu-ray")).toBeInTheDocument();
  expect(screen.getByAltText("DVD")).toBeInTheDocument();
  expect(screen.getByAltText("4K")).toBeInTheDocument();
});
