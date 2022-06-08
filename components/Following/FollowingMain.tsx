// Libraries
import React, { useContext, useEffect, useState } from "react";
import { useInfiniteQuery, useQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import axios from "axios";
import { motion } from "framer-motion";

// Contexts
import UserContext from "../../context/UserContext";
import UserFollowContext from "../../context/UserFollowContext";

// Components
import LivestreamCard from "../general/LivestreamCard";
import BrowseWrapper from "../general/BrowseWrapper";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
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

  const followStreams = useInfiniteQuery<Streams, Error>(
    ["followStreams", channelIds],
    fetchStreams,
    {
      enabled: !!user?.uid && !!channelIds && currentTab === "Live",
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  const fetchProfiles = () =>
    axios
      .get(`https://api.ghostity.com/general/profiles?channelIds=${channelIds}`)
      .then((res) => res.data);

  const followProfiles = useQuery<Profile[], Error>(
    ["followProfiles", channelIds],
    fetchProfiles,
    {
      enabled: currentTab === "All",
    }
  );

  useEffect(() => {
    if (inView) {
      followStreams.fetchNextPage();
    }
  }, [followStreams, inView]);

  if (!user) return <FollowingEmpty />;

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
      {followStreams.isLoading || followProfiles.isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <GradientCircularProgress />
        </div>
      ) : null}
      {followStreams.error || followProfiles.error ? <ProblemLoading /> : null}
      {followStreams.data && currentTab === "Live" ? (
        <GridWrapper>
          {followStreams.data?.pages.map((group) => (
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
      {followProfiles.data && currentTab === "All" ? (
        <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-7 justify-items-center text-sm">
          {followProfiles.data?.map((channel) => (
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
      {followStreams.hasNextPage && currentTab === "Live" ? (
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
