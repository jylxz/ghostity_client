import React, { useState, useEffect } from "react";
import { useQuery } from "react-query";
import API from "@services/api";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  SubTitle,
} from "chart.js";

import HomeStatsLive from "./HomeStatsLive";
import SectionWrapper from "../HomeSectionWrapper";
import HomeSectionHeading from "../HomeSectionHeading";
import HomeStatsWatching from "./HomeStatsWatching";
import HomeStatsTotal from "./HomeStatsTotal";
import HomeStatsTimeSettings from "./HomeStatsTimeSettings";
import HomeStatsOptionsMenu from "./HomeStatsOptionsMenu";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  SubTitle
);

ChartJS.defaults.font.family = "Quicksand";

export default function HomeStats() {
  const [currentTab, setCurrentTab] = useState("watching");
  const [time, setTime] = useState("1day");
  const [currentLive, setCurrentLive] = useState<number>(0);
  const [currentWatching, setCurrentWatching] = useState<number>(0);
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const fetchLiveStats = () =>
    API.get<LiveStat[]>(`/stats/live?time=${time}`).then((res) => res.data);
  const liveStats = useQuery<LiveStat[], Error>(
    `liveStats, ${time} ${currentTab}`,
    fetchLiveStats
  );

  const fetchWatchingStats = () =>
    API.get<WatchingStat[]>(`/stats/watching?time=${time}`).then(
      (res) => res.data
    );
  const watchingStats = useQuery<WatchingStat[], Error>(
    `watchingStats, ${time} ${currentTab}`,
    fetchWatchingStats
  );

  const fetchTotalStats = () =>
    API.get<TotalStat[]>(`/stats/total?time=${time}`).then((res) => res.data);
  const totalStats = useQuery<TotalStat[], Error>(
    `totalStats, ${time} ${currentTab}`,
    fetchTotalStats
  );

  useEffect(() => {
    if (watchingStats.data) {
      setCurrentWatching(watchingStats.data[0].current_watching);
    }

    if (liveStats.data) {
      setCurrentLive(liveStats.data[0].current_live);
    }

    if (totalStats.data) {
      setCurrentTotal(totalStats.data[0].current_total);
    }
  }, [watchingStats, liveStats, totalStats]);

  return (
    <SectionWrapper color="white">
      <HomeSectionHeading>vGhostity Stats</HomeSectionHeading>
      <HomeStatsTimeSettings time={time} setTime={setTime} />
      <div className="mx-auto select-none sm:max-w-[70rem]">
        <HomeStatsLive stats={liveStats.data} currentTab={currentTab} />
        <HomeStatsWatching stats={watchingStats.data} currentTab={currentTab} />
        <HomeStatsTotal stats={totalStats.data} currentTab={currentTab} />
      </div>
      <HomeStatsOptionsMenu
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentLive={currentLive}
        currentWatching={currentWatching}
        currentTotal={currentTotal}
      />
    </SectionWrapper>
  );
}
