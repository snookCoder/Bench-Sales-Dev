import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import RecruiterProfileHeader from "./RecruiterProfileHeader";
import { InterviewListPageWrapper } from "../InterviewsListPage/InterviewsListPageWrapper";
import { CandidateListPageWrapper } from "../CandidatesListPage/CandidatesListPageWrapper";
import { getRecruitersByID } from "../../../../ApiRequests/RecruiterRequests";
import { IRecruiterList } from "../RecruitersListPage/Types/RecruiterListTypes";
import { Spinner } from "react-bootstrap";
import NoData from "../../../MyComponents/NoDataAvailable/NoData";
import FullPageSpinner from "../../../MyComponents/Spinner/FullPageSpinner";
import { Content } from "../../../../_metronic/layout/components/Content";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { AppliedJobsList } from "../AppliedJobsPage/Components/AppliedJobsList";
import { AppliedJobsListPageWrapper } from "../AppliedJobsPage/AppliedJobsListPageWrapper";

const RecruiterProfilePage = () => {
  const { id } = useParams<{ id: string }>();
  const [recruiter, setRecruiter] = useState<IRecruiterList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) {
      fetchRecruiterById(id);
    }
  }, [id]);

  const fetchRecruiterById = async (recruiterId: string) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Fetching Recruiter...");
      const response = await getRecruitersByID(recruiterId);
      console.log("API Response:", response);

      if (response?.success && response.payload) {
        setRecruiter(response.payload);
      } else {
        setError("Failed to load recruiter data.");
      }
    } catch (err: any) {
      console.error(
        "Error Fetching Recruiter:",
        err.response?.status,
        err.message
      );
      setError("Failed to load recruiter.");
    } finally {
      setLoading(false);
    }
  };

  // if (loading) {
  //   return (
  //     // <div className="text-center py-10">
  //     //   <Spinner animation="border" />
  //     // </div>
  //     <FullPageSpinner />
  //   );
  // }

  // if (error) {
  //   return (
  //     <>
  //       <Toolbar />
  //       <Content>
  //         <div className="card mb-5 mb-xl-10">
  //           <div className="card-body pt-9 pb-0">
  //             <NoData
  //               showRetry
  //               onRetry={() => {
  //                 fetchRecruiterById(id || "");
  //               }}
  //             />
  //           </div>
  //         </div>
  //       </Content>
  //     </>
  //   );
  // }

  return (
    <Routes>
      <Route
        element={
          <>
            <RecruiterProfileHeader
              recruiter={recruiter}
              loading={loading}
              error={error}
              FetchRecruiterById={() => fetchRecruiterById(id || "")}
            />
            <Outlet />
          </>
        }
      >
        <Route
          path="my-candidates"
          element={
            <CandidateListPageWrapper
              isProfilePage={true}
              recruiterId={id || ""}
              recruiter={recruiter}
            />
          }
        />
        <Route path="applied-jobs" element={<AppliedJobsListPageWrapper />} />
        <Route path="interviews" element={<InterviewListPageWrapper />} />
        <Route index element={<Navigate to="my-candidates" />} />
      </Route>
    </Routes>
  );
};

export default RecruiterProfilePage;
