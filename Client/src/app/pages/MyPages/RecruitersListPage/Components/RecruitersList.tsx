import React, { useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { CreateRecruiterModal } from "./CreateRecruiterModal";
import { Dropdown1 } from "../../../../../_metronic/partials";
import SearchComponent from "./SearchInTable";
import Pagination from "../../../../MyComponents/Pagination/Pagination";
import { Link } from "react-router-dom";
import { getRecruiters } from "../../../../../ApiRequests/RecruiterRequests";
import {
  IRecruiterList,
  IRecruiterListResponse,
} from "../Types/RecruiterListTypes";
import NoData from "../../../../MyComponents/NoDataAvailable/NoData";
import { Spinner } from "react-bootstrap";
import InCardSpinner from "../../../../MyComponents/Spinner/InCardSpinner";

type Props = {
  className: string;
};

const RecruitersList: React.FC<Props> = ({ className }) => {
  const [recruiters, setRecruiters] = useState<IRecruiterList[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showCreateRecruiterModal, setShowCreateRecruiterModal] =
    useState(false);
  const ITEMS_PER_PAGE = 10;

  // 🟢 Fetch Recruiters Function
  const fetchRecruiters = async () => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching Recruiters...");
      const response = await getRecruiters();
      console.log("API Response:", response);
      setRecruiters(response.payload);
      setTotalPages(Math.ceil(response.payload.length / ITEMS_PER_PAGE));
    } catch (err: any) {
      console.error(
        "Error Fetching Recruiters:",
        err.response?.status,
        err.message
      );
      setError("Failed to load recruiters.");
    } finally {
      setLoading(false);
    }
  };

  // 🔵 Load Recruiters on Component Mount or Page Change
  useEffect(() => {
    fetchRecruiters();
  }, [currentPage]);

  // 🟠 Handle Page Change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

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
        <div className="card-toolbar">
          <SearchComponent
            onSearch={(query) => console.log(query)}
            placeholder="Search Recruiter"
          />
          {/* <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <KTIcon iconName="category" className="fs-2" />
          </button>
          <Dropdown1 /> */}
        </div>
      </div>
      {/* end::Header */}

      {/* begin::Body */}
      <div className="card-body py-3">
        {loading ? (
          // <UsersListLoading message={"Loading Interviews..."} />
          // <FullPageSpinner message="Loading Interviews" />
          <InCardSpinner message="Loading Recruiters" />
        ) : error ? (
          <NoData onRetry={fetchRecruiters} showRetry />
        ) : RecruitersList.length == 0 ? (
          <NoData message="No records found" />
        ) : (
          <div className="table-responsive">
            <table className="table align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  <th className="ps-4 min-w-250px rounded-start text-nowrap">
                    Recruiter
                  </th>
                  <th className="min-w-150px text-nowrap">Contact Number</th>
                  <th className="min-w-150px text-nowrap">
                    Candidates Managed
                  </th>
                  <th className="min-w-150px text-nowrap">
                    Successful Placements
                  </th>
                  <th className="min-w-125px text-nowrap">Performance Score</th>

                  <th className="min-w-125px text-center rounded-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {recruiters.map((recruiter) => (
                  <tr key={recruiter._id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <img
                            src={toAbsoluteUrl("media/avatars/300-1.jpg")}
                            className="rounded-circle"
                            alt="Profile"
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            {recruiter.firstName + " " + recruiter.lastName}
                          </a>
                          <span className="text-muted fw-semibold d-block fs-7">
                            {recruiter.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray-900 fw-bold fs-6">
                        +91 9166550809
                      </span>
                    </td>
                    <td>
                      <span className="text-gray-900 fw-bold fs-6">10</span>
                    </td>
                    <td>
                      <span className="text-gray-900 fw-bold fs-6">
                        {recruiter.successfulPlacements}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${recruiter.role} fs-7 fw-semibold`}
                      >
                        {recruiter.performanceScore}%
                      </span>
                    </td>
                    <td className="text-center">
                      {/* <Link
                        to={`/recruiter-profile/${recruiter._id}/my-candidates`}
                        className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary"
                      >
                        <KTIcon iconName="arrow-right" className="fs-3" />
                      </Link> */}
                      <Link
                        to={`/recruiter-profile/${recruiter._id}/my-candidates`}
                        className="btn btn-sm btn-bg-light btn-active-color-primary gap-2"
                      >
                        <span className="text-primary text-nowrap">
                          View Details{" "}
                        </span>
                        <KTIcon
                          iconName="arrow-right"
                          className="fs-3 text-primary"
                        />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
      {/* end::Body */}

      {/* Create Recruiter Modal */}
      <CreateRecruiterModal
        show={showCreateRecruiterModal}
        handleClose={() => setShowCreateRecruiterModal(false)}
      />
    </div>
  );
};

export { RecruitersList };
