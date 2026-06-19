import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./pages/Register";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/register",
      element: <Register />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/user/dashboard",
      element: <Dashboard />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
