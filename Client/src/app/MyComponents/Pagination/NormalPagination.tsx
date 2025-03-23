import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const NormalPagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  // Generate an array of page numbers
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      {/* Previous Button */}
      <li className={`page-item previous ${currentPage === 1 ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
          <i className="previous"></i>
        </button>
      </li>

      {/* Page Numbers */}
      {pages.map((page) => (
        <li key={page} className={`page-item ${currentPage === page ? "active" : ""}`}>
          <button className="page-link" onClick={() => onPageChange(page)}>
            {page}
          </button>
        </li>
      ))}

      {/* Next Button */}
      <li className={`page-item next ${currentPage === totalPages ? "disabled" : ""}`}>
        <button className="page-link" onClick={() => onPageChange(currentPage + 1)} disabled={currentPage === totalPages}>
          <i className="next"></i>
        </button>
      </li>
    </ul>
  );
};

export default NormalPagination;
