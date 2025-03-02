import { useEffect, useRef, FC } from 'react';
import ApexCharts, { ApexOptions } from 'apexcharts';
import { useThemeMode } from '../../../../../../_metronic/partials/layout/theme-mode/ThemeModeProvider';
import { KTIcon } from '../../../../../../_metronic/helpers';
import { Dropdown1 } from '../../../../../../_metronic/partials';
import { getCSSVariableValue } from '../../../../../../_metronic/assets/ts/_utils';
// import { KTIcon, toAbsoluteUrl } from '../../../helpers';
// import { getCSSVariableValue } from '../../../assets/ts/_utils';
// import { Dropdown1 } from '../../content/dropdown/Dropdown1';
// import { useThemeMode } from '../../layout/theme-mode/ThemeModeProvider';

type Props = {
  className: string;
  chartColor: string;
  chartHeight: string;
};

const RecruiterPerformanceLineChart: FC<Props> = ({ className, chartColor, chartHeight }) => {
  const chartRef = useRef<HTMLDivElement | null>(null);
  const { mode } = useThemeMode();

  const refreshChart = () => {
    if (!chartRef.current) {
      return;
    }
    const chart = new ApexCharts(chartRef.current, chartOptions(chartColor, chartHeight));
    if (chart) {
      chart.render();
    }
    return chart;
  };

  useEffect(() => {
    const chart = refreshChart();
    return () => {
      if (chart) {
        chart.destroy();
      }
    };
  }, [chartRef, mode]);

  return (
    <div className={`card ${className}`}>
      <div className='card-header border-0 py-5'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='card-label fw-bold fs-3 mb-1'>Recruiter Performance Score</span>
          <span className='text-muted fw-semibold fs-7'>Performance trends over time</span>
        </h3>
        <div className='card-toolbar'>
          <button
            type='button'
            className='btn btn-sm btn-icon btn-color-primary btn-active-light-primary'
            data-kt-menu-trigger='click'
            data-kt-menu-placement='bottom-end'
            data-kt-menu-flip='top-end'
          >
            <KTIcon iconName='category' className='fs-2' />
          </button>
          <Dropdown1 />
        </div>
      </div>
      <div className='card-body d-flex flex-column'>
        <div ref={chartRef} className='mixed-widget-5-chart card-rounded-top'></div>
      </div>
    </div>
  );
};

const chartOptions = (chartColor: string, chartHeight: string): ApexOptions => {
  const labelColor = getCSSVariableValue('--bs-gray-800');
  const baseColor = getCSSVariableValue(`--bs-${chartColor}`) as string;

  return {
    series: [
      {
        name: 'Performance Score',
        data: [70, 75, 80, 78, 85, 90, 95],
      },
    ],
    chart: {
      type: 'line',
      height: chartHeight,
      toolbar: { show: false },
    },
    stroke: {
      curve: 'smooth',
      width: 3,
      colors: [baseColor],
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
      labels: { style: { colors: labelColor, fontSize: '12px' } },
    },
    yaxis: {
      labels: { style: { colors: labelColor, fontSize: '12px' } },
    },
    markers: {
      size: 5,
      colors: [baseColor],
      strokeColors: '#fff',
      strokeWidth: 2,
    },
    tooltip: {
      style: { fontSize: '12px' },
      y: {
        formatter: (val) => `${val}%`,
      },
    },
  };
};

export { RecruiterPerformanceLineChart };
