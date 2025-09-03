const PermissionSkeleton = () => {
  const rows = Array.from({ length: 6 });

  return (
    <section className="bg-[var(--background)] backdrop-blur-md rounded-none md:rounded-2xl h-[calc(100vh-62px)] animate-pulse">
      {/* Header */}
      <div className="px-2 pt-1">
        <div className="h-6 w-48 bg-[var(--border)] rounded-md" />
      </div>

      <div className="bg-[var(--background)] backdrop-blur-md rounded-2xl mt-1 p-2 lg:px-2 lg:py-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-2.5 lg:gap-1">
          {/* Left Column */}
          <div className="rounded-2xl shadow-md p-2 border-[var(--border)] border-1">
            <div className="flex items-center justify-between mb-3">
              <div className="h-5 w-40 bg-[var(--border)] rounded-md" />
              <div className="h-8 w-28 bg-[var(--border)] rounded-md" />
            </div>

            <div className="overflow-y-auto">
              <table className="w-full text-sm border-separate border-spacing-y-3 min-w-[600px]">
                <thead>
                  <tr className="text-left sticky top-0 z-30">
                    {[
                      "Page",
                      "All",
                      "View",
                      "Edit",
                      "Add",
                      "Delete",
                      "Action",
                    ].map((h, i) => (
                      <th key={i} className="px-2 py-2">
                        <div className="h-3 w-12 bg-[var(--border)] rounded-md" />
                      </th>
                    ))}
                  </tr>
                </thead>

                <tbody>
                  {rows.map((_, i) => (
                    <tr
                      key={i}
                      className="bg-[var(--background)] shadow-sm rounded-lg"
                    >
                      <td className="py-4 px-2">
                        <div className="h-4 w-32 bg-[var(--border)] rounded-md" />
                      </td>
                      {[...Array(5)].map((_, j) => (
                        <td key={j} className="px-2">
                          <div className="h-5 w-10 bg-[var(--border)] rounded-full" />
                        </td>
                      ))}
                      <td className="px-2">
                        <div className="h-6 w-14 bg-[var(--border)] rounded-md" />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right Column */}
          <div className="rounded-2xl shadow-md p-3 lg:p-3 border-[var(--border)] border-1">
            <div className="h-5 w-44 bg-[var(--border)] rounded-md mb-4" />

            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div
                  key={i}
                  className="h-4 w-full bg-[var(--border)] rounded-md"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PermissionSkeleton;
