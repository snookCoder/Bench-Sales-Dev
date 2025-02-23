import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";
import { Dropdown1 } from "../../../../_metronic/partials";
// import { KTIcon, toAbsoluteUrl } from "../../../_metronic/helpers";
// import { Dropdown1 } from "../../../_metronic/partials";
// import { Toolbar } from "../../../_metronic/layout/components/toolbar/Toolbar";
// import { Content } from "../../../_metronic/layout/components/Content";

interface RecruiterProfileProps {
  recruiter: {
    id: number;
    name: string;
    email: string;
    company: string;
    location: string;
    status: string;
    profilePicture: string;
    verified: boolean;
  };
}

const RecruiterProfileHeader: React.FC<RecruiterProfileProps> = ({
  recruiter,
}) => {
  const location = useLocation();
  const { id } = useParams();

  return (
    <>
      <Toolbar />
      <Content>
        <div className="card mb-5 mb-xl-10">
          <div className="card-body pt-9 pb-0">
            <div className="d-flex flex-wrap flex-sm-nowrap mb-3">
              {/* Profile Image */}
              <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                  <img
                    src={toAbsoluteUrl(recruiter.profilePicture)}
                    alt={recruiter.name}
                  />
                  <div
                    className={`position-absolute translate-middle bottom-0 start-100 mb-6 rounded-circle border border-4 border-white h-20px w-20px 
                  ${
                    recruiter.status === "Active" ? "bg-success" : "bg-danger"
                  }`}
                  ></div>
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
                        {recruiter.name}
                      </a>
                      {recruiter.verified && (
                        <KTIcon
                          iconName="verify"
                          className="fs-1 text-primary"
                        />
                      )}
                    </div>

                    {/* Recruiter Information */}
                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <span className="d-flex align-items-center text-gray-500 me-5 mb-2">
                        <KTIcon
                          iconName="profile-circle"
                          className="fs-4 me-1"
                        />
                        {recruiter.company}
                      </span>
                      <span className="d-flex align-items-center text-gray-500 me-5 mb-2">
                        <KTIcon iconName="geolocation" className="fs-4 me-1" />
                        {recruiter.location}
                      </span>
                      <span className="d-flex align-items-center text-gray-500 mb-2">
                        <KTIcon iconName="sms" className="fs-4 me-1" />
                        {recruiter.email}
                      </span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="d-flex my-4">
                    <button className="btn btn-sm btn-light me-2">
                      <KTIcon iconName="check" className="fs-3 d-none" />
                      Follow
                    </button>
                    <button className="btn btn-sm btn-primary me-3">
                      Message
                    </button>
                    <div className="me-0">
                      <button className="btn btn-sm btn-icon btn-bg-light btn-active-color-primary">
                        <i className="bi bi-three-dots fs-3"></i>
                      </button>
                      <Dropdown1 />
                    </div>
                  </div>
                </div>

                {/* Profile Stats */}
                <div className="d-flex flex-wrap flex-stack">
                  <div className="d-flex flex-column flex-grow-1 pe-8">
                    <div className="d-flex flex-wrap">
                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-up"
                            className="fs-3 text-success me-2"
                          />
                          <div className="fs-2 fw-bolder">4500$</div>
                        </div>
                        <div className="fw-bold fs-6 text-gray-500">
                          Earnings
                        </div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-down"
                            className="fs-3 text-danger me-2"
                          />
                          <div className="fs-2 fw-bolder">75</div>
                        </div>
                        <div className="fw-bold fs-6 text-gray-500">
                          Projects
                        </div>
                      </div>

                      <div className="border border-gray-300 border-dashed rounded min-w-125px py-3 px-4 me-6 mb-3">
                        <div className="d-flex align-items-center">
                          <KTIcon
                            iconName="arrow-up"
                            className="fs-3 text-success me-2"
                          />
                          <div className="fs-2 fw-bolder">60%</div>
                        </div>
                        <div className="fw-bold fs-6 text-gray-500">
                          Success Rate
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
                      location.pathname.endsWith("/my-candidates") ? "active" : ""
                    }`}
                    to={`/recruiter-profile/${id}/my-candidates`}
                  >
                    Candidates
                  </Link>
                </li>
                {/* <li className="nav-item">
                  <Link
                    className={`nav-link text-active-primary me-6 ${
                      location.pathname.endsWith("/applied-jobs")
                        ? "active"
                        : ""
                    }`}
                    to={`/recruiter-profile/${id}/applied-jobs`}
                  >
                    Applied Jobs
                  </Link>
                </li> */}
                <li className="nav-item">
                  <Link
                    className={`nav-link text-active-primary me-6 ${
                      location.pathname.endsWith("/interviews") ? "active" : ""
                    }`}
                    to={`/recruiter-profile/${id}/interviews`}
                  >
                    Interviews
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Content>
    </>
  );
};

export default RecruiterProfileHeader;
