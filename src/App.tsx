import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import AppRoot from "./routes/AppRoot/AppRoot";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import Login from "./pages/Login/Login";
import PostHome from "./pages/PostHome/PostHome";
import PhotoHome from "./pages/PhotoHome/PhotoHome";
import UserPage from "./pages/UserPage/UserPage";
import PostPage from "./pages/PostPage/PostPage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import UsersHome from "./pages/UsersHome/UsersHome";
import UserEdit from "./components/UserEdit/UserEdit";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

function App() {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ReactQueryDevtools initialIsOpen={false} />
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <AppRoot />
              </ProtectedRoute>
            }
          >
            <Route index element={<PhotoHome />} />
            <Route path="posts" element={<PostHome />} />
            <Route path="users" element={<UsersHome />} />
            <Route path="user/:userId" element={<UserPage />} />
            <Route path="user/edit" element={<UserEdit />} />
            <Route path="post/:postId" element={<PostPage />} />
            <Route path="album/:albumId" element={<AlbumPage />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
