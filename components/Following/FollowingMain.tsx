import React, { useContext, Fragment, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import LivestreamCard from "../general/LivestreamCard";
import BrowseWrapper from "../general/BrowseWrapper";
import UserContext from "../../context/UserContext";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import UserFollowContext from "../../context/UserFollowContext";
import FollowingEmpty from "./FollowingEmpty";
import MemberCard from "../general/MemberCard";

export default function FollowingMain() {
  const [currentTab, setCurrentTab] = useState(0);
  const { ref, inView } = useInView();
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);

  const channelIds: string | undefined = follows?.channels?.join(",");

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
        enabled: !!user?.uid && !!channelIds,
        getNextPageParam: (lastPage) =>
          lastPage.next ? lastPage.next.page : false,
      }
    );

  const fetchProfiles = () =>
    axios
      .get(`https://api.ghostity.com/general/profiles?channelIds=${channelIds}`)
      .then((res) => res.data);

  const profiles = useQuery<Profile[], Error>(
    ["followProfiles", channelIds],
    fetchProfiles
  );

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  if (!user) return <FollowingEmpty />;

  if (isLoading && profiles.isLoading)
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
      <div className="flex gap-4 mb-7 text-gray-400 relative">
        {currentTab === 0 ? (
          <>
            <button
              type="button"
              onClick={() => setCurrentTab(0)}
              className="border-black border-b-2 z-10 text-black px-2"
            >
              Live
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab(1)}
              className="px-2"
            >
              All
            </button>
          </>
        ) : (
          <>
            <button
              type="button"
              onClick={() => setCurrentTab(0)}
              className="px-2"
            >
              Live
            </button>
            <button
              type="button"
              onClick={() => setCurrentTab(1)}
              className="text-black border-black border-b-2 z-10 px-2"
            >
              All
            </button>
          </>
        )}
        <div className="border absolute bottom-0 w-full z-0" />
      </div>
      {currentTab === 0 ? (
        <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-7 justify-items-center">
          {data?.pages.map((group) => (
            <Fragment key={group.results.length}>
              {group.results.map((stream: Stream) => (
                <LivestreamCard key={stream.channel_id} stream={stream} />
              ))}
            </Fragment>
          ))}
        </div>
      ) : null}
      {currentTab === 1 ? (
        <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-7 justify-items-center text-sm">
          {/* {JSON.stringify(profiles.data)} */}
          {profiles.data?.map((channel) => (
            <MemberCard
              key={channel._id}
              name={channel.name}
              image={channel?.profile?.img}
              socials={channel?.profile?.social_media}
              channels={channel.channels}
            />
          ))}
        </div>
      ) : null}
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
