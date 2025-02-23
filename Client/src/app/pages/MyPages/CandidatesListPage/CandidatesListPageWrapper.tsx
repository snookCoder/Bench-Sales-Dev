import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { TablesWidget11 } from "../../../../_metronic/partials/widgets";
import { KTCard } from "../../../../_metronic/helpers";
import { UsersListHeader } from "../../../modules/apps/user-management/users-list/components/header/UsersListHeader";
import { UsersTable } from "../../../modules/apps/user-management/users-list/table/UsersTable";
import { UserEditModal } from "../../../modules/apps/user-management/users-list/user-edit-modal/UserEditModal";
import { useListView } from "../../../modules/apps/user-management/users-list/core/ListViewProvider";
import { CandidatesList } from "./Components/CandidatesList";

const RecuiterListPage = ({ isProfilePage }: any) => {
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
        <CandidatesList className="mb-5 mb-xl-8" />
        {/* end::Row */}
      </Content>
    </>
  );
};

const CandidateListPageWrapper = ({ isProfilePage = false }: any) => {
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
      <RecuiterListPage isProfilePage={isProfilePage} />
    </>
  );
};

export { CandidateListPageWrapper };
