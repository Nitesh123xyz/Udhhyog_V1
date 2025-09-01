import React, { useEffect, useMemo, useRef, useState } from "react";
import Header from "../components/Header";
import toast from "react-hot-toast";
import {
  usePagePermissionListMutation,
  useUpdatePagePermissionMutation,
} from "../features/permission_page/page_permission";
import { fetchWithErrorHandling } from "../utils/ApiResponse";

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
      } outline-0 outline-[var(--border)] px-1 py-2 rounded-md`}
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
  // --------------------- API hooks ---------------------
  const [PagePermissionList, { isLoading: isListLoading }] =
    usePagePermissionListMutation();
  const [UpdatePagePermission, { isLoading: isUpdateLoading }] =
    useUpdatePagePermissionMutation();

  // --------------------- Local state -------------------
  // rows = array of page permission rows from your new structure
  const [rows, setRows] = useState([]);
  // Keep the original snapshot to compute diffs
  const originalRef = useRef([]);
  // Track changed rows by page_id: { [page_id]: diffObject }
  const [changedMap, setChangedMap] = useState({});

  // --------------------- Fetch data --------------------
  useEffect(() => {
    (async () => {
      const result = await fetchWithErrorHandling(() =>
        PagePermissionList().unwrap()
      );

      if (result.success) {
        const { permission = [] } = result?.data || {};
        // Expecting: [{page_id, page_name, view, edit, add, delete}, ...]
        setRows(permission);
        originalRef.current = clone(permission);
      } else {
        console.log("Fetch failed:", result.error);
      }
    })();
  }, []);

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
  // Save a single row immediately when toggled (optional pattern)
  const saveSingleImmediately = async (page_id) => {
    const payload = changedMap[page_id];
    console.log("Saving single:", payload);
    if (!payload) return;

    try {
      await UpdatePagePermission(payload).unwrap();
      // After success, merge into original snapshot and clear from changedMap
      originalRef.current = originalRef.current.map((r) =>
        r.page_id === page_id ? { ...r, ...payload } : r
      );
      setChangedMap((prev) => {
        const copy = { ...prev };
        delete copy[page_id];
        return copy;
      });
      toast.success("Permissions updated.");
    } catch (err) {
      console.error(err);
      toast.error("Update failed.");
    }
  };

  // Batch save all changed rows
  const saveAllChanges = async () => {
    const changes = Object.values(changedMap);
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
    <section className="bg-[var(--background)] backdrop-blur-md rounded-2xl h-[calc(100vh-62px)]">
      {/* Header */}
      <div className="px-2 pt-1">
        <Header rows={rows} setRows={setRows} title="PAGE PERMISSIONS" />
      </div>

      <div className="bg-[var(--background)] backdrop-blur-md rounded-2xl mt-1 p-2 lg:px-2 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-1">
          {/* Left Column */}
          <div className="rounded-2xl shadow-md p-2 border-[var(--border)] border-1">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-medium text-[var(--text)]">
                <span className="relative">
                  PERMISSION CONTROL
                  <span className="w-full h-[1px] bottom-[-1.5] block absolute bg-[var(--border)]" />
                </span>
              </h2>

              <button
                disabled={
                  isListLoading || isUpdateLoading || totalChanged === 0
                }
                onClick={saveAllChanges}
                className={`px-3 py-1.5 rounded-md text-sm border ${
                  totalChanged === 0
                    ? "opacity-60 cursor-not-allowed"
                    : "hover:opacity-90"
                } border-[var(--border)] text-[var(--text)]`}
              >
                Save All Changes ({totalChanged})
              </button>
            </div>

            <div className="overflow-y-auto-auto">
              <table className="w-full text-sm border-separate border-spacing-y-3 min-w-[600px]">
                <thead>
                  <tr className="text-left text-0 md:text-sm text-[var(--text)] sticky top-0 z-30 bg-[var(--background)] border-2 border-[var(--border)]">
                    <th className="px-1 py-3 first:rounded-l-lg">Page</th>
                    <th className="px-1 py-3">All</th>
                    <th className="px-1 py-3">View</th>
                    <th className="px-1 py-3">Edit</th>
                    <th className="px-1 py-3">Add</th>
                    <th className="px-1 py-3 last:rounded-r-lg">Delete</th>
                    <th className="px-1 py-3">Action</th>
                  </tr>
                </thead>

                <tbody>
                  {rows?.map((row, idx) => {
                    const allOn = isAllOn(row);
                    const dirty = !!changedMap[row.page_id];

                    return (
                      <tr
                        key={row.page_id}
                        className={`bg-[var(--background)] shadow-sm rounded-lg hover:bg-[var(--permissionTable)] transition duration-200 ease-in-out ${
                          dirty ? "outline-1 outline-[var(--border)]" : ""
                        }`}
                      >
                        <td className="py-5 px-1 text-[0.75rem] md:text-sm font-medium rounded-l-lg text-[var(--text)]">
                          {row.page_name}
                        </td>

                        {/* All (computed) */}
                        <td className="px-0">
                          <ToggleSwitch
                            enabled={allOn}
                            onChange={() => toggleOne(idx, "all")}
                          />
                        </td>

                        {/* View / Edit / Add / Delete */}
                        <td className="px-0">
                          <ToggleSwitch
                            enabled={!!row.view}
                            onChange={() => toggleOne(idx, "view")}
                          />
                        </td>
                        <td className="px-0">
                          <ToggleSwitch
                            enabled={!!row.edit}
                            onChange={() => toggleOne(idx, "edit")}
                          />
                        </td>
                        <td className="px-0">
                          <ToggleSwitch
                            enabled={!!row.add}
                            onChange={() => toggleOne(idx, "add")}
                          />
                        </td>
                        <td className="px-0">
                          <ToggleSwitch
                            enabled={!!row.delete}
                            onChange={() => toggleOne(idx, "delete")}
                          />
                        </td>

                        {/* Save single row immediately (optional) */}
                        <td className="px-1 rounded-r-lg">
                          <button
                            disabled={!dirty || isUpdateLoading}
                            onClick={() => saveSingleImmediately(row.page_id)}
                            className={`px-2 py-1 text-xs rounded border ${
                              !dirty
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:opacity-90"
                            } border-[var(--border)] text-[var(--text)]`}
                          >
                            Save
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="rounded-2xl shadow-md p-3 lg:p-3 border-[var(--border)] border-1">
            <h2 className="text-base font-medium mb-4 text-[var(--text)]">
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
