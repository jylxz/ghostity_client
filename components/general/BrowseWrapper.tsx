import { motion } from "framer-motion";
import React, { HTMLAttributes } from "react";

export default function BrowseWrapper({
  children,
  id,
}: {
  children: React.ReactNode;
  id?: HTMLAttributes<HTMLDivElement>["id"];
}) {
  return (
    <motion.div
      id={id}
      layoutScroll
      className="overflow-y-auto overflow-x-hidden sm:h-[calc(100vh_-_3.8rem)] px-6 sm:px-16 py-7 flex flex-col dark:bg-secondary-dark-2"
    >
      {children}
    </motion.div>
  );
}
