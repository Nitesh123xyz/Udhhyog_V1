import React, { useState } from "react";
import { dummyData } from "../utils/DummyData";

const Permission = () => {
  const [users, setUsers] = useState(dummyData);

  // ----------------------------------------------

  const ToggleSwitch = ({ enabled, onChange }) => (
    <label className="inline-flex items-center cursor-pointer">
      <input
        type="checkbox"
        className="sr-only"
        checked={enabled}
        onChange={onChange}
      />
      <div
        className={`w-8 h-5 flex items-center bg-gray-300 rounded-full p-[0.2rem] duration-300 ease-in-out ${
          enabled ? "bg-green-400" : "bg-gray-300"
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

  const togglePermission = (userIndex, type) => {
    const updatedUsers = [...users];
    updatedUsers[userIndex].permissions[type] =
      !updatedUsers[userIndex].permissions[type];
    setUsers(updatedUsers);
  };

  console.log(users, "users");

  return (
    <>
      <section className="mt-10">
        <div className="bg-white/80 backdrop-blur-md rounded-2xl p-8 mt-10">
          <div className="text-center text-lg font-semibold px-6 py-4 mb-8 border hover:shadow-sm transition-all duration-200 ease-in border-cyan-400 rounded-2xl text-black">
            USER PERMISSION PANEL
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* Left Column */}
            <div className="rounded-2xl shadow-md p-6">
              <h2 className="text-base font-bold mb-4 text-black">
                USERS & PERMISSION
              </h2>
              <table className="w-full text-sm border-separate border-spacing-y-3">
                <thead>
                  <tr className="text-left text-gray-600">
                    <th className="pb-2">Name</th>
                    <th>All</th>
                    <th>View</th>
                    <th>Edit</th>
                    <th>Add</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr
                      key={index}
                      className="bg-gray-50 shadow-sm rounded-lg hover:bg-gray-100 transition duration-200 ease-in-out"
                    >
                      <td className="py-5 px-2 font-medium text-black">
                        {user.name}
                      </td>
                      {["view", "edit", "add", "del", "all"].map((perm) => (
                        <td key={perm} className="">
                          <ToggleSwitch
                            enabled={user.permissions[perm]}
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
            <div className="rounded-2xl shadow-md p-6">
              <h2 className="text-base font-bold mb-4 text-black">
                SUMMARY / SETTINGS
              </h2>
              <div className="p-6 text-sm text-gray-700 leading-relaxed space-y-2">
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
