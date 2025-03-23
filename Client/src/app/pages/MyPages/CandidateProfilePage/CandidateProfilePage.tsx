import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import CandidateProfileHeader from "./CandidateProfileHeader";
import { InterviewListPageWrapper } from "../InterviewsListPage/InterviewsListPageWrapper";

const CandidateProfilePage = () => (
  <Routes>
    <Route
      element={
        <>
          <CandidateProfileHeader />
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
