import React from "react";
import Card from "@mui/material/Card";
import Image from "next/image";

export default function SmallLivestreamCard({ stream }: { stream: Stream }) {
  return (
    <div className="text-sm flex items-center gap-2 pr-5">
      <div className="min-w-fit mx-1 flex">
        <Image
          src={stream.channel_img}
          height={28}
          width={28}
          className="rounded-full "
        />
      </div>
      <div className="flex-1">
        <span className="line-clamp-1">{stream.channel_name}</span>
        <div className="text-gray-500 grid grid-cols-8 justify-between">
          <span className="line-clamp-1 flex-1 col-span-6">{stream.stream.game} </span>
          <div className="ml-1.5 grid grid-cols-2 gap-1.5 relative items-center">
            <span className="animate-ping h-3 w-3 absolute rounded-full bg-primary border border-white opacity-60" />
            <span className="rounded-full h-3 w-3 bg-primary border border-white" />
            <span className="text-gray-700 ml-2">{stream.stream.viewers}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
