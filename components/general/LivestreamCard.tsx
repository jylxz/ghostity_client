import { Card, CardMedia, CardContent, Typography } from "@mui/material";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import YoutubeIcon from "../../public/images/yt_icon_rgb.svg";
import TwitchIcon from "../../public/images/TwitchGlitchPurple.svg";

import * as interfaces from "../../interfaces/API.interface"

function channelPic(stream: interfaces.Stream) {
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

function channelName(stream: interfaces.Stream) {
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

function platformIcon(stream: interfaces.Stream) {
  if (stream.platform === "twitch")
    return (
      <span className="min-w-[16px]">
        <a
          target="_blank"
          href={stream.stream.url}
          rel="noopener noreferrer"
          className="block"
        >
          <TwitchIcon />
        </a>
      </span>
    );

  return (
    <span className="min-w-[20px]">
      <a
        target="_blank"
        href={stream.stream.url}
        rel="noopener noreferrer"
        className="block"
      >
        <YoutubeIcon />
      </a>
    </span>
  );
}

function LivestreamCard({ stream }: {stream: interfaces.Stream}) {
  return (
    <Card className="flex flex-col max-w-[15rem] shadow">
      <div className="relative">
        <a target="_blank" href={stream.stream.url} rel="noopener noreferrer">
          <CardMedia
            component="img"
            image={stream.stream.thumbnail}
            className="max-h-[135px] object-scale-down"
          />
        </a>
        <span className="absolute bottom-1 right-1 bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 p-0.5 rounded text-white text-sm font-medium cursor-default">{`${stream.stream.viewers} viewers`}</span>
      </div>
      <CardContent className="h-[4rem] max-h-[4rem] grow py-2.5">
        <a target="_blank" href={stream.stream.url} rel="noopener noreferrer">
          <Typography className="text-ellipsis overflow-hidden line-clamp-2 text-sm">
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
          <Typography className="text-sm line-clamp-1">
            <Link href={`/browse/games/${encodeURI(stream.stream.game)}`} passHref>
              <span>{stream.stream.game}</span>
            </Link>
          </Typography>
          <Typography className="text-sm cursor-default">
            {stream.language}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}

export default LivestreamCard;
