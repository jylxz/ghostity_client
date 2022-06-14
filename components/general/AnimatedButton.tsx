import React from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <motion.button
      layout
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={className}
    >
      {children}
    </motion.button>
  );
}
