import React, { useState, useEffect } from "react";
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
  const [currentLive, setCurrentLive] = useState<number>(0)
  const [currentWatching, setCurrentWatching] = useState<number>(0);
  const [currentTotal, setCurrentTotal] = useState<number>(0);

  const API = process.env.NEXT_PUBLIC_API as string

  const fetchLiveStats = () =>
    axios
      .get<LiveStat[]>(`${API}/stats/live?time=${time}`)
      .then((res) => res.data);
  const liveStats = useQuery<LiveStat[], Error>(
    `liveStats, ${time} ${currentTab}`,
    fetchLiveStats
  );

  const fetchWatchingStats = () =>
    axios
      .get<WatchingStat[]>(
        `${API}/stats/watching?time=${time}`
      )
      .then((res) => res.data);
  const watchingStats = useQuery<WatchingStat[], Error>(
    `watchingStats, ${time} ${currentTab}`,
    fetchWatchingStats
  );

  const fetchTotalStats = () =>
    axios
      .get<TotalStat[]>(`${API}/stats/total?time=${time}`)
      .then((res) => res.data);
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
  }, [watchingStats, liveStats, totalStats])

  return (
    <SectionWrapper color="white" className="">
      <HomeSectionHeading heading="Ghostity Stats" />
      <div className="flex gap-2 text-sm justify-center sm:justify-end ">
        <AnimatedButton
          onClick={() => setTime("1day")}
          className={`px-2 py-0.5 rounded border-2 ${
            time === "1day"
              ? "text-black border-primary bg-white font-medium"
              : "text-gray-400 bg-gray-100 "
          }`}
        >
          1 Day
        </AnimatedButton>
        <AnimatedButton
          onClick={() => setTime("3day")}
          className={`px-2 py-0.5 rounded border-2 ${
            time === "3day"
              ? "text-black border-primary bg-white font-medium"
              : "text-gray-400 bg-gray-100"
          }`}
        >
          3 Day
        </AnimatedButton>
        <AnimatedButton
          onClick={() => setTime("week")}
          className={` px-2 py-0.5 rounded border-2 ${
            time === "week"
              ? "text-black border-primary bg-white font-medium"
              : "text-gray-400 bg-gray-100"
          }`}
        >
          Week
        </AnimatedButton>
        <AnimatedButton
          onClick={() => setTime("month")}
          className={`px-2 py-0.5 rounded border-2 ${
            time === "month"
              ? "text-black border-primary bg-white font-medium"
              : "text-gray-400 bg-gray-100 "
          }`}
        >
          Month
        </AnimatedButton>
      </div>
      <div className="select-none">
        <StatsLive stats={liveStats.data} currentTab={currentTab} />
        <StatsWatching stats={watchingStats.data} currentTab={currentTab} />
        <StatsTotal stats={totalStats.data} currentTab={currentTab} />
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
          <span className="flex items-center gap-1 font-medium">
            Watching{" "}
            <span className="text-sm text-gray-400 font-normal">{`(${currentWatching} Weebs)`}</span>
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
          <span className="flex items-center gap-1 font-medium">
            Live{" "}
            <span className="text-sm text-gray-400 font-normal">{`(${currentLive} Channels)`}</span>
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
          <span className="flex items-center gap-1 font-medium">
            Total{" "}
            <span className="text-sm text-gray-400 font-normal">{`(${currentTotal} V-Tubers)`}</span>
          </span>
        </motion.button>
      </motion.div>
    </SectionWrapper>
  );
}
