import React, { useMemo, useState } from "react";
import { Search, Users, UserPlus } from "lucide-react";
import { useGetAllTeamQuery } from "../../features/teams/teamSlice";
import useAuth from "../../hooks/useAuth";

// Mock hook for demo

const ViewAllTeam = ({ setStep, setTeamId }) => {
  const { token } = useAuth();
  const { currentData } = useGetAllTeamQuery(token);
  const teams = currentData?.body?.view ?? [];

  const [query, setQuery] = useState("");

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

  console.log(teams);

  return (
    <div className="min-h-screen lg:min-h-[calc(100vh-60px)] p-4 md:p-6 lg:p-8 bg-[var(--background)] rounded-lg">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Users className="h-6 w-6 text-[var(--text)]" />
            <h2 className="text-2xl font-semibold text-[var(--text)]">
              View All Team Members
            </h2>
          </div>

          <div className="flex items-center gap-4">
            {/* Member count */}
            <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--border)] bg-opacity-20">
              <span className="text-sm font-medium text-[var(--text)]">
                {filtered.length === 1 ? "Member" : "Members"} ({" "}
                {filtered.length} )
              </span>
            </div>

            <button
              onClick={() => alert("Add member - wire up modal or route")}
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
            console.log(member);
            return (
              <article
                key={member?.team_id}
                className="group relative rounded-xl p-5 cursor-pointer max-h-[500px] overflow-auto"
                aria-label={`Team member ${member.name}`}
                style={{ backgroundColor: member?.color_code }}
                onClick={() => {
                  setTeamId(member?.team_id);
                  setStep(2);
                }}
              >
                <div className="flex flex-col items-center text-center gap-3">
                  <div className="relative">
                    <img
                      src={`${
                        member?.photo_url
                          ? "https://picsum.photos/id/237/200/300"
                          : "https://picsum.photos/id/237/200/300"
                      }`}
                      alt="Team member"
                      className="h-16 w-16 rounded-full object-cover shadow-md ring-2 ring-white"
                    />
                  </div>

                  <div className="w-full space-y-1">
                    <h4
                      className="text-base font-semibold text-[var(--text)] truncate"
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
    </div>
  );
};

export default ViewAllTeam;
