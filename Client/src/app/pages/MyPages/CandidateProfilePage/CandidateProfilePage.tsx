import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import CandidateProfileHeader from "./CandidateProfileHeader";
import { InterviewListPageWrapper } from "../InterviewsListPage/InterviewsListPageWrapper";

const CandidateData = {
  id: 1,
  name: "John Doe",
  email: "john.doe@example.com",
  company: "TechCorp",
  location: "New York, USA",
  status: "Active",
  profilePicture: "/media/avatars/300-1.jpg",
  verified: true,
};

const CandidateProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          <CandidateProfileHeader Candidate={CandidateData} />
          <Outlet />
        </>
      }
    >
      <Route path="interviews" element={<InterviewListPageWrapper />} />
      <Route index element={<Navigate to="interviews" />} />
    </Route>
  </Routes>
);

export default CandidateProfilePage;
