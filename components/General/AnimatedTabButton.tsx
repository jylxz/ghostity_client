import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";

export default function AnimatedTabButton({
  tab,
  currentTab,
  setCurrentTab,
  count,
  layoutId
}: {
  tab: string;
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
  count?: number;
  layoutId?: string;
}) {
  return (
    <motion.button
      // whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setCurrentTab(tab)}
      className={`relative z-10 px-2 flex flex-col items-center  ${
        tab === currentTab ? "dark:text-text-primary-dark text-black font-medium" : "dark:text-text-secondary-dark text-gray-500 font-normal"
      }`}
    >
      <div className="flex items-center gap-1">
        {tab}
        <span className="text-sm">
          {count ? `(${count})` : null}
        </span>
      </div>
      {tab === currentTab ? (
        <motion.div
          layoutId={layoutId ? `${layoutId}AnimatedTabButtons` : "AnimatedTabButton"}
          className="absolute bottom-0 w-full h-0.5 dark:bg-text-primary-dark bg-black z-10"
        />
      ) : null}
    </motion.button>
  );
}
