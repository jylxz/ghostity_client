import { ChartOptions } from "chart.js";

const defaultChartOptions = (
  title: string,
  subtitle: string,
  tooltipLabel: string,
  isWindowSmall: boolean,
  theme: "light" | "dark" | undefined
) => {
  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          color: theme === "light" ? "black" : "#efefef",
          callback(val, index) {
            return index % 6 === 0 ? this.getLabelForValue(val as number) : "";
          },
          maxTicksLimit: isWindowSmall ? 8 : undefined,
        },
        grid: {
          display: false,
        },
      },
      y: {
        ticks: {
          color: theme === "light" ? "black" : "#efefef",
        },
        grid: {
          display: false,
        },
      },
    },
    layout: {
      padding: 20,
    },
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top" as const,
        labels: {
          color: theme === "light" ? "black" : "#efefef",
          font: {
            size: 13,
          },
        },
      },
      title: {
        color: theme === "light" ? "black" : "#DEECFC",
        display: true,
        text: title,
        font: {
          size: 20,
        },
        padding: {
          bottom: 0,
        },
      },
      subtitle: {
        display: true,
        color: theme === "light" ? "rgb(107 114 128)" : "#a1a1a1",
        text: subtitle,
        padding: {
          top: 2,
          bottom: 10,
        },
        font: {
          size: 14,
        },
      },
      tooltip: {
        mode: "index",
        intersect: false,
        position: "average",
        callbacks: {
          label(context) {
            let label = context.dataset.label || "";

            if (/\d/.test(label)) {
              label = label.replace(/[0-9]/g, "").replace(/\(|\)/g, "");
            }

            return `${label}: ${context.parsed.y} ${tooltipLabel}`;
          },
        },
      },
    },
  };

  return chartOptions;
};

export default defaultChartOptions;
