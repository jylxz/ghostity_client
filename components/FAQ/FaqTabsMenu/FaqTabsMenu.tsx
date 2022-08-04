import React from 'react'
import { motion } from "framer-motion";
import FaqTabsMenuButtons from "./Buttons";

export default function FaqTabsMenu({currentTab, setCurrentTab}: {currentTab: string,  setCurrentTab: React.Dispatch<React.SetStateAction<string>>}) {
  const containerAnimation = {
    animate: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.6,
      },
    },
  };

  const itemAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };

  return (
    <motion.div
      layout="position"
      className="dark:text-text-primary-dark flex flex-col w-full justify-center items-center gap-4 mb-4"
      variants={containerAnimation}
      initial="initial"
      animate="animate"
    >
      <motion.h2
        layout
        variants={itemAnimation}
        className="text-2xl text-center"
      >
        Welcome to the vGhostity FAQ page!
      </motion.h2>
      <motion.h3 layout variants={itemAnimation} className="text-center">
        I am ...
      </motion.h3>
      <FaqTabsMenuButtons currentTab={currentTab} setCurrentTab={setCurrentTab}/> 
    </motion.div>
  );
}
