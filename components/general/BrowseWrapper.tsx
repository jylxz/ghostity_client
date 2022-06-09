import { motion } from 'framer-motion';
import React from 'react'

export default function BrowseWrapper({children}: {children: React.ReactNode}) {
  return (
    <motion.div layoutScroll className="overflow-scroll h-[calc(100vh_-_3.8rem)] px-4 sm:px-14 py-7 flex flex-col">
      {children}
    </motion.div>
  );
}
