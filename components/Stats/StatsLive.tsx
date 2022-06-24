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
          return index % 6 === 0 ? this.getLabelForValue(val as number) : "";
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
      text: "Live Channels",
    },
    subtitle: {
      display:true,
      text: "Updates Every 10 Minutes"
    },
    tooltip: {
      mode: "index",
      intersect: false,
      position: "nearest",
      callbacks: {
        label(context) {
          let label = context.dataset.label || ""

          if (/\d/.test(label)) {
            label = label.replace(/[0-9]/g, "").replace(/\(|\)/g, "");
          }

          return `${label}: ${context.parsed.y} Channels`
        }
      }
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

export default function StatsLive({ stats }: { stats: LiveStat[] }) {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });

  useEffect(() => {
    const liveStats = stats.slice().reverse()
    const chart = chartRef.current;

    if (!chart) {
      return;
    }

    const data: ChartData<"line"> = {
      labels: liveStats.map((stat) =>
        format(new Date(stat.createdAt), "p | MMM d")
      ),
      datasets: [
        {
          label: `Live Channels (${liveStats.slice(-1)[0].current_live})`,
          data: liveStats.map((stat) => stat.current_live) || [0],
          borderColor: "#DEECFC",
          backgroundColor: createGradient(chart.ctx),
          pointBackgroundColor: "#DEECFC",
          // lineTension: 0,
          fill: true,
          borderWidth: 2,
          pointRadius: 2,
        } ,
        {
          label: `Youtube (${liveStats.slice(-1)[0].current_youtube_live})`,
          data: liveStats.map((stat) => stat.current_youtube_live) || [0],
          borderColor: "#FF0000",
          backgroundColor: createYoutubeGradient(chart.ctx),
          pointBackgroundColor: "#FF0000",
          // lineTension: 0,
          fill: true,
          borderWidth: 2,
          pointRadius: 2,
        },
        {
          label: `Twitch (${liveStats.slice(-1)[0].current_twitch_live})`,
          data: liveStats.map((stat) => stat.current_twitch_live) || [0],
          borderColor: "#6441a5",
          backgroundColor: createTwitchGradient(chart.ctx),
          pointBackgroundColor: "#6441a5",
          // lineTension: 0,
          fill: true,
          borderWidth: 2,
          pointRadius: 2,
        },
      ],
    };

    setChartData(data);
  }, [stats]);

  return <Line ref={chartRef} options={options} data={chartData} height={600} />;
}
