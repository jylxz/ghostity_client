import { motion } from 'framer-motion';
import React, { useContext } from 'react'
import UserContext from '../../context/UserContext';
import UserFollowContext from '../../context/UserFollowContext';

export default function BrowseWrapper({children}: {children: React.ReactNode}) {
  const user = useContext(UserContext)
  const follows = useContext(UserFollowContext)

  return (
    <motion.div layoutScroll className={`overflow-scroll sm:h-[calc(100vh_-_3.8rem)] px-4 sm:px-10 sm:py-7 flex flex-col ${user && follows?.channels?.length !== 0 ? "py-40" : "py-20"}`}>
      {children}
    </motion.div>
  );
}
