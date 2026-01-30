import React, { useState } from "react";
import { Search, Plus, X, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

const CommonHeader = ({
  searchOptions,
  setOpenAddFrom,
  setQuery,
  setSearchKey,
}) => {
  const [openSearch, setOpenSearch] = useState(false);
  const [localInput, setLocalInput] = useState("");
  const [selectedKey, setSelectedKey] = useState("all");

  const { CurrentLabel } = useSelector((state) => state.ExpendNavbar);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("enter");
      setQuery(localInput.trim() === "" ? null : localInput.trim());
      setSearchKey(selectedKey);
    }
  };

  return (
    <div className="bg-[var(--background)] backdrop-blur-md border-b border-[var(--border)] rounded-t-lg w-full flex items-center justify-between p-[0.295rem]">
      <h2 className="flex items-center gap-4 text-[var(--text)] uppercase text-sm lg:text-lg ml-1">
        {CurrentLabel?.ChildTabLabel || "Vendor"}
      </h2>

      <div className="flex items-center">
        <div
          className={`flex items-center mr-1 relative ${openSearch ? "bg-gray-100/10 border-1 border-[var(--border)] rounded-full px-0.5" : "border-1 border-transparent"}`}
        >
          {/* Dropdown Menu */}
          {openSearch && (
            <div className="relative flex items-center border-r border-[var(--border)] mr-2 p-3">
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="text-[10px] text-[var(--text)] outline-none cursor-pointer appearance-none pr-3"
              >
                {searchOptions.map((opt) => (
                  <option
                    key={opt.name}
                    value={opt.name}
                    className="bg-[var(--background)]"
                  >
                    {opt.value}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={15}
                className={
                  "text-[var(--text)] absolute right-2 pointer-events-none"
                }
              />
            </div>
          )}

          <input
            type="text"
            placeholder="Search..."
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className={`bg-transparent text-sm text-[var(--text)] border-[var(--border)] outline-0 px-2 transition-all placeholder-[var(--text)] duration-300 ${
              openSearch
                ? "w-[6rem] md:w-[18rem] pb-1 border-b"
                : "w-0 opacity-0"
            } overflow-hidden`}
          />

          <div
            onClick={() => {
              setOpenSearch(!openSearch);
              if (openSearch) {
                setLocalInput("");
                setQuery(null);
              }
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

export default CommonHeader;
