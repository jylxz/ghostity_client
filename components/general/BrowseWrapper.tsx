import { motion } from 'framer-motion';
import React, { HTMLAttributes, useContext, useEffect, useRef, useState } from 'react'
import UserContext from '../../context/UserContext';
import UserFollowContext from '../../context/UserFollowContext';
import useIsWindowSmall from '../../hooks/useIsWindowSmall';

export default function BrowseWrapper({children, id}: {children: React.ReactNode, id?: HTMLAttributes<HTMLDivElement>["id"]}) {
  // const isWindowSmall = useIsWindowSmall()
  // const [wrapperId, setWrapperId] = useState<string>()
  const user = useContext(UserContext)
  const follows = useContext(UserFollowContext)

  // useEffect(() => {
  //   if (isWindowSmall) {
  //     setWrapperId("mobile-wrapper")
  //   } else {
  //     setWrapperId("browse-wrapper")
  //   }
  // }, [isWindowSmall])

  return (
    <motion.div id={id} layoutScroll className={`overflow-scroll sm:h-[calc(100vh_-_3.8rem)] px-4 sm:px-10 sm:py-7 flex flex-col ${user && follows?.channels?.length !== 0 ? "py-40" : "py-20"}`}>
      {children}
    </motion.div>
  );
}
