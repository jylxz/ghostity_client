import React, { Fragment, useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import LivestreamCard from "../general/LivestreamCard";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";

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
    <div>
      <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-x-2.5 gap-y-7 justify-items-center py-7">
        {data?.pages.map((group) => (
          <Fragment key={group.results.length}>
            {group.results.map((stream) => (
              <LivestreamCard key={stream.channel_id} stream={stream} />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage ? (
        <div
          ref={ref}
          className="flex justify-center items-center pt-10 pb-3 h-24"
        >
          <GradientCircularProgress />
        </div>
      ) : null}
    </div>
  );
}
