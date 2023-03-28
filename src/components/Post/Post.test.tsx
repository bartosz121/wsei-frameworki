import { render, screen } from "@testing-library/react";
import Post from "./Post";
import { useUserStore } from "../../state/user.state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

const initialUserStoreData = useUserStore.getState();

const postData = {
  id: 1,
  userId: 10,
  title:
    "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  body: "quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto",
};

const queryClient = new QueryClient();

describe("Post component", () => {
  beforeEach(() => {
    useUserStore.setState(initialUserStoreData);
  });

  test("renders post title", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Post data={postData} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const titleElement = screen.getByText(postData.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("does not render the 'Delete' button if the post is not owned by the logged-in user", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Post data={postData} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const deleteButton = screen.queryByText("Delete");
    expect(deleteButton).not.toBeInTheDocument();
  });

  test("renders the 'Delete' button if the post is owned by the logged-in user", () => {
    //@ts-ignore
    useUserStore.setState({ userData: { id: 1 } });
    const postDataOwnerUserId1 = {
      ...postData,
      userId: 1,
    };
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Post data={postDataOwnerUserId1} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    screen.debug();
    expect(
      document.getElementsByClassName("icon-tabler-trash").item(0)
    ).toBeInTheDocument();
  });
});
