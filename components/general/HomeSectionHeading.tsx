import React from 'react'
import {motion} from "framer-motion"

export default function HomeSectionHeading({heading}: {heading: string}) {
  return (
    <motion.h1
      initial={{ translateX: -300, opacity: 0 }}
      whileInView={{ translateX: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="dark:text-text-primary-dark text-2xl md:text-4xl mb-10"
    >
      {heading}
    </motion.h1>
  );
}
