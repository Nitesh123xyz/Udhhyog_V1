import { Menu, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { NavarMobileOpenClose } from "../utils/ExpendNavbar";
import { useState } from "react";
import DropDownProfileMenu from "./DropDownProfileMenu";

const TopNavbar = ({ setIsExpanded }) => {
  const dispatch = useDispatch();
  const width = window.innerWidth;
  const [openPopup, setOpenPopup] = useState(false);
  const { emp_name, emp_profile } =
    useSelector((state) => state.UtileSlice?.userInfo) || {};

  const handleToggle = () => {
    if (width > 992) return;
    dispatch(NavarMobileOpenClose());
    setIsExpanded(true);
  };

  const { CurrentLabel } = useSelector((state) => state.ExpendNavbar);

  return (
    <>
      <header
        className={`bg-[var(--background)] backdrop-blur-md rounded-lg flex items-center justify-between px-2 py-2 shadow-md max-w-screen md:max-w-full`}
      >
        <div className="flex gap-2 items-center">
          <Menu
            onClick={handleToggle}
            className="w-6 h-6 text-[var(--text)] block lg:hidden"
          />

          <h2
            className={`text-[var(--text)] uppercase text-sm lg:text-lg ml-0.5`}
          >
            {CurrentLabel.ParentTabLabel !== ""
              ? CurrentLabel.ParentTabLabel
              : "Dashboard"}
          </h2>
        </div>
        <div
          onClick={() => setOpenPopup((popup) => !popup)}
          className="flex items-center gap-2"
        >
          <div className="flex flex-col">
            <p className="text-sm text-[var(--text)]">{emp_name}</p>
            <p className="text-sm text-end text-[var(--text)]">{emp_profile}</p>
          </div>
          <div className="w-10 h-10 bg-[var(--icon_bg)] rounded-full flex flex-col items-center justify-center text-xs shadow-md hover:scale-105 transition-transform cursor-pointer">
            <User size={16} className="text-[var(--icon_text)]" />
          </div>
        </div>
      </header>
      <DropDownProfileMenu openPopup={openPopup} setOpenPopup={setOpenPopup} />
      {/* pop up menu of profile icon  */}
    </>
  );
};

export default TopNavbar;
