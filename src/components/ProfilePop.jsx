import {
  User,
  HelpCircle,
  LogOut,
  ChevronRight,
  Sun,
  Moon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { setToken } from "../utils/AuthToken";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../utils/theme";

const ProfilePop = ({ openPopup }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.theme.ThemeMode); // from redux

  const handleClick = (item) => {
    if (!item.clickable) return;

    if (item.isLogout) {
      setToken(null);
      navigate("/");
    } else if (item.path) {
      navigate(item.path);
    }
  };

  const handleToggleTheme = () => {
    const newMode = darkMode === "light" ? "dark" : "light";
    dispatch(toggleTheme(newMode));
    document.documentElement.classList.toggle("dark", newMode === "dark");
  };

  const menuItems = [
    {
      icon: User,
      text: "developersudhyog@gmail.com",
      isEmail: true,
      path: "/settings/profile",
      clickable: false,
    },
    {
      icon: darkMode === "light" ? Sun : Moon,
      text: "Theme",
      hasToggle: true,
      clickable: false,
    },
    {
      icon: HelpCircle,
      text: "Help",
      hasChevron: false,
      path: "/settings/profile",
      clickable: true,
    },
    {
      icon: LogOut,
      text: "Log out",
      hasChevron: false,
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
      <div className="w-[18rem] sm:w-[20rem] bg-[var(--background)] border border-[var(--border)] rounded-lg shadow-lg overflow-hidden">
        <div className="py-2 px-2">
          {menuItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index}>
                {/* Row button */}
                <button
                  onClick={() => handleClick(item)}
                  className="w-full px-3 py-3 flex items-center justify-between text-left hover:bg-[var(--permissionTable)] rounded-lg transition-colors duration-300"
                  disabled={!item.clickable}
                >
                  <div className="flex items-center space-x-3">
                    <Icon className="w-5 h-5 text-[var(--text)]" />
                    <span className="text-sm font-medium truncate text-[var(--text)]">
                      {item.text}
                    </span>
                  </div>

                  {/* Toggle for Theme */}
                  {item.hasToggle && (
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={darkMode === "dark"}
                        onChange={handleToggleTheme}
                        className="sr-only"
                      />
                      <div
                        className={`w-10 h-5 ${
                          darkMode === "dark" ? "bg-yellow-400" : "bg-gray-200"
                        } rounded-full transition-colors peer-checked:bg-blue-600`}
                      />
                      <div
                        className={`absolute left-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow transform transition-transform ${
                          darkMode === "dark"
                            ? "translate-x-5"
                            : "translate-x-0"
                        }`}
                      ></div>
                    </label>
                  )}

                  {/* Chevron if needed */}
                  {item.hasChevron && (
                    <ChevronRight className="w-4 h-4 text-[var(--text)]" />
                  )}
                </button>

                {/* Separator after email */}
                {item.isEmail && (
                  <div className="mx-4 my-2 border-t border-[var(--border)]"></div>
                )}

                {/* Separator before logout */}
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

export default ProfilePop;
