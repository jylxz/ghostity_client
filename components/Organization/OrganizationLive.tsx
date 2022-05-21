import React from "react";
import LivestreamCard from "../general/LivestreamCard";
import NoStreams from "../general/NoStreams";

export default function OrganizationLive({ channels }: { channels: Stream[] }) {
  if (channels.length < 1) {
    return<div className="flex justify-center items-center h-48"> <NoStreams /></div>;
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(220px,_1fr))] gap-7 justify-items-center py-6">
      {channels.map((channel) => (
        <LivestreamCard key={channel._id} stream={channel} />
      ))}
    </div>
  );
}
