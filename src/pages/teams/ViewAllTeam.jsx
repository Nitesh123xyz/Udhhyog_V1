import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Search,
  Users,
  UserPlus,
  ChevronDown,
  Check,
  X,
  Pencil,
} from "lucide-react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useAddTeamMutation,
  useGetAllTeamQuery,
  useEditTeamMutation,
} from "../../features/teams/teamSlice";
import useAuth from "../../hooks/useAuth";
import { COLOR_LIST } from "../../utils/ReuseData";
import "../../css/commonLayout.css";
import toast from "react-hot-toast";
const AddMemberSchema = z.object({
  name: z.string().min(2, "Name is required"),
  photo_url: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  color_code: z
    .string()
    .min(1, "Choose a color")
    .regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, "Invalid hex color"),
});

const defaultValues = {
  name: "",
  photo_url: "",
  color_code: "",
};

function ColorDropdown({ value, onChange, error, presentColor }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const usedColors = useMemo(() => {
    return presentColor?.map((m) => m.color_code) || [];
  }, [presentColor]);

  const availableColors = useMemo(() => {
    return COLOR_LIST.filter((c) => {
      if (c.hexcode === value) return true;
      return !usedColors.includes(c.hexcode);
    });
  }, [usedColors, value]);

  const selected =
    availableColors.find((c) => c.hexcode === value) ||
    availableColors[0] ||
    COLOR_LIST[0];

  useEffect(() => {
    function onOutside(e) {
      if (!ref.current) return;
      if (!ref.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener("mousedown", onOutside);
    return () => document.removeEventListener("mousedown", onOutside);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <label className="block text-sm font-medium text-[var(--text)] mb-2">
        Color
      </label>

      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
        className="NavScroll w-full flex items-center justify-between gap-3 border border-[var(--border)] rounded-md px-3 py-2 bg-transparent text-[var(--text)]"
      >
        <div className="flex items-center gap-3 NavScroll">
          <div
            className="h-5 w-5 rounded-full ring-1"
            style={{ backgroundColor: selected.hexcode }}
            aria-hidden
          />
          <div className="text-sm">
            <div className="font-medium">{selected.name}</div>
            <div className="text-xs text-gray-400">{selected.hexcode}</div>
          </div>
        </div>

        <ChevronDown className="h-4 w-4 opacity-70" />
      </button>

      {open && (
        <div
          role="listbox"
          aria-label="Choose color"
          className="NavScroll absolute z-30 mt-1 w-full max-h-60 overflow-y-auto rounded-md border border-[var(--border)] bg-[var(--background)] shadow-lg"
        >
          {availableColors.map((c) => {
            const isSelected = c.hexcode === value;
            return (
              <div
                role="option"
                aria-selected={isSelected}
                key={c.hexcode}
                onClick={() => {
                  onChange(c.hexcode);
                  setOpen(false);
                }}
                className={`flex items-center justify-between gap-3 px-3 py-2 cursor-pointer hover:bg-[var(--border)]/20 ${
                  isSelected ? "bg-[var(--border)]/30" : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="h-5 w-5 rounded-full ring-1"
                    style={{ backgroundColor: c.hexcode }}
                    aria-hidden
                  />
                  <div>
                    <div className="text-sm text-[var(--text)]">{c.name}</div>
                    <div className="text-xs text-gray-400">{c.hexcode}</div>
                  </div>
                </div>
                {isSelected && <Check className="h-4 w-4 text-[var(--text)]" />}
              </div>
            );
          })}
        </div>
      )}

      {error && <p className="text-xs text-red-400 mt-1">{error}</p>}
    </div>
  );
}

const ViewAllTeam = ({ setStep, setTeamId, setTeamName }) => {
  const { token } = useAuth();
  const { currentData, refetch } = useGetAllTeamQuery(token);
  const serverTeams = currentData?.body?.view ?? [];
  const [addTeamMember] = useAddTeamMutation();
  const [updateTeamMember] = useEditTeamMutation();
  const [teams, setTeams] = useState(serverTeams || []);
  const [query, setQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);

  useEffect(() => {
    setTeams(serverTeams || []);
  }, [currentData]);

  const filtered = useMemo(() => {
    if (!teams || teams.length === 0) return [];
    const q = query.trim().toLowerCase();
    if (q === "") return teams;
    return teams.filter((t) => {
      const name = (t.name || "").toLowerCase();
      const role = (t.role || "").toLowerCase();
      const email = (t.email || "").toLowerCase();
      return name.includes(q) || role.includes(q) || email.includes(q);
    });
  }, [teams, query]);

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

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingMember(null);
    reset(defaultValues);
  };

  // ---------- SEPARATE FUNCTIONS ----------

  const handleAddMember = async (payload) => {
    const { status } = await addTeamMember(payload).unwrap();
    if (status === 200) {
      toast.success("Member added");
    }
  };

  const handleUpdateMember = async (payload) => {
    const { status } = await updateTeamMember(payload).unwrap();
    if (status === 200) {
      toast.success("Member updated");
    }
  };

  // ---------------------------------------

  const onSubmit = async (data) => {
    const basePayload = {
      token: token,
      name: data.name,
      photo_url: data.photo_url || "",
      color_code: data.color_code,
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
      toast.error(
        editingMember ? "Failed to update member" : "Failed to add member"
      );
      console.error(error);
    }
  };

  const openAddModal = () => {
    setEditingMember(null);
    reset(defaultValues);
    setIsModalOpen(true);
  };

  const openEditModal = (e, member) => {
    e.stopPropagation();
    setEditingMember(member);
    reset({
      name: member?.name || "",
      photo_url: member?.photo_url || "",
      color_code: member?.color_code || "",
    });
    setIsModalOpen(true);
  };

  const isEditMode = Boolean(editingMember);

  let viewportWidth = window.innerWidth;
  let viewportHeight = window.innerHeight;

  console.log("Viewport Width: " + viewportWidth + "px");
  console.log("Viewport Height: " + viewportHeight + "px");

  return (
    <div className="min-h-screen md:min-h-[calc(100vh-60px)] p-4 md:p-6 lg:p-8 bg-[var(--background)] rounded-t-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-[var(--text)]" />
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              View All Team Members
            </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--border)] bg-opacity-20">
              <span className="text-sm font-medium text-[var(--text)]">
                {filtered.length === 1 ? "Member" : "Members"} (
                {filtered.length})
              </span>
            </div>

            <button
              onClick={openAddModal}
              className="cursor-pointer flex items-center gap-2 rounded-lg px-4 py-2 bg-blue-400 backdrop-blur-sm text-white hover:bg-blue-500 transition-all duration-200"
              aria-label="Add team member"
            >
              <UserPlus className="h-4 w-4" />
              <span className="hidden sm:inline text-sm font-medium">
                Add Member
              </span>
            </button>
          </div>
        </div>

        <div className="mb-6">
          <div className="rounded-lg border border-[var(--border)] bg-[var(--background)] shadow-sm">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-[var(--text)] opacity-50" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search by name, role, or email..."
                aria-label="Search team members"
                className="w-full rounded-lg pl-12 pr-4 py-3 text-sm outline-none text-[var(--text)] bg-transparent"
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered?.map((member) => {
            return (
              <article
                key={member?.team_id}
                className="group relative rounded-xl p-5 cursor-pointer"
                aria-label={`Team member ${member.name}`}
                style={{ backgroundColor: member?.color_code || "transparent" }}
                onClick={() => {
                  setTeamId?.(member?.team_id);
                  setTeamName?.(member?.name);
                  setStep?.(2);
                }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <img
                      src={
                        member?.photo_url
                          ? member.photo_url
                          : "https://picsum.photos/seed/default/200/200"
                      }
                      alt={member.name || "Team member"}
                      className="h-16 w-16 rounded-full object-cover shadow-md ring-2 ring-white"
                    />
                  </div>

                  <div className="w-full space-y-1">
                    <h4
                      className="text-base text-[var(--text)] truncate"
                      title={member.name}
                    >
                      {member.name}
                    </h4>
                    {member.manager_name && (
                      <p
                        className="text-sm text-[var(--text)] truncate"
                        title={`Reports to: ${member.manager_name}`}
                      >
                        Manager Name :{" "}
                        <span className="text-gray-300">
                          {member.manager_name}
                        </span>
                      </p>
                    )}
                  </div>
                </div>

                <div
                  onClick={(e) => openEditModal(e, member)}
                  className="absolute top-1 right-2 bg-white/20 text-[var(--text)] p-1.5 rounded-full hover:bg-white/40 transition-colors"
                >
                  <Pencil size={12} />
                </div>
              </article>
            );
          })}

          {filtered.length === 0 && (
            <div className="col-span-full rounded-xl border-2 border-dashed border-[var(--border)] bg-[var(--background)] p-12 text-center">
              <Users className="mx-auto mb-4 h-12 w-12 text-[var(--text)]" />
              <p className="text-lg font-semibold text-[var(--text)] mb-2">
                No members found
              </p>
              <p className="text-sm text-[var(--text)]">
                Try adjusting your search terms or filters
              </p>
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="absolute inset-0 bg-black/40"
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
                  Name
                </label>
                <input
                  {...register("name")}
                  className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text)] bg-transparent outline-none"
                  placeholder="Full name"
                />
                {errors.name && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.name.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-[var(--text)] mb-1">
                  Photo URL
                </label>
                <input
                  {...register("photo_url")}
                  className="w-full rounded-md border border-[var(--border)] px-3 py-2 text-[var(--text)] bg-transparent outline-none"
                  placeholder="https://example.com/photo.jpg (optional)"
                />
                {errors.photo_url && (
                  <p className="text-xs text-red-400 mt-1">
                    {errors.photo_url.message}
                  </p>
                )}
              </div>

              <div>
                <Controller
                  control={control}
                  name="color_code"
                  render={({ field }) => (
                    <ColorDropdown
                      value={field.value}
                      onChange={field.onChange}
                      error={errors.color_code?.message}
                      presentColor={teams}
                    />
                  )}
                />
              </div>

              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setIsModalOpen(false);
                    reset(defaultValues);
                  }}
                  className="cursor-pointer px-4 py-2 rounded-md border hover:bg-[var(--border)] border-[var(--border)] text-[var(--text)]"
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
  );
};

export default ViewAllTeam;
