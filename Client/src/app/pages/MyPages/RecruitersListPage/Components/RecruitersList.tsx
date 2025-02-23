import React, { useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { CreateRecruiterModal } from "./CreateRecruiterModal";
import { Dropdown1, SearchModal } from "../../../../../_metronic/partials";
import SearchComponent from "./SearchInTable";
import { Link } from "react-router-dom";

type Props = {
  className: string;
};

// Sample Data - Replace with API data
const recruiters = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    profileImage: "media/avatars/300-1.jpg",
    contactNumber: "+1 234 567 890",
    company: "Tech Solutions Ltd.",
    role: "Senior Recruiter",
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
  {
    id: 3,
    name: "James Brown",
    email: "james.brown@example.com",
    profileImage: "media/avatars/300-3.jpg",
    contactNumber: "+91 987 654 3210",
    company: "Talent Hub",
    role: "Recruitment Lead",
    status: "Inactive",
    statusClass: "badge-light-danger",
  },
  {
    id: 4,
    name: "Emily White",
    email: "emily.white@example.com",
    profileImage: "media/avatars/300-4.jpg",
    contactNumber: "+61 412 345 678",
    company: "People First",
    role: "Talent Acquisition Specialist",
    status: "Active",
    statusClass: "badge-light-primary",
  },
  {
    id: 5,
    name: "Michael Johnson",
    email: "michael.johnson@example.com",
    profileImage: "media/avatars/300-5.jpg",
    contactNumber: "+33 612 789 012",
    company: "Global Hiring Ltd.",
    role: "Recruitment Consultant",
    status: "Pending",
    statusClass: "badge-light-warning",
  },
  {
    id: 6,
    name: "Laura Davis",
    email: "laura.davis@example.com",
    profileImage: "media/avatars/300-6.jpg",
    contactNumber: "+49 152 654 987",
    company: "Smart Recruiters",
    role: "HR Executive",
    status: "Inactive",
    statusClass: "badge-light-danger",
  },
  {
    id: 7,
    name: "Daniel Wilson",
    email: "daniel.wilson@example.com",
    profileImage: "media/avatars/300-7.jpg",
    contactNumber: "+1 789 654 3210",
    company: "Fast Hire",
    role: "Recruiting Manager",
    status: "Active",
    statusClass: "badge-light-primary",
  },
  {
    id: 8,
    name: "Sophia Martinez",
    email: "sophia.martinez@example.com",
    profileImage: "media/avatars/300-8.jpg",
    contactNumber: "+34 654 987 321",
    company: "Hiring Hub",
    role: "Senior HR Partner",
    status: "Pending",
    statusClass: "badge-light-warning",
  },
  {
    id: 9,
    name: "David Anderson",
    email: "david.anderson@example.com",
    profileImage: "media/avatars/300-9.jpg",
    contactNumber: "+81 987 654 123",
    company: "Recruit Right",
    role: "Staffing Coordinator",
    status: "Inactive",
    statusClass: "badge-light-danger",
  },
  {
    id: 10,
    name: "Emma Thomas",
    email: "emma.thomas@example.com",
    profileImage: "media/avatars/300-10.jpg",
    contactNumber: "+44 731 258 963",
    company: "Elite Hiring Solutions",
    role: "HR Director",
    status: "Active",
    statusClass: "badge-light-primary",
  },
];

const RecruitersList: React.FC<Props> = ({ className }) => {
  const [showCreateRecruiterModal, setShowCreateRecruiterModal] =
    useState(false);

  return (
    <div className={`card ${className}`}>
      {/* begin::Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Recruiters List</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {recruiters.length} recruiters available
          </span>
        </h3>
        <div
          className="card-toolbar"
          // onClick={() => setShowCreateRecruiterModal(true)}
        >
          {/* <p className="btn btn-sm btn-light-primary">
            <KTIcon iconName="plus" className="fs-2" />
            Add Recruiter
          </p> */}
          <div className="card-toolbar">
            <SearchComponent
              onSearch={(query) => console.log(query)}
              placeholder="Search Recruiter"
            />
            {/* begin::Menu */}
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
            {/* end::Menu */}
          </div>
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-3">
        <div className="table-responsive">
          <table className="table align-middle gs-0 gy-4">
            {/* begin::Table head */}
            <thead>
              <tr className="fw-bold text-muted bg-light">
                <th className="ps-4 min-w-250px rounded-start">Recruiter</th>
                <th className="min-w-150px">Contact</th>
                <th className="min-w-200px">Company</th>
                <th className="min-w-150px">Role</th>
                <th className="min-w-125px">Status</th>
                <th className="min-w-125px text-center rounded-end">Actions</th>
              </tr>
            </thead>
            {/* end::Table head */}

            {/* begin::Table body */}
            <tbody>
              {recruiters.map((recruiter) => (
                <tr key={recruiter.id}>
                  <td>
                    <div className="d-flex align-items-center">
                      <div className="symbol symbol-50px me-5">
                        <img
                          src={toAbsoluteUrl(recruiter.profileImage)}
                          className="rounded-circle"
                          alt="Profile"
                        />
                      </div>
                      <div className="d-flex flex-column">
                        <a
                          href="#"
                          className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                        >
                          {recruiter.name}
                        </a>
                        <span className="text-muted fw-semibold d-block fs-7">
                          {recruiter.email}
                        </span>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {recruiter.contactNumber}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {recruiter.company}
                    </span>
                  </td>
                  <td>
                    <span className="text-gray-900 fw-bold fs-6">
                      {recruiter.role}
                    </span>
                  </td>
                  <td>
                    <span
                      className={`badge ${recruiter.statusClass} fs-7 fw-semibold`}
                    >
                      {recruiter.status}
                    </span>
                  </td>
                  <td className="text-end">
                    {/* <a
                      href="#"
                      className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                    >
                      <KTIcon iconName="eye" className="fs-3" />
                    </a> */}
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
                      to={`/recruiter-profile/${recruiter.id}/my-candidates`}
                      className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                    >
                      <KTIcon iconName="arrow-right" className="fs-3" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
            {/* end::Table body */}
          </table>
        </div>
      </div>
      <CreateRecruiterModal
        show={showCreateRecruiterModal}
        handleClose={() => setShowCreateRecruiterModal(false)}
      />
      {/* <SearchModal show={true} handleClose={()=>{}}/> */}
      {/* end::Body */}
    </div>
  );
};

export { RecruitersList };
