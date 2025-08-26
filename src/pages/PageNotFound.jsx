import React from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="h-[calc(100vh-5px)] rounded-2xl bg-[var(--background)] text-yellow-400 flex justify-center items-start">
      <div className="text-center px-4">
        {/* Centered Image */}
        <img
          src="/404.png" // replace with your image path
          alt="Page Not Found"
          className="mx-auto w-full md:w-[80%] md:max-w-[35rem] 2xl:max-w-[50rem]"
        />

        {/* Buttons */}
        <div className="flex flex-row gap-4 justify-center mt-5 md:mt-0">
          <Link
            to="/dashboard"
            className="bg-[var(--icon_bg)] px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5 text-[var(--icon_text)]" />
            <span className="text-[var(--icon_text)]">Home</span>
          </Link>
          <Link
            to="/dashboard"
            className="border-2 bg-[var(--icon_bg)] border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5 text-[var(--icon_text)]" />
            <span className="text-[var(--icon_text)]">Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
