import React from "react";
import Image from "next/image";
import { Card } from "@mui/material";
import { format, formatDistanceToNow } from "date-fns";
import YoutubeIcon from "@icons/Youtube.png";
import TwitchIcon from "@icons/TwitchGlitchPurple.svg";

export default function VideoCard({ video }: { video: Video }) {
  const date = new Date(video.publishedAt);
  const formattedDate = format(date, "PPPP");
  const fromNow = formatDistanceToNow(date);

  function platformIcon() {
    if (video.videoUrl.includes("youtube"))
      return <div className="w-5 h-4">
        <Image src={YoutubeIcon} width={20} height={16} />
      </div>;

    if (video.videoUrl.includes("twitch"))
      return <TwitchIcon className="w-5 h-5 inline" />;

    return null
  }

  return (
    <Card className="w-60 h-36 relative">
      <a href={video.videoUrl} target="_blank" rel="noopener noreferrer">
        <Image
          src={video.thumbnail}
          width={240}
          height={144}
          className="rounded"
        />
        <div className="bg-secondary-alt-2/75 dark:bg-primary-dark/90 dark:text-text-primary-dark absolute top-0 h-full text-sm p-2 flex flex-col justify-between">
          <div className="flex gap-1">
            <div className="line-clamp-2 flex-1">{video.title}</div>
            <div>{platformIcon()}</div>
          </div>
          <div className="text-xs dark:text-text-secondary-dark inline">
            Published on: {formattedDate}{" "}
            <span className="dark:text-text-secondary-dark">
              ({fromNow} ago)
            </span>
          </div>
        </div>
      </a>
    </Card>
  );
}
