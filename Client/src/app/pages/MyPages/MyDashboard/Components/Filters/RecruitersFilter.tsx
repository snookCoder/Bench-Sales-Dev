import { useState } from "react";
import { useThemeMode } from "../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";

interface RecruiterFilterProps {
  applyFilters: (filters: any) => void;
}

export function RecruiterFilter({
  applyFilters,
}: RecruiterFilterProps) {
  const { mode } = useThemeMode();
  const [filters, setFilters] = useState({
    status: "1",
    recruiterType: "all",
    timeRange: "this_month",
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newFilters = { ...filters, [e.target.name]: e.target.value };
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  return (
    <div
      className="menu menu-sub menu-sub-dropdown w-250px w-md-300px"
      data-kt-menu="true"
    >
      <div className="px-7 py-5">
        <div className="fs-5 text-gray-900 fw-bold">
          Recruiter Performance Filters
        </div>
      </div>

      <div className="separator border-gray-200"></div>

      <div className="px-7 py-5">
        <div className="mb-10">
          <label className="form-label fw-semibold">Status:</label>
          <select
            name="status"
            className="form-select form-select-solid"
            value={filters.status}
            onChange={handleChange}
          >
            <option value="1">Approved</option>
            <option value="2">Pending</option>
            <option value="3">In Process</option>
            <option value="4">Rejected</option>
          </select>
        </div>

        <div className="mb-10">
          <label className="form-label fw-semibold">Recruiter Type:</label>
          <select
            name="recruiterType"
            className="form-select form-select-solid"
            value={filters.recruiterType}
            onChange={handleChange}
          >
            <option value="all">All</option>
            <option value="senior">Senior Recruiters</option>
            <option value="junior">Junior Recruiters</option>
          </select>
        </div>

        <div className="mb-10">
          <label className="form-label fw-semibold">Time Range:</label>
          <select
            name="timeRange"
            className="form-select form-select-solid"
            value={filters.timeRange}
            onChange={handleChange}
          >
            <option value="today">Today</option>
            <option value="this_week">This Week</option>
            <option value="this_month">This Month</option>
          </select>
        </div>
      </div>
    </div>
  );
}
