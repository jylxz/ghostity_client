// Libraries
import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// Components
import LivestreamCard from "../general/LivestreamCard";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import GridWrapper from "../general/GridWrapper";

export default function GameStreams({ game }: { game: string }) {
  const { ref, inView } = useInView();

  const fetchGameStreams = async ({ pageParam = 1 }) =>
    axios
      .get(
        `https://api.ghostity.com/games/${encodeURIComponent(
          game
        )}/streams?page=${pageParam}`
      )
      .then((res) => res.data);

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<Streams, Error>(`${game}/streams`, fetchGameStreams, {
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (isLoading)
    return (
      <div className="flex justify-center items-center pt-10 pb-3 flex-1">
        <GradientCircularProgress />
      </div>
    );

  if (error)
    return (
      <div className="flex justify-center items-center pt-10 pb-3 flex-1">
        <ProblemLoading />
      </div>
    );

  return (
    <>
      <GridWrapper colSize="normal">
        {data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((stream) => (
              <motion.span layout="position" key={stream.channel_id}>
                <LivestreamCard key={stream.channel_id} stream={stream} />
              </motion.span>
            ))}
          </Fragment>
        ))}
      </GridWrapper>
      {hasNextPage ? (
        <div
          ref={ref}
          className="flex justify-center items-center pt-10 pb-3 h-24"
        >
          <GradientCircularProgress />
        </div>
      ) : null}
    </>
  );
}
