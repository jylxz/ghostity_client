import React from "react";

import BrowseWrapper from "../general/BrowseWrapper";
import InfoCard from "../general/InfoCard";

import Ghostity from "../../public/images/Ghostity-svg.svg";

export default function BrowseOrganizations({
  organizations,
}: {
  organizations: Organization[];
}) {
  return (
    <BrowseWrapper>
      <div className="w-full flex flex-wrap text-xl  justify-center gap-2 mb-4">
        <h2 className="flex">Organizations currently on</h2>
        <span className=" bg-clip-text text-transparent bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex gap-2">
          ghostity
          <div className="w-8 h-8 -scale-x-100">
            <Ghostity />
          </div>
        </span>
      </div>
      <div className="grid grid-cols-[repeat(auto-fit,_minmax(160px,_1fr))] gap-7 justify-items-center">
        {organizations.map((org) => (
          <InfoCard
            key={org._id}
            title={org.name}
            image={org.logo}
            languages={org.languages}
          />
        ))}
      </div>
    </BrowseWrapper>
  );
}
