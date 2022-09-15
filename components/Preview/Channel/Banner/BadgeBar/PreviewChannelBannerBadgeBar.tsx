import { useHandleFollows } from 'hooks';
import React from 'react'
import FollowingBadge from './Badges/FollowingBadge';
import OrganizationBadge from './Badges/OrganizationBadge';

export default function PreviewChannelBannerBadgeBar({profile}: {profile: Profile}) {
  const [follow, following] = useHandleFollows(profile.channels);

  return (
    <div className="px-1 flex gap-2">
      {profile.profile.affiliations.map((org) => (
        <OrganizationBadge key={org.organization_id} org={org} />
      ))}
      <FollowingBadge following={following} />
    </div>
  );
}
