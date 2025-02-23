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
import { InterviewsList } from "./Components/InterviewsList";

const InterviewListPage = () => {
  // const { itemIdForUpdate } = useListView();
  return (
    <>
      {/* <Toolbar /> */}
      <Content>
        {/* <KTCard>
          <UsersListHeader />
          <UsersTable />
        </KTCard> */}
        {/* {itemIdForUpdate !== undefined && <UserEditModal />} */}
        <InterviewsList className="mb-5 mb-xl-8" />
        {/* end::Row */}
      </Content>
    </>
  );
};

const InterviewListPageWrapper = () => {
  const intl = useIntl();
  return (
    <>
      {/* <PageTitle
        breadcrumbs={[]}
        description="You can add and manage your Interviews here."
      >
        {intl.formatMessage({ id: "MENU.InterVIEWS" })}
      </PageTitle> */}
      <InterviewListPage />
    </>
  );
};

export { InterviewListPageWrapper };
