import React from "react";
import { Home, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PageNotFound = () => {
  return (
    <div className="min-h-screen rounded-2xl bg-white dark:bg-gray-800 text-yellow-400 flex  justify-center">
      <div className="text-center mt-20">
        {/* 404 Text */}
        <h1 className="text-6xl md:text-[10rem] font-bold text-yellow-400 mb-4">
          404
        </h1>

        {/* Message */}
        <p className="text-xl md:text-2xl text-yellow-300 mb-8">
          Page Not Found
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/"
            className="bg-yellow-400 text-black px-6 py-3 rounded-lg font-semibold hover:bg-yellow-300 flex items-center justify-center space-x-2"
          >
            <Home className="w-5 h-5" />
            <span>Home</span>
          </Link>
          <Link
            to="/"
            className="border-2 border-yellow-400 text-yellow-400 px-6 py-3 rounded-lg font-semibold  flex items-center justify-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Back</span>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
