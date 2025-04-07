import React, { useEffect, useState } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { Dropdown1 } from "../../../../../_metronic/partials";
import SearchComponent from "../../RecruitersListPage/Components/SearchInTable";
import Pagination from "../../../../MyComponents/Pagination/Pagination";
// import { getAppliedJobs } from "../../../../../ApiRequests/JobRequests";
import { UsersListLoading } from "../../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import NoData from "../../../../MyComponents/NoDataAvailable/NoData";
import FullPageSpinner from "../../../../MyComponents/Spinner/FullPageSpinner";
import InCardSpinner from "../../../../MyComponents/Spinner/InCardSpinner";
import ApplyJobForm from "./ApplyJobForm/ApplyFormJob";
import { ICandidateList } from "../../../../../Types/CandidatesInterface";
import { IRecruiterList } from "../../../../../Types/RecruiterInterface";
// import ApplyJobForm from "./ApplyJob/ApplyJobForm";

type Props = {
  className: string;
  selectedCandidate: ICandidateList;
  recruiter: IRecruiterList;
};

type AppliedJobType = {
  id: number;
  candidateName: string;
  candidateEmail: string;
  profileImage: string;
  appliedDate: string;
  companyName: string;
  role: string;
  status: string;
};

const AppliedJobsList: React.FC<Props> = ({
  className,
  selectedCandidate,
  recruiter,
}) => {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJobType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showApplyJobPopup, setShowApplyJobPopup] = useState(false);

  // API call to fetch applied jobs
  const fetchAppliedJobs = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching Applied Jobs...");
      //   const response = await getAppliedJobs();
      //   console.log("API Response:", response.data);
      //   setAppliedJobs(response.data.payload);
      //   setTotalPages(response.data.totalPages);
    } catch (err: any) {
      console.error(
        "Error Fetching Applied Jobs:",
        err.response?.status,
        err.message
      );
      setError("Failed to load applied jobs.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAppliedJobs(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className={`card ${className}`}>
      {/* Header */}
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Applied Jobs</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {appliedJobs.length} Jobs Applied
          </span>
        </h3>
        <div className="card-toolbar d-flex align-items-center gap-3 flex-wrap">
          <Dropdown1 />
          <SearchComponent
            onSearch={(query) => console.log(query)}
            placeholder="Search Job Application"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowApplyJobPopup(true)}
          >
            <KTIcon iconName="plus" className="fs-3 me-2" />
            Add Applied Job
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        {loading ? (
          <InCardSpinner message="Loading Applied Jobs" />
        ) : error ? (
          <NoData onRetry={fetchAppliedJobs} showRetry />
        ) : appliedJobs.length === 0 ? (
          <NoData message="No records found" />
        ) : (
          <div className="table-responsive">
            <table className="table align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  <th className="ps-4 min-w-250px rounded-start">Candidate</th>
                  <th className="min-w-150px">Applied Date</th>
                  <th className="min-w-200px">Company</th>
                  <th className="min-w-200px">Role</th>
                  <th className="min-w-150px">Status</th>
                  <th className="min-w-125px text-center rounded-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {appliedJobs.map((job) => (
                  <tr key={job.id}>
                    <td>
                      <div className="d-flex align-items-center">
                        <div className="symbol symbol-50px me-5">
                          <img
                            src={toAbsoluteUrl(job.profileImage)}
                            className="rounded-circle"
                            alt="Profile"
                          />
                        </div>
                        <div className="d-flex flex-column">
                          <a
                            href="#"
                            className="text-gray-900 fw-bold text-hover-primary mb-1 fs-6"
                          >
                            {job.candidateName}
                          </a>
                          <span className="text-muted fw-semibold d-block fs-7">
                            {job.candidateEmail}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span className="text-gray-900 fw-bold fs-6">
                        {job.appliedDate}
                      </span>
                    </td>
                    <td>
                      <span className="text-gray-900 fw-bold fs-6">
                        {job.companyName}
                      </span>
                    </td>
                    <td>
                      <span className="text-gray-900 fw-bold fs-6">
                        {job.role}
                      </span>
                    </td>
                    <td>
                      <span className="badge badge-light-primary">
                        {job.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <button className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                        <KTIcon iconName="pencil" className="fs-3" />
                      </button>
                      <button className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                        <KTIcon iconName="trash" className="fs-3" />
                      </button>
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

      {/* Apply Job Popup */}
      {showApplyJobPopup && (
        <ApplyJobForm
          show={showApplyJobPopup}
          handleClose={() => setShowApplyJobPopup(false)}
          selectedCandidate={selectedCandidate}
          recruiter={recruiter}
          // jobs={[]} // Fetch ca/ndidates dynamically if needed
        />
      )}
    </div>
  );
};

export { AppliedJobsList };
