import React, { useEffect, useRef, useState } from "react";
import { Search, Download, Plus } from "lucide-react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const normalize = (s) =>
  String(s || "")
    .toLowerCase()
    .trim()
    .replace(/\s+/g, " ");

const Header = ({ rows, setRows, step, setStep }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [query, setQuery] = useState("");
  const [openSearch, setOpenSearch] = useState(false);

  const masterRef = useRef([]);

  useEffect(() => {
    if (!query) masterRef.current = Array.isArray(rows) ? [...rows] : [];
  }, [rows, query]);

  const location = useLocation();
  const hideHeaderOptions = ["/permission"];
  const HideHeader = hideHeaderOptions.includes(location.pathname);

  const { CurrentLabel } = useSelector((state) => state.ExpendNavbar);

  const handleSearch = (e) => {
    const raw = e.target.value;
    const q = normalize(raw);
    setQuery(raw);

    if (!q) {
      setRows([...masterRef.current]);
      return;
    }

    const filtered = masterRef.current.filter((row) =>
      normalize(row?.name).includes(q)
    );

    setRows(filtered);
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
