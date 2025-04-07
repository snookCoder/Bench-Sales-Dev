import { Navigate, Outlet, Route, Routes, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import CandidateProfileHeader from "./CandidateProfileHeader";
import { InterviewListPageWrapper } from "../InterviewsListPage/InterviewsListPageWrapper";
import { AppliedJobsListPageWrapper } from "../AppliedJobsPage/AppliedJobsListPageWrapper";
import { getCandidateByID } from "../../../../ApiRequests/CandidateRequest";
import { ICandidateList } from "../../../../Types/CandidatesInterface";

const CandidateProfilePage = () => {
  const { id: candidateId } = useParams<{ id: string }>();
  const [candidate, setCandidate] = useState<ICandidateList | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCandidate = async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCandidateByID(id);
      if (response?.data.success && response.data.payload) {
        setCandidate(response.data.payload);
      } else {
        setError("Failed to load candidate data.");
      }
    } catch (err: any) {
      console.error("Fetch Error:", err.message);
      setError("Failed to load candidate.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (candidateId) {
      fetchCandidate(candidateId);
    }
  }, [candidateId]);

  // Optional: Full page spinner during initial load
  // if (loading) return <FullPageSpinner />;

  // Optional: Error UI with retry
  // if (error) {
  //   return (
  //     <>
  //       <Toolbar />
  //       <Content>
  //         <div className="card mb-5 mb-xl-10">
  //           <div className="card-body pt-9 pb-0">
  //             <NoData
  //               showRetry
  //               onRetry={() => fetchCandidate(candidateId || "")}
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
            <CandidateProfileHeader
              candidate={candidate}
              loading={loading}
              error={error}
              fetchCandidate={() => fetchCandidate(candidateId || "")}
            />
            <Outlet />
          </>
        }
      >
        <Route
          path="interviews"
          element={<InterviewListPageWrapper candidate={candidate} />}
        />
        <Route
          path="applied-jobs"
          element={<AppliedJobsListPageWrapper candidate={candidate} />}
        />
        <Route index element={<Navigate to="interviews" />} />
      </Route>
    </Routes>
  );
};

export default CandidateProfilePage;
