// Libraries
import React, { Fragment, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { AnimatePresence, motion } from "framer-motion";
import { Navigation } from "swiper";
import { useInView } from "react-intersection-observer";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
import SearchHeading from "./SearchHeading";
import LivestreamCard from "../General/LivestreamCard";
import GridWrapper from "../General/GridWrapper";
import GradientCircularProgress from "../General/GradientCircularProgress";

// Hooks
import useHandleCollapseAndExpand from "./hooks/useHandleCollapseAndExpand";
import useResponseSlides from "./hooks/useResponseSlides";
import useInfiniteSearch from "./hooks/useInfiniteSearch";
import { ShowResultsOptions } from "./hooks/useHandleShowResults";

export default function SearchStream({
  streams,
  query,
  show,
  currentlyShowing,
  setShow,
  width,
}: {
  streams: SearchItem<Stream>;
  query: string;
  show: boolean;
  currentlyShowing: ShowResultsOptions;
  setShow: React.Dispatch<React.SetStateAction<ShowResultsOptions>>;
  width: number | undefined;
}) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const slides = useResponseSlides(width);
  const { ref, inView } = useInView();

  const { expand, handleExpand, handleCollapse } = useHandleCollapseAndExpand(
    "streams",
    currentlyShowing,
    setShow
  );
  const moreStreams = useInfiniteSearch<Streams>(query, "streams");

  useEffect(() => {
    if (inView) {
      moreStreams.fetchNextPage().catch(() => {});
    }
  }, [inView]);

  return (
    <AnimatePresence exitBeforeEnter>
      {streams.total === 0 || !show ? null : (
        <motion.div
          layout
          initial={{ opacity: 0, translateY: -100 }}
          animate={{
            opacity: 1,
            translateY: 0,
            transition: {
              duration: 0.3,
            },
          }}
          exit={
            !expand
              ? {
                  opacity: 0,
                  translateY: -200,
                  transition: {
                    duration: 0.2,
                  },
                }
              : {
                  opacity: 0,
                }
          }
        >
          <SearchHeading
            heading="Streams"
            total={streams.total}
            more={streams.more}
            expand={expand}
            handleExpand={handleExpand}
            handleCollapse={handleCollapse}
            refetch={() => moreStreams.refetch()}
          />
          <AnimatePresence exitBeforeEnter>
            {!expand ? (
              <motion.div
                className="flex"
                exit={{ opacity: 0 }}
                key="results-streams"
              >
                <span className="my-auto">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    className="disabled:opacity-40"
                    ref={(node) => setPrevEl(node)}
                  >
                    <ChevronLeftIcon className="text-4xl lg:text-5xl dark:text-white text-gray-600" />
                  </motion.button>
                </span>
                <Swiper
                  modules={[Navigation]}
                  spaceBetween={12}
                  slidesPerView={slides}
                  slidesPerGroup={slides}
                  navigation={{
                    prevEl,
                    nextEl,
                  }}
                  className="flex-1"
                  updateOnWindowResize
                >
                  {streams.results.map((stream) => (
                    <SwiperSlide
                      className="flex justify-center py-1"
                      key={stream.channel_id}
                    >
                      <motion.div layout>
                        <LivestreamCard stream={stream} />
                      </motion.div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <span className="my-auto">
                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    type="button"
                    className="disabled:opacity-40"
                    ref={(node) => setNextEl(node)}
                  >
                    <ChevronRightIcon className="text-4xl lg:text-5xl dark:text-white text-gray-600" />
                  </motion.button>
                </span>
              </motion.div>
            ) : (
              <>
                <GridWrapper colSize="normal">
                  {moreStreams.data &&
                    moreStreams.data?.pages.map((group, i) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <Fragment key={i}>
                        {group.results.map((stream, index) => (
                          <motion.div
                            key={stream._id}
                            ref={
                              index === group.results.length - 1
                                ? ref
                                : undefined
                            }
                          >
                            <LivestreamCard stream={stream} />
                          </motion.div>
                        ))}
                      </Fragment>
                    ))}
                </GridWrapper>
                {moreStreams.hasNextPage ? (
                  <div className="flex justify-center items-center pt-10 pb-3 h-24">
                    <GradientCircularProgress />
                  </div>
                ) : null}
              </>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
