import React, { useEffect, useRef, useState } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { useThemeMode } from "../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";
import { KTIcon } from "../../../../../../_metronic/helpers";
import { RecruiterFilter } from "../Filters/RecruitersFilter";
// import { RecruiterPerformanceFilter } from "./RecruiterPerformanceFilter";

const RecruiterPerformanceAreaChart = () => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();
  const [chartData, setChartData] = useState({
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    submissions: [150, 200, 180, 220],
    placements: [40, 80, 60, 90],
  });

  // Function to fetch & set chart data dynamically
  const fetchChartData = (filters: any) => {
    console.log("Fetching data for filters:", filters);
    let updatedData = {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      submissions: [120, 180, 160, 200],
      placements: [30, 70, 50, 80],
    };

    switch (filters.timeRange) {
      case "today":
        updatedData = {
          labels: ["9 AM", "12 PM", "3 PM", "6 PM"],
          submissions: [10, 30, 20, 40],
          placements: [5, 15, 10, 20],
        };
        break;
      case "this_week":
        updatedData = {
          labels: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
          submissions: [50, 70, 90, 110, 130],
          placements: [20, 30, 50, 60, 70],
        };
        break;
      case "this_month":
        updatedData = {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          submissions: [150, 200, 180, 220],
          placements: [40, 80, 60, 90],
        };
        break;
      default:
        updatedData = {
          labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
          submissions: [150, 200, 180, 220],
          placements: [40, 80, 60, 90],
        };
        break;
    }

    setChartData(updatedData);
  };

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new ApexCharts(chartRef.current, chartOptions(chartData));
    chart.render();

    return () => chart?.destroy();
  }, [chartRef, mode, chartData]);

  return (
    <div className="card">
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Recruiter Performance Overview
          </span>
          <span className="text-muted fw-semibold fs-7">
            Total Submissions vs Successful Placements Over Time
          </span>
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
          <RecruiterFilter applyFilters={fetchChartData} />
        </div>
      </div>
      <div className="card-body d-flex flex-column">
        <div
          ref={chartRef}
          className="mixed-widget-5-chart card-rounded-top"
        ></div>
      </div>
    </div>
  );
};

const chartOptions = (data: any): ApexOptions => ({
  series: [
    { name: "Total Submissions", data: data.submissions },
    { name: "Successful Placements", data: data.placements },
  ],
  chart: { type: "area", height: 350, toolbar: { show: false } },
  dataLabels: { enabled: false },
  stroke: { curve: "smooth", width: 2 },
  xaxis: { categories: data.labels },
  yaxis: { title: { text: "Number of Submissions/Placements" } },
  colors: [
    getCSSVariableValue("--bs-primary"),
    getCSSVariableValue("--bs-success"),
  ],
  fill: {
    type: "gradient",
    gradient: { shadeIntensity: 0.4, opacityFrom: 0.7, opacityTo: 0.3 },
  },
  legend: { position: "top" },
});

export default RecruiterPerformanceAreaChart;
