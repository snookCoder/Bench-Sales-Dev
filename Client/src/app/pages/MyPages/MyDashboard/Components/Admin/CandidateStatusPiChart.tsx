import { useEffect, useRef, FC } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";
import { Dropdown1 } from "../../../../../../_metronic/partials";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";
// import { getCSSVariableValue } from "../../../assets/ts/_utils";
// import { useThemeMode } from "../../layout/theme-mode/ThemeModeProvider";
// import { Dropdown1 } from "../../content/dropdown/Dropdown1";

type Props = {
  className?: string;
  chartHeight?: string;
};

const CandidateStatusPieChart: FC<Props> = ({ className, chartHeight = "250px" }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  const refreshChart = () => {
    if (!chartRef.current) return;

    const chart = new ApexCharts(chartRef.current, chartOptions(chartHeight));
    chart.render();

    return chart;
  };

  useEffect(() => {
    const chart = refreshChart();
    return () => {
      if (chart) chart.destroy();
    };
  }, [chartRef, mode]);

  return (
    <div className={`card ${className}`}>
      {/* Card Header */}
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Candidate Status Distribution</span>
          <span className="text-muted fw-semibold fs-7">Overview of candidates</span>
        </h3>
        <div className="card-toolbar">
          <Dropdown1 />
        </div>
      </div>
      {/* Card Body */}
      <div className="card-body d-flex flex-column">
        <div ref={chartRef} className="candidate-status-pie-chart"></div>
      </div>
    </div>
  );
};

// Chart Configuration
const chartOptions = (chartHeight: string): ApexOptions => {
  return {
    series: [45, 35, 20], // Example data (On Bench, Active, Placed)
    chart: {
      type: "pie",
      height: chartHeight,
    },
    labels: ["On Bench", "Active", "Placed"],
    colors: [
      getCSSVariableValue("--bs-danger"),
      getCSSVariableValue("--bs-primary"),
      getCSSVariableValue("--bs-success"),
    ],
    legend: {
      position: "bottom",
    },
    dataLabels: {
      enabled: true,
      formatter: (val) => `${Number(val).toFixed(1)}%`,
    },
  };
};

export { CandidateStatusPieChart };
