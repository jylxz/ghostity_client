import React from "react";
import Image from "next/image";

export default function LiveFollowingBarItem({ stream }: { stream: Stream }) {
  return (
    <a href={stream.stream.url} target="_blank" rel="noopener noreferrer">
      <button
        type="button"
        className="flex flex-col items-center justify-center max-w-[5rem] relative mx-auto"
      >
        <div className="relative">
          <Image
            alt={`${stream.channel_name}'s profile picture`}
            src={stream.channel_img}
            height={40}
            width={40}
            className="rounded-full text-xs"
          />
          <span className="absolute top-8 right-0 animate-ping h-3 w-3 rounded-full bg-primary border border-white opacity-60" />
          <span className="absolute top-8 right-0 rounded-full h-3 w-3 bg-primary border border-white" />
        </div>
        <span className="max-w-[4.5rem] truncate text-xs text-gray-500">
          {stream.channel_name}
        </span>
      </button>
    </a>
  );
}
