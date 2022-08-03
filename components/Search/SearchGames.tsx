// Libraries
import React, { Fragment, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SwiperSlide, Swiper } from "swiper/react";
import { Navigation } from "swiper";
import { useInView } from "react-intersection-observer";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
import SearchHeading from "./SearchHeading";
import GameCard from "../General/GameCard";
import GridWrapper from "../General/GridWrapper";
import GradientCircularProgress from "../General/GradientCircularProgress";

// Hooks
import useHandleCollapseAndExpand from "./hooks/useHandleCollapseAndExpand";
import useInfiniteSearch from "./hooks/useInfiniteSearch";
import useResponseSlides from "./hooks/useResponseSlides";
import { ShowResultsOptions } from "./hooks/useHandleShowResults";

export default function SearchGames({
  games,
  query,
  show,
  currentlyShowing,
  setShow,
  width,
}: {
  games: SearchItem<Game>;
  query: string;
  show: boolean;
  currentlyShowing: ShowResultsOptions;
  setShow: React.Dispatch<React.SetStateAction<ShowResultsOptions>>;
  width: number | undefined;
}) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const slides = useResponseSlides(width, 5);
  const { ref, inView } = useInView();

  const { expand, handleExpand, handleCollapse } = useHandleCollapseAndExpand(
    "games",
    currentlyShowing,
    setShow
  );
  const moreGames = useInfiniteSearch<Games>(query, "games");

  useEffect(() => {
    if (inView) {
      moreGames.fetchNextPage().catch(() => {});
    }
  }, [inView]);

  return (
    <AnimatePresence exitBeforeEnter>
      {games.total === 0 || !show ? null : (
        <motion.div
          initial={{ opacity: 0, translateY: -100 }}
          animate={{ opacity: 1, translateY: 0 }}
          exit={
            !expand
              ? {
                  opacity: 0,
                  translateY: -100,
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
            heading="Games"
            total={games.total}
            more={games.more}
            expand={expand}
            handleExpand={handleExpand}
            handleCollapse={handleCollapse}
            refetch={() => moreGames.refetch()}
          />
          <AnimatePresence exitBeforeEnter>
            {!expand ? (
              <motion.div
                className="flex"
                exit={{ opacity: 0 }}
                // key="results-games"
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
                  {games.results.map((game) => (
                    <SwiperSlide
                      className="flex justify-center py-1"
                      key={game._id}
                    >
                      <GameCard game={game} />
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
            ) : null}
            {moreGames.data && expand ? (
              <>
                <GridWrapper
                  colSize={width && width < 640 ? "xxsmall" : "xsmall"}
                >
                  {moreGames.data?.pages.map((group, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={i}>
                      {group.results.map((game, index) => (
                        <motion.div
                          key={game._id}
                          ref={
                            index === group.results.length - 1 ? ref : undefined
                          }
                        >
                          <GameCard game={game} />
                        </motion.div>
                      ))}
                    </Fragment>
                  ))}
                </GridWrapper>
                {moreGames.hasNextPage ? (
                  <div className="flex justify-center items-center pt-10 pb-3 h-24">
                    <GradientCircularProgress />
                  </div>
                ) : null}
              </>
            ) : null}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
