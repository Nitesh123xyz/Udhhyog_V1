import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import App from "../App";
import AddUser from "../pages/AddUser";
import UpdateUser from "../pages/UpdateUser";
import PageNotFound from "../pages/PageNotFound";
import CommonLayout from "../components/commonLayout";
import Setting from "../pages/Setting";

// ---------------------------------------------------

const EmployeeTable = lazy(() => import("../pages/EmployeeTable"));
const Permissions = lazy(() => import("../pages/Permission"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const LoginPage = lazy(() => import("../pages/Login"));
const ForgotPassword = lazy(() => import("../pages/ForgotPassword"));

const router = createBrowserRouter([
  {
    element: (
      <Suspense
        fallback={
          <div className="h-screen w-screen flex items-center justify-center">
            <span className="font-bold text-5xl">Loading…</span>
          </div>
        }
      >
        <App />
      </Suspense>
    ),
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "/Dashboard",
        element: <Dashboard />,
      },
      {
        path: "/employees",
        element: (
          <CommonLayout>
            <EmployeeTable />
          </CommonLayout>
        ),
      },
      {
        path: "/permission",
        element: <Permissions />,
      },
      {
        path: "/settings",
        element: <Setting />,
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
        path: "*",
        element: <PageNotFound />,
      },
    ],
  },
]);

export default router;
