import React, { useState } from "react";
import { PencilLine, ArrowDownUp } from "lucide-react";
import { Link } from "react-router-dom";
import { employees, employeesHeading } from "../../utils/DummyData";
import { StatusBtn } from "../../components/StatusBtn";
import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import "../../css/commonLayout.css";

const Users = ({ step, setStep, setEmployeesId }) => {
  const [rows, setRows] = useState(() => [...employees]);
  const [order, setOrder] = useState("asc");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2;
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentEmployees = rows.slice(startIndex, endIndex);

  // ------------------------------------------------------

  const handleSorting = (field, status) => {
    if (!status) return;
    setRows((prevRows) =>
      [...prevRows]?.sort((a, b) =>
        order === "asc"
          ? a[field]?.toString().localeCompare(b[field]?.toString())
          : b[field]?.toString().localeCompare(a[field]?.toString())
      )
    );
    setOrder(order === "asc" ? "desc" : "asc");
    setCurrentPage(1);
  };

  // ------------------------------------------------------

  const SortingFields = () => {
    return (
      <>
        {employeesHeading?.map((item, index) => {
          return (
            <th
              key={index}
              onClick={() => handleSorting(item?.name, item.status)}
              className={`px-3 py-5 text-left text-xs bg-[var(--background)] text-[var(--text)] uppercase tracking-wider ${
                item.status === true ? "cursor-pointer" : "cursor-default"
              }`}
            >
              {item?.status && (
                <ArrowDownUp
                  size={16}
                  className={`inline-block ml-1  text-[var(--icon)]`}
                />
              )}
              <span className="ml-2">{item?.name}</span>
            </th>
          );
        })}
      </>
    );
  };

  // ------------------------------------------------------

  return (
    <>
      <Header
        rows={rows}
        step={step}
        setRows={setRows}
        setStep={setStep}
        title="EMPLOYEES"
      />

      <section className="max-w-screen">
        <div
          className={`bg-[var(--background)] backdrop-blur-sm  overflow-hidden  lg:rounded-b-lg`}
        >
          <div className="overflow-x-auto px-2 max-h-screen h-[calc(100vh-169px)] sm:h-[calc(100vh-176px)]  NavScroll">
            <table className="w-full min-w-max table-auto">
              <thead className="sticky top-[-5px] lg:top-0 z-50">
                <tr>{SortingFields()}</tr>
              </thead>
              <tbody className="divide-y  divide-[var(--border)]">
                {currentEmployees?.map((employee) => (
                  <tr
                    onClick={() => {
                      setStep(2);
                      setEmployeesId(employee.id);
                    }}
                    key={employee.id}
                    className="hover:bg-[var(--hoverTable)] rounded-2xl transition-colors duration-200"
                  >
                    <td className="px-4 py-4 whitespace-nowrap rounded-l-2xl">
                      <div className="flex items-center space-x-3">
                        <img
                          src={employee.avatar}
                          alt={employee.name}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className={`text-xs text-[var(--text)]`}>
                          {employee.name}
                        </span>
                      </div>
                    </td>

                    <td
                      className={`px-6 py-4 whitespace-nowrap text-xs text-[var(--text)]`}
                    >
                      {employee.jobTitle}
                    </td>

                    <td
                      className={`px-6 py-4 whitespace-nowrap text-xs text-[var(--text)]`}
                    >
                      {employee.department}
                    </td>

                    <td
                      className={`px-6 py-4 whitespace-nowrap text-xs font-medium text-[var(--text)]`}
                    >
                      {employee.salary}
                    </td>

                    <td
                      className={`px-6 py-4 whitespace-nowrap text-xs text-[var(--text)]`}
                    >
                      {employee.startDate}
                    </td>

                    <td
                      className={`px-7 py-4 whitespace-nowrap text-xs text-[var(--text)]`}
                    >
                      {employee.lifecycle}
                    </td>

                    <td className="px-3 py-4 whitespace-nowrap rounded-r-2xl">
                      <StatusBtn Status={employee.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination */}
          <Pagination
            MainData={rows}
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

export default Users;
