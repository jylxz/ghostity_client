import { motion } from "framer-motion";
import React from "react";

export default function GridWrapper({
  children,
  colSize,
}: {
  children: React.ReactNode;
  colSize: "xsmall" | "small" | "normal";
}) {
  const column = {
    normal: `grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]`,
    small: "grid-cols-[repeat(auto-fill,_minmax(14rem,_1fr))]",
    xsmall: "grid-cols-[repeat(auto-fill,_minmax(11rem,_1fr))]",
  };

  return (
    <motion.div
      layout
      className={`grid grid-flow-row auto-rows-fr ${column[colSize]} gap-[clamp(1rem,_1.4rem,_1.8rem)] justify-items-center`}
    >
      {children}
    </motion.div>
  );
}
