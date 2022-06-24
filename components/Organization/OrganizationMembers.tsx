// Libraries
import axios from "axios";
import React, { Fragment, useMemo, useState } from "react";
import { useQuery } from "react-query";

// Icons
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";

// Hooks
import useHandleFollows from "../../hooks/useHandleFollows";

// Components
import GradientCircularProgress from "../general/GradientCircularProgress";
import GridWrapper from "../general/GridWrapper";
import ProfileCard from "../general/ProfileCard";

function FollowBranchButton({
  organization,
  profiles,
  branches,
  currentBranch,
  members,
}: {
  organization: string;
  profiles: Profile[];
  currentBranch: number;
  branches: { name: string; id: number }[];
  members: Member[];
}) {
  const channels = (id: string, profilesList: Profile[]) =>
    profilesList.flatMap((profile) =>
      profile._id === id ? profile.channels : []
    );

  const branchMemberChannels = (profilesList: Profile[]): Channel[] => {
    if (currentBranch === -1) {
      return members.flatMap((member) =>
        channels(member.profile_id, profilesList).map((channel) => channel)
      );
    }
    return members.flatMap((member) =>
      member.branch_id === currentBranch
        ? channels(member.profile_id, profilesList).map((channel) => channel)
        : []
    );
  };

  const [followState, setFollowState] = useState(false);
  const [follow, followed] = useHandleFollows(
    branchMemberChannels(profiles || [])
  );
  const currentBranchName = useMemo(() => {
    if (currentBranch < 0) {
      return organization;
    }
    return branches.flatMap((branch) => {
      if (branch.id === currentBranch) {
        return branch.name;
      }

      return [];
    })[0];
  }, [currentBranch]);

  return (
    <button
      type="button"
      onClick={() => follow()}
      onMouseEnter={() => setFollowState(true)}
      onMouseLeave={() => setFollowState(false)}
      className="flex items-center gap-2 bg-slate-100 px-2 py-0.5 text-sm  text-gray-800 rounded"
    >
      {followed ? (
        <>
          {followState ? <AiOutlineHeart /> : <AiFillHeart />}
          Unfollow {currentBranchName}
        </>
      ) : (
        <>
          {followState ? <AiFillHeart /> : <AiOutlineHeart />}
          Follow {currentBranchName}
        </>
      )}
    </button>
  );
}

export default function OrganizationMembers({
  organization,
  branches,
  members,
}: {
  organization: string;
  branches: { name: string; id: number }[];
  members: Member[];
}) {
  const [currentBranch, setCurrentBranch] = useState(-1);

  // Fetch Profiles
  const ids = members.map((member) => member.profile_id);
  const fetchProfiles = () =>
    axios
      .post<Profile[]>("https://api.ghostity.com/profiles", {
        ids,
      })
      .then((res) => res.data);

  const profiles = useQuery<Profile[], Error>(
    `${organization} member profiles`,
    fetchProfiles
  );

  // Filter members by branch_id and sort by sub_count
  const getProfile = (id: string, profilesList: Profile[]) =>
    profilesList.filter((profile) => profile._id === id)[0];

  const filteredMembers = useMemo(() => {
    if (profiles.data) {
      if (currentBranch < 0) {
        return members.sort(
          (a, b) =>
            getProfile(b.profile_id, profiles.data).channels[0].sub_count -
            getProfile(a.profile_id, profiles.data).channels[0].sub_count
        );
      }

      return members
        .filter((member) => member.branch_id === currentBranch)
        .sort(
          (a, b) =>
            getProfile(b.profile_id, profiles.data).channels[0].sub_count -
            getProfile(a.profile_id, profiles.data).channels[0].sub_count
        );
    }

    return [];
  }, [currentBranch, members, profiles.data]);

  return !profiles.isLoading && profiles.data ? (
    <>
      <div className="flex flex-wrap justify-center text-sm py-2">
        <button type="button" onClick={() => setCurrentBranch(-1)}>
          {currentBranch === -1 ? (
            <span className="font-semibold px-3">All</span>
          ) : (
            <span className="text-gray-400 px-3">All</span>
          )}
        </button>
        {branches.map((branch) => (
          <>
            <div className="before:content-['|'] before:px-1 text-gray-400" />
            <button
              type="button"
              key={branch.id}
              onClick={() => setCurrentBranch(branch.id)}
              className="flex"
            >
              {currentBranch === branch.id ? (
                <span className="text-black font-semibold px-1">
                  {branch.name}
                </span>
              ) : (
                <span className="text-gray-400 px-1">{branch.name}</span>
              )}
            </button>
          </>
        ))}
      </div>
      <div className="self-end mt-5 mb-7">
        <FollowBranchButton
          organization={organization}
          profiles={profiles.data}
          currentBranch={currentBranch}
          branches={branches}
          members={members}
        />
      </div>
      <GridWrapper colSize="normal">
        {filteredMembers.map((member) => (
          <Fragment key={member._id}>
            <ProfileCard
              profile={getProfile(member.profile_id, profiles.data)}
              altName={member.alt_name}
              language={member.language}
              size="large"
              subCount
            />
          </Fragment>
        ))}
      </GridWrapper>
    </>
  ) : (
    <div className="flex-1 flex justify-center items-center">
      <GradientCircularProgress />
    </div>
  );
}
