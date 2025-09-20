import React, { useState } from "react";

const Pagination = ({
  MainData,
  currentPage,
  setCurrentPage,
  itemsPerPage,
  startIndex,
  endIndex,
}) => {
  const totalPages = Math.ceil(MainData.length / itemsPerPage);

  return (
    <>
      <div
        className={`px-6 py-4 border-t border-[var(--border)]`}
      >
        <div className="flex items-center justify-between">
          <div className="text-[0.7rem] md:text-sm text-[var(--text)]">
            {startIndex + 1} to {Math.min(endIndex, MainData.length)} of{" "}
            {MainData.length} results
          </div>
          <div className="flex items-center space-x-2 max-w-2xl">
            <button
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="px-3 py-1 text-xs md:text-sm text-[var(--text)] cursor-pointer disabled:cursor-not-allowed"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i + 1}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 text-xs md:text-sm rounded ${
                  currentPage === i + 1
                    ? "bg-[var(--icon_bg)] text-[var(--icon_text)]"
                    : "text-[var(--text)] hover:bg-gray-200 hover:text-black"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() =>
                setCurrentPage(Math.min(totalPages, currentPage + 1))
              }
              disabled={currentPage === totalPages}
              className="px-3 py-1 text-xs md:text-sm text-[var(--text)] cursor-pointer disabled:cursor-not-allowed"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
