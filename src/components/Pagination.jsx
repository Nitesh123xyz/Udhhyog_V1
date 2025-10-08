import React from "react";

const Pagination = ({
  MainData = [],
  currentPage = 1,
  setCurrentPage = () => {},
  itemsPerPage = 10,
  startIndex = 0,
  endIndex = 0,
}) => {
  const totalPages = Math.ceil(MainData.length / itemsPerPage);

  if (totalPages <= 1) return null;

  const handleClick = (page) => {
    if (page === "..." || page === currentPage) return;
    setCurrentPage(page);
  };

  const pages = [];

  if (totalPages <= 5) {
    // show all pages if total small
    for (let p = 1; p <= totalPages; p++) pages.push(p);
  } else if (currentPage <= 2) {
    // start: 1,2,3,...,last
    pages.push(1, 2, 3, "...", totalPages);
  } else if (currentPage >= totalPages - 1) {
    // end: 1,...,last-2,last-1,last
    pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
  } else {
    // middle: 1,...,current-1,current,current+1,...,last
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
        {/* Results Info */}
        <div className="text-[0.7rem] md:text-sm text-[var(--text)]">
          {MainData.length === 0 ? 0 : startIndex + 1} to{" "}
          {Math.min(endIndex, MainData.length)} of {MainData.length} results
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
                className={`w-7 h-7 flex items-center justify-center text-xs md:text-sm rounded-full transition-all duration-200 focus:outline-none ${
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
