import { FC, useEffect, useRef } from "react";
import ApexCharts, { ApexOptions } from "apexcharts";
import { getCSSVariableValue } from "../../../../../../_metronic/assets/ts/_utils";
// import { getCSSVariableValue } from "../../../assets/ts/_utils";

type Props = {
  className?: string;
  chartHeight?: string;
};

const JobSubmissionsFunnelChart: FC<Props> = ({
  className,
  chartHeight = "350px",
}) => {
  const chartRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!chartRef.current) return;

    const chart = new ApexCharts(
      chartRef.current,
      getChartOptions(chartHeight)
    );
    chart.render();

    return () => {
      chart.destroy();
    };
  }, []);

  return (
    <div className={`card ${className}`}>
      <div className="card-header border-0 py-5">
        <h3 className="card-title align-items-start flex-column">
          <span className="card-label fw-bold fs-3 mb-1">
            Job Submissions Progress
          </span>
          <span className="text-muted fw-semibold fs-7">Funnel breakdown</span>
        </h3>
      </div>

      <div className="card-body">
        <div ref={chartRef} className="job-submissions-funnel-chart"></div>
      </div>
    </div>
  );
};

const getChartOptions = (chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue("--bs-gray-800");

  return {
    series: [
      {
        name: "Candidates",
        data: [300, 200, 120, 50], // Example numbers (change as needed)
      },
    ],
    chart: {
      type: "bar",
      height: chartHeight,
    },
    plotOptions: {
      bar: {
        horizontal: true,
        distributed: true,
        borderRadius: 5,
        barHeight: "50%",
      },
    },
    colors: [
      getCSSVariableValue("--bs-primary"),
      getCSSVariableValue("--bs-warning"),
      getCSSVariableValue("--bs-success"),
      getCSSVariableValue("--bs-danger"),
    ],
    dataLabels: {
      enabled: true,
      formatter: (val) => `${val} candidates`,
      style: {
        fontSize: "12px",
        colors: [labelColor],
      },
    },
    xaxis: {
      categories: ["Submitted", "Interview Scheduled", "Offered", "Rejected"],
      labels: {
        style: {
          colors: labelColor,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  };
};

export default JobSubmissionsFunnelChart;
