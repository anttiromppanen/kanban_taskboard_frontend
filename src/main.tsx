import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import AuthProvider from "./components/AuthProvider";
import ErrorPage from "./components/ErrorPage";
import HeaderNav from "./components/HeaderNav";
import Login from "./components/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import "./index.css";
import Home from "./pages/Home";
import Taskboard from "./pages/Taskboard";

const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoute />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/taskboard/:id",
        element: <Taskboard />,
      },
    ],
  },
  {
    path: "/test",
    element: <HeaderNav title="Test" />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Login />,
    errorElement: <ErrorPage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterProvider router={router} />
        <ReactQueryDevtools initialIsOpen={false} />
      </AuthProvider>
    </QueryClientProvider>
  </React.StrictMode>,
);
