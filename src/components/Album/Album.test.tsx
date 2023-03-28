import { render, screen } from "@testing-library/react";
import Album from "./Album";
import { useQuery, useMutation } from "@tanstack/react-query";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

vi.mock("@tanstack/react-query");

describe("Album", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the Album component", async () => {
    const mockData = [
      {
        id: 1,
        albumId: 1,
        title: "Photo 1",
        url: "https://via.placeholder.com/600/92c952",
        thumbnailUrl: "https://via.placeholder.com/150/92c952",
      },
      {
        id: 2,
        albumId: 1,
        title: "Photo 2",
        url: "https://via.placeholder.com/600/771796",
        thumbnailUrl: "https://via.placeholder.com/150/771796",
      },
    ];

    // Mock the useQuery hook to return the mock data
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: false,
      data: mockData,
    });

    const albumData = {
      id: 1,
      userId: 1,
      title: "My Album",
    };

    const deletePhotoMutation = {
      isLoading: false,
      mutate: vi.fn(),
    };
    (useMutation as jest.Mock).mockReturnValue(deletePhotoMutation);

    render(
      <MemoryRouter>
        <Album data={albumData} />
      </MemoryRouter>
    );

    expect(screen.queryByRole("status")).toBeNull();

    // Check if the error message is not displayed
    expect(screen.queryByText("Error")).toBeNull();

    // Check if the Photo component is rendered for each item in the data array
    expect(screen.getByText("Photo 1")).toBeInTheDocument();
    expect(screen.getByText("Photo 2")).toBeInTheDocument();
  });

  it("renders the spinner when data is loading", async () => {
    // Mock the useQuery hook to return isLoading true
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: true,
      isError: false,
      data: [],
    });

    const albumData = {
      id: 1,
      userId: 1,
      title: "My Album",
    };

    const { getByRole } = render(<Album data={albumData} />);

    // Check if the spinner is displayed
    expect(screen.getByRole("status")).toBeInTheDocument();
  });

  it("renders the error message when there is an error", async () => {
    // Mock the useQuery hook to return isError true
    (useQuery as jest.Mock).mockReturnValue({
      isLoading: false,
      isError: true,
      data: [],
    });

    const albumData = {
      id: 1,
      userId: 1,
      title: "My Album",
    };

    render(<Album data={albumData} />);

    // Check if the error message is displayed
    expect(screen.getByText("Error")).toBeInTheDocument();
  });
});
