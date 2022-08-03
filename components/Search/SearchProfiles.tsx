// Libraries
import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import { useInView } from "react-intersection-observer";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
import SearchHeading from "./SearchHeading";
import ProfileCard from "../General/ProfileCard";
import GridWrapper from "../General/GridWrapper";
import GradientCircularProgress from "../General/GradientCircularProgress";

// Hooks
import useInfiniteSearch from "./hooks/useInfiniteSearch";
import useHandleCollapseAndExpand from "./hooks/useHandleCollapseAndExpand";
import useResponseSlides from "./hooks/useResponseSlides";
import { ShowResultsOptions } from "./hooks/useHandleShowResults";

export default function SearchProfiles({
  profiles,
  query,
  show,
  currentlyShowing,
  setShow,
  width,
}: {
  profiles: SearchItem<Profile>;
  query: string;
  show: boolean;
  currentlyShowing: ShowResultsOptions
  setShow: React.Dispatch<React.SetStateAction<ShowResultsOptions>>;
  width: number | undefined;
}) {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const slides = useResponseSlides(width);
  const { ref, inView } = useInView();

  const { expand, handleExpand, handleCollapse } = useHandleCollapseAndExpand(
    "profiles",
    currentlyShowing,
    setShow
  );
  const moreProfiles = useInfiniteSearch<Profiles>(query, "profiles");

  useEffect(() => {
    if (inView) {
      moreProfiles.fetchNextPage().catch(() => {});
    }
  }, [inView]);

  return (
    <AnimatePresence exitBeforeEnter>
      {profiles.total === 0 || !show ? null : (
        <motion.div
          layout
          initial={{ opacity: 0, translateY: 100 }}
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
                  translateY: 100,
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
            heading="Profiles"
            total={profiles.total}
            more={profiles.more}
            expand={expand}
            handleExpand={handleExpand}
            handleCollapse={handleCollapse}
            refetch={() => moreProfiles.refetch()}
          />
          <AnimatePresence exitBeforeEnter>
            {!expand && (
              <motion.div
                className="flex"
                exit={{ opacity: 0 }}
                key="results-profiles"
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
                  spaceBetween={24}
                  slidesPerView={slides}
                  slidesPerGroup={slides}
                  navigation={{
                    prevEl,
                    nextEl,
                  }}
                  className="flex-1"
                  updateOnWindowResize
                >
                  {profiles.results.map((profile) => (
                    <SwiperSlide
                      className="flex justify-center py-1"
                      key={profile.name}
                    >
                      <div className="mx-2">
                        <ProfileCard profile={profile} />
                      </div>
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
            )}
            {moreProfiles.data && expand ? (
              <>
                <GridWrapper colSize="normal">
                  {moreProfiles.data?.pages.map((group, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={i}>
                      {group.results.map((profile, index) => (
                        <motion.div
                          key={profile._id}
                          ref={
                            index === group.results.length - 1 ? ref : undefined
                          }
                        >
                          <ProfileCard profile={profile} />
                        </motion.div>
                      ))}
                    </Fragment>
                  ))}
                </GridWrapper>
                {moreProfiles.hasNextPage ? (
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
