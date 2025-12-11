import React, { useState, useEffect, useRef } from "react";
import { ChevronRight, ChevronDown, PinOff, Pin, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  NavarMobileOpenClose,
  PinBar,
  trackCurrentTabAndLink,
} from "../utils/ExpendNavbar";
import "../css/commonLayout.css";
import { useNavigationCollectorMutation } from "../features/utils/utilsSlice";
import useAuth from "../hooks/useAuth";
import { setPreviousOneNavigation } from "../utils/Utils";

const LeftNavbar = ({ isExpanded, setIsExpanded, MobileNav, menuList }) => {
  const [NavigationStore] = useNavigationCollectorMutation();
  const info = useSelector((state) => state.UtileSlice?.previousNavigation);

  const leaveTimer = useRef(null);
  const [pineBar, setPineBar] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [expandedSubSections, setExpandedSubSections] = useState({});
  const [expandedSubSubSections, setExpandedSubSubSections] = useState({});
  const [expandedSubSubSubSections, setExpandedSubSubSubSections] = useState(
    {}
  );

  const { token } = useAuth();
  const width = window.innerWidth;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // ------------------------------------------------------------------

  const handlePinBarExpand = () => {
    setPineBar(!pineBar);
    dispatch(PinBar());
  };

  const handleToggle = () => {
    dispatch(NavarMobileOpenClose());
    setIsExpanded(false);
  };

  const handleMouseLeave = () => {
    if (width > 992) {
      leaveTimer.current = setTimeout(() => {
        if (pineBar) {
          setIsExpanded(true);
        } else {
          setIsExpanded(false);
        }
        leaveTimer.current = null;
      }, 1000);
    }
  };

  // Reset all expanded states when navbar is collapsed
  useEffect(() => {
    if (!isExpanded) {
      setExpandedSections({});
      setExpandedSubSections({});
      setExpandedSubSubSections({});
      setExpandedSubSubSubSections({});
    }

    return () => {
      if (leaveTimer.current) {
        clearTimeout(leaveTimer.current);
      }
    };
  }, [isExpanded]);

  const toggleSection = (index) => {
    setExpandedSections((prev) => {
      const isOpen = !!prev[index];
      if (isOpen) return {};
      return { [index]: true };
    });
    setExpandedSubSections({});
    setExpandedSubSubSections({});
    setExpandedSubSubSubSections({});
  };

  const toggleSubSection = (sectionIndex, subIndex) => {
    setExpandedSubSections((prev) => ({
      ...prev,
      [`${sectionIndex}-${subIndex}`]: !prev[`${sectionIndex}-${subIndex}`],
    }));
  };

  const toggleSubSubSection = (sectionIndex, subIndex, subSubIndex) => {
    setExpandedSubSubSections((prev) => ({
      ...prev,
      [`${sectionIndex}-${subIndex}-${subSubIndex}`]:
        !prev[`${sectionIndex}-${subIndex}-${subSubIndex}`],
    }));
  };

  const toggleSubSubSubSection = (
    sectionIndex,
    subIndex,
    subSubIndex,
    subSubSubIndex
  ) => {
    setExpandedSubSubSubSections((prev) => ({
      ...prev,
      [`${sectionIndex}-${subIndex}-${subSubIndex}-${subSubSubIndex}`]:
        !prev[`${sectionIndex}-${subIndex}-${subSubIndex}-${subSubSubIndex}`],
    }));
  };

  const renderMenuItem = (item, index, level = 0, parentIndices = []) => {
    const Icon = item.icon;
    const isSectionExpanded =
      level === 0
        ? expandedSections[index]
        : level === 1
        ? expandedSubSections[`${parentIndices[0]}-${index}`]
        : level === 2
        ? expandedSubSubSections[
            `${parentIndices[0]}-${parentIndices[1]}-${index}`
          ]
        : expandedSubSubSubSections[
            `${parentIndices[0]}-${parentIndices[1]}-${parentIndices[2]}-${index}`
          ];

    // ---------------------------------------------------------------

    const handleRowClick = async (e) => {
      if (e.target.closest("[data-no-nav]")) return;
      if (item.clickable && item.path) {
        dispatch(setPreviousOneNavigation(item.label));
        await NavigationStore({
          token,
          from_page: info,
          to_page: item.label,
        });
        navigate(item.path);
        dispatch(trackCurrentTabAndLink({ ChildTabLabel: item.label }));
        if (MobileNav) handleToggle();
      }
    };

    // ---------------------------------------------------------------

    const handleChevronClick = (e, item) => {
      dispatch(trackCurrentTabAndLink({ ParentTabLabel: item.label }));
      if (level === 0) toggleSection(index);
      else if (level === 1) toggleSubSection(parentIndices[0], index);
      else if (level === 2)
        toggleSubSubSection(parentIndices[0], parentIndices[1], index);
      else if (level === 3)
        toggleSubSubSubSection(
          parentIndices[0],
          parentIndices[1],
          parentIndices[2],
          index
        );
    };

    const indent = { marginLeft: `${level * 16}px` };

    return (
      <div key={`${parentIndices.join("-")}-${index}`} style={indent}>
        <div
          className={`flex items-center py-4 rounded-xl hover:bg-[var(--permissionTable)] cursor-pointer transition-all duration-200 ${
            item.active ? "bg-white/20 text-white" : "text-gray-800"
          } ${isExpanded ? "px-2 mt-0" : "px-4"}`}
          onClick={(e) => {
            if (item.hasSubmenu) {
              handleChevronClick(e, item);
            } else {
              handleRowClick(e);
            }
          }}
        >
          <div className="flex items-center w-full">
            <Icon
              className={`w-5 h-5 text-[var(--text)] ${
                isExpanded ? "mr-3" : "mr-0"
              }`}
            />

            <span
              className={`${isExpanded ? "" : "hidden"} text-[var(--text)]`}
            >
              {item.clickable ? (
                <Link to={item.path}>
                  <span>{item.label}</span>
                </Link>
              ) : (
                <span className="cursor-default">{item.label}</span>
              )}
            </span>
          </div>

          {item.hasSubmenu && (
            <div className={`ml-auto ${isExpanded ? "block" : "hidden"}`}>
              <button
                type="button"
                data-no-nav="true"
                className="p-1"
                aria-expanded={isSectionExpanded ? "true" : "false"}
              >
                {isSectionExpanded ? (
                  <ChevronDown className={`w-4 h-4 text-[var(--text)]`} />
                ) : (
                  <ChevronRight className={`w-4 h-4 text-[var(--text)]`} />
                )}
              </button>
            </div>
          )}
        </div>

        {item.hasSubmenu && isSectionExpanded && (
          <div style={{ marginLeft: 16 }}>
            {item.submenu.map((subItem, subIndex) =>
              renderMenuItem(subItem, subIndex, level + 1, [
                ...parentIndices,
                index,
              ])
            )}
          </div>
        )}
      </div>
    );
  };

  return (
    <nav
      onClick={() => setIsExpanded(true)}
      onMouseLeave={handleMouseLeave}
      className={`bg-[var(--letSideNavbarBg)] backdrop-blur-md w-20 fixed z-[999] h-screen 
      shadow-2xl flex flex-col 
      transition-all duration-300
      ${MobileNav ? "w-full" : "w-20"}
      ${isExpanded ? "w-[15rem]" : "w-20"}`}
    >
      <div
        className={`transition-all duration-300 flex items-center justify-between md:justify-normal p-[0.5rem_0.9rem_1rem_0.9rem] md:p-[0.5rem_0.6rem_1rem_0.6rem]`}
      >
        <Link to={"/dashboard"}>
          <img
            src="/logo.png"
            alt="company_logo"
            className={`rounded-full shadow-md transition-all duration-300 ring-4 ring-[var(--logo_circle)] ease-in ${
              isExpanded
                ? "h-[2.813rem] w-[2.813rem]"
                : `h-[3.75rem] w-[3.75rem]`
            }`}
            style={{
              filter: "drop-shadow(0.35rem 0.35rem 0.2rem rgba(0, 0, 0, 0.2))",
            }}
          />
        </Link>

        <span
          className={`ml-3 text-3xl bg-gradient-to-r from-pink-500 via-purple-500 to-blue-400 text-transparent bg-clip-text ${
            isExpanded ? "" : "hidden"
          }`}
        >
          UDHHYOG
        </span>

        {MobileNav && (
          <div
            onClick={handleToggle}
            className="w-10 h-10 bg-yellow-400 md:absolute right-4 rounded-full flex flex-col items-center justify-center text-xs"
          >
            <X size={16} className="text-gray-800" />
          </div>
        )}
      </div>

      <div className="NavScroll px-3 flex-1 overflow-y-auto overflow-x-hidden">
        {menuList?.map((item, index) => renderMenuItem(item, index))}
      </div>

      {!MobileNav && (
        <div className="relative flex justify-end mr-3 mb-3 gap-2.5">
          {isExpanded && (
            <>
              <button
                onClick={handlePinBarExpand}
                title="Double Click To Pin The Bar"
                className={`text-gray-800 flex items-center justify-center p-2 rounded-full transition-colors duration-200
                ${pineBar ? "bg-pink-200" : "bg-yellow-400"}`}
              >
                {pineBar ? <Pin size={20} /> : <PinOff size={20} />}
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default LeftNavbar;
