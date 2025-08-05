import React, { useState } from "react";
import {
  BarChart3,
  TrendingUp,
  Globe,
  Search,
  ExternalLink,
  Link2,
  FileText,
  LineChart,
} from "lucide-react";

const SEOAdminDashboard = () => {
  const [keywordInput, setKeywordInput] = useState("");
  const [urlInput, setUrlInput] = useState("");

  const linkBuildingData = [
    { website: "example.com", domainAuthority: 85, backlinks: 1234 },
    { website: "sample.net", domainAuthority: 78, backlinks: 987 },
    { website: "website.org", domainAuthority: 65, backlinks: 567 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-tr from-purple-100 via-blue-50 to-yellow-100 font-sans text-gray-900">
      <main className="px-4 py-8 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <Globe className="text-blue-500" />
                <h2 className="text-lg font-semibold">Website Traffic</h2>
              </div>
              <p className="text-3xl font-bold">12,345</p>
              <p className="text-green-600 font-medium mt-1">
                +5% from last week
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <TrendingUp className="text-yellow-500" />
                <h2 className="text-lg font-semibold">Keyword Rankings</h2>
              </div>
              <p className="text-3xl font-bold">Top 10</p>
              <p className="text-red-500 font-medium mt-1">-2% this week</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
              <div className="flex items-center gap-3 mb-3">
                <BarChart3 className="text-purple-600" />
                <h2 className="text-lg font-semibold">Backlinks</h2>
              </div>
              <p className="text-3xl font-bold">5,678</p>
              <p className="text-green-600 font-medium mt-1">+10% growth</p>
            </div>
          </div>

          {/* Keyword Research */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <Search className="text-blue-600" /> Keyword Research
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="text"
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                placeholder="Enter keyword (e.g., SEO tool)"
                className="w-full sm:w-2/3 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition">
                <Search size={18} /> Search
              </button>
            </div>
          </section>

          {/* Content Optimization */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <FileText className="text-green-600" /> Content Optimization
            </h2>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <input
                type="url"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Paste URL (e.g., https://yourdomain.com/blog)"
                className="w-full sm:w-2/3 px-5 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-3 px-6 rounded-lg transition">
                <LineChart size={18} /> Analyze
              </button>
            </div>
          </section>

          {/* Link Building Table */}
          <section className="mt-14">
            <h2 className="text-2xl font-bold flex items-center gap-2 mb-4">
              <Link2 className="text-indigo-600" /> Link Building
            </h2>
            <div className="overflow-x-auto bg-white border border-gray-200 rounded-xl shadow">
              <table className="w-full text-left min-w-[600px]">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-3 px-5 text-sm font-semibold text-gray-700">
                      Website
                    </th>
                    <th className="py-3 px-5 text-sm font-semibold text-gray-700">
                      Domain Authority
                    </th>
                    <th className="py-3 px-5 text-sm font-semibold text-gray-700">
                      Backlinks
                    </th>
                    <th className="py-3 px-5 text-sm font-semibold text-gray-700">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {linkBuildingData.map((item, index) => (
                    <tr
                      key={index}
                      className="border-t border-gray-200 hover:bg-gray-50 transition"
                    >
                      <td className="px-5 py-4">{item.website}</td>
                      <td className="px-5 py-4">{item.domainAuthority}</td>
                      <td className="px-5 py-4">
                        {item.backlinks.toLocaleString()}
                      </td>
                      <td className="px-5 py-4">
                        <button className="flex items-center text-blue-600 hover:text-blue-800 transition">
                          <ExternalLink size={16} className="mr-1" /> View
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

export default SEOAdminDashboard;
