import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useCheckingUserMutation } from "./features/auth/authSlice";
import ICMBrowserLayout from "./components/commonLayout";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup", "/forgot-password"];
  const HideNavbar = hideNavbarPaths.includes(location.pathname);

  const [checkUser, { data, isLoading, isSuccess, error }] =
    useCheckingUserMutation();

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      {!HideNavbar && (
        <div
          className="hidden md:flex flex-shrink-0 basis-sidebar"
          style={{ flexBasis: "4%" }}
        >
          <Navbar />
        </div>
      )}

      {/* Main Content */}
      <div
        className="flex flex-col bg-gradient-to-br from-purple-100 via-blue-300 to-yellow-200"
        style={{ flexBasis: "100%" }}
      >
        <ICMBrowserLayout>
          <main className="flex-1 overflow-auto">
            <Outlet />
          </main>
        </ICMBrowserLayout>
      </div>
    </div>
  );
};

export default App;
