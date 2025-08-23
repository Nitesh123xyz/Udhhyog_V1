import { Outlet, useLocation } from "react-router-dom";
import { useCheckingUserMutation } from "./features/auth/authSlice";
import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
// ---------------------------------------------------
const TopNavbar = lazy(() => import("./components/TopNavbar"));
const LeftNavbar = lazy(() => import("./components/LeftNavbar"));
const App = () => {
  const location = useLocation();
  const hideNavbarPaths = ["/", "/forgot-password"];
  const HideNavbar = hideNavbarPaths.includes(location.pathname);
  const [isExpanded, setIsExpanded] = useState(false);

  // -------------------------------------------------------------------

  const [checkUser, { data, isLoading, isSuccess, error }] =
    useCheckingUserMutation();

  const { PinBar } = useSelector((state) => state.ExpendNavbar);
  const { MobileNav } = useSelector((state) => state.ExpendNavbar);
  const theme = useSelector((state) => state.theme.ThemeMode);

  // -------------------------------------------------------------------

  // Initiating Api Calling

  const InitiateCalling = () => {
    checkUser({ token: localStorage.getItem("token") });
  };

  useEffect(() => {
    InitiateCalling();
  }, []);

  // -------------------------------------------------------------------

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else if (theme === "light") {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className="flex min-h-screen">
      {!HideNavbar && (
        <div
          className={`transition-all duration-300  lg:block ${
            PinBar
              ? "lg:w-[15rem]"
              : `${MobileNav ? "w-[15rem]" : "hidden"} lg:w-20`
          } ${MobileNav ? "w-[25rem]" : "hidden"}`}
        >
          <LeftNavbar
            MobileNav={MobileNav}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col bg-gradient-to-br from-[#e3e4e7] via-[#e7e7e7] to-[#f7eec4]">
        <>
          <main className="flex-1 overflow-auto">
            {!HideNavbar && (
              <div className="px-0 lg:px-[0.2rem]">
                <TopNavbar setIsExpanded={setIsExpanded} />
              </div>
            )}

            {!HideNavbar ? (
              <div className="lg:px-1 py-[0.1rem]">
                <Outlet />
              </div>
            ) : (
              <Outlet />
            )}
          </main>
        </>
      </div>
    </div>
  );
};

export default App;
