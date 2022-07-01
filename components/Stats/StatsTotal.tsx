import { Chart as ChartJS, ChartData, ChartOptions } from "chart.js";
import React, { useEffect, useRef, useState } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import useIsWindowSmall from "../../hooks/useIsWindowSmall";

const createGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 25, 0, 600);
  gradient.addColorStop(0, "#DEECFC");
  gradient.addColorStop(0.35, "#DEECFC80");
  gradient.addColorStop(1, "#DEECFC00");

  return gradient;
};

const createTwitchGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 25, 0, 600);
  gradient.addColorStop(0, "#6441a5");
  gradient.addColorStop(0.35, "#6441a580");
  gradient.addColorStop(1, "#6441a500");

  return gradient;
};

const createYoutubeGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 25, 0, 600);
  gradient.addColorStop(0, "#FF0000");
  gradient.addColorStop(0.35, "#FF000080");
  gradient.addColorStop(1, "#FF000000");

  return gradient;
};

export default function StatsTotal({
  stats,
  currentTab,
}: {
  stats?: TotalStat[];
  currentTab: string;
}) {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });
  const isWindowSmall = useIsWindowSmall();

  const options: ChartOptions<"line"> = {
    responsive: true,
    scales: {
      x: {
        ticks: {
          callback(val, index) {
            // eslint-disable-next-line react/no-this-in-sfc
            return index % 3 === 0 ? this.getLabelForValue(val as number) : "";
          },
          maxTicksLimit: isWindowSmall ? 8 : undefined,
        },
        grid: {
          display: false,
        },
      },
      y: {
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
          color: "black",
          font: {
            size: 13,
          },
        },
      },
      title: {
        color: "black",
        display: true,
        text: "Total V-Tubers (On Ghostity)",
        font: {
          size: 20,
        },
        padding: {
          bottom: 0,
        },
      },
      subtitle: {
        display: true,
        text: "Updates Every 30 Minutes",
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
        position: "nearest",
        callbacks: {
          label(context) {
            let label = context.dataset.label || "";

            if (/\d/.test(label)) {
              label = label.replace(/[0-9]/g, "").replace(/\(|\)/g, "");
            }

            return `${label}: ${context.parsed.y} V-Tubers`;
          },
        },
      },
    },
  };

  useEffect(() => {
    if (!stats) {
      return
    }

    const totalStats = stats.slice().reverse();
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const data: ChartData<"line"> = {
      labels: totalStats.map((stat) =>
        format(new Date(stat.createdAt), "p | MMM d")
      ),
      datasets: [
        {
          label: `V-Tubers (${totalStats.slice(-1)[0].current_total})`,
          data: totalStats.map((stat) => stat.current_total) || [0],
          borderColor: "#DEECFC",
          backgroundColor: createGradient(chart.ctx),
          pointBackgroundColor: "#DEECFC",
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
        },
        {
          label: `Youtube (${totalStats.slice(-1)[0].current_youtube})`,
          data: totalStats.map((stat) => stat.current_youtube) || [0],
          borderColor: "#FF0000",
          backgroundColor: createYoutubeGradient(chart.ctx),
          pointBackgroundColor: "#FF0000",
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
        },
        {
          label: `Twitch (${totalStats.slice(-1)[0].current_twitch})`,
          data: totalStats.map((stat) => stat.current_twitch) || [0],
          borderColor: "#6441a5",
          backgroundColor: createTwitchGradient(chart.ctx),
          pointBackgroundColor: "#6441a5",
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    };
    setChartData(data);
  }, [stats]);

  return currentTab === "total" ? <Line ref={chartRef} options={options} data={chartData} height={400} /> : null;
}
