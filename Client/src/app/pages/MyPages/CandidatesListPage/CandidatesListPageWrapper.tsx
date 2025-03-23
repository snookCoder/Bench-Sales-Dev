import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { CandidatesList } from "./Components/CandidatesList";

const CandidateListPage = ({ isProfilePage, recruiterId, recruiter }: any) => {
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
        <CandidatesList recruiterId={recruiterId} recruiter={recruiter} />
        {/* end::Row */}
      </Content>
    </>
  );
};

const CandidateListPageWrapper = ({
  isProfilePage = false,
  recruiterId,
  recruiter = null,
}: any) => {
  const intl = useIntl();
  return (
    <>
      {!isProfilePage && (
        <PageTitle
          breadcrumbs={[]}
          description="You can add and manage your Candidates here."
        >
          {intl.formatMessage({ id: "MENU.CANDIDATELIST" })}
        </PageTitle>
      )}
      <CandidateListPage
        isProfilePage={isProfilePage}
        recruiterId={recruiterId}
        recruiter={recruiter}
      />
    </>
  );
};

export { CandidateListPageWrapper };
