import React, { useState, useContext } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Login from "./pages/Login/Login";
import { AppContextProvider } from "./context/AppContext";

import { AppContext } from "./context/AppContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AppRoot from "./routes/AppRoot/AppRoot";
import Home from "./pages/Home/Home";
import PhotoHome from "./pages/PhotoHome/PhotoHome";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import UserPage from "./pages/UserPage/UserPage";
import PostPage from "./pages/PostPage/PostPage";
import AlbumPage from "./pages/AlbumPage/AlbumPage";
import UsersHome from "./pages/UsersHome/UsersHome";

function App() {
  const {
    addedPosts,
    addedComments,
    addedPhotos,
    deletedPosts,
    deletedComments,
    deletedPhotos,
  } = useContext(AppContext);

  const queryClient = new QueryClient();

  // <div className="App">
  //   <PhotoForm />
  //   <TextForm type="post" />
  //   <TextForm type="comment" />
  //   {/* <Feed feedType={FeedType.Album} /> */}
  //   {/* <Feed feedType={FeedType.Photo} /> */}
  //   <Feed<IPost>
  //     component={Post}
  //     apiEndpoint="posts"
  //     addedArray={addedPosts}
  //     deletedArray={deletedPosts}
  //   />
  // </div>
  return (
    <AppContextProvider>
      <QueryClientProvider client={queryClient}>
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
              <Route path="posts" element={<Home />} />
              <Route path="users" element={<UsersHome />} />
              <Route path="user/:userId" element={<UserPage />} />
              <Route path="post/:postId" element={<PostPage />} />
              <Route path="album/:albumId" element={<AlbumPage />} />
            </Route>
            <Route path="/login" element={<Login />} />
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </AppContextProvider>
  );
}

export default App;

// const getFeedComponent = (fType: FeedType): FeedTypeInfo => {
//   switch (fType) {
//     case FeedType.Post:
//       return {
//         component: Post,
//         apiEndpoint: "posts",
//         addedArray: addedPosts,
//         deletedArray: deletedPosts,
//       };
//     case FeedType.Photo:
//       return {
//         component: Photo,
//         apiEndpoint: "photos?_expand=album",
//         addedArray: addedPhotos,
//         deletedArray: deletedPhotos,
//       };
//     case FeedType.Comment:
//       return {
//         component: Comment,
//         apiEndpoint: "comments?_expand=post",
//         addedArray: addedComments,
//         deletedArray: deletedComments,
//       };
//     case FeedType.Album:
//       return {
//         component: Album,
//         apiEndpoint: "albums",
//       };
//   }
// };
