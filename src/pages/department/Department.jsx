import React, { useEffect, useState } from "react";
import { ArrowDownUp } from "lucide-react";
import { DepartmentHeading } from "../../utils/ReuseData";
import { StatusBtn } from "../../components/StatusBtn";
import Pagination from "../../components/Pagination";
import Header from "../../components/Header";
import {
  useGetUsersMutation,
  useQueryUsersMutation,
} from "../../features/users/usersSlice";

import useAuth from "../../hooks/useAuth";
import { formatDateToIndian, formatRupees } from "../../utils/formatter";
import Loader from "../../components/Loader";
import { useSelector } from "react-redux";
import { useGetAllDepartmentQuery } from "../../features/department/DepartmentSlice";

const Department = ({ step, setStep, setDepartmentInfo }) => {
  const { token } = useAuth();
  // const [rows, setRows] = useState([]);
  const [order, setOrder] = useState("_a");
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  // server-side pagination: rows contains only current page items
  const [TotalPages, setTotalPages] = useState(0);
  const [currentSort, setCurrentSort] = useState(null);
  const [currentActive, setCurrentActive] = useState(null);
  const [employeesHeaderData, setEmployeesHeaderData] =
    useState(DepartmentHeading);

  // ------------------------------------------------------
  const { data, isLoading } = useGetAllDepartmentQuery(token);
  const rows = data?.body?.view || [];
  console.log(rows);
  // console.log(getUserInfo);
  const [getQueryInfo, { isLoading: queryLoading }] = useQueryUsersMutation();
  const { searchLoading } = useSelector((state) => state.UtileSlice);

  const loading = Boolean(isLoading || queryLoading || searchLoading);

  // ------------------------------------------------------------------

  const handleUserInfo = async () => {
    // 10 Default Api Data
    // try {
    //   const { body } = await getUserInfo(token).unwrap();
    //   setRows(body?.emp_data || []);
    //   setTotalPages(body?.t_rows || 0);
    // } catch (error) {
    //   console.log(error);
    // }
  };

  // ------------------------------------------------------------------

  const handleQueryUser = async (sortingValue = null, pageOverride = null) => {
    try {
      const sortToSend = sortingValue ?? currentSort ?? null;
      const pageNo = Number(pageOverride ?? currentPage);

      const queryUser = {
        per_page: Number(itemsPerPage),
        page_no: pageNo,
        sort: sortToSend,
        token: token,
      };

      const { body } = await getQueryInfo(queryUser).unwrap();

      // setRows(body?.emp_data || []);
      setTotalPages(body?.t_rows || 0);

      if ((body?.emp_data?.length || 0) === 0 && pageNo !== 1) {
        setCurrentPage(1);
        const retryQuery = { ...queryUser, page_no: 1 };
        const { body: retryBody } = await getQueryInfo(retryQuery).unwrap();
        // setRows(retryBody?.emp_data || []);
        setTotalPages(retryBody?.t_rows || 0);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    handleQueryUser();
  }, [itemsPerPage, currentPage, currentSort]);

  // ------------------------------------------------------

  const handleSorting = (field) => {
    if (!field || !field.status) return;

    const nextOrder = order === "_a" ? "_d" : "_a";

    const sortValue = `${field.name}_${nextOrder === "_a" ? "a" : "d"}`;

    setOrder(nextOrder);
    setCurrentActive(field.name);
    setCurrentSort(sortValue);
    setCurrentPage(1);

    setEmployeesHeaderData((prev) =>
      prev.map((it) => ({
        ...it,
        active: it.name === field.name,
      }))
    );

    handleQueryUser(sortValue, 1);
  };

  // ------------------------------------------------------
  const SortingFields = () => {
    return (
      <>
        {employeesHeaderData?.map((item) => {
          return (
            <th
              key={item.name}
              onClick={() => item.status && handleSorting(item)}
              className={`px-3 py-5 text-left text-xs bg-[var(--background)] text-[var(--text)] uppercase tracking-wider ${
                item.status ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <div className="flex items-center gap-1 select-none">
                {item?.status && (
                  <ArrowDownUp
                    size={16}
                    className={`inline-block transform transition-transform duration-300 ${
                      item.name === currentActive
                        ? order === "_a"
                          ? "rotate-180"
                          : "rotate-0"
                        : "rotate-0 opacity-40"
                    }`}
                  />
                )}
                <span>{item?.label}</span>
              </div>
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
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        currentActive={currentActive}
        handleUserInfo={handleUserInfo}
        // setRows={setRows}
        setStep={setStep}
        title="users"
      />

      <section className="max-w-screen">
        <div
          className={`bg-[var(--background)] backdrop-blur-sm  overflow-hidden lg:rounded-b-lg`}
        >
          <div className="overflow-x-auto px-2 max-h-screen h-[calc(100vh-169px)] sm:h-[calc(100vh-176px)]  NavScroll">
            {loading && <Loader />}
            <table className="w-full min-w-max table-auto">
              <thead className="sticky top-[-5px] lg:top-0 z-50">
                <tr>{SortingFields()}</tr>
              </thead>
              <tbody className={`divide-y  divide-[var(--border)]`}>
                {rows && rows.length > 0 ? (
                  rows?.map((employee) => (
                    <tr
                      onClick={() => {
                        setStep(2);
                        setDepartmentInfo({
                          id_profile: employee?.id_profile,
                          profile_name: employee.name,
                        });
                      }}
                      key={employee?.id_profile}
                      className="hover:bg-[var(--hoverTable)] transition-colors duration-200"
                    >
                      <td
                        className={`pl-8 py-4 whitespace-nowrap text-xs rounded-l-2xl text-[var(--text)]`}
                      >
                        {employee?.id_profile}
                      </td>
                      <td className="px-0 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-3">
                          <img
                            src={
                              employee.avatar ||
                              "https://cdn-icons-png.freepik.com/512/16524/16524724.png?uid=R213905709&ga=GA1.1.928608604.1757403767"
                            }
                            alt={employee.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <span
                            className={`text-xs text-[var(--text)] capitalize`}
                          >
                            {employee.name}
                          </span>
                        </div>
                      </td>

                      <td
                        className={`px-3 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
                      >
                        {employee?.job_title}
                      </td>
                      <td
                        className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
                      >
                        {employee?.department}
                      </td>
                      <td
                        className={`px-6 py-4 whitespace-nowrap text-xs font-medium text-[var(--text)]`}
                      >
                        {formatRupees(employee.salary)}
                      </td>
                      <td
                        className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)]`}
                      >
                        {formatDateToIndian(employee?.joining_date)}
                      </td>
                      <td
                        className={`px-8 py-4 whitespace-nowrap text-xs text-[var(--text)] capitalize`}
                      >
                        {employee?.employement_type}
                      </td>
                      <td className="pl-5 py-4 whitespace-nowrap rounded-r-2xl">
                        <StatusBtn Status={employee?.active} />
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="py-[15%] text-[3rem] text-[var(--text)] text-center"
                    >
                      No Data Found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <Pagination
            MainData={rows}
            itemsPerPage={itemsPerPage}
            startIndex={startIndex}
            endIndex={endIndex}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            setItemsPerPage={(val) => {
              setItemsPerPage(Number(val));
              setCurrentPage(1);
            }}
            TotalPages={TotalPages}
          />
        </div>
      </section>
    </>
  );
};

export default Department;
