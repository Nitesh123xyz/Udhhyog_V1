import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import toast from "react-hot-toast";
import {
  usePagePermissionListMutation,
  useUpdatePagePermissionMutation,
} from "../features/permission_page/page_permission";
import { fetchWithErrorHandling } from "../utils/ApiResponse";
import { showCustomToast } from "../components/CustomToast";
import { useSelector } from "react-redux";

const clone = (x) => structuredClone(x); // deep clone utility

/**
 * Compute if all permissions are ON for a row
 */
const isAllOn = (row) => !!row.view && !!row.edit && !!row.add && !!row.delete;

/**
 * Create a minimal diff between original row and updated row.
 * Only include changed flags. Always include page_id.
 */
const diffRow = (original, updated) => {
  const changed = { page_id: updated.page_id };
  let hasChange = false;

  ["view", "edit", "add", "delete"].forEach((k) => {
    if (original[k] !== updated[k]) {
      changed[k] = updated[k];
      hasChange = true;
    }
  });

  return hasChange ? changed : null;
};

const ToggleSwitch = ({ enabled, onChange }) => {
  return (
    <label
      className={`inline-flex items-center cursor-pointer ${
        enabled ? "outline-1" : "outline-0"
      } outline-0 outline-[var(--border)] px-1 py-2 rounded-lg`}
    >
      <input
        type="checkbox"
        className="sr-only"
        checked={enabled}
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

const Permission = () => {
  // ------------------------------------------
  const [UpdatePagePermission, { isLoading: isUpdateLoading }] =
    useUpdatePagePermissionMutation();
  const permissionList = useSelector(
    (state) => state.UtileSlice.permissionList
  );

  // ----------------------------------------
  const [rows, setRows] = useState(permissionList);
  const originalRef = useRef([]);
  const [changedMap, setChangedMap] = useState({});
  originalRef.current = clone(rows);
  // -----------------------------------------

  const totalChanged = useMemo(
    () => Object.keys(changedMap).length,
    [changedMap]
  );

  // --------------------- Toggling ----------------------
  const applyRowChange = (rowIndex, nextRow) => {
    setRows((prev) => {
      const copy = clone(prev);
      copy[rowIndex] = nextRow;

      // Build diff against original snapshot
      const originalRow =
        originalRef.current.find((r) => r.page_id === nextRow.page_id) ||
        nextRow;

      const delta = diffRow(originalRow, nextRow);

      setChangedMap((prevChanged) => {
        const newMap = { ...prevChanged };
        if (delta) {
          newMap[nextRow.page_id] = delta; // keep only changed fields + page_id
        } else {
          delete newMap[nextRow.page_id]; // no changes left for this row
        }
        return newMap;
      });

      return copy;
    });
  };

  const toggleOne = (rowIndex, key) => {
    setRows((prev) => {
      const current = prev[rowIndex];
      const next = { ...current };

      if (key === "all") {
        const turnOn = !isAllOn(current);
        next.view = turnOn;
        next.edit = turnOn;
        next.add = turnOn;
        next.delete = turnOn;
        applyRowChange(rowIndex, next);
        toast.success(
          `${current.page_name}: ${
            turnOn ? "Full access enabled" : "Full access removed"
          }`
        );
        return prev; // applyRowChange already updated state
      }

      // Flip just the selected flag
      next[key] = !current[key];
      applyRowChange(rowIndex, next);
      toast.success(
        `${current.page_name}: "${key}" ${next[key] ? "enabled" : "disabled"}`
      );
      return prev; // applyRowChange already updated state
    });
  };

  // --------------------- Save handlers -----------------

  // Batch save all changed rows
  const saveAllChanges = async () => {
    const changes = Object.values(changedMap);
    console.log("Saving all changes:", changes);
    if (changes.length === 0) {
      toast("No changes to save.");
      return;
    }

    try {
      // You can call a bulk API if you have one; otherwise loop:
      // await UpdatePagePermissionBulk({ changes }).unwrap();
      for (const payload of changes) {
        // eslint-disable-next-line no-await-in-loop
        await UpdatePagePermission(payload).unwrap();
        originalRef.current = originalRef.current.map((r) =>
          r.page_id === payload.page_id ? { ...r, ...payload } : r
        );
      }

      setChangedMap({});
      toast.success("All changes saved.");
    } catch (err) {
      console.error(err);
      toast.error("Saving changes failed.");
    }
  };

  return (
    <section className="bg-[var(--background)] backdrop-blur-md rounded-lg h-[calc(100vh-62px)]">
      <div className="px-1 pt-1">
        <Header rows={rows} setRows={setRows} title="PAGE PERMISSIONS" />
      </div>

      <div className="bg-[var(--background)] backdrop-blur-md rounded-t-lg px-1 mt-1">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-1">
          {/* Left Column */}
          <div className="rounded-lg shadow-md p-1.5 md:p-2 mb-1  border-[var(--border)] border-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm sm:text-base text-[var(--text)]">
                <span className="relative">
                  PERMISSION CONTROL
                  <span className="w-full h-[1px] bottom-[-1.5] block absolute bg-[var(--border)]" />
                </span>
              </h2>

              <button
                disabled={isUpdateLoading || totalChanged === 0}
                onClick={saveAllChanges}
                className={`px-3 py-1.5 rounded-md text-xs sm:text-sm border whitespace-nowrap ${
                  totalChanged === 0
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:opacity-90"
                } border-gray-400 text-[var(--text)]`}
              >
                Save All Changes ({totalChanged})
              </button>
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
                  {rows?.map((row, idx) => {
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

                        {/* All (computed) */}
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
                ✔️ Total Pages: <strong>{rows.length}</strong>
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
