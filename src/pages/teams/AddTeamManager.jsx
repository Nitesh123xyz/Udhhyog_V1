import React, { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useForm } from "react-hook-form";
import { useAddTeamManagerMutation } from "../../features/teams/teamSlice";
import base32 from "hi-base32";
import toast from "react-hot-toast";

const AddTeamManager = ({
  token,
  teamId,
  members = [],
  Department,
  onClose,
}) => {
  const { handleSubmit } = useForm();
  const [addTeamManger] = useAddTeamManagerMutation();

  const [selectedUserId, setSelectedUserId] = useState(null);
  const [search, setSearch] = useState("");

  // -----------------------------------------

  const filteredMembers = useMemo(() => {
    if (!search.trim()) return members;

    return members.filter((user) =>
      user?.user_name?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search, members]);

  // -----------------------------------------

  const onSubmit = async () => {
    if (!selectedUserId) return;

    const payload = {
      token,
      emp_id: selectedUserId,
      team_id: teamId,
      team_dep: Department?.map((dep) => ({
        dep_name: dep?.title,
      })),
    };

    try {
      const encoded = base32.encode(JSON.stringify(payload));

      const { status } = await addTeamManger({ data: encoded }).unwrap();

      if (status === 200) {
        toast.success("Team Manager added successfully");
        onClose();
      }
    } catch (error) {
      toast.error("Failed to assign manager");
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
          {/* Search */}
          <div>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search employee..."
              className="w-full px-3 py-2 rounded-lg border border-[var(--border)]
                         bg-[var(--background)] text-[var(--text)]
                         focus:outline-none focus:ring-1 focus:ring-blue-400"
            />
          </div>

          {/* Employee Selection */}
          <div className="NavScroll space-y-2 max-h-48 overflow-y-auto">
            {filteredMembers.length === 0 && (
              <p className="text-sm text-center text-gray-400 py-4">
                No employee found
              </p>
            )}

            {filteredMembers.map((user) => {
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

          {/* Footer */}
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
              disabled={!selectedUserId}
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
