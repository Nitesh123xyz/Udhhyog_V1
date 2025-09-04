import { Outlet, useLocation } from "react-router-dom";
import { lazy, useState } from "react";
import { useSelector } from "react-redux";
import { useMenu } from "./components/useMenu";

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
    "/session-expired",
  ];
  const HideNavbar = hideNavbarPaths.includes(location.pathname);
  const [isExpanded, setIsExpanded] = useState(false);
  const { PinBar, MobileNav } = useSelector((state) => state.ExpendNavbar);

  // -------------------------------------------------------------------
  const { menuList } = useMenu(); // Custom hook to fetch Left Side Navigation Menu
  // -------------------------------------------------------------------

  const getAllPath = (items = []) => {
    const paths = [];
    for (const item of items) {
      if (item?.path) paths.push(item.path);
      if (Array.isArray(item?.submenu) && item.submenu.length > 0) {
        paths.push(...getAllPath(item.submenu));
      }
    }
    return paths;
  };

  const allPaths = getAllPath(menuList);
  // If menu not loaded yet, don't hide content purely due to missing paths
  const isPathExists =
    allPaths.length > 0 ? new Set(allPaths).has(location.pathname) : true;

  // -------------------------------------------------------------------

  return (
    <div className="flex min-h-screen">
      {!HideNavbar && isPathExists && menuList.length > 0 && (
        <div
          className={`transition-all duration-300 lg:block ${
            PinBar
              ? "lg:w-[15rem]"
              : `${MobileNav ? "w-[15rem]" : "hidden"} lg:w-20`
          } ${MobileNav ? "w-[25rem]" : "hidden"}`}
        >
          <LeftNavbar
            MobileNav={MobileNav}
            isExpanded={isExpanded}
            setIsExpanded={setIsExpanded}
            menuList={menuList}
          />
        </div>
      )}

      <div className="flex-1 flex flex-col">
        <main
          className="flex-1 overflow-auto"
          style={{
            background:
              "conic-gradient(from 180deg at 50% 50%, #4facfe, #00f2fe, #43e97b, #f8ffae, #4facfe)",
          }}
        >
          {!HideNavbar && isPathExists && (
            <div className="px-0 lg:px-[0.3rem] sticky top-0 z-50">
              <TopNavbar setIsExpanded={setIsExpanded} />
            </div>
          )}

          {!HideNavbar ? (
            <div className="lg:px-1 pt-[0.2rem]">
              <Outlet />
            </div>
          ) : (
            <Outlet />
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
