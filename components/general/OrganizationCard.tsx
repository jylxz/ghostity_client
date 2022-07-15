import React from "react";
import Image from "next/image"

import LinkTo from "./LinkTo";

export default function OrganizationCard({
  image,
  title,
  languages,
}: {
  image: string;
  title: string;
  languages?: string[];
}) {
  return (
    <div>
      <LinkTo
        href={`/browse/organizations/${encodeURIComponent(
          title.toLowerCase()
        )}`}
      >
        <div className="bg-white flex justify-center h-32 w-32 items-center p-5 rounded-full border-2 shadow-md cursor-pointer">
          <Image
            src={image}
            alt={`${title}'s logo`}
            width={128}
            height={128}
            className="object-scale-down select-none"
            draggable={false}
          />
        </div>
      </LinkTo>
      <div className="mt-2 flex flex-col justify-center items-center ">
        <LinkTo
          href={`/browse/organizations/${encodeURIComponent(
            title.toLowerCase()
          )}`}
        >
          <div className="dark:text-primary font-medium cursor-pointer">{title}</div>
        </LinkTo>
        <div className="dark:text-text-secondary-dark text-gray-500">
          {languages?.map((language) => (
            <span key={language} className="mx-0.5 text-xs">
              {language}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
