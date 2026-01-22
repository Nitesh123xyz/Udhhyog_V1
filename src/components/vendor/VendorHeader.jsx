import React, { useState } from "react";
import { Search, Plus, X, ChevronDown } from "lucide-react";
import { useSelector } from "react-redux";

const VendorHeader = ({ setOpenAddFrom, setQuery, setSearchKey }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [localInput, setLocalInput] = useState(""); // Local state for typing
  const [selectedKey, setSelectedKey] = useState("all");

  const { CurrentLabel } = useSelector((state) => state.ExpendNavbar);

  const searchOptions = [
    { name: "all", value: "All" },
    { name: "lead_id", value: "Lead ID" },
    { name: "companyname", value: "Company Name" },
    { name: "number", value: "Number" },
    { name: "emailid", value: "Email ID" },
    { name: "source", value: "Source" },
    { name: "requirement", value: "Requirement" },
    { name: "assignedto", value: "Assigned To" },
  ];

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      console.log("enter")
      setQuery(localInput.trim() === "" ? null : localInput.trim());
      setSearchKey(selectedKey);
    }
  };

  return (
    <div className="bg-[var(--background)] backdrop-blur-md border-b border-[var(--border)] rounded-t-lg w-full flex items-center justify-between p-1.5">
      <h2 className="flex items-center gap-4 text-[var(--text)] uppercase text-sm lg:text-lg ml-1">
        {CurrentLabel?.ChildTabLabel || "Vendor"}
      </h2>

      <div className="flex items-center">
        <div
          className={`flex items-center mr-0.5 relative ${openSearch ? "bg-gray-100/10 rounded-full px-2" : ""}`}
        >
          {/* Dropdown Menu */}
          {openSearch && (
            <div className="relative flex items-center border-r border-[var(--border)] mr-2 pr-1">
              <select
                value={selectedKey}
                onChange={(e) => setSelectedKey(e.target.value)}
                className="bg-transparent text-[10px] text-[var(--text)] outline-none cursor-pointer appearance-none pr-3"
              >
                {searchOptions.map((opt) => (
                  <option
                    key={opt.name}
                    value={opt.name}
                    className="bg-white text-black"
                  >
                    {opt.value}
                  </option>
                ))}
              </select>
              <ChevronDown
                size={10}
                className="absolute right-0 pointer-events-none"
              />
            </div>
          )}

          <input
            type="text"
            placeholder="Hit Enter to Search..."
            value={localInput}
            onChange={(e) => setLocalInput(e.target.value)}
            onKeyDown={handleKeyDown} // Listen for Enter
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className={`bg-transparent text-sm text-[var(--text)] border-[var(--border)] outline-0 px-2 transition-all placeholder-[var(--text)] duration-300 ${
              openSearch || isFocused
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

export default VendorHeader;
