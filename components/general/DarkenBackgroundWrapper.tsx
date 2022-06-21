import React, { Dispatch, SetStateAction } from "react";
import { motion } from "framer-motion";

export default function DarkenBackgroundWrapper({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick: () => void ;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="menu"
      tabIndex={0}
      className="fixed bg-gray-600/[.6] top-0 left-0 z-50 h-full w-full"
      onClick={onClick}
    >
      <motion.div onClick={(e) => e.stopPropagation()} className="">{children}</motion.div>
    </motion.div>
  );
}
