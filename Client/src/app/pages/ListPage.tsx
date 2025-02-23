import React from "react";
import { TablesWidget10 } from "../../_metronic/partials/widgets";
import { Content } from "../../_metronic/layout/components/Content";
import { PageTitle } from "../../_metronic/layout/core";
import { useIntl } from "react-intl";
import { Toolbar } from "../../_metronic/layout/components/toolbar/Toolbar";

export default function ListPage() {
//   const intl = useIntl();
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>
        {intl.formatMessage({ id: "MENU.DASHBOARD" })}
      </PageTitle> */}
      <Toolbar />
      <Content>
        <TablesWidget10 className="card-xxl-stretch mb-5 mb-xl-8" />
      </Content>
    </>
  );
}
