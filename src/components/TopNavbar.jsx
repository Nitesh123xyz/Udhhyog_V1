import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../utils/theme";
import { NavarMobileOpenClose } from "../utils/ExpendNavbar";
const TopNavbar = ({ DynamicLabel, setIsExpanded }) => {
  const dispatch = useDispatch();
  const width = window.innerWidth;

  const handleToggle = () => {
    if (width > 992) return;
    dispatch(NavarMobileOpenClose());
    setIsExpanded(true);
  };

  const { CurrentLabel } = useSelector((state) => state.ExpendNavbar);
  const current = JSON.parse(localStorage.getItem("CurrentLabel"));
  console.log(current);
  console.log(CurrentLabel);

  return (
    <>
      <header
        className={`sticky top-0 z-50 dark:bg-gray-800 bg-white/50 backdrop-blur-md rounded-2xl  flex items-center justify-between px-2 py-2 border border-blue-200 max-w-screen md:max-w-[49rem] lg:max-w-full`}
      >
        <div className="flex items-center gap-4">
          <div
            onClick={handleToggle}
            className={`bg-blue-100 px-4 py-2 uppercase rounded-2xl font-bold text-sm shadow-sm`}
          >
            {"Home" || CurrentLabel.ParentTabLabel || current.ParentTabLabel}
          </div>
        </div>
        <div
          onClick={() => dispatch(toggleTheme())}
          className="flex items-center gap-4"
        >
          <div className="w-10 h-10 bg-yellow-400 rounded-full flex flex-col items-center justify-center text-xs font-semibold shadow-md hover:scale-105 transition-transform">
            <User size={16} className="text-gray-800" />
          </div>
        </div>
      </header>
    </>
  );
};

export default TopNavbar;
