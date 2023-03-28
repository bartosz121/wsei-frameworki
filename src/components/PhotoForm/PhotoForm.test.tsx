import { render } from "@testing-library/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import PhotoForm from "./PhotoForm";
import { useUserStore } from "../../state/user.state";
import { useAppDataStore } from "../../state/appData.state";
import { vi } from "vitest";
import { MemoryRouter } from "react-router-dom";

const initialUserStoreData = useUserStore.getState();
const initialAppStoreData = useAppDataStore.getState();

vi.mock("axios");
const queryClient = new QueryClient();

describe("PhotoForm component", () => {
  beforeEach(() => {
    useUserStore.setState(initialUserStoreData);
    useAppDataStore.setState(initialAppStoreData);
  });

  it("should render title and url inputs", () => {
    const { getByPlaceholderText } = render(
      <QueryClientProvider client={queryClient}>
        <MemoryRouter>
          <PhotoForm />
        </MemoryRouter>
      </QueryClientProvider>
    );

    expect(getByPlaceholderText("Title")).toBeInTheDocument();
    expect(getByPlaceholderText("Url")).toBeInTheDocument();
  });
});
