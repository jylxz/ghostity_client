// Libraries
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useMemo } from "react";
import { useInfiniteQuery } from "react-query";
import { Navigation, Mousewheel, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useRouter } from "next/router";
import { BsArrowRightShort } from "react-icons/bs";

// Components
import LiveFollowingBarItem from "./LiveFollowingBarItem";
import LinkTo from "../General/LinkTo";

// Contexts
import UserFollowContext from "../../contexts/UserFollowContext";
import UserContext from "../../contexts/UserContext";

// Hooks
import useIsWindowSmall from "../../hooks/useIsWindowSmall/useIsWindowSmall";

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
      delayChildren: 2,
    },
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
      delay: i * 0.3,
    },
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

  const API = process.env.NEXT_PUBLIC_API as string;

  const fetchStreams = ({ pageParam = 1 }) =>
    axios
      .post<Streams>(`${API}/streams?page=${pageParam}`, {
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
          className={`${
            !showLiveFollowingBar ? "hidden" : "block"
          } px-3 h-20 w-full dark:bg-secondary-dark bg-slate-100 flex items-center`}
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
            {streams.data?.pages[0].results.slice(0, 30).map((stream, i) => (
              <SwiperSlide key={stream._id}>
                <motion.div variants={childVariant} custom={i}>
                  <LiveFollowingBarItem stream={stream} />
                </motion.div>
              </SwiperSlide>
            ))}
            {streams.data && streams.data.pages[0].results.length > 30 ? (
              <SwiperSlide>
                <LinkTo href="/browse/following">
                  <motion.button
                    variants={childVariant}
                    className="flex flex-col items-center justify-center max-w-[5rem] relative mx-auto mt-1.5"
                  >
                    <BsArrowRightShort size={40} />
                    <span className="text-gray-500 text-xs">View More</span>
                  </motion.button>
                </LinkTo>
              </SwiperSlide>
            ) : null}
          </Swiper>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
