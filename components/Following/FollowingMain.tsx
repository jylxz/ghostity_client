import React, { useContext, Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import LivestreamCard from "../general/LivestreamCard";
import BrowseWrapper from "../general/BrowseWrapper";
import UserContext from "../../context/UserContext";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import UserFollowContext from "../../context/UserFollowContext";
import FollowingEmpty from "./FollowingEmpty";

export default function FollowingMain() {
  const { ref, inView } = useInView();
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);

  const channelIds: string = follows?.data()?.channel_ids.join(",");

  const fetchStreams = ({ pageParam = 1 }) =>
    axios
      .get(
        `https://api.ghostity.com/streams?page=${pageParam}&channels=${channelIds}`
      )
      .then((res) => res.data);

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<Streams, Error>(
      ["userFollows", channelIds],
      fetchStreams,
      {
        enabled: !!user?.uid,
        getNextPageParam: (lastPage) =>
          lastPage.next ? lastPage.next.page : false,
      }
    );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (!user) return <FollowingEmpty />;

  if (isLoading)
    return (
      <BrowseWrapper>
        <div className="flex-grow flex items-center justify-center">
          <GradientCircularProgress />
        </div>
      </BrowseWrapper>
    );

  if (error)
    return (
      <BrowseWrapper>
        <ProblemLoading />
      </BrowseWrapper>
    );

  return (
    <BrowseWrapper>
      <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-7 justify-items-center">
        {data?.pages.map((group) => (
          <Fragment key={group.results.length}>
            {group.results.map((stream: Stream) => (
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
    </BrowseWrapper>
  );
}
