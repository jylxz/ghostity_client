// Libraries
import React, { Fragment, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import { UseInfiniteQueryResult } from "react-query";

// Components
import GradientCircularProgress from "@general/GradientCircularProgress";
import GridWrapper from "@general/GridWrapper";
import LivestreamCard from "@general/LivestreamCard";

export default function FollowingStreams({
  followStreams,
}: {
  followStreams: UseInfiniteQueryResult<Streams, Error>;
}) {
  const { ref, inView } = useInView();

  useEffect(() => {
    if (inView && followStreams.hasNextPage) {
      followStreams.fetchNextPage().catch(() => {});
    }
  }, [followStreams, inView]);

  return (
    <>
      <GridWrapper colSize="normal">
        {followStreams.data?.pages.map((group, i) => (
          <Fragment key={i}>
            {group.results.map((stream: Stream) => (
              <motion.span layout key={stream.channel_id}>
                <LivestreamCard key={stream.channel_id} stream={stream} />
              </motion.span>
            ))}
          </Fragment>
        ))}
      </GridWrapper>
      {followStreams.hasNextPage && (
        <div
          ref={ref}
          className="flex justify-center items-center pt-10 pb-3 h-24"
        >
          <GradientCircularProgress />
        </div>
      )}
    </>
  );
}
