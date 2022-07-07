import { Chart as ChartJS, ChartData, ChartOptions } from "chart.js";
import React, { useEffect, useRef, useState, useContext } from "react";
import { Line } from "react-chartjs-2";
import { format } from "date-fns";
import useIsWindowSmall from "../../hooks/useIsWindowSmall";
import ThemeContext from "../../context/ThemeContext";
import defaultChartOptions from "./defaultChartOptions";

const createGradient = (ctx: CanvasRenderingContext2D) => {
  const gradient = ctx.createLinearGradient(0, 25, 0, 600);
  gradient.addColorStop(0, "#DEECFC");
  gradient.addColorStop(0.35, "#DEECFC80");
  gradient.addColorStop(1, "#DEECFC00");

  return gradient;
};

export default function StatsWatching({
  stats,
  currentTab,
}: {
  stats?: WatchingStat[];
  currentTab: string;
}) {
  const chartRef = useRef<ChartJS<"line">>(null);
  const [chartData, setChartData] = useState<ChartData<"line">>({
    datasets: [],
  });
  const theme = useContext(ThemeContext);
  const isWindowSmall = useIsWindowSmall();
  const [chartOptions, setChartOptions] = useState<ChartOptions<"line">>(
    defaultChartOptions(
      "Watching",
      "Updates Every 10 Mins",
      "Weebs",
      isWindowSmall,
      theme
    )
  );

  useEffect(() => {
    if (!stats) {
      return;
    }

    setChartOptions(
      defaultChartOptions(
        "Watching",
        "Updates Every 10 Mins",
        "Weebs",
        isWindowSmall,
        theme
      )
    );

    const watchingStats = stats.slice().reverse();
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
          // lineTension: 0,
          fill: true,
          borderWidth: 2,
          pointRadius: 0,
        },
      ],
    };

    setChartData(data);
  }, [stats, theme]);

  return currentTab === "watching" ? (
    <Line ref={chartRef} options={chartOptions} data={chartData} height={400} />
  ) : null;
}
