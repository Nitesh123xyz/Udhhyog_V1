const Pagination = ({
  MainData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  startIndex,
  endIndex,
}) => {
  const totalPages = Math.ceil(MainData.length / itemsPerPage);

  // -------------------------------------------

  const previousPages = Array.from(
    { length: 2 },
    (_, index) => currentPage - 1 - index
  )
    .filter((page) => page > 0)
    .reverse();

  // -------------------------------------------

  const nextPages = Array.from({ length: 2 }, (_, index) => {
    return currentPage + index;
  }).filter((page) => page <= totalPages);

  // -------------------------------------------

  const optimizedPagination = [...previousPages, ...nextPages];

  return (
    <>
      <div className={`px-6 py-4 border-t border-[var(--border)]`}>
        <div className="flex items-center justify-between">
          <div className="text-[0.7rem] md:text-sm text-[var(--text)]">
            {startIndex + 1} to {Math.min(endIndex, MainData.length)} of{" "}
            {MainData.length} results
          </div>
          <div className="flex items-center space-x-2 max-w-2xl">
            {currentPage > 1 && (
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                className={`px-3 py-1 text-xs md:text-sm text-[var(--text)] hover:bg-[var(--permissionTable)] rounded cursor-pointer disabled:cursor-not-allowed`}
              >
                Previous
              </button>
            )}

            {optimizedPagination?.map((page, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(page)}
                className={`px-3 py-1 text-xs md:text-sm rounded ${
                  currentPage === page
                    ? "bg-[var(--icon_bg)] text-[var(--icon_text)]"
                    : "text-[var(--text)] hover:bg-[var(--permissionTable)]  hover:text-[var(--text)]"
                }`}
              >
                {page}
              </button>
            ))}

            {totalPages > currentPage && (
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                className={`px-3 py-1 text-xs md:text-sm text-[var(--text)] rounded hover:bg-[var(--permissionTable)] cursor-pointer disabled:cursor-not-allowed`}
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
