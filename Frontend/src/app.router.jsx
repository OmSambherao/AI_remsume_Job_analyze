import { createBrowserRouter } from "react-router";

import Login from "./features/auth/pages/Login";
import Register from "./features/auth/pages/Register";
import Protected from "./features/auth/components/Protected";
import home from "./features/interview/pages/home";
import Interview from "./features/interview/pages/Interview";
export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/",
    element: (
      <Protected>
        <home />
      </Protected>
    ),
  },
  {
    path: "/interview/:InterviewId",
    element: (
      <Protected>
        <Interview />
      </Protected>
    ),
  },
]);
