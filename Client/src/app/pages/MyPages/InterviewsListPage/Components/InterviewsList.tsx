import React, { useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { Dropdown1 } from "../../../../../_metronic/partials";
import SearchComponent from "../../RecruitersListPage/Components/SearchInTable";

type Props = {
  className: string;
};

type InterviewType = {
  id: number;
  candidateName: string;
  candidateEmail: string;
  profileImage: string;
  interviewDate: string;
  interviewer: string;
  role: string;
  status: string;
  statusClass: string;
};

const initialInterviews: InterviewType[] = [
  {
    id: 1,
    candidateName: "John Doe",
    candidateEmail: "john.doe@example.com",
    profileImage: "media/avatars/300-1.jpg",
    interviewDate: "Feb 25, 2025 10:30 AM",
    interviewer: "Sarah Smith",
    role: "Software Engineer",
    status: "Scheduled",
    statusClass: "badge-light-primary",
  },
  {
    id: 2,
    candidateName: "Alice Johnson",
    candidateEmail: "alice.johnson@example.com",
    profileImage: "media/avatars/300-2.jpg",
    interviewDate: "Feb 25, 2025 11:30 AM",
    interviewer: "Mike Brown",
    role: "Data Analyst",
    status: "Pending",
    statusClass: "badge-light-warning",
  },
];

const InterviewsList: React.FC<Props> = ({ className }) => {
  const [interviews, setInterviews] = useState(initialInterviews);

  const handleStatusChange = (id: number, newStatus: string) => {
    const updatedInterviews = interviews.map((interview) =>
      interview.id === id ? { ...interview, status: newStatus } : interview
    );
    setInterviews(updatedInterviews);
  };

  return (
    <div className={`card ${className}`}>
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Scheduled Interviews
          </span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {interviews.length} Interviews Scheduled
          </span>
        </h3>
        <div className="card-toolbar d-flex align-items-center gap-3 flex-wrap">
          {/* Filter */}
          <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <KTIcon iconName="category" className="fs-2" />
          </button>
          <Dropdown1 />

          {/* Search */}
          <SearchComponent
            onSearch={(query) => console.log(query)}
            placeholder="Search Interview"
          />

          {/* Upload CSV */}
          <button className="btn btn-primary btn-sm">
            <KTIcon iconName="plus" className="fs-3 me-2" />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-250px rounded-start">Candidate</th>
                <th className="min-w-150px">Interview Date</th>
                <th className="min-w-150px">Interviewer</th>
                <th className="min-w-200px">Role</th>
                <th className="min-w-150px">Status</th>
                <th className="min-w-125px text-center rounded-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {interviews.map((interview) => (
                <tr key={interview.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <img
                          src={toAbsoluteUrl(interview.profileImage)}
                          className="rounded-circle"
                          alt="Profile"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a
                          href="#"
                          className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >
                          {interview.candidateName}
                        </a>
                        <span className="text-muted fw-semibold d-block fs-7">
                          {interview.candidateEmail}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {interview.interviewDate}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {interview.interviewer}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {interview.role}
                    </span>
                  </td>
                  <td>
                    <select
                      className="form-select form-select-sm"
                      value={interview.status}
                      onChange={(e) =>
                        handleStatusChange(interview.id, e.target.value)
                      }
                    >
                      <option value="Scheduled">Scheduled</option>
                      <option value="Completed">Completed</option>
                      <option value="Canceled">Canceled</option>
                      <option value="Pending">Pending</option>
                    </select>
                  </td>
                  <td className="text-end">
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="pencil" className="fs-3" />
                    </a>
                    <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="trash" className="fs-3" />
                    </a>
                    {/* <a
                      href="#"
                      className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <KTIcon iconName="arrow-right" className="fs-3" />
                    </a> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export { InterviewsList };
