import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import ProtectedRoute from "./routes/ProtectedRoute/ProtectedRoute";
import Home from "./pages/Home/Home";
import AppRoot from "./routes/AppRoot/AppRoot";

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: (
//       <ProtectedRoute>
//         <AppRoot />
//       </ProtectedRoute>
//     ),
//     children: [
//       {
//         path: "/post",
//       },
//     ],
//   },
//   {
//     path: "/login",
//     element: <LoginForm />,
//   },
//   // {
//   //   path: "/user/:id",
//   //   element: <UserPage />,
//   // },
// ]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
