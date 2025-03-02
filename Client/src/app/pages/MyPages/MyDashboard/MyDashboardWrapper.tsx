import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { TablesWidget11 } from "../../../../_metronic/partials/widgets";
import RecruiterPerformanceBarChart from "./Components/Admin/RecruiterPerformanceBarChart";
import { RecruiterPerformanceLineChart } from "./Components/Admin/RecruiterPerformanceLineChart";
import { CandidateStatusPieChart } from "./Components/Admin/CandidateStatusPiChart";
import JobSubmissionsFunnelChart from "./Components/Admin/JobSubmissionFunnelChart";
import InterviewPerformanceBarChart from "./Components/Admin/InterviewPerformanceBarChart";
import RevenueTrackingLineChart from "./Components/Admin/RevenueTrackingLineChart";
import SubmissionsVsInterviewsChart from "./Components/Recruiter/SubmissionsVsInterviewsChart";
import InterviewSuccessDoughnutChart from "./Components/Recruiter/InterviewSuccessRateChart";
import PlacementRateLineChart from "./Components/Recruiter/PlacementRateChart";
import CandidateActivityTable from "./Components/Recruiter/CandidateActivityHeatmap";

const DashboardPage = () => (
  <>
    <Toolbar />
    <Content>
      <div className="row">
        {/* First Row */}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <RecruiterPerformanceBarChart />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <RecruiterPerformanceLineChart
            className="card-xxl-stretch mb-xl-3"
            chartColor="success"
            chartHeight="auto"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <CandidateStatusPieChart
            className="card-xxl-stretch mb-xl-3"
            chartHeight="400px"
          />
        </div>

        {/* Second Row */}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <JobSubmissionsFunnelChart
            className="card-xxl-stretch mb-xl-3"
            chartHeight="auto"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InterviewPerformanceBarChart
            className="card-xxl-stretch mb-xl-3"
            chartHeight="350px"
          />
        </div>
        {/* <div className="col-lg-6 col-md-6 col-sm-12">
          <RevenueTrackingLineChart
            className="card-xxl-stretch mb-xl-3"
            chartHeight="350px"
          />
        </div> */}
        <div className="col-lg-6 col-md-6 col-sm-12">
          <SubmissionsVsInterviewsChart
            className="card-xxl-stretch mb-xl-3"
            chartHeight="350px"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <InterviewSuccessDoughnutChart
            className="card-xxl-stretch mb-xl-3"
            chartHeight="350px"
          />
        </div>
        <div className="col-lg-6 col-md-6 col-sm-12">
          <PlacementRateLineChart
            className="card-xxl-stretch mb-xl-3"
            chartHeight="300px"
          />
        </div>
        {/* <div className="col-lg-6 col-md-6 col-sm-12">
          <CandidateActivityTable
            className="card-xxl-stretch mb-xl-3"
            chartHeight="350px"
          />
        </div> */}
      </div>
    </Content>
  </>
);

const DashboardWrapper = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle>
      <DashboardPage />
    </>
  );
};

export { DashboardWrapper };
