// Libraries
import React, { ReactElement, useContext, useState } from "react";
import Head from "next/head";
import { useInfiniteQuery } from "react-query";

// Services
import API from "services/API";

// Layout
import BrowseLayout from "layouts/BrowseLayout";

// Contexts
import UserContext from "contexts/UserContext";
import UserFollowContext from "contexts/UserFollowContext";

// Components
import { DefaultDescription, DefaultKeywords } from "components/Head";
import {
  FollowingProfiles,
  FollowingEmpty,
  FollowingStreams,
  FollowingTabsBar,
} from "components/Following";
import BrowseWrapper from "@general/BrowseWrapper";
import GradientCircularProgress from "@general/GradientCircularProgress";
import ProblemLoading from "@general/ProblemLoading";

export default function Following() {
  const [currentTab, setCurrentTab] = useState("Live");
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);

  const channelIds: string[] | undefined = follows?.channels;

  const fetchStreams = ({ pageParam = 1 }) =>
    API.post<Streams>(`/streams?page=${pageParam}`, {
      channelIds,
    }).then((res) => res.data);

  const followStreams = useInfiniteQuery<Streams, Error>(
    ["followingStreams"],
    fetchStreams,
    {
      enabled: !!user?.uid && !!channelIds && currentTab === "Live",
      cacheTime: 0,
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  const fetchProfiles = ({ pageParam = 1 }) =>
    API.post<Profiles>(`/profiles?page=${pageParam}`, {
      channelIds,
    }).then((res) => res.data);

  const followProfiles = useInfiniteQuery<Profiles, Error>(
    ["followingProfiles"],
    fetchProfiles,
    {
      enabled: !!user?.uid && !!channelIds && currentTab === "All",
      cacheTime: 0,
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  if (!user) return <FollowingEmpty />;

  return (
    <>
      <Head>
        <title>vGhostity | Following</title>
      </Head>
      <>
        <DefaultDescription />
        <DefaultKeywords />
      </>
      <BrowseWrapper>
        <FollowingTabsBar
          currentTab={currentTab}
          setCurrentTab={setCurrentTab}
          LiveCount={
            followStreams.data?.pages[0].next?.total ||
            followStreams.data?.pages[0].results.length
          }
          AllCount={
            followProfiles.data?.pages[0].next?.total ||
            followProfiles.data?.pages[0].results.length
          }
        />
        {(followStreams.isLoading || followProfiles.isLoading) && (
          <div className="flex-grow flex items-center justify-center">
            <GradientCircularProgress />
          </div>
        )}
        {(followStreams.error || followProfiles.error) && <ProblemLoading />}
        {followStreams.data && currentTab === "Live" && (
          <FollowingStreams followStreams={followStreams} />
        )}
        {followProfiles.data && currentTab === "All" && (
          <FollowingProfiles followProfiles={followProfiles} />
        )}
      </BrowseWrapper>
    </>
  );
}

Following.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
