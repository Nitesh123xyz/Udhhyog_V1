import React, { useState } from "react";
import { ChevronLeft, ChevronRight, Plus, X } from "lucide-react";

const ViewTeam = ({ setStep, teamId }) => {
  const [openSection, setOpenSection] = useState(null);

  const [people, setPeople] = useState([
    { id: "p1", name: "Asha Sharma", assigned: null },
    { id: "p2", name: "Rohit Kumar", assigned: null },
    { id: "p3", name: "Meera Patel", assigned: "sale" },
    { id: "p4", name: "Vikram Singh", assigned: "purchase" },
    { id: "p5", name: "Neha Joshi", assigned: null },
  ]);

  const sections = [
    { id: "unassigned", title: "Unassigned" },
    { id: "sale", title: "Sale" },
    { id: "purchase", title: "Purchase" },
    { id: "Account", title: "Account" },
    { id: "Credit", title: "Credit" },
    { id: "Recovery", title: "Recovery" },
  ];

  console.log(teamId);

  const toggleSection = (id) => {
    if (id === "unassigned") return;
    setOpenSection((prev) => (prev === id ? null : id));
  };

  const isOpen = (id) => id === "unassigned" || openSection === id;

  const assignPerson = (personId, sectionId) => {
    setPeople((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, assigned: sectionId } : p))
    );
  };

  const unassignPerson = (personId) => {
    setPeople((prev) =>
      prev.map((p) => (p.id === personId ? { ...p, assigned: null } : p))
    );
  };

  const getUnassigned = () => people.filter((p) => p.assigned === null);
  const getAssignedTo = (sectionId) =>
    people.filter((p) => p.assigned === sectionId);

  return (
    <div className="bg-[var(--background)] p-3 rounded-lg min-h-screen">
      <h1 className="text-2xl md:text-2xl font-bold text-[var(--text)] mb-2.5">
        Task Management
      </h1>

      <div className="flex flex-col md:flex-row h-auto md:h-[calc(100vh-8rem)] gap-2">
        {sections
          .filter((s) => s.id === "unassigned")
          .map((section) => {
            const unassigned = getUnassigned();
            return (
              <div
                key={section.id}
                className="border-2 border-[var(--border)] rounded-lg overflow-hidden transition-all duration-500 ease-in-out w-full md:w-1/4 flex flex-col"
              >
                <div className="bg-[var(--background)] h-full flex flex-col">
                  <div className="p-4 border-b-2 border-[var(--border)] flex justify-between items-center">
                    <h2 className="text-lg md:text-xl font-semibold text-[var(--text)]">
                      {section.title}
                    </h2>
                  </div>

                  <div className="flex-1 bg-[var(--background)] p-4 overflow-y-auto">
                    <div className="space-y-3">
                      {unassigned.length === 0 ? (
                        <p className="text-sm text-[var(--text)]">
                          No unassigned people.
                        </p>
                      ) : (
                        unassigned.map((person) => (
                          <div
                            key={person.id}
                            className="p-3 bg-[var(--background)] rounded border border-[var(--border)] hover:bg-[var(--permissionTable)] transition-colors flex items-center justify-between"
                          >
                            <div>
                              <p className="text-sm md:text-base text-[var(--text)] font-medium">
                                {person.name}
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
            );
          })}

        <div className="flex-1 flex flex-col md:flex-row gap-2 overflow-hidden">
          {sections
            .filter((s) => s.id !== "unassigned")
            .map((section) => {
              const assigned = getAssignedTo(section.id);
              const unassigned = getUnassigned();
              const open = isOpen(section.id);

              return (
                <div
                  key={section.id}
                  className={`border-2 border-[var(--border)] rounded-lg transition-all duration-500 ease-in-out ${
                    open
                      ? "w-full md:flex-1 flex flex-col overflow-hidden"
                      : "w-full md:w-20 h-16 md:h-auto flex md:flex-col overflow-visible"
                  }`}
                >
                  <div
                    role={!open ? "button" : undefined}
                    tabIndex={!open ? 0 : undefined}
                    onKeyDown={(e) => {
                      if (!open && (e.key === "Enter" || e.key === " ")) {
                        toggleSection(section.id);
                      }
                    }}
                    onClick={() => {
                      if (!open) toggleSection(section.id);
                    }}
                    className={`bg-[var(--background)] h-full flex items-center justify-center transition-opacity relative ${
                      !open ? "cursor-pointer" : ""
                    }`}
                  >
                    {!open && (
                      <div className="relative w-full h-full hidden sm:flex items-center justify-center gap-2 p-2">
                        <h2 className="text-xs sm:absolute top-2 md:text-sm font-semibold text-[var(--text)] whitespace-nowrap">
                          {section.title}
                        </h2>
                      </div>
                    )}

                    {!open && (
                      <div className="relative w-full h-full flex items-center justify-center gap-2 p-2 sm:hidden">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleSection(section.id);
                          }}
                          className="cursor-pointer p-1 bg-[var(--transparent-30)] rounded-full"
                          aria-label={`Open ${section.title}`}
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
                    )}

                    {/* Expanded */}
                    {open && (
                      <div className="w-full h-full flex flex-col">
                        <div className="p-4 border-b-2 bg-[var(--background)] border-[var(--border)] flex justify-between items-center">
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
                            aria-label={`Close ${section.title}`}
                          >
                            <ChevronLeft
                              size={18}
                              className="text-[var(--text)]"
                            />
                          </button>
                        </div>

                        <div className="flex-1 bg-[var(--background)] p-4 overflow-y-auto">
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-[var(--text)] mb-2">
                                Assigned
                              </h3>
                              {assigned.length === 0 ? (
                                <p className="text-sm text-[var(--text)]">
                                  No one assigned to {section.title}.
                                </p>
                              ) : (
                                <div className="space-y-2">
                                  {assigned.map((person) => (
                                    <div
                                      key={person.id}
                                      className="p-3 bg-[var(--background)] rounded border border-[var(--border)] hover:bg-[var(--permissionTable)] transition-colors flex items-center justify-between"
                                    >
                                      <div>
                                        <p className="text-sm md:text-base text-[var(--text)] font-medium">
                                          {person.name}
                                        </p>
                                        <p className="text-xs md:text-sm text-[var(--text)] mt-1">
                                          Assigned to {section.title}
                                        </p>
                                      </div>

                                      <div className="flex items-center gap-2">
                                        <button
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            unassignPerson(person.id);
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

                            <div>
                              <h3 className="text-sm md:text-base font-semibold text-[var(--text)] mb-2">
                                Available (Unassigned)
                              </h3>
                              {unassigned.length === 0 ? (
                                <p className="text-sm text-[var(--text)]">
                                  No unassigned people available.
                                </p>
                              ) : (
                                <div className="grid gap-2">
                                  {unassigned.map((p) => (
                                    <div
                                      key={p.id}
                                      className="p-2 bg-[var(--background)] rounded border border-[var(--border)] flex items-center justify-between"
                                    >
                                      <p className="text-sm text-[var(--text)]">
                                        {p.name}
                                      </p>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          assignPerson(p.id, section.id);
                                        }}
                                        className="cursor-pointer bg-green-500 text-sm text-white p-1.5 rounded-full flex items-center gap-1"
                                        aria-label={`Assign ${p.name} to ${section.title}`}
                                      >
                                        <Plus size={18} />
                                      </button>
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
    </div>
  );
};

export default ViewTeam;
