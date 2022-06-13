// Libraries
import React, { useEffect } from "react";
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

export default function BrowseStreams() {
  const { ref, inView } = useInView();
  const [filterString, filters, setFilters, resetFilters] = useHandleFilters();

  const fetchStreams = async ({ pageParam = 1 }) =>
    axios
      .get(`https://api.ghostity.com/streams?page=${pageParam}${filterString}`)
      .then((res) => res.data);

  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    refetch,
    isRefetching,
    isFetchingNextPage,
  } = useInfiniteQuery<Streams, Error>(
    ["allStreams", `${filters.sort}`],
    fetchStreams,
    {
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <BrowseWrapper>
      <LayoutGroup>
        <BrowseStreamsFilters
          filters={filters}
          setFilters={setFilters}
          resetFilters={resetFilters}
          refetch={refetch}
        />
        {(data && !isRefetching ) ||
        (data && isFetchingNextPage) ? (
          <>
            <GridWrapper colSize="normal">
              {data.pages.map((group) => (
                <>
                  {group.results.map((stream: Stream) => (
                    <motion.span layout="position" key={stream.channel_id}>
                      <LivestreamCard stream={stream} />
                    </motion.span>
                  ))}
                </>
              ))}
            </GridWrapper>
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
