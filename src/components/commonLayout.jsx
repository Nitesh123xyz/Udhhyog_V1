import { Download, Filter, Plus, User } from "lucide-react";
import React from "react";

export default function ICMBrowserLayout({ children }) {
  return (
    <>
      {/* Main browser window container */}

      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-sm rounded-full mx-auto mt-2 w-[95%] flex items-center justify-between px-6 py-3 border border-blue-200">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
            LOGO
          </div>
          <h1 className="text-xl font-semibold tracking-wide">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-10 h-10 bg-blue-100 text-blue-800 rounded-full flex flex-col items-center justify-center text-xs font-semibold shadow-md hover:scale-105 transition-transform">
            <User size={16} color="black" />
          </div>
        </div>
      </header>

      <div className="px-4 sm:px-6 lg:px-8 py-5">
        <div className="relative">
          {/* Window controls positioned outside the clipped area */}
          <div className="absolute top-0 right-3 flex space-x-3 z-10">
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
            className="bg-white/50 rounded-2xl p-[2rem_0px_0px_0px]"
            style={{
              clipPath:
                "polygon(0 0, 85% 0, 85% 15px, calc(85% + 40px) 50px, 100% 50px, 100% 100%, 0 100%)",
            }}
          >
            {/* Main content area */}
            {/* <div className="bg-gradient-to-b from-blue-200 to-blue-300 rounded-xl mx-2 mt-8 mb-2 h-52 flex items-center justify-center">
            <div className="text-blue-700 text-4xl font-light tracking-wider">
              icm
            </div>
          </div> */}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
