import React, { useState, useEffect } from "react";
import { KTIcon, toAbsoluteUrl } from "../../../../../_metronic/helpers";
import { Dropdown1 } from "../../../../../_metronic/partials";
import SearchComponent from "../../RecruitersListPage/Components/SearchInTable";
import FileUploadPopup from "./FileuploadPopup";
import { Link } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { RegisterCandidateStepper } from "./CreateCandidateModal/RegisterCandidateStepper";
import Pagination from "../../../../MyComponents/Pagination/Pagination";
import { getCandidates } from "../../../../../ApiRequests/CandidateRequest";
import { UsersListLoading } from "../../../../modules/apps/user-management/users-list/components/loading/UsersListLoading";
import NoData from "../../../../MyComponents/NoDataAvailable/NoData";
import { ICandidateList } from "../../../../../Types/CandidatesInterface";
import InCardSpinner from "../../../../MyComponents/Spinner/InCardSpinner";
import CreateCandidateForm from "./CreateCandidateForm";
import { IRecruiterList } from "../../../../../Types/RecruiterInterface";

type Props = {
  recruiterId: string;
  recruiter?: IRecruiterList;
};

const CandidatesList: React.FC<Props> = ({ recruiterId, recruiter }) => {
  const [candidates, setCandidates] = useState<ICandidateList[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [showCreateCandidateModal, setShowCreateCandidateModal] =
    useState(false);
  const [showUploadFileModal, setShowUploadFileModal] = useState(false);
  const isMobileOrTablet = useMediaQuery({ query: "(max-width: 1024px)" });
  const [selectedCandidate, setselectedCandidate] =
    useState<ICandidateList | null>(null);
  const ITEMS_PER_PAGE = 10;

  useEffect(() => {
    console.log("use effect");
    fetchCandidates();
  }, []);

  const fetchCandidates = async (page: number = 1) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching Candidates...");
      const response = await getCandidates(recruiterId);
      console.log("API Response:", response.data);
      setCandidates(response.data.payload);
      setTotalPages(Math.ceil(response.data.payload.length / ITEMS_PER_PAGE));
    } catch (err: any) {
      console.error(
        "Error Fetching Candidates:",
        err.response?.status,
        err.message
      );
      setError("Failed to load candidates.");
    } finally {
      setLoading(false);
    }
  };

  const handleEditCandidate = (item: ICandidateList) => {
    setselectedCandidate(item);
    setShowCreateCandidateModal(true);
  };

  return (
    <div className="card mb-10">
      <div className="card-header border-0 pt-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Candidates List</span>
          <span className="text-muted mt-1 fw-semibold fs-7">
            {candidates.length} Candidates available
          </span>
        </h3>
        <div className="card-toolbar d-flex align-items-center gap-3 flex-wrap">
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

          <SearchComponent
            onSearch={(query) => console.log(query)}
            placeholder="Search Candidate"
          />

          <button
            className="btn btn-light-primary btn-sm d-flex align-items-center gap-2"
            onClick={() => setShowUploadFileModal(true)}
          >
            <KTIcon iconName="add-files" className="fs-3" />
            Upload CSV
          </button>

          <button
            className="btn btn-primary btn-sm d-flex align-items-center gap-2"
            onClick={() => setShowCreateCandidateModal(true)}
          >
            <KTIcon iconName="plus" className="fs-3" />
            Add Candidate
          </button>
        </div>
      </div>

      <div className="card-body py-3">
        {loading ? (
          // <UsersListLoading message={"Loading Candidates..."} />
          <InCardSpinner message="Loading Candidates" />
        ) : error ? (
          <NoData onRetry={fetchCandidates} showRetry />
        ) : candidates.length == 0 ? (
          <NoData message="No records found" />
        ) : (
          <div className="table-responsive">
            <table className="table align-middle gs-0 gy-4">
              <thead>
                <tr className="fw-bold text-muted bg-light">
                  <th className="ps-4 min-w-250px rounded-start">Candidate</th>
                  <th className="min-w-200px">Assigned recruiter</th>
                  <th className="min-w-150px">Contact</th>
                  <th className="min-w-150px">Resume</th>
                  <th className="min-w-125px">Status</th>
                  <th className="min-w-125px text-center rounded-end">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {candidates.map((candidate) => (
                  <tr key={candidate._id}>
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
                            {candidate.firstName + " " + candidate.lastName}
                          </a>
                          <span className="text-muted fw-semibold d-block fs-7">
                            {candidate.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td>
                      {/* <select className="form-select form-select-sm">
                        {candidate.recruiterDetails.map((recruiter) => (
                          <option
                            key={recruiter._id}
                            value={recruiter._id}
                            selected={
                              candidate.recruiterDetails[0]._id ===
                              recruiter._id
                            }
                          >
                            Deepak Vyas
                          </option>
                        ))}
                      </select> */}
                      <span className="text-gray-900 fw-bold fs-6">
                        {candidate.recruiterDetails[0].recruiterId.firstName}{" "}
                        {candidate.recruiterDetails[0].recruiterId.lastName}
                      </span>
                    </td>
                    <td>
                      <span className="text-gray-900 fw-bold fs-6">
                        {candidate.phoneNumber}
                      </span>
                    </td>
                    <td>
                      <div
                        className="border border-gray-300 rounded px-2 py-1 d-inline-flex align-items-center gap-2 cursor-pointer"
                        onClick={() =>
                          window.open(candidate?.resumeUpload, "_blank")
                        }
                        style={{ textDecoration: "none", color: "inherit" }}
                      >
                        <KTIcon
                          iconName="file"
                          className="fs-4 text-gray-700"
                        />
                        <span className="fw-bold fs-6 text-gray-800">
                          Resume
                        </span>
                      </div>
                    </td>
                    <td>
                      <span
                        className={`badge ${candidate.status} fs-7 fw-semibold`}
                      >
                        {candidate.status}
                      </span>
                    </td>
                    <td className="text-end">
                      <a
                        onClick={() => handleEditCandidate(candidate)}
                        className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1"
                      >
                        <KTIcon iconName="pencil" className="fs-3" />
                      </a>
                      <a className="btn btn-icon btn-bg-light btn-active-color-primary btn-sm me-1">
                        <KTIcon iconName="trash" className="fs-3" />
                      </a>
                      <Link
                        to={`/candidate-profile/${candidate._id}/interviews`}
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
        )}
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      </div>

      <FileUploadPopup
        isOpen={showUploadFileModal}
        onClose={() => setShowUploadFileModal(false)}
        onUpload={(files) => {
          console.log(files);
        }}
      />

      {/* {showCreateCandidateModal && (
        <RegisterCandidateStepper
          show={showCreateCandidateModal}
          handleClose={() => setShowCreateCandidateModal(false)}
        />
      )} */}

      {showCreateCandidateModal && (
        <CreateCandidateForm
          recruiters={[]}
          show={showCreateCandidateModal}
          selectedRecruiter={recruiter}
          candidateItem={selectedCandidate}
          handleClose={(isCreatedOrUpdated?: boolean) => {
            setShowCreateCandidateModal(false);
            setselectedCandidate(null);
            isCreatedOrUpdated && fetchCandidates();
          }}
        />
      )}
    </div>
  );
};

export { CandidatesList };
