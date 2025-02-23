import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { RecruitersList } from "./Components/RecruitersList";

const RecuiterListPage = () => {
  // const { itemIdForUpdate } = useListView();
  return (
    <>
      <Toolbar />
      <Content>
        {/* <KTCard>
          <UsersListHeader />
          <UsersTable />
        </KTCard> */}
        {/* {itemIdForUpdate !== undefined && <UserEditModal />} */}
        <RecruitersList className="mb-5 mb-xl-8" />
        {/* end::Row */}
      </Content>
    </>
  );
};

const RecruiterListPageWrapper = () => {
  const intl = useIntl();
  return (
    <>
      <PageTitle
        breadcrumbs={[]}
        description="You can manage your recruiters here."
      >
        {intl.formatMessage({ id: "MENU.RECRUITERLIST" })}
      </PageTitle>
      <RecuiterListPage />
    </>
  );
};

export { RecruiterListPageWrapper };
