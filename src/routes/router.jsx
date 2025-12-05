import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import ProtectedRoute from "../Middlewares/ProtectedRoute";
import PermissionGate from "../Middlewares/PermissionGate";
import MainLoader from "../components/Loader";
import MultilayerAuth from "../pages/2FA/MultilayerAuth";
import ManageDepartment from "../pages/department/ManageDepartment";
// ---------------------------------------------------

const UserTableInfo = lazy(() => import("../pages/user/User"));
const Permissions = lazy(() => import("../pages/Permission"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const ResetPassword = lazy(() =>
  import("../pages/reset-password/ResetPassword")
);
const Setting = lazy(() => import("../pages/Setting"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const TeamManage = lazy(() => import("../pages/teams/TeamManage"));

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
        path: "/department",
        element: (
          <ProtectedRoute>
            <PermissionGate>
              {/* <Setting /> */}
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
              <TeamManage />
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
