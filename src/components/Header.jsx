import React, { useEffect, useRef, useState } from "react";
import { Search, Download, Plus, RefreshCw, X } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { useSearchUsersMutation } from "../features/users/usersSlice";
import { setSearchLoading } from "../utils/Utils";

const Header = ({
  title,
  setRows,
  step,
  setStep,
  currentPage,
  itemsPerPage,
  currentActive,
  permissionDataList,
  originalRef = [],
  setPermissionDataList = () => {},
  handleUserInfo = () => {},
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);
  const StoreInterval = useRef(null);
  const [rotated, setRotated] = useState(0);
  const location = useLocation();
  const hideHeaderOptions = ["/permission"];
  const HideHeader = hideHeaderOptions.includes(location.pathname);
  const { CurrentLabel } = useSelector((state) => state.ExpendNavbar);
  const isFirstRender = useRef(true);
  const [searchUser, { isLoading }] = useSearchUsersMutation();
  const { token } = useAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    // Skip first render
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    const Search_query = {
      per_page: Number(itemsPerPage),
      page_no: currentPage,
      search: query,
      token: token,
    };

    const delayDebounce = setTimeout(async () => {
      dispatch(setSearchLoading(true));
      try {
        clearTimeout(StoreInterval.current);
        const { body: data } = await searchUser(Search_query).unwrap();
        dispatch(setSearchLoading(isLoading));
        setRows(data?.emp_data || []);
        StoreInterval.current = null;
      } catch (error) {
        console.error("search error:", err);
        setRows([]);
      } finally {
        dispatch(setSearchLoading(false));
      }
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, itemsPerPage]);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);

    if (title === "permission") {
      if (value === "" || query === "") {
        // reset to full data
        setPermissionDataList([...originalRef.current]);
      } else {
        const filtered = originalRef.current.filter((item) =>
          item?.page_name?.toLowerCase().includes(value)
        );
        setPermissionDataList(filtered);
      }
    }
  };

  useEffect(() => {
    if (title === "permission" && query === "") {
      setPermissionDataList([...originalRef.current]);
    }
  }, [query]);

  return (
    <div className="bg-[var(--background)] backdrop-blur-md border-b border-[var(--border)] rounded-t-lg w-full flex items-center justify-between p-1.5 transition-all duration-300">
      <h2 className="flex items-center gap-4 text-[var(--text)] uppercase text-sm lg:text-lg ml-1">
        {CurrentLabel?.ChildTabLabel !== ""
          ? CurrentLabel?.ChildTabLabel
          : "Permission"}
      </h2>

      <div className="flex">
        <div
          className={`flex items-center mr-0.5 relative border-[var(--border)] bg-[var(--background)]  transition-all duration-200 ${
            openSearch ? "border-b border-[var(--border)]" : "border-0"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`bg-transparent text-sm text-[var(--text)] outline-0 placeholder:text-gray-400 px-2 transition-all duration-400 ${
              openSearch || isFocused ? "w-[6rem] md:w-[20rem]" : "w-0"
            } overflow-hidden`}
          />
          <div
            onClick={() => setOpenSearch(!openSearch)}
            className="w-8 h-8 m-1 bg-yellow-400 text-black cursor-pointer rounded-full flex items-center justify-center shadow-md"
          >
            {openSearch ? (
              <X
                onClick={() => setQuery("")}
                size={15}
                className="text-black"
              />
            ) : (
              <Search size={15} className="text-black" />
            )}
          </div>
        </div>
        {!HideHeader && (
          <div className="flex space-x-2 py-1 px-0">
            <div
              onClick={() => setStep(4)}
              className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
            >
              <Plus size={15} className="text-gray-800" />
            </div>
            {currentActive && (
              <div
                role="button"
                aria-pressed={rotated}
                onClick={() => {
                  setRotated((r) => r + 260);
                  handleUserInfo();
                }}
                className="cursor-pointer w-8 h-8 flex items-center justify-center bg-red-500 backdrop-blur-sm rounded-full shadow-sm transition-all duration-300"
              >
                <RefreshCw
                  size={15}
                  className={`transform transition-transform duration-500 text-white`}
                  style={{
                    transform: `rotate(${rotated}deg)`,
                    transition: "transform 600ms",
                  }}
                />
              </div>
            )}
            {step !== 1 && (
              <div className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm">
                <Download size={15} className="text-gray-800" />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
