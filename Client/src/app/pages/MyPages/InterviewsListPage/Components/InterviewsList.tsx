import React, { useEffect, useState } from "react";
import axios from "axios";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { Dropdown1 } from "../../../../../_metronic/partials";
import SearchComponent from "../../RecruitersListPage/Components/SearchInTable";
import ScheduleInterviewForm from "./ScheduleInterview/ScheduleInterview";
import Pagination from "../../../../MyComponents/Pagination/Pagination";
import { getInterviews } from "../../../../../ApiRequests/InterviewRequests";
import { UsersListLoading } from "../../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import NoData from "../../../../MyComponents/NoDataAvailable/NoData";
import FullPageSpinner from "../../../../MyComponents/Spinner/FullPageSpinner";
import InCardSpinner from "../../../../MyComponents/Spinner/InCardSpinner";
import { ICandidateList } from "../../../../../Types/CandidatesInterface";
import { IRecruiterList } from "../../../../../Types/RecruiterInterface";

type Props = {
  className: string;
  selectedCandidate: ICandidateList;
  recruiter: IRecruiterList;
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
};

const InterviewsList: React.FC<Props> = ({
  className,
  selectedCandidate,
  recruiter,
}) => {
  const [interviews, setInterviews] = useState<InterviewType[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showScheduleInterviewPopup, setShowScheduleInterviewPopup] =
    useState(false);

  // API call to fetch interviews
  const fetchInterviews = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching Candidates...");
      const response = await getInterviews();
      console.log("API Response:", response.data);
      //  setInterviews(response.data.payload);
      setTotalPages(10);
    } catch (err: any) {
      console.error(
        "Error Fetching Interviews:",
        err.response?.status,
        err.message
      );
      setError("Failed to load interviews.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchInterviews(currentPage);
  }, [currentPage]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
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
          <Dropdown1 />
          <SearchComponent
            onSearch={(query) => console.log(query)}
            placeholder="Search Interview"
          />
          <button
            className="btn btn-primary btn-sm"
            onClick={() => setShowScheduleInterviewPopup(true)}
          >
            <KTIcon iconName="plus" className="fs-3 me-2" />
            Schedule Interview
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="card-body py-3">
        {loading ? (
          // <UsersListLoading message={"Loading Interviews..."} />
          // <FullPageSpinner message="Loading Interviews"/>
          <InCardSpinner message="Loading Interviews" />
        ) : error ? (
          <NoData onRetry={fetchInterviews} showRetry />
        ) : interviews.length == 0 ? (
          <NoData message="No records found" />
        ) : (
          <div className="table-responsive">
            <table className="table align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  <th className="ps-4 min-w-250px rounded-start">Candidate</th>
                  <th className="min-w-150px">Interview Date</th>
                  <th className="min-w-150px">Interviewer</th>
                  <th className="min-w-200px">Role</th>
                  <th className="min-w-150px">Status</th>
                  <th className="min-w-125px text-center rounded-end">
                    Actions
                  </th>
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
                      <span className="badge badge-light-primary">
                        {interview.status}
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

      {/* Schedule Interview Popup */}
      {showScheduleInterviewPopup && (
        <ScheduleInterviewForm
          show={showScheduleInterviewPopup}
          handleClose={() => setShowScheduleInterviewPopup(false)}
          selectedCandidate={selectedCandidate}
          recruiter={recruiter}
          // candidates={[]}
        />
      )}
    </div>
  );
};

export { InterviewsList };
