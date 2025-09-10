import {
  User,
  HelpCircle,
  LogOut,
  Sun,
  Moon,
  Type as TypeIcon,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { clearAllSession, getThemeMode, setThemeMode } from "../utils/StoreSessionInfo";
import FontSwitch from "../components/FontSwitch";

const DropDownProfileMenu = ({ openPopup, setOpenPopup }) => {
  const boxRef = useRef(null);
  const closeTimerRef = useRef(null);
  const [themeMode, setTheme] = useState(getThemeMode());

  // -------------------------------------------------------

  const handleClick = (item) => {
    if (!item.clickable) return;

    if (item.isLogout) {
      clearAllSession();
      window.location.href = "/";
    } else if (item.path) {
      window.location.href = item.path;
    }
  };

  // -------------------------------------------------------

  const scheduleClose = () => {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = setTimeout(() => {
      setOpenPopup(false);
      closeTimerRef.current = null;
    }, 600);
  };

  const cancelClose = () => {
    clearTimeout(closeTimerRef.current);
    closeTimerRef.current = null;
  };

  useEffect(() => {
    return () => clearTimeout(closeTimerRef.current);
  }, []);

  // -------------------------------------------------------

  const handleToggleTheme = () => {
    const newMode = themeMode === "light" ? "dark" : "light";
    setTheme(newMode);
    setThemeMode(newMode);
  };

  useEffect(() => {
    if (themeMode === "dark") {
      document.documentElement.classList.add("dark");
      document.documentElement.classList.remove("light");
    } else {
      document.documentElement.classList.add("light");
      document.documentElement.classList.remove("dark");
    }

    return () => {
      document.documentElement.classList.remove("dark");
      document.documentElement.classList.remove("light");
    };
  }, [themeMode]);

  // -------------------------------------------------------

  const menuItems = [
    {
      icon: User,
      text: "developersudhyog@gmail.com",
      isEmail: true,
      path: "/profile",
      clickable: false,
    },
    {
      icon: themeMode === "light" ? Sun : Moon,
      text: "Theme",
      hasToggle: true,
      clickable: false,
    },
    {
      icon: TypeIcon,
      text: "Font",
      hasFontSelect: true,
      clickable: false,
    },
    {
      icon: HelpCircle,
      text: "Help",
      path: "/profile",
      clickable: true,
    },
    {
      icon: LogOut,
      text: "Log out",
      isLogout: true,
      clickable: true,
    },
  ];

  return (
    <div
      className={`absolute z-50 top-16 right-4 max-h-0 overflow-hidden transition-max-h duration-[0.3s] ease-in-out ${
        openPopup && "max-h-[32rem]"
      }`}
    >
      <div
        onMouseEnter={cancelClose}
        onMouseLeave={scheduleClose}
        ref={boxRef}
        className="w-[18rem] sm:w-[20rem] bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden"
      >
        <div className="py-2 px-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                <button
                  onClick={() => handleClick(item)}
                  className="w-full px-3 py-3 flex items-center justify-between text-left hover:bg-[var(--permissionTable)] rounded-lg transition-colors duration-300"
                  disabled={!item.clickable}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-[var(--text)]" />
                    <span className="text-sm truncate text-[var(--text)]">
                      {item.text}
                    </span>
                  </div>

                  {/* Theme toggle */}
                  {item.hasToggle && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={themeMode === "dark"}
                        onChange={handleToggleTheme}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 ${
                          themeMode === "dark" ? "bg-yellow-400" : "bg-gray-200"
                        } rounded-full transition-colors`}
                      />
                      <div
                        className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                          themeMode === "dark"
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      />
                    </label>
                  )}

                  {item.hasFontSelect && (
                    <div
                      onClick={(e) => e.stopPropagation()}
                      onMouseDown={(e) => e.stopPropagation()}
                      className="ml-3"
                    >
                      <FontSwitch />
                    </div>
                  )}
                </button>

                {item.isEmail && (
                  <div className="mx-4 my-2 border-t border-[var(--border)]"></div>
                )}

                {index === menuItems.length - 2 && (
                  <div className="mx-4 my-2 border-t border-[var(--border)]"></div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DropDownProfileMenu;
