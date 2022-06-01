import React from 'react'
import { motion } from 'framer-motion'

export default function PageAnimateWrapper({children}: {children: React.ReactNode}) {
  return (
    <motion.div
      // initial={{ opacity: 0 }}
      // animate={{ opacity: 1 }}
      // transition={{ easing: "easeIn", duration: 1 }}
      exit={{ opacity: 0 }}
      transition={{duration: 3}}
    >
      {children}
    </motion.div>
  );
}
