import React, { useContext, Fragment, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { motion } from "framer-motion";
import LivestreamCard from "../general/LivestreamCard";
import BrowseWrapper from "../general/BrowseWrapper";
import UserContext from "../../context/UserContext";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import UserFollowContext from "../../context/UserFollowContext";
import FollowingEmpty from "./FollowingEmpty";
import MemberCard from "../general/MemberCard";
import GridWrapper from "../general/GridWrapper";
import FollowingTabButton from "./FollowingTabButton";

export default function FollowingMain() {
  const [currentTab, setCurrentTab] = useState("Live");
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
        <FollowingTabButton
          tab="Live"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <FollowingTabButton
          tab="All"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
        />
        <div className="border absolute bottom-0 w-full z-0" />
      </div>
      {currentTab === "Live" ? (
        <GridWrapper>
          {data?.pages.map((group) => (
            <>
              {group.results.map((stream: Stream) => (
                <motion.span layout="position" key={stream.channel_id}>
                  <LivestreamCard key={stream.channel_id} stream={stream} />
                </motion.span>
              ))}
            </>
          ))}
        </GridWrapper>
      ) : null}
      {currentTab === "All" ? (
        <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-7 justify-items-center text-sm">
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
