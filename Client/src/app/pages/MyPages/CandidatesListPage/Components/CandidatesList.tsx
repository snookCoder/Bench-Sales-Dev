import React, { useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { Dropdown1 } from "../../../../../_metronic/partials";
import SearchComponent from "../../RecruitersListPage/Components/SearchInTable";
import FileUploadPopup from "./FileuploadPopup";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";

type Props = {
  className: string;
};

const Candidates = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "media/avatars/300-1.jpg",
    contactNumber: "+1 234 567 890",
    company: "Tech Solutions Ltd.",
    role: "Senior Candidate",
    status: "Active",
    statusClass: "badge-light-primary",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah.smith@example.com",
    profileImage: "media/avatars/300-2.jpg",
    contactNumber: "+44 789 456 123",
    company: "HR Connect",
    role: "HR Manager",
    status: "Pending",
    statusClass: "badge-light-warning",
  },
];

const CandidatesList: React.FC<Props> = ({ className }) => {
  const [showCreateCandidateModal, setShowCreateCandidateModal] =
    useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1024px)" });

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Candidates List</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {Candidates.length} Candidates available
          </span>
        </h3>
        <div className="card-toolbar d-flex align-items-center gap-3 flex-wrap">
          {/* Filter Button */}
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

          {/* Search Input */}
          <SearchComponent
            onSearch={(query) => console.log(query)}
            placeholder="Search Candidate"
          />

          {/* Upload CSV Button */}
          <button
            className="btn btn-light-primary btn-sm d-flex align-items-center gap-2"
            onClick={() => setShowUploadFileModal(true)}
          >
            <KTIcon iconName="add-files" className="fs-3" />
            Upload CSV
          </button>

          {/* Add Candidate Button */}
          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-2"
            onClick={() => setShowCreateCandidateModal(true)}
          >
            <KTIcon iconName="plus" className="fs-3" />
            Add Candidate
          </button>
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-250px rounded-start">Candidate</th>
                <th className="min-w-150px">Contact</th>
                <th className="min-w-200px">Company</th>
                <th className="min-w-150px">Role</th>
                <th className="min-w-125px">Status</th>
                <th className="min-w-125px text-center rounded-end">Actions</th>
              </tr>
            </thead>

            <tbody>
              {Candidates.map((candidate) => (
                <tr key={candidate.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <img
                          src={toAbsoluteUrl(candidate.profileImage)}
                          className="rounded-circle"
                          alt="Profile"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a
                          href="#"
                          className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >
                          {candidate.name}
                        </a>
                        <span className="text-muted fw-semibold d-block fs-7">
                          {candidate.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {candidate.contactNumber}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {candidate.company}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {candidate.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${candidate.statusClass} fs-7 fw-semibold`}
                    >
                      {candidate.status}
                    </span>
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
                    <Link
                      to={`/candidate-profile/${candidate.id}/interviews`}
                      className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <KTIcon iconName="arrow-right" className="fs-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <FileUploadPopup
        isOpen={showUploadFileModal}
        onClose={() => setShowUploadFileModal(false)}
        onUpload={(files) => {
          console.log(files);
        }}
        // isMultipleAllowed
      />
    </div>
  );
};

export { CandidatesList };
