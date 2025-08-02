import React from "react";
import { Settings, Bell, User } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <>
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-8">
              <Link to="/">
                <div className="text-xl font-semibold text-gray-900">
                  Crextio
                </div>
              </Link>
              <nav className="hidden md:flex space-x-6">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                >
                  Dashboard
                </Link>
                <Link
                  to="/permission"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                >
                  Permission
                </Link>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                >
                  Hiring
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                >
                  Devices
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                >
                  Apps
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                >
                  Salary
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                >
                  Calendar
                </a>
                <a
                  href="#"
                  className="text-gray-600 hover:text-gray-900 px-3 py-2 text-sm"
                >
                  Reviews
                </a>
              </nav>
            </div>
            <div className="flex items-center space-x-4">
              <Settings className="w-5 h-5 text-gray-600" />
              <Bell className="w-5 h-5 text-gray-600" />
              <User className="w-5 h-5 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
