import { Search } from "lucide-react";
import React, { useState } from "react";

const HeaderAlternate = ({ rows, setRows }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [copy, setCopy] = useState([...rows]);

  const handleSearch = (e) => {
    const searchQuery = e.target.value.toLowerCase();
    setRows(
      searchQuery
        ? copy.filter((row) =>
            Object.values(row).some((val) =>
              String(val ?? "")
                .toLowerCase()
                .includes(searchQuery)
            )
          )
        : rows
    );
  };
  return (
    <>
      <div
        className={`bg-white/50 dark:bg-gray-800 backdrop-blur-md border border-white dark:border-gray-600 rounded-full ml-5 w-[80%] flex items-center justify-between px-2 py-1.5 transition-all duration-300`}
      >
        {/* Left Side - Logo */}
        <div className="flex items-center gap-4">
          <div className="bg-blue-100  px-2 py-2 rounded-2xl font-bold text-sm shadow-sm">
            Page Name
          </div>
        </div>

        {/* Right Side - Expanding Search Bar */}
        <div
          className={`flex items-center gap-2 relative shadow-sm p-1 border-1 border-white dark:border-gray-600 bg-white/50 dark:bg-gray-800 rounded-full`}
        >
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            onChange={handleSearch}
            className={`bg-transparent text-sm text-black dark:text-white outline-0 placeholder:text-gray-400 px-2 transition-all duration-300
         ${isFocused ? "w-[35rem]" : "w-[20rem]"}`}
          />

          <div className="w-8 h-8 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-md">
            <Search size={15} className={`text-black`} />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderAlternate;
