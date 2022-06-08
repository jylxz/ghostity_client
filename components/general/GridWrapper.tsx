import { motion } from 'framer-motion';
import React from 'react'

export default function GridWrapper({children, colSize}: {children: React.ReactNode, colSize: string}) {
  const column = `grid-cols-[repeat(auto-fill,_minmax(${colSize},_1fr))]`;

  return (
    <motion.div layout className={`grid grid-flow-row auto-rows-fr ${column} gap-[clamp(1rem,_1.4rem,_1.8rem)] justify-items-center`}>
      {children}
    </motion.div>
  );
}
