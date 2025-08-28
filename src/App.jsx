import { Outlet, useLocation } from "react-router-dom";
import { lazy, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { menuItems } from "./utils/ReuseData";
// ---------------------------------------------------
const TopNavbar = lazy(() => import("./components/TopNavbar"));
const LeftNavbar = lazy(() => import("./components/LeftNavbar"));
const App = () => {
  const location = useLocation();
  const hideNavbarPaths = [
    "/",
    "/forgot-password",
    "*",
    "/reset-password",
    "/verify-otp",
    "/request-password-reset",
  ];
  const HideNavbar = hideNavbarPaths.includes(location.pathname);
  const [isExpanded, setIsExpanded] = useState(false);

  // -------------------------------------------------------------------

  const { PinBar } = useSelector((state) => state.ExpendNavbar);
  const { MobileNav } = useSelector((state) => state.ExpendNavbar);
  const theme = useSelector((state) => state.theme.ThemeMode);

  // -------------------------------------------------------------------

  // LookUPPaths

  const getAllPath = (items) => {
    let paths = [];
    for (const item of items) {
      if (item.path) {
        paths.push(item.path);
      }
      if (item.submenu && item.submenu.length > 0) {
        paths.push(...getAllPath(item.submenu));
      }
    }
    return paths;
  };

  const allPaths = getAllPath(menuItems);
  const pathSet = new Set(allPaths);
  const isPathExists = pathSet.has(location.pathname);

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
      {!HideNavbar && isPathExists && (
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

      <div className="flex-1 flex flex-col">
        <>
          <main className="flex-1 overflow-auto">
            {!HideNavbar && isPathExists && (
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
