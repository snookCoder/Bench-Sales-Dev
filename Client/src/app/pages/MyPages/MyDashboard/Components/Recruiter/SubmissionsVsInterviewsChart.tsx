import { FC, useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";

type Props = {
  className?: string;
  chartHeight?: string;
};

const SubmissionsVsInterviewsChart: FC<Props> = ({ className, chartHeight = "350px" }) => {
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
          <span className="card-label fw-bold fs-3 mb-1">Submissions vs Interviews vs Placements</span>
          <span className="text-muted fw-semibold fs-7">Comparison of recruiter performance</span>
        </h3>
      </div>
      <div className="card-body">
        <div ref={chartRef} className="submissions-vs-interviews-chart"></div>
      </div>
    </div>
  );
};

const getChartOptions = (chartHeight: string): ApexOptions => {
  return {
    series: [
      {
        name: "Submissions",
        data: [40, 60, 50, 80, 90],
      },
      {
        name: "Interviews",
        data: [30, 50, 40, 70, 80],
      },
      {
        name: "Placements",
        data: [10, 20, 15, 40, 50],
      },
    ],
    chart: {
      type: "bar",
      height: chartHeight,
      stacked: true,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 5,
      },
    },
    colors: [
      getCSSVariableValue("--bs-primary"),
      getCSSVariableValue("--bs-warning"),
      getCSSVariableValue("--bs-success"),
    ],
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May"],
    },
    tooltip: {
      enabled: true,
    },
  };
};

export default SubmissionsVsInterviewsChart;
