// Libraries
import React, { Fragment, useContext, useEffect, useState } from "react";
import { useInfiniteQuery } from "react-query";
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
import GridWrapper from "../general/GridWrapper";
import AnimateTabButton from "../general/AnimatedTabButton";
import ProfileCard from "../general/ProfileCard";

import GhostityIcon from "../../public/images/Ghostity-svg.svg";

export default function FollowingMain() {
  const [currentTab, setCurrentTab] = useState("Live");
  const { ref, inView } = useInView();
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);

  const channelIds: string[] | undefined = follows?.channels;

  const fetchStreams = ({ pageParam = 1 }) =>
    axios
      .post(`https://api.ghostity.com/streams?page=${pageParam}`, {
        channelIds,
      })
      .then((res) => res.data);

  const followStreams = useInfiniteQuery<Streams, Error>(
    ["followStreams"],
    fetchStreams,
    {
      enabled: !!user?.uid && !!channelIds && currentTab === "Live",
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  const fetchProfiles = ({ pageParam = 1 }) =>
    axios
      .post(`https://api.ghostity.com/profiles?page=${pageParam}`, {
        channelIds,
      })
      .then((res) => res.data);

  const followProfiles = useInfiniteQuery<Profiles, Error>(
    ["followProfiles"],
    fetchProfiles,
    {
      enabled: currentTab === "All",
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  useEffect(() => {
    if (inView && followStreams.hasNextPage && currentTab === "Live") {
      followStreams.fetchNextPage();
    }
  }, [currentTab, followStreams, inView]);

  useEffect(() => {
    if (inView && followProfiles.hasNextPage && currentTab === "All") {
      followProfiles.fetchNextPage();
    }
  }, [currentTab, followProfiles, inView]);

  if (!user) return <FollowingEmpty />;

  return (
    <BrowseWrapper>
      <div className="flex gap-4 mb-7 text-gray-400 relative">
        <AnimateTabButton
          tab="Live"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          count={
            followStreams.data?.pages[0].next?.total ||
            followStreams.data?.pages[0].results.length
          }
        />
        <AnimateTabButton
          tab="All"
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          count={
            followProfiles.data?.pages[0].next?.total ||
            followProfiles.data?.pages[0].results.length
          }
        />
        <div className="border absolute bottom-0 w-full z-0" />
      </div>
      {followStreams.isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <GradientCircularProgress />
        </div>
      ) : null}
      {followStreams.error || followProfiles.error ? <ProblemLoading /> : null}
      {followStreams.data && currentTab === "Live" && channelIds?.length > 0 ? (
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
          {followStreams.hasNextPage ? (
            <div
              ref={ref}
              className="flex justify-center items-center pt-10 pb-3 h-24"
            >
              <GradientCircularProgress />
            </div>
          ) : null}
        </>
      ) : null}
      {followProfiles.data && currentTab === "All" ? (
        <>
          <GridWrapper colSize="small">
            {followProfiles.data.pages.map((group, i) => (
              <Fragment key={i}>
                {group.results.map((profile) => (
                  <motion.span layout="position" key={profile._id}>
                    <ProfileCard
                      key={profile._id}
                      profile={profile}
                      size="normal"
                    />
                  </motion.span>
                ))}
              </Fragment>
            ))}
          </GridWrapper>
          {followProfiles.hasNextPage ? (
            <div
              ref={ref}
              className="flex justify-center items-center pt-10 pb-3 h-24"
            >
              <GradientCircularProgress />
            </div>
          ) : null}
        </>
      ) : null}
    </BrowseWrapper>
  );
}
