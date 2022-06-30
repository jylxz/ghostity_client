// Libraries
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import { Navigation, Mousewheel, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";

// Components
import LiveFollowingBarItem from "./LiveFollowingBarItem";

// Contexts
import UserFollowContext from "../../context/UserFollowContext";
import UserContext from "../../context/UserContext";

// Hooks
import useIsWindowSmall from "../../hooks/useIsWindowSmall";

// Swiper css
import "swiper/css";
import "swiper/css/navigation";

const containerVariant = {
  initial: {
    translateY: -100,
    opacity: 0,
  },
  animate: {
    translateY: 0,
    opacity: 1,
    transition: {
      delayChildren: 2
    }
  },
};

const childVariant = {
  initial: {
    translateY: -100,
    opacity: 0,
  },
  animate: (i: number) => ({
    translateY: 0,
    opacity: 1,
    transition: {
      delay: i * 0.3
    }
  }),
};


export default function LiveFollowingBar() {
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);
  const router = useRouter();
  const isWindowSmall = useIsWindowSmall();

  const showLiveFollowingBar = useMemo(
    () =>
      isWindowSmall &&
      !!user &&
      (router.route.includes("/browse") || router.route === "/search"),
    [user, router, isWindowSmall]
  );

  const channelIds: string[] | undefined = follows?.channels;

  const fetchStreams = ({ pageParam = 1 }) =>
    axios
      .post<Streams>(`https://api.ghostity.com/streams?page=${pageParam}`, {
        channelIds,
      })
      .then((res) => res.data);

  const streams = useInfiniteQuery<Streams, Error>(
    ["followStreams", channelIds],
    fetchStreams,
    {
      // refetchInterval: 180000,
      enabled: !!user?.uid && !!channelIds && !!showLiveFollowingBar,
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );
  return (
    <AnimatePresence exitBeforeEnter>
      {showLiveFollowingBar ? (
        <motion.div
          key="live-following-bar"
          variants={containerVariant}
          initial="initial"
          animate="animate"
          // initial={{  translateY: -100, opacity: 0 }}
          // animate={{  translateY: 0, opacity: 1 }}
          // exit={{  translateY: -100, opacity: 0 }}
          className={`${!showLiveFollowingBar ? "hidden" : "block" } px-3 h-20 w-full bg-slate-100 flex items-center`}
        >
          <Swiper
            modules={[Navigation, Mousewheel, FreeMode]}
            slidesPerView={
              streams.data && streams.data?.pages[0].results?.length < 5
                ? streams.data?.pages[0].results.length
                : 5
            }
            spaceBetween={12}
            freeMode
            mousewheel={{
              sensitivity: 1,
            }}
            className="overscroll-contain"
          >
            {streams.data?.pages[0].results.map((stream, i) => (
              <SwiperSlide key={stream._id}>
                <motion.div variants={childVariant} custom={i}>
                  <LiveFollowingBarItem stream={stream} />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
