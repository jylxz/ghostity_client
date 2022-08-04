import React from "react";
import { BiGlobe } from "react-icons/bi";
import AnimatedButton from "@general/AnimatedButton";

export default function OrganizationWebsite({
  url,
  isWindowSmall,
}: {
  url: string;
  isWindowSmall: boolean | undefined;
}) {
  return (
    <AnimatedButton className="text-xs font-medium dark:bg-secondary-dark dark:text-text-primary-dark dark:border-0 bg-slate-100 border border-slate-100 px-2 py-1 rounded">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1"
      >
        <BiGlobe size={20} />
        {!isWindowSmall && "Website"}
      </a>
    </AnimatedButton>
  );
}
