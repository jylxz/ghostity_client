import React from "react";

import LinkTo from "./LinkTo";

export default function InfoCard({
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
          <img
            src={image}
            alt={`${title}'s logo`}
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
          <div className="font-medium cursor-pointer">{title}</div>
        </LinkTo>
        <div className="text-gray-500">
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
