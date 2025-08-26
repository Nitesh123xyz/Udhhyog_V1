import { createBrowserRouter } from "react-router-dom";
import { lazy } from "react";
import App from "../App";
import AddUser from "../pages/AddUser";
import UpdateUser from "../pages/UpdateUser";
import ProtectedRoute from "../components/ProtectedRoute";

// ---------------------------------------------------

const EmployeeTable = lazy(() => import("../pages/EmployeeTable"));
const Permissions = lazy(() => import("../pages/Permission"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const LoginPage = lazy(() => import("../pages/Login"));
const ResetPassword = lazy(() => import("../pages/ResetPassword"));
const Setting = lazy(() => import("../pages/Setting"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const CommonLayout = lazy(() => import("../components/commonLayout"));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/reset-password",
        element: <ResetPassword />,
        caseSensitive: true,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/employees",
        element: (
          <ProtectedRoute>
            <CommonLayout>
              <EmployeeTable />
            </CommonLayout>
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/permission",
        element: (
          <ProtectedRoute>
            <Permissions />
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/settings",
        element: (
          <ProtectedRoute>
            <Setting />
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/add-user",
        element: (
          <ProtectedRoute>
            <AddUser />
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/update-user",
        element: (
          <ProtectedRoute>
            <UpdateUser />
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
