import { Card, CardMedia, CardContent, Typography } from "@mui/material";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import youtubeIcon from "../public/images/yt_icon_rgb.svg";
import twitchIcon from "../public/images/TwitchGlitchPurple.svg";

function channelPic(stream) {
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
            alt={`${stream.channel_name}'s profile img`}
            className="rounded-full min-w-[24px] min-h-[24px]"
          ></img>
        </a>
      </div>
    );
  }

  if (stream.platform === "youtube") {
    return (
      <div className="w-6 h-6">
        <a
          target="_blank"
          href={`https://www.youtube.com/channel/${stream.channel_id}`}
          rel="noopener noreferrer"
        >
          <img
            src={stream.channel_img}
            alt={`${stream.channel_name}'s profile img`}
            className="rounded-full min-w-[24px] min-h-[24px]"
          ></img>
        </a>
      </div>
    );
  }
}

function channelName(stream) {
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

  if (stream.platform === "youtube") {
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
}

function platformIcon(stream) {
  if (stream.platform === "twitch")
    return (
      <span className="min-w-[16px]">
        <a
          target="_blank"
          href={stream.stream.url}
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Image
            src={twitchIcon}
            alt="Twitch Icon"
            width={20}
            height={20}
          ></Image>
        </a>
      </span>
    );

  if (stream.platform === "youtube")
    return (
      <span className="min-w-[20px]">
        <a
          target="_blank"
          href={stream.stream.url}
          rel="noopener noreferrer"
          className="flex items-center"
        >
          <Image
            src={youtubeIcon}
            alt="Youtube Icon"
            width={20}
            height={20}
          ></Image>
        </a>
      </span>
    );
}

function LivestreamCard({ stream }) {
  return (
    <Card className="flex flex-col max-w-[16rem] shadow">
      <div className="relative">
        <a target="_blank" href={stream.stream.url} rel="noopener noreferrer">
          <CardMedia
            component="img"
            image={stream.stream.thumbnail}
            className="w-[360px] object-scale-down"
          ></CardMedia>
        </a>
        <span className="absolute bottom-1 right-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-0.5 rounded text-white text-sm font-medium cursor-default">{`${stream.stream.viewers} viewers`}</span>
      </div>
      <CardContent className="h-[4rem] max-h-[4rem] grow py-2.5">
        <a target="_blank" href={stream.stream.url} rel="noopener noreferrer">
          <Typography className="text-ellipsis overflow-hidden line-clamp-2 font-medium text-sm">
            {stream.stream.title}
          </Typography>
        </a>
      </CardContent>
      <CardContent className="bg-gray-100 py-1">
        <div className="flex gap-2 items-center">
          {channelPic(stream)}
          <Typography className="line-clamp-1 font-bold">
            {channelName(stream)}
          </Typography>
          {platformIcon(stream)}
        </div>
        <div className="flex justify-between items-center text-gray-500 mt-0.5">
          <Typography className="text-sm line-clamp-1">
            <Link href={`/games/${stream.stream.game}`} passHref>
              {stream.stream.game}
            </Link>
          </Typography>
          <Typography className="text-sm cursor-default">{stream.language}</Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default LivestreamCard;
