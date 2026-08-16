import React from "react";
import { render, screen } from "@testing-library/react";

import Format from "./Format";

test("Format renders the format's logo with an accessible name", () => {
  render(<Format name="DVD" logo="dvd.svg" />);

  const logo = screen.getByAltText("DVD");
  expect(logo).toBeInTheDocument();
  expect(logo).toHaveAttribute("src", expect.stringContaining("dvd.svg"));
});
