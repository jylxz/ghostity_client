import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction } from "react";

export default function FollowingTabButton({
  tab,
  currentTab,
  setCurrentTab,
}: {
  tab: string;
  currentTab: string;
  setCurrentTab: Dispatch<SetStateAction<string>>;
}) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={() => setCurrentTab(tab)}
      className={`relative z-10 px-2 flex flex-col items-center ${tab === currentTab ? "text-black" : "text-gray-500"}`}
    >
      {tab}
      {tab === currentTab ? <motion.div layoutId="FollowingTabButtons" className="absolute bottom-0 w-full h-0.5 bg-black z-10"/> : null}
    </motion.button>
  );
}
