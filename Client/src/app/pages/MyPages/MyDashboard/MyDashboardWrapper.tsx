import { useIntl } from "react-intl";
import { PageTitle } from "../../../../_metronic/layout/core";
import { Toolbar } from "../../../../_metronic/layout/components/toolbar/Toolbar";
import { Content } from "../../../../_metronic/layout/components/Content";
import { TablesWidget11 } from "../../../../_metronic/partials/widgets";

const DashboardPage = () => (
  <>
    <Toolbar />
    <Content>
      {/* <TablesWidget11 className="mb-5 mb-xl-8" /> */}
      {/* end::Row */}
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
