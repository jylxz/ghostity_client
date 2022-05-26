import React, { useState } from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useHandleFollows from "../../hooks/useHandleFollows";
import MemberCard from "../general/MemberCard";

export default function OrganizationMembers({
  organization,
  branches,
  members,
  profiles,
}: {
  organization: string;
  branches: { name: string; id: number }[];
  members: Member[];
  profiles: Profile[];
}) {
  const [currentBranch, setCurrentBranch] = useState(-1);
  const [followState, setFollowState] = useState(false);

  const profileImage = (id: string) => {
    let image = "";

    profiles.forEach((profile) => {
      if (id === profile._id) {
        image = profile.profile.img;
      }
    });

    return image;
  };

  const channels = (id: string) => {
    let allChannels: Channel[] = [];

    profiles.forEach((profile) => {
      if (id === profile._id) {
        allChannels = profile.channels;
      }
    });

    return allChannels;
  };

  const socialMedia = (id: string) => {
    let socials: { platform: string; url: string }[] = [];

    profiles.forEach((profile) => {
      if (id === profile._id) {
        socials = profile.profile.social_media;
      }
    });

    return socials;
  };

  const branchMemberChannels = () => {
    const branchId: Channel[] = [];

    if (currentBranch === -1) {
      members.map((member) =>
        channels(member.profile_id).map((channel) => branchId.push(channel))
      );
    } else {
      members.map((member) =>
        member.branch_id === currentBranch
          ? channels(member.profile_id).map((channel) => branchId.push(channel))
          : undefined
      );
    }

    return branchId;
  };

  const [follow, followed] = useHandleFollows(branchMemberChannels());

  const followButton = () => {
    let currentBranchName = "";

    if (currentBranch < 0) {
      currentBranchName = organization;
    } else {
      branches.forEach((branch) => {
        if (branch.id === currentBranch) {
          currentBranchName = branch.name;
        }
      });
    }

    return (
      <button
        type="button"
        onClick={() => follow()}
        onMouseEnter={() => setFollowState(true)}
        onMouseLeave={() => setFollowState(false)}
        className="flex items-center gap-2 bg-gray-300 px-2 py-0.5 text-sm  text-gray-50 rounded"
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
  };

  return (
    <>
      <div className="flex flex-wrap justify-center text-sm py-2">
        <button type="button" onClick={() => setCurrentBranch(-1)}>
          {currentBranch === -1 ? (
            <span className="font-semibold">All</span>
          ) : (
            <span className="text-gray-400">All</span>
          )}
        </button>
        {branches.map((branch) => (
          <button
            type="button"
            key={branch.id}
            onClick={() => setCurrentBranch(branch.id)}
            className="before:content-['|'] before:px-2 text-gray-400"
          >
            {currentBranch === branch.id ? (
              <span className="text-black font-semibold">{branch.name}</span>
            ) : (
              <span>{branch.name}</span>
            )}
          </button>
        ))}
      </div>
      <div className="self-end my-3">{followButton()}</div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(170px,_1fr))] gap-8 justify-items-center py-4">
        {members.map((member) =>
          member.branch_id === currentBranch ? (
            <MemberCard
              key={member._id}
              image={profileImage(member.profile_id)}
              socials={socialMedia(member.profile_id)}
              name={member.name}
              altName={member.alt_name}
              channels={channels(member.profile_id)}
              language={member.language}
            />
          ) : null
        )}
        {currentBranch < 0
          ? members.map((member) => (
              <MemberCard
                key={member._id}
                image={profileImage(member.profile_id)}
                socials={socialMedia(member.profile_id)}
                name={member.name}
                altName={member.alt_name}
                channels={channels(member.profile_id)}
                language={member.language}
              />
            ))
          : null}
      </div>
    </>
  );
}
