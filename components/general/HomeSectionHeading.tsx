import React from 'react'
import {motion} from "framer-motion"

export default function HomeSectionHeading({heading}: {heading: string}) {
  return (
    <motion.div
      initial={{ translateX: -300, opacity: 0 }}
      whileInView={{ translateX: 0, opacity: 1 }}
      viewport={{ once: true }}
      exit={{ translateX: -300, opacity: 0 }}
      transition={{ duration: 1 }}
      className="text-2xl md:text-4xl mb-10 font-thin"
    >
      {heading}
    </motion.div>
  );
}
