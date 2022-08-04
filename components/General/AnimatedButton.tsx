import React from "react";
import { motion } from "framer-motion";

export default function AnimatedButton({
  children,
  className,
  onClick,
  type = "button"
}: {
  children: React.ReactNode;
  type?: "submit" | "button"
  className?: string;
  onClick?: () => void | Promise<void>
}) {
  return (
    <motion.button
      layout
      type={type}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`${className || ""}`}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
}
