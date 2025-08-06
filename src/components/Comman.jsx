import React from "react";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white font-sans text-gray-800">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md shadow-lg flex items-center justify-between px-6 py-3 rounded-b-xl border-b border-blue-200">
        <div className="flex items-center gap-4">
          <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg font-bold text-sm shadow-sm">
            LOGO
            <br />
            NAME
          </div>
          <h1 className="text-xl font-semibold tracking-wide">
            Admin Dashboard
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-100 text-blue-800 rounded-full flex flex-col items-center justify-center text-xs font-semibold shadow-md hover:scale-105 transition-transform">
            <span>PRO</span>
            <span>FILE</span>
          </div>
        </div>
      </header>

      {/* Sub Bar */}
      <div className="sticky top-[72px] z-40 bg-white/80 backdrop-blur-md px-6 py-2 flex items-center justify-between shadow-sm border-b border-blue-100 rounded-b-lg">
        <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded shadow-sm text-sm font-semibold">
          PAGE NAME
        </div>
        <div className="flex items-center gap-3">
          <button className="bg-blue-600 text-white px-4 py-1 text-sm rounded-lg shadow hover:bg-blue-700 transition">
            SEARCH
          </button>
          <div className="flex items-center gap-2">
            <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 shadow hover:bg-blue-200 font-bold flex items-center justify-center transition text-lg">
              +
            </button>
            <button className="w-10 h-10 rounded-full bg-blue-100 text-blue-800 shadow hover:bg-blue-200 font-bold flex items-center justify-center transition">
              F
            </button>
            <div className="flex flex-col items-center">
              <button className="w-10 h-5 rounded-t-full bg-blue-100 text-blue-800 shadow-sm hover:bg-blue-200 transition">
                ^
              </button>
              <button className="w-10 h-5 rounded-b-full bg-blue-100 text-blue-800 shadow-sm hover:bg-blue-200 transition">
                v
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Profile Section */}
      <section className="p-6">
        <div className="bg-white shadow-xl rounded-3xl p-6">
          <div className="bg-blue-600 text-white text-center text-md font-semibold px-4 py-3 rounded-md mb-6 shadow-md">
            PROFILE NAME
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 h-screen gap-8">
            {/* Column 1 */}
            <div>
              <h2 className="text-sm font-bold mb-3 text-blue-800">COLUMN 1</h2>
              <table className="w-full text-sm table-auto border-separate border-spacing-y-2">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="pr-2">NAME</th>
                    <th>VIEW</th>
                    <th>EDIT</th>
                    <th>ADD</th>
                    <th>DEL</th>
                    <th>ALL</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-blue-50 hover:bg-blue-100 transition rounded">
                    <td className="py-2 px-2 font-medium text-blue-900">
                      John Doe
                    </td>
                    <td className="text-center">👁️</td>
                    <td className="text-center">✏️</td>
                    <td className="text-center">➕</td>
                    <td className="text-center">🗑️</td>
                    <td className="text-center">📋</td>
                  </tr>
                </tbody>
              </table>
            </div>

            {/* Column 2 */}
            <div>
              <h2 className="text-sm font-bold mb-3 text-blue-800">COLUMN 2</h2>
              <div className="bg-blue-50 p-4 rounded-lg shadow-inner text-sm text-gray-700">
                Right column content goes here... Add stats, graphs, or
                settings.
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AdminLayout;
