import React from "react";
import GridWrapper from "../general/GridWrapper";
import LivestreamCard from "../general/LivestreamCard";
import NoStreams from "../general/NoStreams";

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
