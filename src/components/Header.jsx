import React, { useEffect, useRef, useState } from "react";
import { Search, Download, Plus, RefreshCw } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import useAuth from "../hooks/useAuth";
import { useSearchUsersMutation } from "../features/users/usersSlice";

const Header = ({
  setRows,
  step,
  setStep,
  currentPage,
  itemsPerPage,
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

  const [searchUser, { isLoading }] = useSearchUsersMutation();
  const { token } = useAuth();

  useEffect(() => {
    const Search_query = {
      per_page: Number(itemsPerPage),
      page_no: currentPage,
      search: query,
      token: token,
    };

    const delayDebounce = setTimeout(async () => {
      clearTimeout(StoreInterval.current);
      const { body: data } = await searchUser(Search_query).unwrap();
      setRows(data?.emp_data || []);
      StoreInterval.current = null;
    }, 500);

    return () => clearTimeout(delayDebounce);
  }, [query, itemsPerPage]);

  const handleSearch = (e) => {
    setQuery(e.target.value);
  };

  return (
    <div className="bg-[var(--background)] backdrop-blur-md border-b border-[var(--border)] rounded-t-lg w-full flex items-center justify-between px-1.5 py-1.5 transition-all duration-300">
      <h2 className="flex items-center gap-4 text-[var(--text)] uppercase text-sm lg:text-lg ml-1">
        {CurrentLabel?.ChildTabLabel !== ""
          ? CurrentLabel?.ChildTabLabel
          : "Permission"}
      </h2>

      <div className="flex">
        <div
          className={`flex items-center gap-2 ${
            HideHeader ? "mr-0" : "mr-2"
          } relative p-1 md:border-1 md:border-[var(--border)] bg-[var(--background)] rounded-full ${
            openSearch ? "border-1 border-[var(--border)]" : "border-0"
          }`}
        >
          <input
            type="text"
            placeholder="Search..."
            value={query}
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`bg-transparent text-sm text-[var(--text)] outline-0 placeholder:text-gray-400 px-1 transition-all duration-300
              ${
                isFocused
                  ? "w-[8rem] md:w-[20rem] lg:w-[35rem]"
                  : `${
                      openSearch ? "w-[8rem]" : "w-0 md:block"
                    } md:w-[12rem] lg:w-[20rem]`
              }`}
          />
          <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-md">
            <Search
              onClick={() => setOpenSearch(!openSearch)}
              size={15}
              className="text-black"
            />
          </div>
        </div>

        {!HideHeader && (
          <div className="flex space-x-2 py-1 px-0">
            <div className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm">
              <Plus
                onClick={() => setStep(4)}
                size={15}
                className="text-gray-800"
              />
            </div>
            <div
              role="button"
              aria-pressed={rotated}
              onClick={() => {
                setRotated((r) => r + 260);
                handleUserInfo();
              }}
              className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm transition-all duration-300"
            >
              <RefreshCw
                size={15}
                className={`transform transition-transform duration-500 text-gray-800`}
                style={{
                  transform: `rotate(${rotated}deg)`,
                  transition: "transform 600ms",
                }}
              />
            </div>
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
