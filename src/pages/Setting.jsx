import React, { useState } from "react";
import { User, Settings, Palette, Shield } from "lucide-react";

const Setting = () => {
  const [activeTab, setActiveTab] = useState("account");
  const [isOpen, setIsOpen] = useState(true);

  const navigationItems = [
    {
      id: "account",
      label: "Account",
      icon: User,
      content: (
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold dark:text-white text-gray-900 mb-2">
              Account Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Manage your account information and preferences
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Full Name
              </label>
              <input
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your full name"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                placeholder="Enter your phone number"
              />
            </div>

            <div className="pt-4">
              <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                Save Changes
              </button>
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
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Theme Settings
            </h2>
            <p className="text-gray-600 mb-6">
              Customize your visual experience
            </p>
          </div>

          <div className="space-y-6">
            <div>
              <h3 className="font-medium text-gray-900 mb-4">Appearance</h3>
              <div className="grid grid-cols-3 gap-4">
                <div className="border-2 border-blue-500 rounded-lg p-4 cursor-pointer bg-blue-50">
                  <div className="w-full h-20 bg-white rounded mb-2 border"></div>
                  <p className="text-sm font-medium text-center">Light</p>
                </div>
                <div className="border-2 border-gray-200 rounded-lg p-4 cursor-pointer hover:border-gray-300">
                  <div className="w-full h-20 bg-gray-800 rounded mb-2"></div>
                  <p className="text-sm font-medium text-center">Dark</p>
                </div>
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
    <div className="min-h-screen bg-opacity-50 backdrop-blur-sm flex items-center justify-center">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-7xl h-[600px] flex overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-64 bg-gray-50 dark:bg-gray-800 border-r border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Settings
            </h1>
          </div>
          <nav className="p-4">
            <ul className="space-y-2">
              {navigationItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={() => setActiveTab(item.id)}
                      className={`w-full flex items-center px-4 py-3 text-left rounded-lg transition-all duration-200 ${
                        activeTab === item.id
                          ? "bg-blue-100 dark:bg-gray-600  shadow-sm"
                          : "text-gray-700 dark:hover:bg-gray-700 hover:bg-gray-200 hover:text-gray-900"
                      }`}
                    >
                      <Icon className="w-5 text-black dark:text-white h-5 mr-3" />
                      <span className="font-medium dark:text-white">
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
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center">
              {activeItem && (
                <activeItem.icon className="w-6 h-6 mr-3 text-gray-600" />
              )}
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                {activeItem?.label}
              </h2>
            </div>
          </div>

          <div className="flex-1 p-6 overflow-y-auto">
            {activeItem?.content}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
