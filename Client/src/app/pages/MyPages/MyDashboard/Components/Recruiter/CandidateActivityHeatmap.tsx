import { FC, useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";
import { useThemeMode } from "../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";

// Props type
interface Props {
  className?: string;
  chartHeight?: string;
}

const CandidateActivityHeatmap: FC<Props> = ({ className, chartHeight = "350px" }) => {
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
          <span className="card-label fw-bold fs-3 mb-1">Candidate Activity</span>
          <span className="text-muted fw-semibold fs-7">Heatmap of candidate engagement</span>
        </h3>
      </div>
      <div className="card-body">
        <div ref={chartRef} className="candidate-activity-heatmap"></div>
      </div>
    </div>
  );
};

const getChartOptions = (chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");
  const baseColor = getCSSVariableValue("--bs-primary");

  return {
    series: [
      {
        name: "Activity Level",
        data: [
          { x: "Mon", y: 10 },
          { x: "Tue", y: 20 },
          { x: "Wed", y: 15 },
          { x: "Thu", y: 30 },
          { x: "Fri", y: 25 },
          { x: "Sat", y: 5 },
          { x: "Sun", y: 12 },
        ],
      },
    ],
    chart: {
      type: "heatmap",
      height: chartHeight,
      toolbar: { show: false },
    },
    dataLabels: { enabled: false },
    colors: [baseColor],
    xaxis: {
      labels: { style: { colors: labelColor } },
    },
    yaxis: {
      labels: { style: { colors: labelColor } },
    },
    tooltip: {
      y: {
        formatter: (val) => `${val} interactions`,
      },
    },
  };
};

export default CandidateActivityHeatmap;
