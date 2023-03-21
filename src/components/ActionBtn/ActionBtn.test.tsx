import { render, screen, fireEvent } from "@testing-library/react";
import { vi } from "vitest";

import ActionBtn from "./ActionBtn";

describe("ActionBtn", () => {
  it("renders ActionBtn component", () => {
    const onClickMock = vi.fn();

    const { getByTestId, getByRole } = render(
      <ActionBtn
        icon={<div data-testid="icon">authorIcon</div>}
        text="testText"
        onClick={onClickMock}
      />
    );

    expect(screen.queryByText(/testText/)).toBeInTheDocument();

    const icon = getByTestId("icon");
    expect(icon).toBeInTheDocument();

    fireEvent.click(getByRole("button"));
    expect(onClickMock).toBeCalled();
  });
});
