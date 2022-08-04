import BackgroundWrapper from "@general/BackgroundWrapper";
import React from "react";
import Image from "next/image";
import { GoLocation } from "react-icons/go";
import OrganizationLinks from "./OrganizationLinks";

export default function OrganizationBanner({
  organization,
}: {
  organization: Organization;
}) {
  return (
    <BackgroundWrapper nextImage={false} image={organization.logo}>
      <div className="flex flex-col md:flex-row flex-wrap items-center gap-5 py-8">
        <div className="bg-white flex justify-center h-48 min-w-[12rem] w-48 items-center p-8 rounded-full shadow-md border-2">
          <Image
            src={organization.logo}
            alt={`${organization.name}'s logo`}
            height="192"
            width="192"
            className="bg-white select-none text-xs object-scale-down"
            draggable={false}
          />
        </div>
        <div className="flex flex-col flex-1 justify-center items-center md:items-start gap-1 mr-5">
          <div>
            <h2 className="flex text-4xl font-semibold dark:text-primary">
              {organization.name}
            </h2>
          </div>
          <div className="flex gap-2 text-sm font-semibold dark:text-text-secondary-dark text-gray-600">
            {organization.languages.map((lang) => (
              <div key={lang}>{lang}</div>
            ))}
          </div>
          <div className="flex items-center font-medium dark:text-text-primary-dark">
            <GoLocation />
            {organization.based}
          </div>
          <div className="font-medium text-sm dark:text-text-primary-dark">
            Total Members:{" "}
            <span className="font-bold dark:text-primary">
              {organization.members.length}
            </span>
          </div>
        </div>
        <OrganizationLinks organization={organization} />
      </div>
    </BackgroundWrapper>
  );
}
