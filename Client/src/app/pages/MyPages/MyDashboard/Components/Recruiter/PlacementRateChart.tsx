import { FC, useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";

// Props definition
type Props = {
  className?: string;
  chartHeight?: string;
};

const PlacementRateLineChart: FC<Props> = ({ className, chartHeight = "350px" }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new ApexCharts(chartRef.current, getChartOptions(chartHeight));
    chart.render();

    return () => {
      chart.destroy();
    };
  }, [mode]);

  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Placement Rate</span>
          <span className="text-muted fw-semibold fs-7">Track placements over time</span>
        </h3>
      </div>
      <div className="card-body">
        <div ref={chartRef} className="placement-rate-line-chart"></div>
      </div>
    </div>
  );
};

const getChartOptions = (chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const lineColor = getCSSVariableValue("--bs-primary");

  return {
    series: [
      {
        name: "Placements",
        data: [5, 10, 15, 12, 20, 25, 30],
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
      colors: [lineColor],
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
      labels: { style: { colors: labelColor, fontSize: "12px" } },
    },
    yaxis: {
      labels: { style: { colors: labelColor, fontSize: "12px" } },
    },
    markers: {
      size: 5,
      colors: [lineColor],
      strokeColors: "#fff",
      strokeWidth: 2,
    },
    tooltip: {
      style: { fontSize: "12px" },
      y: {
        formatter: (val) => `${val} placements`,
      },
    },
  };
};

export default PlacementRateLineChart;
