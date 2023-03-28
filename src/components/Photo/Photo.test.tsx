import { render, screen } from "@testing-library/react";
import Photo from "./Photo";
import { useUserStore } from "../../state/user.state";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { MemoryRouter } from "react-router-dom";

const initialUserStoreData = useUserStore.getState();

const photoData = {
  id: 1,
  albumId: 1,
  title: "accusamus beatae ad facilis cum similique qui sunt",
  url: "https://via.placeholder.com/600/92c952",
  thumbnailUrl: "https://via.placeholder.com/150/92c952",
  album: { id: 1, userId: 2, title: "album 1" },
};

const queryClient = new QueryClient();

describe("Photo component", () => {
  beforeEach(() => {
    useUserStore.setState(initialUserStoreData);
  });

  test("renders photo title", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Photo data={photoData} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const titleElement = screen.getByText(photoData.title);
    expect(titleElement).toBeInTheDocument();
  });

  test("does not render the 'Delete' button if the photo is not owned by the logged-in user", () => {
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Photo data={photoData} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    const deleteButton = screen.queryByText("Delete");
    expect(deleteButton).not.toBeInTheDocument();
  });

  test("renders the 'Delete' button if the photo is owned by the logged-in user", () => {
    //@ts-ignore
    useUserStore.setState({ userData: { id: 1 } });
    const photoDataWithAlbum = {
      ...photoData,
      album: { ...photoData.album, userId: 1 },
    };
    render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <Photo data={photoDataWithAlbum} />
        </MemoryRouter>
      </QueryClientProvider>
    );
    expect(
      document.getElementsByClassName("icon-tabler-trash").item(0)
    ).toBeInTheDocument();
  });
});
