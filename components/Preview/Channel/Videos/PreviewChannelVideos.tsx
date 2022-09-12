import GridWrapper from "@general/GridWrapper";
import VideoCard from "@general/VideoCard";
import React from "react";

export default function PreviewChannelVideos({
  videos,
}: {
  videos: PreviewData["videos"];
}) {
  const sortedVideos = (() => {
    if (videos.twitch && videos.youtube) {
      return [...videos.twitch, ...videos.youtube].sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
    }

    return videos.twitch || videos.youtube
  })()

  return (
    <div className="flex-1 overflow-y-auto pb-6 px-4 overscroll-contain">
      <h2 className="text-xl px-3 py-6">Latest Vods</h2>
      <GridWrapper colSize="small">
        {sortedVideos?.map((video) => <VideoCard video={video} key={video.publishedAt}/>)}
      </GridWrapper>
    </div>
  );
}
