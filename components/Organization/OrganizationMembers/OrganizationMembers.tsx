// Libraries
import React, { Fragment, useMemo, useState } from "react";
import { useQuery } from "react-query";

// Services
import API from "services/API";

// Components
import GradientCircularProgress from "@general/GradientCircularProgress";
import GridWrapper from "@general/GridWrapper";
import ProfileCard from "@general/ProfileCard";
import OrganizationMembersBranchesBar from "./OrganizationMembersBranchesBar";
import OrganizationMembersFollowBranchButton from "./OrganizationMembersFollowBranchButton";

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
    API.post<Profile[]>(`/profiles`, {
      ids,
    }).then((res) => res.data);

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
        .filter(
          (member) =>
            member.branch_id === currentBranch ||
            (member.branches &&
              member.branches.some(
                (branch) => branch.branch_id === currentBranch
              ))
        )
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
      <OrganizationMembersBranchesBar
        branches={branches}
        currentBranch={currentBranch}
        setCurrentBranch={setCurrentBranch}
      />
      <div className="self-end mt-5 mb-7">
        <OrganizationMembersFollowBranchButton
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
              language={member.primary_language}
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
