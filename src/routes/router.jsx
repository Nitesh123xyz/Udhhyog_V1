import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import ProtectedRoute from "../Middlewares/ProtectedRoute";
import PermissionGate from "../Middlewares/PermissionGate";
import MainLoader from "../components/Loader";
import MultilayerAuth from "../pages/2FA/MultilayerAuth";
import ManageDepartment from "../pages/department/ManageDepartment";
import ReVerifySession from "../components/ReVerifySession";
// ---------------------------------------------------

const ManageUser = lazy(() => import("../pages/user/ManageUser"));
const Permissions = lazy(() => import("../pages/Permission"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ResetPassword = lazy(() =>
  import("../pages/reset-password/ResetPassword")
);
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const ManageTeam = lazy(() => import("../pages/teams/ManageTeam"));

const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: "/",
        element: (
          <Suspense fallback={<MainLoader />}>
            <MultilayerAuth />
          </Suspense>
        ),
      },
      {
        path: "/re-verify-session",
        element: (
          <Suspense fallback={<MainLoader />}>
            <ReVerifySession />
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
              <ManageUser />
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
        path: "/department",
        element: (
          <ProtectedRoute>
            <PermissionGate>
              <ManageDepartment />
            </PermissionGate>
          </ProtectedRoute>
        ),
        caseSensitive: true,
      },
      {
        path: "/teams",
        element: (
          <ProtectedRoute>
            <PermissionGate>
              <ManageTeam />
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
