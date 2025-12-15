import React, { useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddTeamManagerMutation } from "../../features/teams/teamSlice";
import base32 from "hi-base32";
import toast from "react-hot-toast";
const AddTeamManager = ({ token, teamId, members, Department, onClose }) => {
  const { handleSubmit } = useForm();
  const [addTeamManger] = useAddTeamManagerMutation();

  const [selectedDepartments, setSelectedDepartments] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const toggleDepartment = (title) => {
    setSelectedDepartments((prev) =>
      prev.includes(title) ? prev.filter((d) => d !== title) : [...prev, title]
    );
  };

  const onSubmit = async () => {
    if (!selectedUserId || selectedDepartments.length === 0) return;

    const payload = {
      token,
      emp_id: selectedUserId,
      team_id: teamId,
      team_dep: selectedDepartments.map((dep) => ({
        dep_name: dep,
      })),
    };
    const encoded = base32.encode(JSON.stringify(payload));

    const { status } = await addTeamManger({ data: encoded }).unwrap();
    if (status === 200) {
      toast.success("Team Manager added");
      onClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 p-4">
      <div className="w-full max-w-lg bg-[var(--background)] rounded-xl shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
          <h3 className="text-lg font-semibold text-[var(--text)]">
            Assign Departments
          </h3>
          <button
            onClick={onClose}
            className="cursor-pointer p-1.5 rounded-full bg-[var(--border)] text-[var(--text)]"
          >
            <X size={15} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-5">
          {/* Employee Selection (SINGLE) */}
          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Select Employee
            </label>

            <div className="NavScroll space-y-2 max-h-48 overflow-y-auto">
              {members?.map((user) => {
                const selected = selectedUserId === user.user_id;

                return (
                  <div
                    key={user.user_id}
                    onClick={() => setSelectedUserId(user.user_id)}
                    className={`p-3 rounded border cursor-pointer flex items-center justify-between transition-colors
                      ${
                        selected
                          ? "bg-[var(--permissionTable)] border-green-500"
                          : "border-[var(--border)] hover:bg-[var(--permissionTable)]"
                      }`}
                  >
                    <span className="text-sm text-[var(--text)]">
                      {user.user_name}
                    </span>

                    <span
                      className={`w-4 h-4 rounded-full border
                        ${
                          selected
                            ? "bg-green-500 border-green-500"
                            : "border-[var(--border)]"
                        }`}
                    />
                  </div>
                );
              })}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[var(--text)] mb-2">
              Select Departments
            </label>

            <div className="flex flex-wrap gap-2">
              {Department?.map((dep) => {
                const selected = selectedDepartments.includes(dep.title);

                return (
                  <button
                    key={dep.id}
                    type="button"
                    onClick={() => toggleDepartment(dep.title)}
                    className={`cursor-pointer px-4 py-2 rounded-md text-sm border border-[var(--border)] font-medium
                      ${
                        selected
                          ? "bg-green-500 text-white"
                          : "bg-white text-gray-700 hover:bg-gray-100"
                      }`}
                  >
                    {dep.title}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-3 pt-4 border-t border-[var(--border)]">
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer px-4 py-2 rounded-lg border border-[var(--border)] text-[var(--text)]"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!selectedUserId || selectedDepartments.length === 0}
              className="cursor-pointer px-5 py-2 rounded-lg bg-blue-400 text-white disabled:opacity-50"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddTeamManager;
