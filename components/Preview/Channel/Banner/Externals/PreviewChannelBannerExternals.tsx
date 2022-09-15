import Image from "next/image";
import React from "react";
import YoutubeIcon from "@icons/Youtube.png";
import TwitchIcon from "@icons/TwitchGlitchPurple.svg";
import { useWindowDimensions } from "hooks";

export default function PreviewChannelBannerExternals({
  profile,
}: {
  profile: Profile;
}) {
  const { width } = useWindowDimensions();
  return (
    <div className="flex flex-col gap-2 items-end">
      {profile.channels.some((channel) => channel.platform === "youtube") && (
        <a
          href={
            profile.channels.find((channel) => channel.platform === "youtube")
              ?.link
          }
          target="_blank"
          rel="noreferrer"
        >
          <button
            type="button"
            className="text-sm bg-secondary-alt-2 dark:bg-secondary-dark px-2 py-1 rounded flex items-center gap-2"
          >
            <Image src={YoutubeIcon} width={20} height={16} />
            {width && width > 600 && <span>Visit YouTube Channel</span>}
          </button>
        </a>
      )}
      {profile.channels.some((channel) => channel.platform === "twitch") && (
        <a
          href={
            profile.channels.find((channel) => channel.platform === "twitch")
              ?.link
          }
          target="_blank"
          rel="noreferrer"
        >
          <button
            type="button"
            className="text-sm bg-secondary-alt-2 dark:bg-secondary-dark px-2 py-1 rounded flex items-center gap-2"
          >
            <TwitchIcon className="w-5 h-5" />
            Visit Twitch Channel
          </button>
        </a>
      )}
    </div>
  );
}
