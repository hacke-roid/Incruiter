import React from "react";
import { RouterProvider, createBrowserRouter } from "react-router";
import Login from "./Screen/Login";
import Register from "./Screen/Register";
import QuizDashboard from "./components/QuizDashboard";
import ForgotPassword from "./Screen/PasswordReset";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
  {path: "/dashboard", element: <QuizDashboard/>},
  { path: '/recovery', element: <ForgotPassword/>}
]);
const Routers = () => {
  return <RouterProvider router={router} />;
};

export default Routers;
