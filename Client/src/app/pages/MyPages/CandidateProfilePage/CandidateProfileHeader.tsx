import React from "react";
import { Link, useLocation, useParams } from "react-router-dom";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { KTIcon, toAbsoluteUrl } from "../../../../_metronic/helpers";

interface CandidateProfileProps {
  Candidate: {
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

const CandidateProfileHeader: React.FC<CandidateProfileProps> = ({
  Candidate,
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
              <div className="me-7 mb-4">
                <div className="symbol symbol-100px symbol-lg-160px symbol-fixed position-relative">
                  <img
                    src={toAbsoluteUrl(Candidate.profilePicture)}
                    alt={Candidate.name}
                  />
                  <div
                    className={`position-absolute translate-middle bottom-0 start-100 mb-6 rounded-circle border border-4 border-white h-20px w-20px 
                  ${
                    Candidate.status === "Active" ? "bg-success" : "bg-danger"
                  }`}
                  ></div>
                </div>
              </div>

              <div className="flex-grow-1">
                <div className="d-flex justify-content-between align-items-start flex-wrap mb-2">
                  <div className="d-flex flex-column">
                    <div className="d-flex align-items-center mb-2">
                      <a
                        href="#"
                        className="text-gray-800 text-hover-primary fs-2 fw-bolder me-1"
                      >
                        {Candidate.name}
                      </a>
                      {Candidate.verified && (
                        <KTIcon
                          iconName="verify"
                          className="fs-1 text-primary"
                        />
                      )}
                    </div>

                    <div className="d-flex flex-wrap fw-bold fs-6 mb-4 pe-2">
                      <span className="d-flex align-items-center text-gray-500 me-5 mb-2">
                        <KTIcon
                          iconName="profile-circle"
                          className="fs-4 me-1"
                        />
                        {Candidate.company}
                      </span>
                      <span className="d-flex align-items-center text-gray-500 me-5 mb-2">
                        <KTIcon iconName="geolocation" className="fs-4 me-1" />
                        {Candidate.location}
                      </span>
                      <span className="d-flex align-items-center text-gray-500 mb-2">
                        <KTIcon iconName="sms" className="fs-4 me-1" />
                        {Candidate.email}
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
                      location.pathname.includes("/interviews") ? "active" : ""
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

export default CandidateProfileHeader;
