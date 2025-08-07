import Navbar from "./components/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { useCheckingUserMutation } from "./features/auth/authSlice";
import ICMBrowserLayout from "./components/commonLayout";
import { useState } from "react";

const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/login", "/signup", "/forgot-password"];
  const HideNavbar = hideNavbarPaths.includes(location.pathname);
  const [isExpanded, setIsExpanded] = useState(false);

  const [checkUser, { data, isLoading, isSuccess, error }] =
    useCheckingUserMutation();

  return (
    <div className="flex min-h-screen">
      {!HideNavbar && (
        <div className={`transition-all duration-300 hidden md:block w-20`}>
          <Navbar isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
        </div>
      )}

      <div className="flex-1 flex flex-col bg-gradient-to-br from-purple-100 via-blue-200 to-yellow-200">
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
