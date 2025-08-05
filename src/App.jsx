import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useCheckingUserMutation } from "./features/auth/authSlice";

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
        <div className="hidden lg:block md:w-20">
          <Navbar />
        </div>
      )}

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
