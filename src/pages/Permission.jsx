//

import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import toast from "react-hot-toast";
import { useUpdatePagePermissionMutation } from "../features/permission_page/page_permission";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import { showCustomToast } from "../components/CustomToast";
import { useSelector } from "react-redux";
import AllProfileMenu from "../components/AllProfileMenu";
import { SaveAll } from "lucide-react";
import useAuth from "../hooks/useAuth";

const clone = (x) =>
  typeof structuredClone === "function"
    ? structuredClone(x)
    : JSON.parse(JSON.stringify(x));

// ---------- Helpers ----------
const toBool = (v) => {
  if (typeof v === "boolean") return v;
  if (typeof v === "number") return v !== 0;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    if (s === "0" || s === "false" || s === "") return false;
    return true;
  }
  return Boolean(v);
};

const normalizePermissions = (arr) =>
  (arr || []).map((r) => ({
    ...r,
    view: toBool(r.view),
    edit: toBool(r.edit),
    add: toBool(r.add),
    delete: toBool(r.delete),
  }));

const isAllOn = (row) =>
  !!row && !!row.view && !!row.edit && !!row.add && !!row.delete;

const ToggleSwitch = ({ enabled, onChange }) => {
  return (
    <label
      role="switch"
      aria-checked={!!enabled}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onChange();
        }
      }}
      className={`inline-flex items-center cursor-pointer ${
        enabled ? "outline-1" : "outline-0"
      } outline-0 outline-[var(--border)] px-1 py-2 rounded-lg`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={!!enabled}
        onChange={onChange}
      />
      <div
        className={`w-8 h-5 flex items-center rounded-full p-[0.2rem] duration-300 ease-in-out ${
          enabled ? "bg-yellow-400" : "bg-gray-300"
        }`}
      >
        <div
          className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
            enabled ? "translate-x-[0.6rem]" : ""
          }`}
        />
      </div>
    </label>
  );
};

// ---------------- Component ----------------
const Permission = () => {
  // const [rows, setRows] = useState([]);
  const [permissionDataList, setPermissionDataList] = useState([]);
  const originalRef = useRef([]);
  const [changedMap, setChangedMap] = useState({});

  // --------------------------------------------------------

  const [UpdatePagePermission, { isLoading: isUpdateLoading }] =
    useUpdatePagePermissionMutation();

  const { selectedProfile } = useSelector((state) => state.UtileSlice);
  const { token } = useAuth();

  const permissionList = useSelector(
    (state) => state.UtileSlice.permissionList
  );

  // --------------------------------------------------------

  useEffect(() => {
    const normalized = normalizePermissions(permissionList);
    setPermissionDataList(normalized);
    originalRef.current = clone(normalized);
    setChangedMap({});
  }, [permissionList]);

  const totalChanged = useMemo(
    () => Object.keys(changedMap).length,
    [changedMap]
  );

  const applyRowChange = (rowIndex, nextRow) => {
    setPermissionDataList((prev) => {
      const copy = clone(prev);
      copy[rowIndex] = nextRow;

      // Build minimal diff against original snapshot
      const originalRow =
        (originalRef.current || []).find(
          (r) => r.page_id === nextRow.page_id
        ) || nextRow;

      const changed = { page_id: nextRow.page_id };
      let hasChange = false;
      ["view", "edit", "add", "delete"].forEach((k) => {
        if (originalRow[k] !== nextRow[k]) {
          changed[k] = nextRow[k];
          hasChange = true;
        }
      });

      setChangedMap((prevChanged) => {
        const newMap = { ...prevChanged };
        if (hasChange) {
          newMap[nextRow.page_id] = changed;
        } else {
          delete newMap[nextRow.page_id];
        }
        return newMap;
      });

      return copy;
    });
  };

  const toggleOne = (rowIndex, key) => {
    if (!selectedProfile) {
      showCustomToast("Please Select a Profile", "/error.gif", "Error");
      return;
    }
    const current = permissionDataList[rowIndex];
    if (!current) return;

    if (key === "all") {
      const turnOn = !isAllOn(current);
      const next = {
        ...current,
        view: turnOn,
        edit: turnOn,
        add: turnOn,
        delete: turnOn,
      };
      applyRowChange(rowIndex, next);
      toast.success(
        `${current.page_name}: ${
          turnOn ? "Full access enabled" : "Full access removed"
        }`
      );
      return;
    }

    const next = { ...current, [key]: !current[key] };
    applyRowChange(rowIndex, next);
    // toast.success(
    //   `${current.page_name}: "${key}" ${next[key] ? "enabled" : "disabled"}`
    // );
  };

  const saveAllChanges = async () => {
    if (!selectedProfile) {
      showCustomToast("Please Select a Profile", "/error.gif", "Error");
      return;
    }

    const diffs = Object.values(changedMap);
    if (diffs.length === 0) {
      toast.success("No changes to save.");
      return;
    }

    const update_list = [];
    diffs.forEach((d) => {
      const pid = d.page_id;
      ["view", "edit", "add", "delete"].forEach((k) => {
        if (k in d) {
          update_list.push({
            page_id: pid,
            perm_type: k,
            perm_bool: !!d[k],
          });
        }
      });
    });

    const payload = {
      token: token,
      emp_id: selectedProfile ? selectedProfile.emp_id : null,
      update_list,
    };

    const { success, status } = await fetchWithErrorHandling(() =>
      UpdatePagePermission(payload).unwrap()
    );
    if (success && status === 200) {
      originalRef.current = clone(permissionDataList);
      setChangedMap({});
      showCustomToast("Permission Updated", "/success.gif", "Success");
    } else {
      if (status === 401) {
        showCustomToast("Permission Updated Failed", "/error.gif", "Error");
      }
    }
  };

  const sortedRows = permissionDataList
    ? permissionDataList?.sort((a, b) => a.page_id - b.page_id)
    : [];

  return (
    <section className="bg-[var(--background)] backdrop-blur-md rounded-lg h-[calc(100vh-62px)]">
      <div className="px-1 pt-1">
        <Header
          permissionDataList={permissionDataList}
          setPermissionDataList={setPermissionDataList}
          title="permission"
          originalRef={originalRef}
        />
      </div>

      <div className="bg-[var(--background)] backdrop-blur-md rounded-t-lg px-1 mt-1">
        <div
          className={`${
            totalChanged === 0
              ? "opacity-0 cursor-not-allowed"
              : "opacity-90 cursor-pointer"
          } fixed top-2 right-3 w-fit z-[999] sm:sticky sm:top-2/3 sm:left-1/2 sm:transform sm:-translate-x-1/2 sm:-translate-y-1/2`}
        >
          <button
            disabled={isUpdateLoading || totalChanged === 0}
            onClick={saveAllChanges}
            aria-label="Save all changes"
            className={`w-[2.4rem] h-[2.4rem] sm:w-[3.3rem] sm:h-[3.3rem] p-1 rounded-full text-xs sm:text-sm border whitespace-nowrap bg-red-400 border-none text-[var(--text)] ${
              totalChanged === 0
                ? "opacity-60 cursor-not-allowed"
                : "opacity-90 cursor-pointer"
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <SaveAll className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[0_0.2rem] sm:-mt-[3.2rem]">
          {/* Left Column */}
          <div className="rounded-lg shadow-md p-1.5 md:p-2 mb-1  border-[var(--border)] border-1">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <h2 className="text-sm sm:text-base text-[var(--text)] ml-1">
                <span className="relative text-xs sm:text-[1rem]">
                  PERMISSION CONTROL
                  <span className="w-full h-[1px] bottom-[-1.5] block absolute bg-[var(--border)]" />
                </span>
              </h2>

              {/* {employee list} */}
              <AllProfileMenu />
            </div>

            <div>
              <table className="w-full text-sm border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-xs xl:text-sm text-[var(--text)]  sticky top-[55px] z-30 bg-[var(--background)] border-2 border-[var(--border)]">
                    <th className="px-0.5 md:px-2 py-3 first:rounded-l-lg">
                      Page
                    </th>
                    <th className="px-0.5 md:px-2 py-3 text-center">All</th>
                    <th className="px-0.5 md:px-2 py-3 text-center">View</th>
                    <th className="px-0.5 md:px-2 py-3 text-center">Edit</th>
                    <th className="px-0.5 md:px-2 py-3 text-center">Add</th>
                    <th className="px-0.5 md:px-2 py-3 text-center last:rounded-r-lg">
                      Delete
                    </th>
                  </tr>
                </thead>

                <tbody>
                  {sortedRows?.map((row, idx) => {
                    const allOn = isAllOn(row);
                    return (
                      <tr
                        key={row.page_id}
                        className={`bg-[var(--background)] shadow-sm rounded-lg hover:bg-[var(--permissionTable)] transition duration-200 ease-in-out`}
                      >
                        <td className="py-4 px-1 md:px-2 text-xs xl:text-sm  rounded-l-lg text-[var(--text)] truncate">
                          <span
                            title={row.page_name}
                            className="text-wrap relative"
                          >
                            {row.page_name}
                            <span className="w-full h-[1px] bottom-[-1.5] block absolute bg-[var(--border)]" />
                          </span>
                        </td>

                        <td className="px-1 md:px-2 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch
                              enabled={allOn}
                              onChange={() => toggleOne(idx, "all")}
                            />
                          </div>
                        </td>

                        <td className="px-1 md:px-2 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch
                              enabled={!!row.view}
                              onChange={() => toggleOne(idx, "view")}
                            />
                          </div>
                        </td>
                        <td className="px-1 md:px-2 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch
                              enabled={!!row.edit}
                              onChange={() => toggleOne(idx, "edit")}
                            />
                          </div>
                        </td>
                        <td className="px-1 md:px-2 text-center">
                          <div className="flex justify-center">
                            <ToggleSwitch
                              enabled={!!row.add}
                              onChange={() => toggleOne(idx, "add")}
                            />
                          </div>
                        </td>
                        <td className="px-1 md:px-2 text-center rounded-r-lg">
                          <div className="flex justify-center">
                            <ToggleSwitch
                              enabled={!!row.delete}
                              onChange={() => toggleOne(idx, "delete")}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
          {/* Right Column */}
          <div className="rounded-lg shadow-md p-3 mb-1 lg:p-3 border-[var(--border)] border-1">
            <h2 className="text-base  mb-4 text-[var(--text)]">
              <span className="relative">
                SUMMARY / SETTINGS
                <span className="w-full h-[1px] bottom-[-1.5] block absolute bg-[var(--border)]" />
              </span>
            </h2>

            <div className="p-2 lg:p-3 text-sm text-[var(--text)] leading-relaxed space-y-2">
              <p>
                ✔️ Total Pages: <strong>{permissionDataList?.length}</strong>
              </p>
              <p>
                ✔️ Changes pending: <strong>{totalChanged}</strong>
              </p>
              <p>
                ✔️ Toggle “All” to enable/disable every permission in a row.
              </p>
              <p>✔️ Click “Save” for a single row or “Save All Changes”.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Permission;
