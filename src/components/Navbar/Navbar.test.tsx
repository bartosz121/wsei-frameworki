import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Navbar from "./Navbar";
import { useUserStore } from "../../state/user.state";

const initialUserStoreData = useUserStore.getState();

describe("Navbar component", () => {
  beforeEach(() => {
    useUserStore.setState(initialUserStoreData);
  });

  test("renders the navigation links", () => {
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const photosLink = screen.getByRole("link", { name: /photos/i });
    const postsLink = screen.getByRole("link", { name: /posts/i });
    const usersLink = screen.getByRole("link", { name: /users/i });
    const myAccountLink = screen.getByRole("link", { name: /my account/i });
    expect(photosLink).toBeInTheDocument();
    expect(postsLink).toBeInTheDocument();
    expect(usersLink).toBeInTheDocument();
    expect(myAccountLink).toBeInTheDocument();
  });

  test("displays the correct link for My Account", () => {
    //@ts-ignore
    useUserStore.setState({ userData: { id: 1 } });
    render(
      <MemoryRouter>
        <Navbar />
      </MemoryRouter>
    );
    const myAccountLink = screen.getByRole("link", { name: /my account/i });
    expect(myAccountLink).toHaveAttribute("href", "/user/1");
  });
});
