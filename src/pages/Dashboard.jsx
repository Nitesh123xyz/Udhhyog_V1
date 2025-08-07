import React, { useState } from "react";
import {
  ChevronDown,
  Search,
  Plus,
  MoreHorizontal,
  Download,
  PencilLine,
  Trash,
} from "lucide-react";
import { Link } from "react-router-dom";
import { employees } from "../utils/DummyData";

const EmployeeDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const totalPages = Math.ceil(employees.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const getSiteFlag = (site) => {
    const flags = {
      Stockholm: "🇸🇪",
      Miami: "🇺🇸",
      Kyiv: "🇺🇦",
      Ottawa: "🇨🇦",
      "Sao Paulo": "🇧🇷",
      London: "🇬🇧",
    };
    return flags[site] || "🌍";
  };

  const getStatusColor = (status) => {
    return status === "Invited" ? "text-green-600" : "text-orange-600";
  };

  const getStatusBg = (status) => {
    return status === "Invited" ? "bg-green-100" : "bg-orange-100";
  };

  return (
    <>
      {/* Header */}

      <div className="py-[3rem_0rem]">
        {/* Title and Stats */}
        {/* <div className="mb-8">
          <h1 className="text-4xl font-light text-gray-900 mb-6">People</h1>

          <div className="flex flex-wrap items-center gap-6 mb-6">
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Interviews</span>
              <div className="flex items-center space-x-2">
                <div className="bg-gray-800 text-white px-3 py-1 rounded-full text-sm">
                  25%
                </div>
                <div className="bg-yellow-400 px-3 py-1 rounded-full text-sm text-gray-800">
                  51%
                </div>
              </div>
            </div>
            <div className="text-sm text-gray-600">
              Hired: <span className="font-medium">25%</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Project time</span>
              <span className="text-sm font-medium">10%</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Output</span>
              <span className="text-sm font-medium">14%</span>
            </div>
          </div>
        </div> */}

        {/* Controls */}
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          {/* <div className="p-6 border-b border-gray-200">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-4">
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <span>Directory</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <span>Org Chart</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                  <span>Insights</span>
                  <ChevronDown className="w-4 h-4" />
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <Link to="add-user">
                  <button className="px-2 py-2 cursor-pointer bg-yellow-400 rounded-full">
                    <Plus className="w-4 h-4" color="black" />
                  </button>
                </Link>
                <button className="px-2 py-2 cursor-pointer bg-yellow-400 rounded-full">
                  <MoreHorizontal className="w-4 h-4" color="black" />
                </button>
                <button className="flex items-center space-x-2 px-2 py-2 cursor-pointer bg-yellow-400 rounded-full text-sm text-black ">
                  <Download className="w-4 h-4" color="black" />
                  <span>Export</span>
                </button>
              </div>
            </div>
          </div> */}

          {/* Filters */}
          {/* <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex flex-wrap items-center gap-4">
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <span>Columns</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <span>Department</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <span>Site</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <span>Lifecycle</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <span>Status</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <button className="flex items-center space-x-2 text-sm text-gray-600 hover:text-gray-900">
                <span>Entity</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <div className="flex items-center space-x-2 ml-auto">
                <Search className="w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search"
                  className="bg-transparent border-none outline-none text-sm text-gray-600 placeholder-gray-400"
                />
              </div>
            </div>
          </div> */}

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>
                  {/* <th className="px-6 py-3 text-left">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300"
                    />
                  </th> */}
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Job title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Department
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Site
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Salary
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Start date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Lifecycle
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className={`hover:bg-gray-50/50 ${
                      employee.highlighted ? "bg-yellow-100/60" : ""
                    }`}
                  >
                    {/* <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        className="rounded border-gray-300"
                        defaultChecked={employee.highlighted}
                      />
                    </td> */}
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium text-gray-900">
                          {employee.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {employee.jobTitle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {employee.department}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <span className="text-lg">
                          {getSiteFlag(employee.site)}
                        </span>
                        <span className="text-sm text-gray-600">
                          {employee.site}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                      {employee.salary}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {employee.startDate}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {employee.lifecycle}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center space-x-2">
                        <div
                          className={`w-2 h-2 rounded-full ${
                            employee.status === "Invited"
                              ? "bg-green-500"
                              : "bg-orange-500"
                          }`}
                        ></div>
                        <span
                          className={`text-sm ${getStatusColor(
                            employee.status
                          )}`}
                        >
                          {employee.status}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      <div className="flex items-center justify-center">
                        <Link to="/update-user">
                          <PencilLine size={16} className="cursor-pointer" />
                        </Link>
                        {/* <Trash size={16} className="cursor-pointer" /> */}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-between">
              <div className="text-sm text-gray-500">
                Showing {startIndex + 1} to{" "}
                {Math.min(endIndex, employees.length)} of {employees.length}{" "}
                results
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`px-3 py-1 text-sm rounded ${
                      currentPage === i + 1
                        ? "bg-gray-900 text-white"
                        : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
                <button
                  onClick={() =>
                    setCurrentPage(Math.min(totalPages, currentPage + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-3 py-1 text-sm text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EmployeeDashboard;
