import React, { useEffect, useState } from "react";
import { ArrowDownUp, Pencil, Trash, X } from "lucide-react";
import { DepartmentHeading } from "../../utils/ReuseData";
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
import {
  useAddDepartmentMutation,
  useEditDepartmentMutation,
  useGetAllDepartmentQuery,
} from "../../features/department/DepartmentSlice";
import DepartmentHeader from "../../components/DepartmentHeader";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import {
  useAddTeamMutation,
  useEditTeamMutation,
} from "../../features/teams/teamSlice";
import toast from "react-hot-toast";

const AddMemberSchema = z.object({
  name: z.string().min(2, "User Name is required"),
});

const defaultValues = {
  name: "",
};

const Department = ({ step, setStep, setDepartmentInfo }) => {
  const { token } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
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
  const { data, isLoading, refetch } = useGetAllDepartmentQuery(token);
  const rows = data?.body?.view || [];
  console.log(rows);
  // console.log(getUserInfo);
  const [getQueryInfo, { isLoading: queryLoading }] = useQueryUsersMutation();
  const { searchLoading } = useSelector((state) => state.UtileSlice);

  const loading = Boolean(isLoading || queryLoading || searchLoading);
  const isEditMode = Boolean(editingMember);
  const [addDepartment] = useAddDepartmentMutation();
  const [updateDepartment] = useEditDepartmentMutation();
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

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(AddMemberSchema),
    defaultValues,
  });

  // ------------------------------------------------------------------

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    reset(defaultValues);
  };

  const openAddModal = (e) => {
    e.stopPropagation();
    setEditingMember(null);
    reset(defaultValues);
    setIsModalOpen(true);
  };

  const openEditModal = (e, member) => {
    e.stopPropagation();
    setEditingMember(member);
    reset({
      name: member?.name || "",
    });
    setIsModalOpen(true);
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

  const handleAddMember = async (payload) => {
    const { status } = await addDepartment(payload).unwrap();
    if (status === 200) {
      toast.success("Member added");
    }
  };

  const handleUpdateMember = async (payload) => {
    const { status } = await updateDepartment(payload).unwrap();
    if (status === 200) {
      toast.success("Member updated");
    }
  };

  const onSubmit = async (data) => {
    const basePayload = {
      token: token,
      name: data.name,
    };

    const payload = editingMember
      ? { ...basePayload, team_id: editingMember.team_id }
      : basePayload;

    try {
      if (editingMember) {
        await handleUpdateMember(payload);
      } else {
        await handleAddMember(payload);
      }

      refetch();
      closeModal();
    } catch (error) {
      console.log(error);
      toast.error(
        editingMember ? "Failed to update member" : "Failed to add member"
      );
      console.error(error);
    }
  };

  // ------------------------------------------------------
  return (
    <>
      <DepartmentHeader openAddModal={openAddModal} />

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
                        className={`pl-5 py-4 whitespace-nowrap text-xs rounded-r-2xl text-[var(--text)]`}
                      >
                        <div className="flex gap-1">
                          <div
                            onClick={(e) => openEditModal(e)}
                            className="cursor-pointer hover:bg-white/30 p-2 rounded-full  transition-all duration-300"
                          >
                            <Pencil size={15} />
                          </div>
                          <div className="cursor-pointer hover:bg-white/30 p-2 rounded-full  transition-all duration-300">
                            <Trash size={15} />
                          </div>
                        </div>
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

            {isModalOpen && (
              <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                <div
                  className="absolute inset-0 bg-black/20"
                  onClick={() => setIsModalOpen(false)}
                  aria-hidden
                />
                <div className="relative z-10 w-full max-w-md rounded-lg bg-[var(--background)] border border-[var(--border)] p-6 shadow-lg">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-[var(--text)]">
                      {isEditMode ? "Edit Team Member" : "Add Team Member"}
                    </h3>
                    <button
                      onClick={() => {
                        setIsModalOpen(false);
                        reset(defaultValues);
                      }}
                      className="text-sm text-[var(--text)] p-1.5 bg-[var(--border)] rounded-full cursor-pointer"
                      aria-label="Close"
                    >
                      <X size={15} />
                    </button>
                  </div>

                  <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-[var(--text)] mb-1">
                        User Name
                      </label>
                      <input
                        {...register("name")}
                        className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text)] bg-transparent outline-none"
                      />
                      {errors.name && (
                        <p className="text-xs text-red-400 mt-1">
                          {errors.name.message}
                        </p>
                      )}
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsModalOpen(false);
                          reset(defaultValues);
                        }}
                        className="cursor-pointer px-4 py-2 rounded-md border hover:bg-[var(--border)] border-[var(--border)] text-[var(--text)] transition-all"
                      >
                        Cancel
                      </button>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="cursor-pointer px-4 py-2 rounded-md bg-blue-400 hover:bg-blue-500 text-white disabled:opacity-60"
                      >
                        {isSubmitting
                          ? isEditMode
                            ? "Updating..."
                            : "Saving..."
                          : isEditMode
                          ? "Update Member"
                          : "Add Member"}
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
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
