import { render, fireEvent } from "@testing-library/react";
import { useNavigate } from "react-router-dom";
import { vi } from "vitest";

import AuthorBtn from "./AuthorBtn";

vi.mock("react-router-dom", () => ({
  useNavigate: vi.fn(),
}));

describe("AuthorBtn", () => {
  it("renders AuthorBtn component", () => {
    const { getByRole } = render(<AuthorBtn userId={9} />);
    expect(getByRole("button")).toBeInTheDocument();
  });

  it("redirects to user profile when clicked", () => {
    const userId = 10;
    const mockNavigate = vi.fn();
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);

    const { getByRole } = render(<AuthorBtn userId={userId} />);

    fireEvent.click(getByRole("button"));

    expect(mockNavigate).toBeCalledWith(`/user/${userId}`);
  });
});
