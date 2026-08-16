import React from "react";
import { render, screen } from "@testing-library/react";

import Duration from "./Duration";

test("Duration properly renders the value passed in props", () => {
  render(<Duration value="125" />);

  expect(screen.getByText("125m (2h05)")).toBeInTheDocument();
});
