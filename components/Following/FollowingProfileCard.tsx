import React from "react";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import TwitchIcon from "../../public/images/TwitchGlitchPurple.svg";
import YoutubeIcon from "../../public/images/yt_icon_rgb.svg";
import TwitterIcon from "../../public/images/TwitterBlue.svg";
import useHandleFollows from "../../hooks/useHandleFollows";

function ChannelIcon({ channel }: { channel: Channel }) {
  if (channel.platform === "twitch") {
    return (
      <div className="h-5 w-5">
        <a href={channel.link} target="_blank" rel="noopener noreferrer">
          <TwitchIcon />
        </a>
      </div>
    );
  }

  if (channel.platform === "youtube") {
    return (
      <div className="h-5 w-5">
        <a href={channel.link} target="_blank" rel="noopener noreferrer">
          <YoutubeIcon />
        </a>
      </div>
    );
  }

  return null;
}

function SocialsIcon({
  social,
}: {
  social: { platform: string; url: string };
}) {
  return (
    <div className="w-5">
      <a href={social.url} target="_blank" rel="noopener noreferrer">
        <TwitterIcon />
      </a>
    </div>
  );
}

function FollowIcon({
  follow,
  followed,
}: {
  follow: () => Promise<void | void[]>;
  followed: boolean;
}) {
  return (
    <button type="button" className="rounded" onClick={() => follow()}>
      {followed ? (
        <AiFillHeart className="w-5 h-5" />
      ) : (
        <AiOutlineHeart className="w-5 h-5" />
      )}
    </button>
  );
}

export default function FollowingProfileCard({
  profile,
}: {
  profile: Profile;
}) {
  const [follow, followed] = useHandleFollows(profile.channels);

  return (
    <div className="relative w-56 h-32 rounded-lg border font-semibold">
      <div className="absolute w-full h-full z-0 rounded-lg">
        {profile.profile.img ? (
          <Image
            src={profile.profile?.img}
            layout="fill"
            draggable={false}
            className="blur-sm opacity-40 w-full object-cover object-center h-full rounded-lg text-sm"
          />
        ) : null}
      </div>
      <div className="relative z-10 h-full flex flex-col gap-1 items-center justify-center">
        <div>
          {profile.profile.img ? (
            <Image
              src={profile.profile?.img}
              width={48}
              height={48}
              alt="profileImage"
              className="rounded-full text-xs"
            />
          ) : null}
        </div>
        <span className="line-clamp-1 px-2 text-center">{profile.name}</span>
        <div className="flex items-center gap-2">
          {profile.channels.map((channel) => (
            <ChannelIcon key={channel.id} channel={channel} />
          ))}
          {profile.profile.social_media
            ? profile.profile.social_media.map((social) => (
                <SocialsIcon key={social.url} social={social} />
              ))
            : null}
          <FollowIcon follow={follow} followed={followed} />
        </div>
      </div>
    </div>
  );
}
