import { motion, MotionProps } from "framer-motion";
import React from "react";

interface Grid extends MotionProps {
  animateGrid?: boolean;
  children: React.ReactNode;
  colSize: "xsmall" | "small" | "normal" | "xxsmall";
}

export default function GridWrapper({
  children,
  colSize,
  animateGrid = true,
  ...props
}: Grid) {
  const column = {
    normal: `grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))]`,
    small: "grid-cols-[repeat(auto-fill,_minmax(14rem,_1fr))]",
    xsmall: "grid-cols-[repeat(auto-fill,_minmax(12rem,_1fr))]",
    xxsmall: "grid-cols-[repeat(auto-fill,_minmax(10rem,_1fr))]",
  };

  return (
    <motion.div
      {...props}
      layout="size"
      initial={animateGrid ? { opacity: 0 } : undefined}
      animate={
        animateGrid
          ? {
              opacity: 1,
              transition: {
                delay: 1.1,
              },
            }
          : undefined
      }
      className={`grid grid-flow-row auto-rows-fr ${column[colSize]} gap-[clamp(1rem,_1.4rem,_1.8rem)] justify-items-center`}
    >
      {children}
    </motion.div>
  );
}
