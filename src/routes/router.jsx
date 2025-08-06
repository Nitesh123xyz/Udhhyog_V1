import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import EmployeeDashboard from "../pages/Dashboard";
import LoginPage from "../pages/Login";
import AddUser from "../pages/AddUser";
import UpdateUser from "../pages/UpdateUser";
import ForgotPassword from "../pages/ForgotPassword";
import Permissions from "../pages/Permission";
import PageNotFound from "../pages/PageNotFound";
import Seo from "../pages/Seo";
import AdminLayout from "../components/commonLayout";
import Comman from "../components/Comman";

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <EmployeeDashboard />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/add-user",
        element: <AddUser />,
      },
      {
        path: "/update-user",
        element: <UpdateUser />,
      },
      {
        path: "/permission",
        element: <Permissions />,
      },
      {
        path: "/seo",
        element: <Seo />,
      },
      {
        path: "/common",
        element: <AdminLayout />,
      },
      {
        path: "/con",
        element: <Comman />,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
