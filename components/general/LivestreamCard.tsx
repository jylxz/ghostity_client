import { Card, CardMedia, CardContent, Typography } from "@mui/material";

import React, { useContext, useState } from "react";
import Image from "next/image";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { updateDoc, arrayUnion, arrayRemove } from "firebase/firestore";
import LinkTo from "./LinkTo";
import YoutubeIcon from "../../public/images/yt_icon_rgb.svg";
import TwitchIcon from "../../public/images/TwitchGlitchPurple.svg";
import UserContext from "../../context/UserContext";
import UserFollowContext from "../../context/UserFollowContext"
import useHandleFollows from "../../hooks/useHandleFollows";

function channelPic(stream: Stream) {
  if (stream.platform === "twitch") {
    return (
      <div className="w-6 h-6">
        <a
          target="_blank"
          href={`${stream.stream.url}/about`}
          rel="noopener noreferrer"
        >
          <img
            src={stream.channel_img}
            // alt={`${stream.channel_name}'s profile img`}
            className="rounded-full min-w-[24px] min-h-[24px]"
          />
        </a>
      </div>
    );
  }

  return (
    <div className="w-6 h-6">
      <a
        target="_blank"
        href={`https://www.youtube.com/channel/${stream.channel_id}`}
        rel="noopener noreferrer"
      >
        <img
          src={stream.channel_img}
          // alt={`${stream.channel_name}'s profile img`}
          className="rounded-full min-w-[24px] min-h-[24px]"
        />
      </a>
    </div>
  );
}

function channelName(stream: Stream) {
  if (stream.platform === "twitch") {
    return (
      <a
        target="_blank"
        href={`${stream.stream.url}/about`}
        rel="noopener noreferrer"
      >
        {stream.channel_name}
      </a>
    );
  }

  return (
    <a
      target="_blank"
      href={`https://www.youtube.com/channel/${stream.channel_id}`}
      rel="noopener noreferrer"
    >
      {stream.channel_name}
    </a>
  );
}

function platformIcon(stream: Stream) {
  if (stream.platform === "twitch")
    return (
      <div className="h-5 min-w-[18px] w-[18px]">
        <a
          target="_blank"
          href={stream.stream.url}
          rel="noopener noreferrer"
          className="block"
        >
          <TwitchIcon />
        </a>
      </div>
    );

  return (
    <div className="h-5 min-w-[20px] w-5">
      <a
        target="_blank"
        href={stream.stream.url}
        rel="noopener noreferrer"
        className="block"
      >
        <YoutubeIcon />
      </a>
    </div>
  );
}

function FollowButton({
  channel,
  channelId,
}: {
  channel: string;
  channelId: string;
}) {
  const user = useContext(UserContext);
  const [follow, followed] = useHandleFollows(channelId)
  const [showFollowText, setShowFollowText] = useState(false);

  const icon = () => {
    if (followed) {
      if (showFollowText) {
        return (
          <>
            <AiOutlineHeart className="text-2xl h-5 min-w-[20px]" />
            <span className="self-center">{`Unfollow ${channel}`}</span>
          </>
        );
      }
      return <AiFillHeart className="text-2xl h-5 min-w-[20px]" />;
    }

    if (showFollowText) {
      return (
        <>
          <AiFillHeart className="text-2xl h-5 min-w-[20px]" />
          <span className="self-center">{`Follow ${channel}`}</span>
        </>
      );
    }
    return <AiOutlineHeart className="text-2xl h-5 w-5" />;
  };

  if (user)
    return (
      <div
        className="absolute top-1 left-1 bg-gray-400/80 flex items-start gap-1 text-primary px-1 py-0.5 mr-1 text-sm rounded cursor-pointer"
        onMouseEnter={() => setShowFollowText(true)}
        onMouseLeave={() => setShowFollowText(false)}
        onClick={() => follow()}
      >
        {icon()}
      </div>
    );

  return null;
}

export default function LivestreamCard({ stream }: { stream: Stream }) {
  return (
    <Card className="flex flex-col max-w-[16rem] shadow">
      <div className="relative">
        <a target="_blank" href={stream.stream.url} rel="noopener noreferrer">
          <CardMedia
            component="img"
            image={stream.stream.thumbnail}
            className="max-h-[144px] object-scale-down"
          />
        </a>
        <FollowButton
          channel={stream.channel_name}
          channelId={stream.channel_id}
        />
        <span className="absolute bottom-1 right-1 text-primary bg-gray-400/80 rounded p-1 text-sm font-medium cursor-default">{`${stream.stream.viewers} viewers`}</span>
      </div>
      <CardContent className="grow py-2.5">
        <a target="_blank" href={stream.stream.url} rel="noopener noreferrer">
          <Typography className="text-ellipsis overflow-hidden line-clamp-1 text-sm">
            {stream.stream.title}
          </Typography>
        </a>
      </CardContent>
      <CardContent className="bg-slate-100 py-1">
        <div className="flex gap-2 items-center">
          {channelPic(stream)}
          <Typography className="line-clamp-1 font-bold">
            {channelName(stream)}
          </Typography>
          {platformIcon(stream)}
        </div>
        <div className="flex justify-between items-center text-gray-400 mt-0.5">
          <Typography className="text-sm line-clamp-1 cursor-pointer">
            <LinkTo href={`/browse/games/${encodeURI(stream.stream.game)}`}>
              <span>{stream.stream.game}</span>
            </LinkTo>
          </Typography>
          <Typography className="text-sm cursor-default min-w-fit ml-1">
            {stream.language}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

