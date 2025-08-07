import { Download, Filter, Plus, Search, User } from "lucide-react";
import { useState } from "react";
import SearchBar from "./SearchBar";

export default function ICMBrowserLayout({ children }) {
  const [isFocused, setIsFocused] = useState(false);
  return (
    <>
      <div className="max-w-2xl md:max-w-full">
        <header className="sticky top-0 z-50 bg-white/50 backdrop-blur-md rounded-[1.2rem] max-w-[95%] mx-auto mt-2 flex items-center justify-between px-6 py-3 border border-blue-200">
          <div className="flex items-center gap-4">
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
              LOGO
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex flex-col items-center justify-center text-xs font-semibold shadow-md hover:scale-105 transition-transform">
              <User size={16} color="black" />
            </div>
          </div>
        </header>

        <div className="px-4 sm:px-6 lg:px-8 py-5">
          <div className="relative">
            <div className="absolute top-0 right-3 md:right-1 2xl:right-16 flex space-x-3 lg:space-x-5 z-10">
              <div className="w-9 h-9 flex items-center justify-center bg-white/40 backdrop-blur-sm border border-white/30 rounded-full shadow-sm hover:bg-white/50 transition">
                <Plus className="w-4  h-4 text-gray-800" />
              </div>
              <div className="w-9 h-9 flex items-center justify-center bg-white/40 backdrop-blur-sm border border-white/30 rounded-full shadow-sm hover:bg-white/50 transition">
                <Filter className="w-4  h-4 text-gray-800" />
              </div>
              <div className="w-9 h-9 flex items-center justify-center bg-white/40 backdrop-blur-sm border border-white/30 rounded-full shadow-sm hover:bg-white/50 transition">
                <Download className="w-4  h-4 text-gray-800" />
              </div>
            </div>

            {/* Browser window */}

            <div
              className="bg-white/30 rounded-2xl p-[0.8rem_0px_0px_0px]"
              style={{
                clipPath:
                  "polygon(0 0, 85% 0, 85% 15px, calc(85% + 40px) 50px, 100% 50px, 100% 100%, 0 100%)",
              }}
            >
              <div className=" bg-white/50 backdrop-blur-md border border-blue-100 rounded-sm ml-5 w-[80%] flex items-center justify-between px-6 py-3 transition-all duration-300">
                {/* Left Side - Logo */}
                <div className="flex items-center gap-4">
                  <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
                    Page Name
                  </div>
                </div>

                {/* Right Side - Expanding Search Bar */}
                <>
                  <SearchBar />
                </>
              </div>

              {/* Main content area */}

              {children}

              {/* Main content area */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
