import React, { useState } from "react";
import { PencilLine, Trash, ArrowDownUp } from "lucide-react";
import { Link } from "react-router-dom";
import { employees, employeesHeading } from "../utils/DummyData";
import { StatusBtn } from "../components/StatusBtn";
import Pagination from "../components/Pagination";

const EmployeeDashboard = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = employees.slice(startIndex, endIndex);

  const SortingIcon = () => {
    // sorting icon
    return (
      <>
        {employeesHeading?.map((item) => {
          return (
            <>
              <th className="px-3 py-3 sticky top-1 z-[9999] text-left text-xs font-bold text-gray-500 uppercase tracking-wider">
                {item?.status && (
                  <ArrowDownUp
                    size={16}
                    color="black"
                    className="inline-block ml-1"
                  />
                )}
                <span className="ml-2">{item?.name}</span>
              </th>
            </>
          );
        })}
      </>
    );
  };

  return (
    <>
      <section className="py-[1rem_0rem]">
        <div className="bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden">
          <div className="overflow-x-auto px-2 max-h-[70vh]  overflow-y-auto">
            <table className="w-full">
              <thead className="bg-gray-50/50">
                <tr>{SortingIcon()}</tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {currentEmployees.map((employee) => (
                  <tr
                    key={employee.id}
                    className="hover:bg-yellow-400 rounded-2xl transition-colors duration-200"
                  >
                    <td className="px-6 py-4 whitespace-nowrap rounded-l-2xl">
                      <div className="flex items-center space-x-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm font-medium">
                          {employee.name}
                        </span>
                      </div>
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {employee.jobTitle}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {employee.department}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {employee.salary}
                    </td>

                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {employee.startDate}
                    </td>

                    <td className="px-7 py-4 whitespace-nowrap text-sm">
                      {employee.lifecycle}
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap">
                      <StatusBtn Status={employee.status} />
                    </td>

                    <td className="px-10 py-4 whitespace-nowrap text-sm rounded-r-2xl">
                      <div className="flex">
                        <Link to="/update-user">
                          <PencilLine size={16} className="cursor-pointer" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <Pagination
            MainData={employees}
            startIndex={startIndex}
            endIndex={endIndex}
            itemsPerPage={itemsPerPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        </div>
      </section>
    </>
  );
};

export default EmployeeDashboard;
