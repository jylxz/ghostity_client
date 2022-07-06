// Libraries
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { LayoutGroup, motion } from "framer-motion";

// Hooks
import useHandleFilters from "../../hooks/useHandleFilters";

// Components
import LivestreamCard from "../general/LivestreamCard";
import BrowseStreamsFilters from "./BrowseStreamsFilters";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import BrowseWrapper from "../general/BrowseWrapper";
import GridWrapper from "../general/GridWrapper";
import API from "../../API";

export default function BrowseStreams() {
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [filterString, filters, setFilters, resetFilters] = useHandleFilters();

  const fetchStreams = async ({ pageParam = 1 }) =>
    API.get<Streams>(`/streams?page=${pageParam}&limit=30${filterString}`).then(
      (res) => res.data
    );

  const { data, error, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<
    Streams,
    Error
  >(["allStreams", `${filters.sort || ""}`], fetchStreams, {
    getNextPageParam: (lastPage) =>
      lastPage.next ? lastPage.next.page : false,
    cacheTime: 0,
  });

  const refetchWithFilters = async () => {
    setLoading(true);
    return refetch().then(() => setLoading(false));
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage().catch(() => {});
    }
  }, [fetchNextPage, inView]);

  return (
    <BrowseWrapper>
      <LayoutGroup id="browse-streams">
        <BrowseStreamsFilters
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          refetch={refetchWithFilters}
        />
        {data && !loading ? (
          <>
            {/* <AnimatePresence exitBeforeEnter> */}
            <GridWrapper
              colSize="normal"
              key="streams-wrapper"
              transition={{
                layout: {
                  duration: 0.4,
                },
              }}
            >
              {data.pages.map((group, i) => (
                <Fragment key={i}>
                  {group.results.map((stream: Stream) => (
                    <motion.div
                      key={stream.channel_id}
                      layout="position"
                      // transition={{
                      //   layout: {
                      //     duration: 0.3,
                      //   },
                      // }}
                    >
                      <LivestreamCard stream={stream} />
                    </motion.div>
                  ))}
                </Fragment>
              ))}
            </GridWrapper>
            {/* </AnimatePresence> */}
            {hasNextPage ? (
              <motion.div
                layout="position"
                ref={ref}
                className="flex justify-center items-center pt-10 pb-3 h-24"
              >
                <GradientCircularProgress />
              </motion.div>
            ) : null}
          </>
        ) : (
          <motion.div
            layout
            className="flex-1 flex justify-center items-center"
          >
            <GradientCircularProgress />
          </motion.div>
        )}
        {error ? <ProblemLoading /> : null}
      </LayoutGroup>
    </BrowseWrapper>
  );
}
