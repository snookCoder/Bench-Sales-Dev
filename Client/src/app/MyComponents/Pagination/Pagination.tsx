import React from "react";
import clsx from "clsx";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  isLoading = false,
}) => {
  const maxPagesToShow = 5;
  const halfRange = Math.floor(maxPagesToShow / 2);

  const getPaginationRange = () => {
    let start = Math.max(1, currentPage - halfRange);
    let end = Math.min(totalPages, start + maxPagesToShow - 1);
    if (end - start < maxPagesToShow - 1) {
      start = Math.max(1, end - maxPagesToShow + 1);
    }
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  return (
    <div className="d-flex justify-content-end">
      <ul className="pagination">
        {/* First Page */}
        <li className={clsx("page-item", { disabled: currentPage === 1 || isLoading })}>
          <button className="page-link" onClick={() => onPageChange(1)} disabled={currentPage === 1 || isLoading}>
            First
          </button>
        </li>

        {/* Previous Page */}
        <li className={clsx("page-item", { disabled: currentPage === 1 || isLoading })}>
          <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1 || isLoading}>
            Previous
          </button>
        </li>

        {/* Page Numbers */}
        {getPaginationRange().map((page) => (
          <li key={page} className={clsx("page-item", { active: currentPage === page })}>
            <button className="page-link" onClick={() => onPageChange(page)} disabled={isLoading}>
              {page}
            </button>
          </li>
        ))}

        {/* Next Page */}
        <li className={clsx("page-item", { disabled: currentPage === totalPages || isLoading })}>
          <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages || isLoading}>
            Next
          </button>
        </li>

        {/* Last Page */}
        <li className={clsx("page-item", { disabled: currentPage === totalPages || isLoading })}>
          <button className="page-link" onClick={() => onPageChange(totalPages)} disabled={currentPage === totalPages || isLoading}>
            Last
          </button>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
