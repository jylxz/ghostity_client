import { motion } from "framer-motion";
import React from "react";

import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import VGhostityIcon from "@images/Ghostity-svg.svg";

import {
  buttonContainerVariant,
  buttonsVariant,
} from "../animations/HomeStatsAnimations";

export default function HomeStatsOptionsMenu({
  currentTab,
  setCurrentTab,
  currentWatching,
  currentLive, 
  currentTotal
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
  currentWatching: number;
  currentLive: number;
  currentTotal: number
}) {
  return (
    <motion.div
      variants={buttonContainerVariant}
      initial="initial"
      whileInView="animate"
      viewport={{ once: true }}
      className="flex justify-center gap-4 flex-wrap"
    >
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={buttonsVariant}
        onClick={() => setCurrentTab("watching")}
        className={`flex items-center gap-2 ${
          currentTab === "watching"
            ? "dark:bg-secondary-dark"
            : "dark:bg-text-secondary-dark"
        } bg-primary px-2 py-1.5 rounded shadow`}
      >
        <LiveTvOutlinedIcon className="w-6 h-6 dark:text-primary" />
        <span className="dark:text-primary flex items-center gap-1 font-medium">
          Watching{" "}
          <span className="text-sm dark:text-text-primary-dark text-gray-400 font-normal">{`(${currentWatching} Weebs)`}</span>
        </span>
      </motion.button>
      <motion.button
        variants={buttonsVariant}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setCurrentTab("live")}
        className={`flex items-center gap-2 bg-secondary px-2 py-1.5 rounded shadow ${
          currentTab === "live"
            ? "dark:bg-secondary-dark"
            : "dark:bg-text-secondary-dark"
        }`}
      >
        <CableOutlinedIcon className="w-6 h-6 dark:text-primary" />
        <span className="dark:text-primary flex items-center gap-1 font-medium">
          Live{" "}
          <span className="text-sm dark:text-text-primary-dark text-gray-400 font-normal">{`(${currentLive} Channels)`}</span>
        </span>
      </motion.button>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        variants={buttonsVariant}
        onClick={() => setCurrentTab("total")}
        className={`flex items-center gap-2 bg-secondary2 px-2 py-1.5 rounded shadow ${
          currentTab === "total"
            ? "dark:bg-secondary-dark"
            : "dark:bg-text-secondary-dark"
        }`}
      >
        <div className="w-6 h-6">
          <VGhostityIcon className="dark:fill-primary" />
        </div>
        <span className="dark:text-primary flex items-center gap-1 font-medium">
          Total{" "}
          <span className="text-sm dark:text-text-primary-dark text-gray-400 font-normal">{`(${currentTotal} V-Tubers)`}</span>
        </span>
      </motion.button>
    </motion.div>
  );
}
