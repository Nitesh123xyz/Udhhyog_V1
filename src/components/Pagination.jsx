const Pagination = ({
  currentPage = 10,
  setItemsPerPage = () => {},
  setCurrentPage = () => {},
  itemsPerPage,
  startIndex = 0,
  endIndex = 0,
  TotalPages,
}) => {
  const totalPages = Math.ceil(TotalPages / itemsPerPage);

  const handleClick = (page) => {
    if (page === "..." || page === currentPage) return;
    setCurrentPage(page);
  };

  const pages = [];

  if (totalPages <= 5) {
    for (let p = 1; p <= totalPages; p++) pages.push(p);
  } else if (currentPage <= 2) {
    pages.push(1, 2, 3, "...", totalPages);
  } else if (currentPage >= totalPages - 1) {
    pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
  } else {
    pages.push(
      1,
      "...",
      currentPage - 1,
      currentPage,
      currentPage + 1,
      "...",
      totalPages
    );
  }

  return (
    <div className="px-6 py-4 border-t border-[var(--border)]">
      <div className="flex items-center justify-between">
        <div className="flex gap-2.5 items-center">
          <div className="text-[0.7rem] md:text-sm text-[var(--text)]">
            {TotalPages === 0 ? 0 : startIndex + 1} to{" "}
            {Math.min(endIndex, TotalPages)} of {TotalPages} results
          </div>
          <select
            onChange={(e) => setItemsPerPage(e.target.value)}
            className="px-3 py-1 border border-[var(--border)] outline-none rounded-md text-[0.7rem] md:text-sm text-[var(--text)] bg-[var(--background)]"
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
          </select>
        </div>

        {/* Pagination Buttons */}
        <div className="flex items-center space-x-2">
          {pages.map((page, idx) =>
            page === "..." ? (
              <span
                key={`ellipsis-${idx}`}
                className="px-3 py-1 text-xs md:text-sm text-[var(--text)] select-none"
              >
                …
              </span>
            ) : (
              <button
                key={`page-${page}`}
                onClick={() => handleClick(page)}
                className={`w-6 h-6 sm:w-7 sm:h-7 flex items-center cursor-pointer justify-center text-xs md:text-sm rounded-full transition-all duration-200 sm:outline-none ${
                  currentPage === page
                    ? "bg-[var(--icon_bg)] text-[var(--icon_text)] shadow-md"
                    : "text-[var(--text)] hover:bg-[var(--permissionTable)] hover:text-[var(--text)]"
                }`}
                aria-current={currentPage === page ? "page" : undefined}
              >
                {page}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Pagination;
