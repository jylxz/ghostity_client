// Libraries
import { AnimatePresence, motion } from "framer-motion";
import React, { Fragment, useEffect, useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { useInView } from "react-intersection-observer";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
import SearchHeading from "./SearchHeading";
import OrganizationCard from "../General/OrganizationCard";
import GridWrapper from "../General/GridWrapper";
import GradientCircularProgress from "../General/GradientCircularProgress";

// Hooks
import useHandleCollapseAndExpand from "./helpers/useHandleCollapseAndExpand";
import useInfiniteSearch from "./helpers/useInfiniteSearch";
import useResponseSlides from "./helpers/useResponseSlides";
import { ShowResultsOptions } from "./helpers/useHandleShowResults";

export default function SearchOrganizations({
  organizations,
  query,
  show,
  currentlyShowing,
  setShow,
  width,
}: {
  organizations: SearchItem<Organization>;
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
    "organizations",
    currentlyShowing,
    setShow
  );
  const moreOrganizations = useInfiniteSearch<Organizations>(
    query,
    "organizations"
  );

  useEffect(() => {
    if (inView) {
      moreOrganizations.fetchNextPage().catch(() => {});
    }
  }, [inView]);

  return (
    <AnimatePresence exitBeforeEnter>
      {organizations.total === 0 || !show ? null : (
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
            heading="Organizations"
            total={organizations.total}
            more={organizations.more}
            expand={expand}
            handleExpand={handleExpand}
            handleCollapse={handleCollapse}
            refetch={() => moreOrganizations.refetch()}
          />
          <AnimatePresence exitBeforeEnter>
            {!expand ? (
              <motion.div className="flex" exit={{ opacity: 0 }} key="results-organizations">
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
                  {organizations.results.map((organization) => (
                    <SwiperSlide
                      className="flex justify-center"
                      key={organization._id}
                    >
                      <OrganizationCard
                        image={organization.logo}
                        title={organization.name}
                        languages={organization.languages}
                      />
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
            {moreOrganizations.data && expand ? (
              <>
                <GridWrapper colSize="normal">
                  {moreOrganizations.data?.pages.map((group, i) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <Fragment key={i}>
                      {group.results.map((organization, index) => (
                        <motion.div
                          key={organization._id}
                          ref={
                            index === group.results.length - 1 ? ref : undefined
                          }
                        >
                          <OrganizationCard
                            image={organization.logo}
                            title={organization.name}
                            languages={organization.languages}
                          />
                        </motion.div>
                      ))}
                    </Fragment>
                  ))}
                </GridWrapper>
                {moreOrganizations.hasNextPage ? (
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
