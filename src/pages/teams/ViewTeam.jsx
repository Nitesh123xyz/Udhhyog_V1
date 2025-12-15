import React, { useMemo, useState } from "react";
import { ArrowLeft, ChevronLeft, ChevronRight, X } from "lucide-react";
import {
  useAddUserTeamHeadMutation,
  useDeleteUserTeamHeadMutation,
  useViewTeamQuery,
} from "../../features/teams/teamSlice";
import useAuth from "../../hooks/useAuth";
import toast from "react-hot-toast";
import AddTeamManager from "./AddTeamManager";

const ViewTeam = ({ setStep, teamId }) => {
  const { token } = useAuth();
  const [openSection, setOpenSection] = useState(null);
  const [selectedMembers, setSelectedMembers] = useState({});
  const [searchQuery, setSearchQuery] = useState({});

  const { currentData, refetch } = useViewTeamQuery({ token, team_id: teamId });
  const [AssignedMember] = useAddUserTeamHeadMutation();
  const [RemoveMember] = useDeleteUserTeamHeadMutation();
  const [openAddForm, setOpenAddForm] = useState(false);

  const { unassigned_data, assigned_data, members } = currentData?.body ?? {};

  const sections = [
    { id: "unassigned", title: "Unassigned" },
    { id: "sale", title: "Sale" },
    { id: "purchase", title: "Purchase" },
    { id: "Account", title: "Account" },
    { id: "Credit", title: "Credit" },
    { id: "Recovery", title: "Recovery" },
  ];

  const toggleSection = (id) => {
    if (id === "unassigned") return;
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const isOpen = (id) => id === "unassigned" || openSection === id;

  const assignedBySection = useMemo(() => {
    const map = {};
    if (!assigned_data || !Array.isArray(assigned_data)) return map;

    assigned_data.forEach((a) => {
      const key = a.teamdepartment;
      if (!key) return;
      if (!map[key]) map[key] = new Set();
      map[key].add(a.user_id);
    });

    return map;
  }, [assigned_data]);

  const handleSearch = (sectionId, value) => {
    setSearchQuery((prev) => ({ ...prev, [sectionId]: value }));
  };

  const assignMembers = async (sectionId) => {
    const allSelected = selectedMembers[sectionId] || [];
    const assignedInSection = assignedBySection[sectionId] || new Set();

    const ids = allSelected.filter((id) => !assignedInSection.has(id));
    if (!ids.length) return;

    try {
      await Promise.all(
        ids.map((personId) =>
          AssignedMember({
            token,
            emp_id: personId,
            team_id: teamId,
            teamdepartment: sectionId,
          }).unwrap()
        )
      );
      refetch();
      setSelectedMembers((prev) => ({ ...prev, [sectionId]: [] }));
    } catch (error) {
      console.error("Bulk assign error:", error);
    }
  };

  const unassignedPerson = async (rowId, userName) => {
    const remove = { token, team_id: teamId, row_id: rowId };

    try {
      const { status } = await RemoveMember(remove).unwrap();
      if (status === 200) {
        refetch();
        toast.success(`Member ${userName} Remove`);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleSelectMember = (sectionId, userId) => {
    const assignedInSection = assignedBySection[sectionId] || new Set();
    if (assignedInSection.has(userId)) return;

    setSelectedMembers((prev) => {
      const current = prev[sectionId] || [];
      const exists = current.includes(userId);
      const next = exists
        ? current.filter((id) => id !== userId)
        : [...current, userId];
      return { ...prev, [sectionId]: next };
    });
  };

  return (
    <div className="bg-[var(--background)] p-3 rounded-lg min-h-screen">
      <div className="flex items-center gap-2.5">
        <div
          onClick={() => setStep(1)}
          className="cursor-pointer p-2 flex items-center justify-center bg-yellow-400 backdrop-blur-sm rounded-full shadow-sm"
        >
          <ArrowLeft size={15} className="text-gray-800" />
        </div>
        <h1 className="text-2xl md:text-2xl font-bold text-[var(--text)]">
          Task Management
        </h1>
      </div>

      <hr className="text-gray-500 my-2" />

      <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-8rem)] gap-2">
        {sections
          .filter((s) => s.id === "unassigned")
          .map((section) => (
            <div
              key={section.id}
              className="border border-[var(--border)] rounded-lg overflow-hidden transition-all duration-500 ease-in-out w-full md:w-1/4 flex flex-col"
            >
              <div className="bg-[var(--background)] h-full flex flex-col">
                <div className="p-4 border-b-1 border-[var(--border)] flex justify-between items-center">
                  <h2 className="text-lg md:text-xl font-semibold text-[var(--text)]">
                    {section.title}
                  </h2>
                  <button
                    onClick={() => setOpenAddForm(true)}
                    className="cursor-pointer rounded-md px-2 py-1.5 bg-blue-400 backdrop-blur-sm text-white hover:bg-blue-500 transition-all duration-200"
                  >
                    Add Manager
                  </button>
                </div>

                <div className="flex-1 bg-[var(--background)] p-4 overflow-y-auto">
                  <div className="space-y-3">
                    {unassigned_data?.length === 0 ? (
                      <p className="text-sm text-[var(--text)]">
                        No unassigned people.
                      </p>
                    ) : (
                      unassigned_data?.map((person) => (
                        <div
                          key={person?.user_id}
                          className="p-3 bg-[var(--background)] rounded border border-[var(--border)] hover:bg-[var(--permissionTable)] transition-colors flex items-center justify-between"
                        >
                          <div>
                            <p className="text-sm md:text-base text-[var(--text)] font-medium">
                              {person?.user_name}
                            </p>
                            <p className="text-xs md:text-sm text-[var(--text)] mt-1">
                              Unassigned
                            </p>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}

        <div className="flex-1 flex flex-col md:flex-row gap-2 overflow-hidden">
          {sections
            .filter((s) => s.id !== "unassigned")
            .map((section) => {
              const open = isOpen(section.id);
              const sectionSelected = selectedMembers[section.id] || [];

              const backendAssigned =
                assigned_data?.filter(
                  (p) => p?.teamdepartment === section.id
                ) ?? [];

              const assignedInSection =
                assignedBySection[section.id] || new Set();

              const availableForSection =
                members
                  ?.filter((m) => !assignedInSection.has(m.user_id))
                  ?.filter((m) =>
                    (searchQuery[section.id] || "").trim() === ""
                      ? true
                      : m.user_name
                          ?.toLowerCase()
                          ?.includes(
                            (searchQuery[section.id] || "").toLowerCase()
                          )
                  ) ?? [];

              return (
                <div
                  key={section.id}
                  className={`border border-[var(--border)] rounded-lg transition-all duration-500 ease-in-out ${
                    open
                      ? "w-full md:flex-1 flex flex-col overflow-hidden"
                      : "w-full md:w-20 h-16 md:h-auto flex md:flex-col overflow-visible"
                  }`}
                >
                  <div
                    role={!open ? "button" : undefined}
                    tabIndex={!open ? 0 : undefined}
                    onClick={() => {
                      if (!open) toggleSection(section.id);
                    }}
                    className={`bg-[var(--background)] h-full flex items-center justify-center transition-opacity relative ${
                      !open ? "cursor-pointer" : ""
                    }`}
                  >
                    {!open && (
                      <>
                        <div className="relative w-full h-full hidden sm:flex items-center justify-center gap-2 p-2">
                          <h2 className="text-xs sm:absolute top-2 md:text-sm font-semibold text-[var(--text)] whitespace-nowrap">
                            {section.title}
                          </h2>
                        </div>

                        <div className="relative w-full h-full flex items-center justify-center gap-2 p-2 sm:hidden">
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSection(section.id);
                            }}
                            className="cursor-pointer p-1 bg-[var(--transparent-30)] rounded-full"
                          >
                            <ChevronRight
                              size={14}
                              className="text-[var(--text)]"
                            />
                          </button>

                          <h2 className="text-xs md:text-sm font-semibold text-[var(--text)] whitespace-nowrap">
                            {section.title}
                          </h2>
                        </div>
                      </>
                    )}

                    {open && (
                      <div className="w-full h-full flex flex-col">
                        <div className="p-4 border-b-1 bg-[var(--background)] border-[var(--border)] flex justify-between items-center">
                          <h2 className="text-lg md:text-xl font-semibold text-[var(--text)]">
                            {section.title}
                          </h2>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleSection(section.id);
                            }}
                            className="cursor-pointer p-2 bg-[var(--transparent-30)] rounded-full"
                          >
                            <ChevronLeft
                              size={18}
                              className="text-[var(--text)]"
                            />
                          </button>
                        </div>

                        <div className="flex-1 bg-[var(--background)] p-4 overflow-y-auto">
                          <div className="space-y-4">
                            {/* Search + Available members with selection + Add */}
                            <div>
                              <div className="flex items-center justify-between mb-2">
                                <h3 className="text-sm md:text-base font-semibold text-[var(--text)]">
                                  Available ( Members )
                                </h3>

                                {sectionSelected.length > 0 && (
                                  <button
                                    type="button"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      assignMembers(section.id);
                                    }}
                                    className="text-xs md:text-sm px-3 py-1 rounded-full bg-green-500 text-white font-medium"
                                  >
                                    Assign {sectionSelected.length} selected
                                  </button>
                                )}
                              </div>

                              <input
                                type="text"
                                placeholder={`Search members for ${section.title}...`}
                                value={searchQuery[section.id] || ""}
                                onChange={(e) =>
                                  handleSearch(section.id, e.target.value)
                                }
                                className="w-full p-2 mb-3 border border-[var(--border)] rounded bg-[var(--background)] text-[var(--text)]"
                              />

                              {availableForSection.length === 0 ? (
                                <p className="text-sm text-[var(--text)]">
                                  No available members for {section.title}.
                                </p>
                              ) : (
                                <div className="grid gap-2">
                                  {availableForSection.map((mem) => {
                                    const userId = mem?.user_id;
                                    const isSelected =
                                      sectionSelected.includes(userId);

                                    return (
                                      <div
                                        key={userId}
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          toggleSelectMember(
                                            section.id,
                                            userId
                                          );
                                        }}
                                        className={`p-2 rounded border flex items-center justify-between cursor-pointer transition-colors ${
                                          isSelected
                                            ? "bg-[var(--permissionTable)] border-green-500"
                                            : "bg-[var(--background)] border-[var(--border)] hover:bg-[var(--permissionTable)]"
                                        }`}
                                      >
                                        <p className="text-sm text-[var(--text)]">
                                          {mem?.user_name}
                                        </p>

                                        <span
                                          className={`inline-block w-4 h-4 rounded-full border ${
                                            isSelected
                                              ? "bg-green-500 border-green-500"
                                              : "border-[var(--border)]"
                                          }`}
                                        />
                                      </div>
                                    );
                                  })}
                                </div>
                              )}
                            </div>

                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-[var(--text)] mb-2">
                                Assigned
                              </h3>
                              {backendAssigned.length === 0 ? (
                                <p className="text-sm text-[var(--text)]">
                                  No one assigned to {section.title}.
                                </p>
                              ) : (
                                <div className="space-y-2">
                                  {backendAssigned.map((person) => (
                                    <div
                                      key={person.row_id ?? person.id}
                                      className="p-3 bg-[var(--background)] rounded border border-[var(--border)] hover:bg-[var(--permissionTable)] transition-colors flex items-center justify-between"
                                    >
                                      <div>
                                        <p className="text-sm md:text-base text-[var(--text)] font-medium">
                                          {person?.user_name}
                                        </p>
                                        <p className="text-sm md:text-base text-[var(--text)] font-medium">
                                          {person?.user_department}
                                        </p>
                                        <p className="text-xs md:text-sm text-[var(--text)] mt-1">
                                          Assigned to {person?.teamdepartment}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            unassignedPerson(
                                              person?.row_id,
                                              person?.user_name
                                            );
                                          }}
                                          className="cursor-pointer text-white text-sm bg-red-500 p-1.5 rounded-full"
                                        >
                                          <X size={18} />
                                        </button>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      {openAddForm && (
        <AddTeamManager
          token={token}
          teamId={teamId}
          members={members}
          Department={sections.filter((s) => s.id !== "unassigned")}
          onClose={() => setOpenAddForm(false)}
        />
      )}
    </div>
  );
};

export default ViewTeam;
