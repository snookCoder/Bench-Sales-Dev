import { useEffect, useRef, FC } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { Dropdown1 } from "../../../../../../_metronic/partials";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";

type Props = {
  className?: string;
  chartColor?: string;
  chartHeight?: string;
};

const RevenueTrackingLineChart: FC<Props> = ({
  className = "",
  chartColor = "success",
  chartHeight = "350px",
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  const renderChart = () => {
    if (!chartRef.current) return;

    const chart = new ApexCharts(chartRef.current, getChartOptions(chartColor, chartHeight));
    chart.render();
    return chart;
  };

  useEffect(() => {
    const chart = renderChart();
    return () => {
      if (chart) chart.destroy();
    };
  }, [mode]);

  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Revenue Tracking</span>
          <span className="text-muted fw-semibold fs-7">Monthly revenue overview</span>
        </h3>
        <div className="card-toolbar">
          <button
            type="button"
            className="btn btn-sm btn-icon btn-color-primary btn-active-light-primary"
            data-kt-menu-trigger="click"
            data-kt-menu-placement="bottom-end"
            data-kt-menu-flip="top-end"
          >
            <KTIcon iconName="category" className="fs-2" />
          </button>
          <Dropdown1 />
        </div>
      </div>

      <div className="card-body d-flex flex-column">
        <div ref={chartRef} className="mixed-widget-5-chart card-rounded-top"></div>
      </div>
    </div>
  );
};

const getChartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const baseColor = getCSSVariableValue(`--bs-${chartColor}`);

  return {
    series: [
      {
        name: "Revenue",
        data: [10000, 15000, 20000, 25000, 30000, 35000], // Example revenue data
      },
    ],
    chart: {
      type: "line",
      height: chartHeight,
      toolbar: { show: false },
    },
    stroke: {
      curve: "smooth",
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: { colors: labelColor, fontSize: "12px" },
      },
    },
    yaxis: {
      labels: {
        formatter: (val) => `$${val.toLocaleString()}`,
        style: { colors: labelColor, fontSize: "12px" },
      },
    },
    markers: {
      size: 5,
      colors: [baseColor],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    tooltip: {
      style: { fontSize: "12px" },
    },
  };
};

export default RevenueTrackingLineChart;
