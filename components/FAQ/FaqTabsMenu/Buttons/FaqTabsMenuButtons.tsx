import AnimatedButton from '@general/AnimatedButton';
import { motion } from 'framer-motion';
import React from 'react'

export default function FaqTabsMenuButtons({
  currentTab,
  setCurrentTab,
}: {
  currentTab: string;
  setCurrentTab: React.Dispatch<React.SetStateAction<string>>;
}) {
  const itemAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <motion.div layout variants={itemAnimation} className="flex gap-3 text-sm">
      <AnimatedButton
        className={`${
          currentTab === "vtuber"
            ? "dark:bg-secondary-dark dark:text-primary bg-slate-100 text-black"
            : "dark:bg-text-secondary-dark bg-gray-100 text-gray-300"
        } py-1 px-2 rounded shadow`}
        onClick={() => setCurrentTab("vtuber")}
      >
        A Vtuber
      </AnimatedButton>
      <AnimatedButton
        className={`${
          currentTab === "user"
            ? "dark:bg-secondary-dark dark:text-primary bg-slate-100 text-black"
            : "dark:bg-text-secondary-dark bg-gray-100 text-gray-300"
        } py-1 px-2 rounded shadow`}
        onClick={() => setCurrentTab("user")}
      >
        A User
      </AnimatedButton>
      <AnimatedButton
        className={`${
          currentTab === "org"
            ? "dark:bg-secondary-dark dark:text-primary bg-slate-100 text-black"
            : "dark:bg-text-secondary-dark bg-gray-100  text-gray-300"
        } py-1 px-2 rounded shadow`}
        onClick={() => setCurrentTab("org")}
      >
        An Organization
      </AnimatedButton>
    </motion.div>
  );
}
