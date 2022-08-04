import React, { useMemo, useState } from 'react'
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import useHandleFollows from 'hooks/useHandleFollows';

export default function OrganizationMembersFollowBranchButton({
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
      member.branch_id === currentBranch ||
      (member.branches &&
        member.branches.some((branch) => branch.branch_id === currentBranch))
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
      className="flex items-center gap-2 dark:bg-secondary-dark dark:text-primary bg-slate-100 px-2 py-0.5 text-sm  text-gray-800 rounded"
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
