import React from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  className,
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void
}) {
  return (
    <motion.button
      layout
      // whileHover={{ scale: 1.05 }}
      // whileTap={{ scale: 0.95 }}
      className={className}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
