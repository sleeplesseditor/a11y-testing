import { render } from "@testing-library/react";
import { toHaveNoViolations } from "jest-axe";
import * as React from "react";

import App from "./App";
import { axe } from "./axe-helper";

expect.extend(toHaveNoViolations);

it("should have no A11y errors caught by jest-axe", async () => {
  const { container } = render(<App />);
  const results = await axe(container);
  expect(results).toHaveNoViolations();
});
