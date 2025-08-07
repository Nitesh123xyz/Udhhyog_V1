import { Search } from "lucide-react";
import React, { useState } from "react";

const SearchBar = () => {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <div className="flex items-center gap-2 relative shadow-sm p-2.5 bg-white/50 rounded-xl">
        <input
          type="text"
          placeholder="Search..."
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className={`bg-transparent text-sm border-b border-cyan-400 text-gray-700 outline-0 placeholder:text-gray-400 px-2 transition-all duration-300
         ${isFocused ? "w-[35rem] opacity-100" : "w-[20rem] opacity-50"}`}
        />

        <div className="w-10 h-10 bg-yellow-400 text-black rounded-full flex items-center justify-center shadow-md">
          <Search size={18} className="text-black" />
        </div>
      </div>
    </>
  );
};

export default SearchBar;
