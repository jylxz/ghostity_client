import React from "react";
import Image from "next/image"
import YTIcon from "@icons/Youtube.png"
import AnimatedButton from "@general/AnimatedButton";

export default function OrganizationYouTube({
  url,
  isWindowSmall,
}: {
  url: string;
  isWindowSmall: boolean | undefined;
}) {
  return (
    <AnimatedButton className="text-xs font-medium dark:bg-secondary-dark dark:text-text-primary-dark dark:border-0 bg-slate-100 border border-slate-100 px-2 rounded">
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-1 py-1.5"
      >
        <div className="w-5 flex items-center">
          <Image src={YTIcon} height={15} width={20} alt="YouTube Icon" />
        </div>
        {!isWindowSmall && "Youtube"}
      </a>
    </AnimatedButton>
  );
}
