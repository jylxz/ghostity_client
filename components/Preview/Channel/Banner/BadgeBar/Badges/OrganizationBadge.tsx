import React, { useState } from "react";
import Image from "next/image";

export default function OrganizationBadge({
  org,
}: {
  org: Profile["profile"]["affiliations"][0];
}) {
  const [showOrgName, setShowOrgName] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setShowOrgName(true)}
      onMouseLeave={() => setShowOrgName(false)}
    >
      {org.organization_logo && (
        <Image
          src={org.organization_logo}
          width={20}
          height={20}
          className="mt-2 rounded-full"
          alt={`${org.organization_name}'s logo`}
        />
      )}
      {showOrgName && (
        <div className="absolute z-20 whitespace-nowrap left-3 top-4 bg-secondary-alt-2 dark:bg-secondary-dark py-1 px-2 rounded text-sm">
          {org.organization_name} member
        </div>
      )}
    </div>
  );
}
