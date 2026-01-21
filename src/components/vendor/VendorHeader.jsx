import React, { useState } from "react";
import { Search, Plus, X } from "lucide-react";
import { useSelector } from "react-redux";

const VendorHeader = ({ setOpenAddFrom, setQuery }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const { CurrentLabel } = useSelector((state) => state.ExpendNavbar);

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setQuery(value);
  };

  return (
    <div className="bg-[var(--background)] backdrop-blur-md border-b border-[var(--border)] rounded-t-lg w-full flex items-center justify-between p-1.5">
      <h2 className="flex items-center gap-4 text-[var(--text)] uppercase text-sm lg:text-lg ml-1">
        {CurrentLabel?.ChildTabLabel || "Vendor"}
      </h2>

      <div className="flex items-center">
        <div className="flex items-center mr-0.5 relative">
          <input
            type="text"
            placeholder="Search..."
            onChange={handleSearch}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`bg-transparent text-sm text-[var(--text)] ${
              openSearch ? "border-b" : ""
            } border-[var(--border)] outline-0 px-2 pb-1 transition-all placeholder-[var(--text)] duration-300 ${
              openSearch || isFocused
                ? "w-[6rem] md:w-[20rem]"
                : "w-0 opacity-0"
            } overflow-hidden`}
          />

          <div
            onClick={() => {
              setOpenSearch(!openSearch);
              if (openSearch) setQuery("");
            }}
            className="w-8 h-8 m-1 bg-yellow-400 cursor-pointer rounded-full flex items-center justify-center"
          >
            {openSearch ? <X size={15} /> : <Search size={15} />}
          </div>
        </div>

        <div
          onClick={() => setOpenAddFrom(true)}
          className="cursor-pointer w-8 h-8 flex items-center justify-center bg-yellow-400 rounded-full"
        >
          <Plus size={15} />
        </div>
      </div>
    </div>
  );
};

export default VendorHeader;
