import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import RecruiterProfileHeader from "./RecruiterProfileHeader";
import { InterviewListPageWrapper } from "../InterviewsListPage/InterviewsListPageWrapper";
import { CandidateListPageWrapper } from "../CandidatesListPage/CandidatesListPageWrapper";
// import my-candidates from "./my-candidates";
// import AppliedJobs from "./AppliedJobs";
// import Interviews from "./Interviews";

const recruiterData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  company: "TechCorp",
  location: "New York, USA",
  status: "Active",
  profilePicture: "/media/avatars/300-1.jpg",
  verified: true,
};

const RecruiterProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          <RecruiterProfileHeader recruiter={recruiterData} />
          <Outlet />
        </>
      }
    >
      <Route
        path="my-candidates"
        element={<CandidateListPageWrapper isProfilePage={true} />}
      />
      <Route path="applied-jobs" element={<AppliedJobs />} />
      <Route path="interviews" element={<InterviewListPageWrapper />} />
      <Route index element={<Navigate to="my-candidates" />} />
    </Route>
  </Routes>
);

export default RecruiterProfilePage;

const AppliedJobs: React.FC = () => {
  return (
    <div className="card p-5">
      <h2>Applied Jobs</h2>
      <p>Jobs applied by my-candidates.</p>
    </div>
  );
};
