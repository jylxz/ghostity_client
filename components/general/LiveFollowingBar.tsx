// Libraries
import axios from "axios";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext, useEffect, useMemo, useState } from "react";
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

export default function LiveFollowingBar() {
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);
  const [disableBodyScroll, setDisableBodyScroll] = useState(false);
  const router = useRouter();
  const isWindowSmall = useIsWindowSmall();

  const showLiveFollowingBar = useMemo(
    () =>
      isWindowSmall &&
      !!user &&
      (router.route.includes("/browse") || router.route === "/search"),
    [user, router, isWindowSmall]
  );

  useEffect(() => {
    if (disableBodyScroll) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "scroll";
    }
  }, [disableBodyScroll]);

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
          initial={{ translateX: "100%" }}
          animate={{ translateX: 0 }}
          exit={{ translateX: "100%" }}
          className=" h-20 w-full bg-slate-100 flex items-center"
          onMouseEnter={() => setDisableBodyScroll(true)}
          onMouseLeave={() => setDisableBodyScroll(false)}
        >
          <Swiper
            modules={[Navigation, Mousewheel, FreeMode]}
            slidesPerView={
              streams.data && streams.data?.pages[0].results?.length < 5
                ? streams.data?.pages[0].results.length
                : 5
            }
            spaceBetween={10}
            freeMode
            mousewheel={{
              sensitivity: 1,
            }}
          >
            {streams.data?.pages[0].results.map((stream) => (
              <SwiperSlide key={stream._id}>
                <LiveFollowingBarItem stream={stream} />
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
