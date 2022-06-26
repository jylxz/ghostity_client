import React, { useState, useMemo } from "react";
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
import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";

import { useQuery } from "react-query";
import axios from "axios";
import { motion } from "framer-motion";
import StatsLive from "../Stats/StatsLive";
import SectionWrapper from "../general/SectionWrapper";
import HomeSectionHeading from "../general/HomeSectionHeading";
import StatsWatching from "../Stats/StatsWatching";
import StatsTotal from "../Stats/StatsTotal";
import AnimatedButton from "../general/AnimatedButton";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";
import { homeStatsAnimations } from "./animations/homeAnimations";
import GradientCircularProgress from "../general/GradientCircularProgress";

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

export default function HomeStats2() {
  const { buttonContainer, buttons } = homeStatsAnimations;
  const [currentTab, setCurrentTab] = useState("watching");
  const [time, setTime] = useState("1day");
  const fetchLiveStats = () =>
    axios
      .get<LiveStat[]>(`https://api.ghostity.com/stats/live?time=${time}`)
      .then((res) => res.data);
  const liveStats = useQuery<LiveStat[], Error>(
    `liveStats, ${time}`,
    fetchLiveStats
  );

  const fetchWatchingStats = () =>
    axios
      .get<WatchingStat[]>(
        `https://api.ghostity.com/stats/watching?time=${time}`
      )
      .then((res) => res.data);
  const watchingStats = useQuery<WatchingStat[], Error>(
    `watchingStats, ${time}`,
    fetchWatchingStats
  );

  const fetchTotalStats = () =>
    axios
      .get<TotalStat[]>(`https://api.ghostity.com/stats/total?time=${time}`)
      .then((res) => res.data);
  const totalStats = useQuery<TotalStat[], Error>(
    `totalStats, ${time}`,
    fetchTotalStats
  );

  const loading = useMemo(
    () => (!!liveStats.isLoading || !!watchingStats.isLoading || !!totalStats.isLoading),
    [liveStats, watchingStats, totalStats]
  );

  return (
    <SectionWrapper color="white">
      <HomeSectionHeading heading="Ghostity Stats" />
      <div className="flex gap-2 text-sm justify-end">
        <AnimatedButton
          onClick={() => setTime("1day")}
          className="bg-gray-100 px-2 py-0.5 rounded"
        >
          1 Day
        </AnimatedButton>
        <AnimatedButton
          onClick={() => setTime("3day")}
          className="bg-gray-100 px-2 py-0.5 rounded"
        >
          3 Day
        </AnimatedButton>
        <AnimatedButton
          onClick={() => setTime("week")}
          className="bg-gray-100 px-2 py-0.5 rounded"
        >
          Week
        </AnimatedButton>
        <AnimatedButton
          onClick={() => setTime("month")}
          className="bg-gray-100 px-2 py-0.5 rounded"
        >
          Month
        </AnimatedButton>
      </div>
      {liveStats.data && watchingStats.data && totalStats.data ? (
        <>
          <div className="select-none">
            {currentTab === "live" ? (
              <StatsLive stats={liveStats.data} />
            ) : null}
            {currentTab === "watching" ? (
              <StatsWatching stats={watchingStats.data} />
            ) : null}
            {currentTab === "total" ? (
              <StatsTotal stats={totalStats.data} />
            ) : null}
          </div>
          <motion.div
            variants={buttonContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex justify-center gap-4 flex-wrap"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={buttons}
              onClick={() => setCurrentTab("watching")}
              className="flex items-center gap-2 bg-primary px-2 py-1.5 rounded"
            >
              <LiveTvOutlinedIcon className="w-6 h-6" />
              <span className="flex items-center gap-1">
                Watching{" "}
                <span className="text-sm text-gray-400">{`(${watchingStats?.data[0].current_watching} Weebs)`}</span>
              </span>
            </motion.button>
            <motion.button
              variants={buttons}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setCurrentTab("live")}
              className="flex items-center gap-2 bg-secondary px-2 py-1.5 rounded"
            >
              <CableOutlinedIcon className="w-6 h-6" />
              <span className="flex items-center gap-1">
                Live{" "}
                <span className="text-sm text-gray-400">{`(${liveStats?.data[0].current_live} Channels)`}</span>
              </span>
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              variants={buttons}
              onClick={() => setCurrentTab("total")}
              className="flex items-center gap-2 bg-secondary2 px-2 py-1.5 rounded"
            >
              <div className="w-6 h-6">
                <GhostityIcon />
              </div>
              <span className="flex items-center gap-1">
                Total{" "}
                <span className="text-sm text-gray-400">{`(${totalStats?.data[0].current_total} V-Tubers)`}</span>
              </span>
            </motion.button>
          </motion.div>
        </>
      ) : null}
    </SectionWrapper>
  );
}
