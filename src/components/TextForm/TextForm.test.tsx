import axios from "axios";
import { render, fireEvent, screen } from "@testing-library/react";
import TextForm from "./TextForm";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

describe("TextForm component", () => {
  it("renders the form correctly", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <TextForm type="post" />
      </MemoryRouter>
    );
    expect(getByPlaceholderText("Title")).toBeInTheDocument();
    expect(getByPlaceholderText("Type your message")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveTextContent("Submit");
  });

  it("updates the state when the form values change", () => {
    const { getByPlaceholderText } = render(
      <MemoryRouter>
        <TextForm type="comment" />
      </MemoryRouter>
    );
    const titleInput = getByPlaceholderText("Title");
    const bodyTextarea = getByPlaceholderText("Type your message");

    fireEvent.change(titleInput, { target: { value: "New title" } });
    expect(titleInput).toHaveValue("New title");

    fireEvent.change(bodyTextarea, { target: { value: "New body" } });
    expect(bodyTextarea).toHaveValue("New body");
  });

  it("submits the form correctly", async () => {
    const mockAxios = vi.spyOn(axios, "post");
    mockAxios.mockResolvedValue({
      data: { id: 1, title: "Test post", body: "Test body" },
    });

    const { getByPlaceholderText, getByRole } = render(
      <MemoryRouter>
        <TextForm type="post" />
      </MemoryRouter>
    );
    const titleInput = getByPlaceholderText("Title");
    const bodyTextarea = getByPlaceholderText("Type your message");
    const submitButton = getByRole("button", { name: "Submit" });

    fireEvent.change(titleInput, { target: { value: "Test post" } });
    fireEvent.change(bodyTextarea, { target: { value: "Test body" } });
    fireEvent.click(submitButton);

    expect(mockAxios).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/posts",
      { userId: 1, title: "Test post", body: "Test body" }
    );
  });
});
