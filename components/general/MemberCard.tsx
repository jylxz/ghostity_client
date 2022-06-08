import React from "react";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import useHandleFollows from "../../hooks/useHandleFollows";
import TwitchIcon from "../../public/images/TwitchGlitchPurple.svg";
import YoutubeIcon from "../../public/images/yt_icon_rgb.svg";
import TwitterIcon from "../../public/images/TwitterBlue.svg";

export default function MemberCard({
  name,
  altName,
  image,
  language,
  channels,
  socials,
}: {
  name: string;
  altName?: string;
  image?: string;
  language?: string;
  channels: Channel[];
  socials?: { platform: string; url: string }[];
}) {
  const [follow, followed] = useHandleFollows(channels);

  const channelIcon = (channel: Channel) => {
    if (channel.platform === "twitch") {
      return (
        <div className="h-5 w-5">
          <a href={channel.link} target="_blank" rel="noopener noreferrer">
            <TwitchIcon />
          </a>
        </div>
      );
    }

    return (
      <div className="w-5">
        <a href={channel.link} target="_blank" rel="noopener noreferrer">
          <YoutubeIcon />
        </a>
      </div>
    );
  };

  const socialsIcon = (social: { platform: string; url: string }) => (
    <div className="w-5">
      <a href={social.url} target="_blank" rel="noopener noreferrer">
        <TwitterIcon />
      </a>
    </div>
  );

  const followIcon = () => (
    <button type="button" className="rounded" onClick={() => follow()}>
      {followed ? (
        <AiFillHeart className="w-5 h-5" />
      ) : (
        <AiOutlineHeart className="w-5 h-5" />
      )}
    </button>
  );

  return (
    <div className="grid items-center">
      {image ? (
        <img
          src={image}
          alt={`${name}'s profile pic`}
          className="rounded-full w-24 h-24 shadow-md mx-auto text-xs"
        />
      ) : null}
      <div className="mt-1 text-center">{name}</div>
      <div className="flex flex-col items-center">
        {altName ? (
          <div className="text-xs text-gray-500">{`(${altName})`}</div>
        ) : null}
        <div className="text-xs text-gray-500">{language}</div>
      </div>
      <div className={`flex justify-center items-center gap-2 ${language ? "mt-2" : ""}`}>
        {channels.map((channel) => channelIcon(channel))}
        {socials ? socials.map((social) => socialsIcon(social)) : null}
        {followIcon()}
      </div>
    </div>
  );
}
