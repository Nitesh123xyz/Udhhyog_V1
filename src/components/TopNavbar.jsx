import { User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavarMobileOpenClose } from "../utils/ExpendNavbar";
import { useEffect, useRef, useState } from "react";
import ProfilePop from "./ProfilePop";
const TopNavbar = ({ setIsExpanded }) => {
  const dispatch = useDispatch();
  const width = window.innerWidth;
  const [openPopup, setOpenPopup] = useState(false);
  const BoxRef = useRef(null);
  const { emp_profile } = useSelector((state) => state?.user?.userInfo) || {};

  const handleToggle = () => {
    if (width > 992) return;
    dispatch(NavarMobileOpenClose());
    setIsExpanded(true);
  };

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (BoxRef.current && !BoxRef.current.contains(event.target)) {
  //       setOpenPopup(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, [BoxRef]);

  const { CurrentLabel } = useSelector((state) => state.ExpendNavbar);
  const current = JSON.parse(localStorage.getItem("CurrentLabel"));

  return (
    <>
      <header
        className={`sticky top-0 z-50 bg-[var(--background)] backdrop-blur-md rounded-2xl  flex items-center justify-between px-2 py-2 shadow-md max-w-screen md:max-w-[49rem] lg:max-w-full`}
      >
        <div className="flex items-center gap-4">
          <div
            onClick={handleToggle}
            className={`bg-[var(--header_left)] px-4 py-2 uppercase rounded-2xl font-bold text-sm shadow-sm`}
          >
            {"Home" || CurrentLabel.ParentTabLabel || current.ParentTabLabel}
          </div>
        </div>
        <div
          ref={BoxRef}
          onClick={() => setOpenPopup((popup) => !popup)}
          className="flex items-center gap-4"
        >
          <p className="text-sm text-[var(--text)]">{emp_profile}</p>
          <div className="w-10 h-10 bg-[var(--icon_bg)] rounded-full flex flex-col items-center justify-center text-xs font-semibold shadow-md hover:scale-105 transition-transform">
            <User size={16} className="text-[var(--icon_text)]" />
          </div>
        </div>
      </header>
      <ProfilePop openPopup={openPopup} />
      {/* pop up menu  */}
    </>
  );
};

export default TopNavbar;
