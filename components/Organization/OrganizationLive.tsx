import React from "react";
import GridWrapper from "../General/GridWrapper";
import LivestreamCard from "../General/LivestreamCard";
import NoStreams from "../General/NoStreams";

export default function OrganizationLive({
  channels,
}: {
  channels: Stream[];
}) {
  if (channels.length < 1) {
    return (
      <div className="flex justify-center items-center h-48">
        {" "}
        <NoStreams />
      </div>
    );
  }

  return (
    <GridWrapper
      colSize="normal"
      
    >
      {channels.map((channel) => (
        <LivestreamCard key={channel._id} stream={channel} />
      ))}
    </GridWrapper>
  );
}
