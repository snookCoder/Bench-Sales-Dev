import { FC, useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";

interface Props {
  className?: string;
  chartHeight?: string;
}

const InterviewSuccessDoughnutChart: FC<Props> = ({ className, chartHeight = "350px" }) => {
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
          <span className="card-label fw-bold fs-3 mb-1">Interview Success Rate</span>
          <span className="text-muted fw-semibold fs-7">Pass vs Fail breakdown</span>
        </h3>
      </div>
      <div className="card-body d-flex flex-column">
        <div ref={chartRef} className="interview-success-doughnut-chart"></div>
      </div>
    </div>
  );
};

const getChartOptions = (chartHeight: string): ApexOptions => {
  return {
    series: [70, 30], // Example data: 70% pass, 30% fail
    chart: {
      type: "donut",
      height: chartHeight,
    },
    labels: ["Pass", "Fail"],
    colors: [
      getCSSVariableValue("--bs-success"),
      getCSSVariableValue("--bs-danger"),
    ],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${Number(val).toFixed(1)}%`,
    },
    legend: {
      position: "bottom",
    },
  };
};

export default InterviewSuccessDoughnutChart;
