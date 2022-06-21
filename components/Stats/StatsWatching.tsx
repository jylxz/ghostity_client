import { Chart as ChartJS, ChartData, ChartOptions } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";

const options: ChartOptions<"line"> = {
  responsive: true,
  scales: {
    x: {
      ticks: {
        callback(val, index) {
          return index % 3 === 0 ? this.getLabelForValue(val as number) : "";
        },
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
    },
    title: {
      display: true,
      text: "Watching",
    },
    subtitle: {
      display: true,
      text: "Updates Every 10 Minutes",
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

          return `${label}: ${context.parsed.y} Weebs`;
        },
      },
    },
  },
};

const createGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 25, 0, 600);
  gradient.addColorStop(0, "#DEECFC");
  gradient.addColorStop(0.35, "#DEECFC80");
  gradient.addColorStop(1, "#DEECFC00");

  return gradient;
};

export default function StatsWatching({ stats }: { stats: WatchingStat[] }) {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });
  
  useEffect(() => {
    const watchingStats = stats.slice().reverse()
    const chart = chartRef.current;

    if (!chart || !stats) {
      return;
    }

    const data: ChartData<"line"> = {
      labels: watchingStats.map((stat) =>
        format(new Date(stat.createdAt), "p | MMM d")
      ),
      datasets: [
        {
          label: `Weebs (${watchingStats.slice(-1)[0].current_watching})`,
          data: watchingStats.map((stat) => stat.current_watching) || [0],
          borderColor: "#DEECFC",
          backgroundColor: createGradient(chart.ctx),
          pointBackgroundColor: "#DEECFC",
          lineTension: 0,
          fill: true,
          borderWidth: 2,
          pointRadius: 2,
        },
      ],
    };

    setChartData(data);
  }, [stats]);

  return (
    <Line ref={chartRef} options={options} data={chartData} height={600} />
  );
}
