import { FC, useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";
// import { getCSSVariableValue } from "../../../assets/ts/_utils";

type Props = {
  className?: string;
  chartHeight?: string;
};

const InterviewPerformanceBarChart: FC<Props> = ({ className, chartHeight = "350px" }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new ApexCharts(chartRef.current, getChartOptions(chartHeight));
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">Interview Performance</span>
          <span className="text-muted fw-semibold fs-7">Monthly interview outcomes</span>
        </h3>
      </div>

      <div className="card-body">
        <div ref={chartRef} className="interview-performance-bar-chart"></div>
      </div>
    </div>
  );
};

const getChartOptions = (chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");

  return {
    series: [
      {
        name: "Total Interviews",
        data: [40, 55, 60, 70, 80, 90], // Example data
      },
      {
        name: "Passed Interviews",
        data: [25, 40, 45, 50, 60, 70],
      },
      {
        name: "Failed Interviews",
        data: [15, 15, 15, 20, 20, 20],
      },
    ],
    chart: {
      type: "bar",
      height: chartHeight,
      stacked: true,
    },
    colors: [
      getCSSVariableValue("--bs-primary"),
      getCSSVariableValue("--bs-success"),
      getCSSVariableValue("--bs-danger"),
    ],
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
      labels: {
        style: {
          colors: labelColor,
        },
      },
    },
    legend: {
      position: "top",
    },
    tooltip: {
      enabled: true,
    },
  };
};

export default InterviewPerformanceBarChart;
