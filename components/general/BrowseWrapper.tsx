import { motion } from "framer-motion";
import React, { HTMLAttributes } from "react";

export default function BrowseWrapper({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: HTMLAttributes<HTMLDivElement>["id"];
}) {
  return (
    <motion.div
      id={id}
      layoutScroll
      className={`${
        className || ""
      } overflow-x-hidden sm:h-[calc(100vh_-_3.8rem)] px-4 sm:px-16 py-7 flex flex-col flex-1 dark:bg-secondary-dark-2`}
    >
      {children}
    </motion.div>
  );
}
