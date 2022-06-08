import { motion } from 'framer-motion';
import React from 'react'

export default function GridWrapper({children}: {children: React.ReactNode}) {
  return (
    <motion.div layout className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(17rem,_1fr))] gap-[clamp(1rem,_1.4rem,_1.8rem)] justify-items-center">
      {children}
    </motion.div>
  );
}
