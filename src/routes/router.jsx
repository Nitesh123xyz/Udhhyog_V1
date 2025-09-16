import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import AddUser from "../pages/AddUser";
import UpdateUser from "../pages/UpdateUser";
import ProtectedRoute from "../Middlewares/ProtectedRoute";
import PermissionGate from "../Middlewares/PermissionGate";
import MainLoader from "../components/Loader";
// ---------------------------------------------------

const UserTableInfo = lazy(() => import("../pages/user/User"));
const Permissions = lazy(() => import("../pages/Permission"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const LoginPage = lazy(() => import("../pages/Login"));
const ResetPassword = lazy(() =>
  import("../pages/reset-password/ResetPassword")
);
const Setting = lazy(() => import("../pages/Setting"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<MainLoader />}>
            <LoginPage />
          </Suspense>
        ),
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
            <PermissionGate>
              <Dashboard />
            </PermissionGate>
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/users",
        element: (
          <ProtectedRoute>
            <PermissionGate>
              <UserTableInfo />
            </PermissionGate>
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/permission",
        element: (
          <ProtectedRoute>
            <PermissionGate>
              <Permissions />
            </PermissionGate>
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/profile",
        element: (
          <ProtectedRoute>
            <PermissionGate>
              <Setting />
            </PermissionGate>
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/add-user",
        element: (
          <ProtectedRoute>
            <PermissionGate>
              <AddUser />
            </PermissionGate>
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/update-user",
        element: (
          <ProtectedRoute>
            <PermissionGate>
              <UpdateUser />
            </PermissionGate>
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
