import { render } from "@testing-library/react";

import Spinner from "./Spinner";

describe("Spinner", () => {
  it("renders Spinner component", () => {
    const { getByRole } = render(<Spinner />);

    expect(getByRole("status")).toBeInTheDocument();
  });
});
