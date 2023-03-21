import { render, screen, fireEvent } from "@testing-library/react";
import Comment from "./Comment";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUserStore } from "../../state/user.state";

const initialUserStoreData = useUserStore.getState();
const queryClient = new QueryClient();

describe("Comment", () => {
  beforeEach(() => {
    useUserStore.setState(initialUserStoreData);
    //@ts-ignore
    useUserStore.setState({ userData: { email: "userexample@example.com" } });
  });

  const mockCommentData = {
    id: 1,
    postId: 11,
    name: "John Doe",
    body: "Lorem ipsum dolor sit amet",
    email: "john.doe@example.com",
    post: {
      id: 11,
      userId: 12,
      title: "postTitle",
      body: "bodyTitle",
    },
  };

  it("renders the Comment component", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <Comment data={mockCommentData} />
      </QueryClientProvider>
    );
    expect(screen.getByText(mockCommentData.name)).toBeInTheDocument();
    expect(screen.getByText(mockCommentData.body)).toBeInTheDocument();
    expect(screen.getByText(mockCommentData.email)).toBeInTheDocument();
  });

  it("shows the delete button when the comment was made by the logged in user", () => {
    //@ts-ignore
    useUserStore.setState({ userData: { email: mockCommentData.email } });
    render(
      <QueryClientProvider client={queryClient}>
        <Comment data={mockCommentData} />
      </QueryClientProvider>
    );
    expect(screen.getByRole("button")).toBeInTheDocument();
    expect(
      document.getElementsByClassName("icon-tabler-trash").item(0)
    ).toBeInTheDocument();
  });
});
