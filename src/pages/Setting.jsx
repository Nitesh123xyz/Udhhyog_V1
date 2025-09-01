import React, { useState } from "react";
import {
  User,
  Settings,
  Palette,
  Shield,
  Clipboard,
  Check,
} from "lucide-react";
import { ActiveTheme } from "../utils/ReuseData";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [activeMode, setActiveMode] = useState("light");
  const [copy, setCopy] = useState(false);

  const handleTabClick = (Info) => {
    setActiveMode(Info.label);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("e6387e93-2157-4b3a-b253-097e80c31d3b");
    setCopy(true);
    setTimeout(() => {
      setCopy(false);
    }, 1000);
  };

  const navigationItems = [
    {
      id: "account",
      label: "Account",
      icon: User,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
              Account Settings
            </h2>
          </div>

          <div className="space-y-4">
            {/* Logout */}
            <div className="flex items-center justify-between rounded-lg px-4 py-3">
              <span className="text-sm sm:text-lg font-medium text-[var(--text)]">
                Logout your account
              </span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                Logout
              </button>
            </div>

            {/* Delete Account */}
            <div className="flex items-center justify-between rounded-lg px-4 py-3">
              <span className="text-sm sm:text-lg font-medium text-[var(--text)]">
                Delete your account
              </span>
              <button className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors text-sm font-medium">
                Delete
              </button>
            </div>

            {/* Organization ID */}
            <div className="flex items-center justify-between rounded-lg px-4 py-3">
              <span className="text-sm sm:text-lg font-medium text-[var(--text)]">
                Organization ID
              </span>
              <div
                className="flex items-center px-2 py-4 border shadow-[0_0px_1px_0px_#000] 
              border-[var(--border)] rounded-2xl "
              >
                <p className="text-sm font-medium text-[var(--text)]">
                  e6387e93-2157-4b3a-b253-097e80c31d3b
                </p>
                {copy ? (
                  <Check className="w-4 h-4 md:w-6 md:h-6 ml-2 cursor-pointer text-[var(--text)]" />
                ) : (
                  <Clipboard
                    onClick={handleCopy}
                    className="w-4 h-4 md:w-6 md:h-6 ml-2 cursor-pointer text-[var(--text)]"
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "general",
      label: "General",
      icon: Settings,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              General Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Configure your application preferences
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-medium text-gray-900">
                  Email Notifications
                </h3>
                <p className="text-sm text-gray-600">
                  Receive email updates about your account
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between py-3">
              <div>
                <h3 className="font-medium text-gray-900">Auto-save</h3>
                <p className="text-sm text-gray-600">
                  Automatically save your work
                </p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  className="sr-only peer"
                  defaultChecked
                />
                <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>English (US)</option>
                <option>English (UK)</option>
                <option>Spanish</option>
                <option>French</option>
                <option>German</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Timezone
              </label>
              <select className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all">
                <option>UTC-8 (Pacific Time)</option>
                <option>UTC-5 (Eastern Time)</option>
                <option>UTC+0 (GMT)</option>
                <option>UTC+1 (Central European Time)</option>
                <option>UTC+5:30 (India Standard Time)</option>
              </select>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "theme",
      label: "Theme",
      icon: Palette,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-[var(--text)] mb-2">
              Theme Settings
            </h2>
            <p className="text-[var(--text)] mb-6">
              Customize your visual experience
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-[var(--text)] mb-4">
                Appearance
              </h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5  gap-4">
                {ActiveTheme.map((item, index) => (
                  <>
                    <div
                      onClick={() => handleTabClick(item)}
                      className={`${
                        item.label === activeMode
                          ? "border-[var(--border)] border-2"
                          : ""
                      }  rounded-lg p-4 cursor-pointer text-[var(--text)] bg-[var(--background)] shadow-md`}
                    >
                      <div
                        className={`w-full h-20 ${
                          item.color === "white"
                            ? "bg-white border-gray-600"
                            : "bg-black border-gray-600"
                        } rounded-lg mb-2 border`}
                      ></div>
                      <p className="text-sm font-medium text-center">
                        {item.label}
                      </p>
                    </div>
                  </>
                ))}
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "privacy",
      label: "Privacy",
      icon: Shield,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Privacy & Security
            </h2>
            <p className="text-gray-600 mb-6">
              Manage your privacy and security settings
            </p>
          </div>

          <div className="space-y-6">
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Shield className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-yellow-800">
                    Security Status
                  </h3>
                  <p className="text-sm text-yellow-700 mt-1">
                    Your account is secure. Last login: 2 hours ago
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">
                    Two-Factor Authentication
                  </h3>
                  <p className="text-sm text-gray-600">
                    Add an extra layer of security
                  </p>
                </div>
                <button className="bg-green-100 text-green-800 px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-200 transition-colors">
                  Enabled
                </button>
              </div>

              <div className="flex items-center justify-between py-3">
                <div>
                  <h3 className="font-medium text-gray-900">Data Collection</h3>
                  <p className="text-sm text-gray-600">
                    Allow analytics to improve experience
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="pt-4">
                <button className="text-red-600 hover:text-red-700 font-medium">
                  Download My Data
                </button>
              </div>

              <div className="pt-2">
                <button className="text-red-600 hover:text-red-700 font-medium">
                  Delete Account
                </button>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  const activeItem = navigationItems.find((item) => item.id === activeTab);

  return (
    <div className="bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[var(--background)] rounded-2xl shadow-2xl overflow-hidden flex flex-col md:flex-row min-h-[calc(100dvh-61px)] sm:min-h-[calc(100vh-61px)]">
        <div className="w-full md:w-64 lg:w-80 bg-[var(--background)] border-b md:border-b-0 md:border-r border-[var(--border)]">
          <div className="px-4 sm:px-6 py-4 sm:py-6 border-b border-[var(--border)] md:border-b">
            <h1 className="text-lg sm:text-xl font-bold text-[var(--text)] hidden md:block">
              Settings
            </h1>
          </div>

          <nav className="py-0 sm:p-3 md:p-4">
            <ul className="flex py-2 md:flex-col gap-2 justify-evenly md:space-y-2 overflow-x-auto md:overflow-visible">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <li key={item.id} className="shrink-0">
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center whitespace-nowrap
                              px-4 py-4 md:px-4 md:py-3 text-left rounded-lg
                              transition-all duration-200 focus:outline-none
                              focus-visible:ring-2 focus-visible:ring-blue-400
                              ${
                                isActive
                                  ? "bg-[var(--activeBg)] text-[var(--text)] shadow-sm"
                                  : "text-[var(--text)] hover:bg-[var(--permissionTable)]"
                              }`}
                      aria-current={isActive ? "page" : undefined}
                    >
                      <Icon className="w-[1.2rem] h-[1.2rem] text-[var(--text)]  md:mr-3" />
                      {/* Label hidden on mobile, visible from md+ */}
                      <span className="hidden md:inline-block font-medium text-[var(--text)] ml-3">
                        {item.label}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>
        </div>

        {/* Right Content Area */}
        <div className="flex-1 flex flex-col">
          <div className="hidden md:flex items-center justify-between p-4 sm:p-6 border-b border-[var(--border)]">
            <div className="flex items-center">
              {activeItem && (
                <activeItem.icon className="w-5 h-5 sm:w-6 sm:h-6 mr-2 sm:mr-3 text-[var(--text)]" />
              )}
              <h2 className="text-base sm:text-lg font-semibold text-[var(--text)]">
                {activeItem?.label}
              </h2>
            </div>
          </div>

          <div className="flex-1 p-4 sm:p-6 overflow-y-auto">
            {activeItem?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
