import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { useUserStore } from "../../state/user.state";

import ProtectedRoute from "./ProtectedRoute";

const initialStoreState = useUserStore.getState();

describe("ProtectedRoute", () => {
  beforeEach(() => {
    useUserStore.setState(initialStoreState);
  });

  it("redirects to /login if not logged in", () => {
    render(
      <MemoryRouter initialEntries={["/", "/login"]}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>protected content</div>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<div>login route</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/protected content/)).toBeNull();
    expect(screen.getByText(/login route/)).toBeInTheDocument();
  });

  it("renders child if AppContext.isLoggedIn is true", () => {
    useUserStore.setState({ isLoggedIn: true });

    render(
      <MemoryRouter initialEntries={["/", "/login"]} initialIndex={0}>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <div>protected content</div>
              </ProtectedRoute>
            }
          ></Route>
          <Route path="/login" element={<div>login route</div>} />
        </Routes>
      </MemoryRouter>
    );

    expect(screen.queryByText(/login route/)).toBeNull();
    expect(screen.getByText(/protected content/)).toBeInTheDocument();
  });
});
