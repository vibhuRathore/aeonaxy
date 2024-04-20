import { Navigate, createBrowserRouter } from "react-router-dom";
import GetStarted from "./pages/get-started/GetStarted";
import SignUp from "./pages/signup/SignUp";
import UserTypeChoice from "./pages/user-type-choice/UserTypeChoice";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Navigate to="/sign-up" replace />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "/get-started",
    element: <GetStarted />,
  },
  {
    path: "/choose-user-type",
    element: <UserTypeChoice />,
  },
]);

export default router;
