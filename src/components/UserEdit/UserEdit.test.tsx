import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useUserStore } from "../../state/user.state";
import UserEdit from "./UserEdit";

const queryClient = new QueryClient();

describe("UserEdit component", () => {
  beforeEach(() => {
    useUserStore.setState({
      userId: 1,
      isLoggedIn: true,
      userData: {
        id: 1,
        name: "Leanne Graham",
        username: "Bret",
        email: "Sincere@april.biz",
        address: {
          street: "Kulas Light",
          suite: "Apt. 556",
          city: "Gwenborough",
          zipcode: "92998-3874",
          geo: {
            lat: "-37.3159",
            lng: "81.1496",
          },
        },
        phone: "1-770-736-8031 x56442",
        website: "hildegard.org",
        company: {
          name: "Romaguera-Crona",
          catchPhrase: "Multi-layered client-server neural-net",
          bs: "harness real-time e-markets",
        },
      },
    });
  });

  it("should display the user's name and email address", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserEdit />
        </MemoryRouter>
      </QueryClientProvider>
    );
    screen.debug();
    expect(screen.getByLabelText("Name")).toHaveValue("Leanne Graham");
    expect(screen.getByLabelText("Username")).toHaveValue("Bret");
    expect(screen.getByLabelText("Email")).toHaveValue("Sincere@april.biz");
  });

  it("should update the user's name when the input is changed", async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <UserEdit />
        </MemoryRouter>
      </QueryClientProvider>
    );
    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Jane Doe" },
    });
    fireEvent.change(screen.getByLabelText("Email"), {
      target: { value: "janedoe@email.com" },
    });
    fireEvent.click(screen.getByRole("button"));
    await waitFor(() =>
      expect(useUserStore.getState().userData?.name).toEqual("Jane Doe")
    );
    await waitFor(() =>
      expect(useUserStore.getState().userData?.email).toEqual(
        "janedoe@email.com"
      )
    );
  });
});
