import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { IRecruiterList } from "../RecruitersListPage/Types/RecruiterListTypes";
import NoData from "../../../MyComponents/NoDataAvailable/NoData";
import { Spinner } from "react-bootstrap";

interface RecruiterProfileHeaderProps {
  recruiter: IRecruiterList | null;
  loading?: Boolean;
  error?: String | null;
  FetchRecruiterById: () => void;
}

const RecruiterProfileHeader: React.FC<RecruiterProfileHeaderProps> = ({
  recruiter,
  loading,
  error,
  FetchRecruiterById,
}) => {
  const location = useLocation();

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
                  FetchRecruiterById();
                }}
              />
            </div>
          ) : (
            <div className="card-body pt-9 pb-0">
              <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
                {/* Profile Image */}
                <div className="me-7 mb-4">
                  <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                    <img
                      src={toAbsoluteUrl("media/avatars/300-1.jpg")}
                      alt={recruiter?.firstName}
                    />
                  </div>
                </div>

                {/* Recruiter Details */}
                <div className="flex-grow-1">
                  <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                    <div className="d-flex flex-column">
                      <div className="d-flex align-items-center mb-2">
                        <a
                          href="#"
                          className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                        >
                          {recruiter?.firstName} {recruiter?.lastName}
                        </a>
                        <KTIcon
                          iconName="verify"
                          className="fs-1 text-primary"
                        />
                      </div>

                      {/* Recruiter Information */}
                      <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                        <span className="d-flex align-items-center text-gray-500 me-5 mb-2">
                          <KTIcon iconName="call" className="fs-4 me-1" />
                          {"9166550809"}
                        </span>
                        <span className="d-flex align-items-center text-gray-500 mb-2">
                          <KTIcon iconName="sms" className="fs-4 me-1" />
                          {recruiter?.email}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Profile Stats */}
                  <div className="d-flex flex-wrap flex-stack">
                    <div className="d-flex flex-column flex-grow-1 pe-8">
                      <div className="d-flex flex-wrap">
                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                          <div className="fs-2 fw-bolder">10</div>
                          <div className="fw-bold fs-6 text-gray-500">
                            Assigned candidates
                          </div>
                        </div>

                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                          <div className="fs-2 fw-bolder">
                            {recruiter?.successfulPlacements}
                          </div>
                          <div className="fw-bold fs-6 text-gray-500">
                            Successful placements
                          </div>
                        </div>

                        <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                          <div className="fs-2 fw-bolder">
                            {recruiter?.performanceScore}%
                          </div>
                          <div className="fw-bold fs-6 text-gray-500">
                            Performance score
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Profile Navigation Tabs */}
              <div className="d-flex overflow-auto h-55px">
                <ul className="nav nav-stretch nav-line-tabs nav-line-tabs-2x border-transparent fs-5 fw-bolder flex-nowrap">
                  <li className="nav-item">
                    <Link
                      className={`nav-link text-active-primary me-6 ${
                        location.pathname.endsWith("/my-candidates")
                          ? "active"
                          : ""
                      }`}
                      to={`/recruiter-profile/${recruiter?._id}/my-candidates`}
                    >
                      Candidates
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link text-active-primary me-6 ${
                        location.pathname.endsWith("/interviews")
                          ? "active"
                          : ""
                      }`}
                      to={`/recruiter-profile/${recruiter?._id}/interviews`}
                    >
                      Interviews
                    </Link>
                  </li>
                  <li className="nav-item">
                    <Link
                      className={`nav-link text-active-primary me-6 ${
                        location.pathname.endsWith("/applied-jobs")
                          ? "active"
                          : ""
                      }`}
                      to={`/recruiter-profile/${recruiter?._id}/applied-jobs`}
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

export default RecruiterProfileHeader;
