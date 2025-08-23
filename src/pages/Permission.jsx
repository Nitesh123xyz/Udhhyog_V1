import React, { useState } from "react";
import { dummyData } from "../utils/DummyData";
import Header from "../components/Header";
import { set } from "zod";
import toast from "react-hot-toast";

const Permission = () => {
  const [users, setUsers] = useState(dummyData);

  // ----------------------------------------------

  const ToggleSwitch = ({ enabled, onChange }) => {
    {
      // console.log(enabled);
    }
    return (
      <label
        className={`inline-flex items-center cursor-pointer ${
          enabled ? "outline-1" : "outline-0"
        } outline-0 outline-[var(--border)] px-1 py-2  rounded-md`}
      >
        <input
          type="checkbox"
          className="sr-only"
          checked={enabled}
          onChange={onChange}
        />
        <div
          className={`w-8 h-5 flex items-center bg-gray-300 rounded-full p-[0.2rem] duration-300 ease-in-out ${
            enabled ? "bg-yellow-400" : "bg-gray-300"
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${
              enabled ? "translate-x-[0.6rem]" : ""
            }`}
          ></div>
        </div>
      </label>
    );
  };

  const togglePermission = (userIndex, type) => {
    setUsers((prevUsers) =>
      prevUsers.map((user, i) => {
        if (i !== userIndex) return user;

        const permissions = { ...user.permissions };

        // Toggle ALL: flip every permission
        if (type === "all") {
          const nextValue = !permissions.all;
          for (const key of Object.keys(permissions)) {
            permissions[key] = nextValue;
          }

          toast.success(
            `${user.name}: ${
              nextValue ? "Full access enabled" : "Full access removed"
            }`
          );

          return { ...user, permissions };
        }

        // Block individual toggles if ALL is ON
        if (permissions.all) {
          toast.error(
            `${user.name}: Turn off "All" to change individual permissions`
          );
          return user;
        }

        // Safety check
        if (!(type in permissions)) {
          toast.error(`Unknown permission: "${type}"`);
          return user;
        }

        // Toggle specific permission
        permissions[type] = !permissions[type];

        // Sync "all" flag
        const individualKeys = Object.keys(permissions).filter(
          (key) => key !== "all"
        );
        permissions.all = individualKeys.every((key) => permissions[key]);

        toast.success(
          `${user.name}: "${type}" ${
            permissions[type] ? "enabled" : "disabled"
          }`
        );
        if (permissions.all) {
          toast.success(`${user.name}: All permissions are now ON`);
        }

        return { ...user, permissions };
      })
    );
  };

  console.log(users);

  return (
    <>
      <section className="bg-[var(--background)] backdrop-blur-md rounded-2xl h-[calc(100vh-62px)]">
        {/* {page name and search bar} */}
        <div className="px-2 pt-1">
          <Header rows={users} setRows={setUsers} title="USER PERMISSION" />
        </div>
        {/* {page name and search bar} */}

        <div className="bg-[var(--background)] backdrop-blur-md rounded-2xl mt-1 p-2 lg:px-2 lg:py-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-1">
            {/* Left Column */}
            <div className="rounded-2xl shadow-md p-2 border-[var(--border)] border-1">
              <h2 className="text-base  font-medium mb-4 text-[var(--text)]">
                <span className="relative">
                  PERMISSION CONTROL
                  <span className="w-full h-[1px] bottom-[-1.5] block absolute bg-[var(--border)]" />
                </span>
              </h2>
              <table className="w-full text-sm border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-0 md:text-sm text-[var(--text)] sticky top-0 z-30 bg-[var(--background)] border-2 border-[var(--border)]">
                    <th className="px-1 py-3 first:rounded-l-lg ">Name</th>
                    <th className="px-1 py-3 ">All</th>
                    <th className="px-1 py-3 ">View</th>
                    <th className="px-1 py-3 ">Edit</th>
                    <th className="px-1 py-3 ">Add</th>
                    <th className="px-1 py-3 last:rounded-r-lg ">Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users?.map((user, index) => (
                    <tr
                      key={index}
                      className="bg-[var(--background)] shadow-sm rounded-lg hover:bg-[var(--permissionTable)] transition duration-200 ease-in-out"
                    >
                      <td
                        className={`py-5 px-1 text-[0.7rem] md:text-sm font-medium text-wrap rounded-l-lg text-[var(--text)]`}
                      >
                        {user?.name}
                      </td>
                      {Object.keys(user.permissions)?.map((perm, i) => (
                        <td
                          key={perm}
                          className={`px-0 ${i === 4 ? "rounded-r-lg" : ""}`}
                        >
                          <ToggleSwitch
                            enabled={user?.permissions[perm]}
                            onChange={() => togglePermission(index, perm)}
                          />
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Right Column */}
            <div className="rounded-2xl  shadow-md p-3 lg:p-3 border-[var(--border)] border-1">
              <h2 className="text-base  font-medium mb-4 text-[var(--text)]">
                <span className="relative">
                  SUMMARY / SETTINGS
                  <span className="w-full h-[1px] bottom-[-1.5] block absolute bg-[var(--border)]" />
                </span>
              </h2>
              <div className="p-2 lg:p-3 text-sm text-[var(--text)] leading-relaxed space-y-2">
                <p>
                  ✔️ Total Users: <strong>{users.length}</strong>
                </p>
                <p>✔️ Click toggles to change user permissions.</p>
                <p>✔️ Use the "All" toggle for full access rights.</p>
                <p>✔️ Save permissions once done (add logic as needed).</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Permission;
