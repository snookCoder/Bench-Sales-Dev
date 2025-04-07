import { useIntl } from "react-intl";
import { Content } from "../../../../_metronic/layout/components/Content";
import { AppliedJobsList } from "./Components/AppliedJobsList";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";

const AppliedJobsListPage = ({ isProfilePage, candidate, recruiter }: any) => {
  // const { itemIdForUpdate } = useListView();
  return (
    <>
      {!isProfilePage && <Toolbar />}
      <Content>
        {/* <KTCard>
          <UsersListHeader />
          <UsersTable />
        </KTCard> */}
        {/* {itemIdForUpdate !== undefined && <UserEditModal />} */}
        <AppliedJobsList
          className="mb-5 mb-xl-8"
          selectedCandidate={candidate}
          recruiter={recruiter}
        />
        {/* end::Row */}
      </Content>
    </>
  );
};

const AppliedJobsListPageWrapper = ({
  isProfilePage = true,
  candidate,
  recruiter,
}: any) => {
  const intl = useIntl();
  return (
    <>
      {!isProfilePage && (
        <PageTitle
          breadcrumbs={[]}
          description="You can add and manage your applied jobs here."
        >
          {intl.formatMessage({ id: "MENU.APPLIEDJOBS" })}
        </PageTitle>
      )}
      <AppliedJobsListPage
        isProfilePage={isProfilePage}
        candidate={candidate}
        recruiter={recruiter}
      />
    </>
  );
};

export { AppliedJobsListPageWrapper };
