import React, { useEffect, useState } from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { getCandidateByID } from "../../../../ApiRequests/CandidateRequest";
import { Spinner } from "react-bootstrap";
import NoData from "../../../MyComponents/NoDataAvailable/NoData";
import { ICandidateList } from "../../../../Types/CandidatesInterface";

interface CandidateProfileHeaderProps {
  candidate: ICandidateList | null;
  fetchCandidate: (candidateID: any) => {};
  loading: Boolean;
  error: String | null;
}

const CandidateProfileHeader: React.FC<CandidateProfileHeaderProps> = ({
  candidate,
  fetchCandidate,
  loading,
  error,
}) => {
  console.log(error,loading)
  const location = useLocation();
  const { id } = useParams<{ id: string }>();

  // const [candidate, setCandidate] = useState<ICandidateList | null>(null);

  // useEffect(() => {
  //   if (id) {
  //     fetchCandidateById(id);
  //   }
  // }, [id]);

  // const fetchCandidateById = async (candidateId: string) => {
  //   setLoading(true);
  //   setError(null);
  //   try {
  //     console.log("Fetching Candidate...");
  //     const response = await getCandidateByID(candidateId);
  //     console.log("API Response:", response);
  //     setCandidate(response.data.payload); // Assuming API response structure
  //   } catch (err: any) {
  //     console.error(
  //       "Error Fetching Candidate:",
  //       err.response?.status,
  //       err.message
  //     );
  //     setError("Failed to load candidate.");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <>
      <Toolbar />
      <Content>
        <div className="card mb-5 mb-xl-10">
          {loading ? (
            <div className="text-center py-10">
              <Spinner animation="border" />
            </div>
          ) : error ? (
            <div>
              <NoData
                showRetry
                onRetry={() => {
                  fetchCandidate(id);
                }}
              />
            </div>
          ) : (
            <div className="card-body pt-9 pb-0">
              <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                <div className="me-7 mb-4">
                  <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                    <img
                      src={toAbsoluteUrl("media/avatars/300-1.jpg")}
                      alt={`${candidate?.firstName} ${candidate?.lastName}`}
                    />
                    <div
                      className={`position-absolute translate-middle bottom-0 start-100 mb-6 rounded-circle border border-4 border-white h-20px w-20px 
                    ${
                      candidate?.status === "Active"
                        ? "bg-success"
                        : "bg-danger"
                    }`}
                    ></div>
                  </div>
                </div>

                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <span className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1">
                          {candidate?.firstName} {candidate?.lastName}
                        </span>
                        <KTIcon
                          iconName="verify"
                          className="fs-1 text-primary"
                        />
                      </div>

                      <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                        {/* <span className="d-flex align-items-center text-gray-500 me-5 mb-2">
                        <KTIcon iconName="profile-circle" className="fs-4 me-1" />
                        {candidate?.company}
                      </span> */}
                        <span className="d-flex align-items-center text-gray-500 me-5 mb-2">
                          <KTIcon
                            iconName="geolocation"
                            className="fs-4 me-1"
                          />
                          {/* {candidate?.location} */} 9166550809
                        </span>
                        <span className="d-flex align-items-center text-gray-500 mb-2">
                          <KTIcon iconName="sms" className="fs-4 me-1" />
                          {candidate?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="d-flex overflow-auto h-55px">
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                  <li className="nav-item">
                    <Link
                      className={`nav-link text-active-primary me-6 ${
                        location.pathname.includes("/interviews")
                          ? "active"
                          : ""
                      }`}
                      to={`/candidate-profile/${id}/interviews`}
                    >
                      Interviews
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link text-active-primary me-6 ${
                        location.pathname.includes("/applied-jobs")
                          ? "active"
                          : ""
                      }`}
                      to={`/candidate-profile/${id}/applied-jobs`}
                    >
                      Applied Jobs
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </Content>
    </>
  );
};

export default CandidateProfileHeader;
