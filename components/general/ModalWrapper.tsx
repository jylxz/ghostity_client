import React from "react";
import { motion } from "framer-motion";

export default function ModelWrapper({
  children,
  onClick,
}: {
  children: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      role="menu"
      tabIndex={0}
      className="fixed bg-gray-600/[.6] top-0 left-0 z-50 h-full  w-full flex items-center justify-center overflow-y-hidden"
      onClick={onClick}
    >
      {children}
    </motion.div>
  );
}
