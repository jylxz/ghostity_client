// Libraries
import React, { useContext, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Icons
import { AiOutlineHeart, AiFillHeart, AiOutlineStop } from "react-icons/ai";
import YoutubeIcon from "../../public/images/yt_icon_rgb.png";
import TwitchIcon from "../../public/images/TwitchGlitchPurple.svg";

// Contexts
import UserContext from "../../context/UserContext";
import AdminContext from "../../context/AdminContext";
import BlacklistContext from "../../context/BlacklistContext";

// Hooks
import useHandleFollows from "../../hooks/useHandleFollows";

// Components
import LinkTo from "./LinkTo";

function ChannelPic({ stream }: { stream: Stream }) {
  if (stream.platform === "twitch") {
    return (
      <div className="w-6 h-6">
        <a
          target="_blank"
          href={`${stream.stream.url}/about`}
          rel="noopener noreferrer"
        >
          <Image
            src={stream.channel_img}
            // priority
            height="22"
            width="22"
            alt={`${stream.channel_name}'s profile img`}
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
        <Image
          src={stream.channel_img}
          height="24"
          width="24"
          alt={`${stream.channel_name}'s profile img`}
          className="rounded-full min-w-[24px] min-h-[24px]"
        />
      </a>
    </div>
  );
}

function ChannelName({ stream }: { stream: Stream }) {
  if (stream.platform === "twitch") {
    return (
      <a
        target="_blank"
        href={`${stream.stream.url}/about`}
        rel="noopener noreferrer"
      >
        <span title={stream.channel_name}>{stream.channel_name}</span>
      </a>
    );
  }

  return (
    <a
      target="_blank"
      href={`https://www.youtube.com/channel/${stream.channel_id}`}
      rel="noopener noreferrer"
    >
      <span title={stream.channel_name}>{stream.channel_name}</span>
    </a>
  );
}

function OrganizationIcon({ mainAffiliation }: { mainAffiliation: Stream["channel_info"]["main_affiliation"] }) {
  const [hoverState, setHoverState] = useState(false);

  if (mainAffiliation) {
    return (
      <div
        className="relative flex items-center"
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        <LinkTo
          href={`/browse/organizations/${mainAffiliation.organization_name.toLowerCase()}`}
        >
        <button
          type="button"
          className="flex items-center"
        >
            <Image
              src={mainAffiliation.organization_logo}
              alt={`${mainAffiliation.organization_name}'s alt logo`}
              height={22}
              width={22}
              className="rounded-full text-xs"
            />
        </button>
          </LinkTo>
        {hoverState ? (
          <span className="absolute whitespace-nowrap dark:bg-secondary-dark-2 bg-secondary-alt-2 text-xs px-2 py-1 top-[24px] right-0 rounded">
            {`${mainAffiliation.organization_name} | ${mainAffiliation.full_name}`}
          </span>
        ) : null}
      </div>
    );
  }

  return null;
}

function PlatformIcon({ stream }: { stream: Stream }) {
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
        className="block bg-white bg-clip-text"
      >
        <Image src={YoutubeIcon} height={16} width={20} />
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
  const [follow, followed] = useHandleFollows(channelId);
  const [showFollowText, setShowFollowText] = useState(false);

  if (user)
    return (
      <motion.button
        layout
        layoutId={channelId}
        // initial={{ opacity: 0, scale: 0 }}
        // animate={{ opacity: 1, scale: 1, transition: { duration: 0.6, delay: 1 } }}
        // exit={{opacity: 0}}
        className="absolute top-1 left-1 dark:bg-secondary-dark/80 bg-gray-400/80 text-primary px-1.5 py-0.5 mr-1 text-sm rounded"
        onHoverStart={() => setShowFollowText(true)}
        onHoverEnd={() => setShowFollowText(false)}
        onClick={() => follow()}
      >
        {followed ? (
          <div>
            {showFollowText ? (
              <div className="flex">
                <motion.div layout>
                  <AiOutlineHeart className="text-2xl h-6 min-w-[20px]" />
                </motion.div>
                <motion.span
                  layout
                  className="self-center"
                >{`Unfollow ${channel}`}</motion.span>
              </div>
            ) : (
              <motion.div layout>
                <AiFillHeart className="text-2xl h-6 min-w-[20px]" />
              </motion.div>
            )}
          </div>
        ) : (
          <div>
            {showFollowText ? (
              <div className="flex">
                <motion.div layout>
                  <AiFillHeart className="text-2xl h-6 min-w-[20px]" />
                </motion.div>
                <motion.span
                  layout
                  className="self-center"
                >{`Follow ${channel}`}</motion.span>
              </div>
            ) : (
              <motion.div layout>
                <AiOutlineHeart className="text-2xl h-6 min-w-[20px]" />
              </motion.div>
            )}
          </div>
        )}
      </motion.button>
    );

  return null;
}

function SimpleFollowButton({ channelId }: { channelId: string }) {
  const user = useContext(UserContext);
  const [follow, followed] = useHandleFollows(channelId);
  const [hoverState, setHoverState] = useState(false);

  if (user)
    return (
      <motion.button
        whileTap={{ scale: 0.7 }}
        className="absolute top-1.5 left-1.5 dark:bg-secondary-dark/80 bg-gray-400/80 text-primary px-1.5 py-0.5 mr-1 text-sm rounded"
        onClick={() => follow()}
        onMouseEnter={() => setHoverState(true)}
        onMouseLeave={() => setHoverState(false)}
      >
        <AnimatePresence exitBeforeEnter>
          {(() => {
            if (followed)
              return hoverState ? (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key="initialState"
                >
                  <AiOutlineHeart className="text-2xl h-6 min-w-[20px]" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  key="unfollowbutton"
                >
                  <AiFillHeart className="text-2xl h-6 min-w-[20px]" />
                </motion.div>
              );

            if (!followed)
              return hoverState ? (
                <motion.div
                  initial={{ scale: 0.1 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.1 }}
                  key="initialState"
                >
                  <AiFillHeart className="text-2xl h-6 min-w-[20px]" />
                </motion.div>
              ) : (
                <motion.div
                  initial={{ scale: 0.1 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0.1 }}
                  key="unfollowbutton"
                >
                  <AiOutlineHeart className="text-2xl h-6 min-w-[20px]" />
                </motion.div>
              );
          })()}
        </AnimatePresence>
      </motion.button>
    );

  return null;
}

function BlacklistButton({ stream }: { stream: Stream }) {
  const admin = useContext(AdminContext);
  const { setShowBlacklistModal, setBlacklistChannel } =
    useContext(BlacklistContext);

  const handleBlacklist = () => {
    setBlacklistChannel(stream);
    setShowBlacklistModal(true);
  };

  if (admin)
    return (
      <button
        type="button"
        onClick={() => handleBlacklist()}
        className="absolute bottom-1 left-1 bg-gray-400/80 flex items-start gap-1 text-red-400 px-1 py-0.5 text-sm rounded"
      >
        <AiOutlineStop className="w-5 h-5" />
      </button>
    );

  return null;
}

export default function LivestreamCard({ stream }: { stream: Stream }) {
  return (
    <Card className="flex flex-col max-w-[22rem] shadow ">
      <div className="relative max-w-[22rem] max-h-[198px] dark:bg-secondary-dark-2">
        <a target="_blank" href={stream.stream.url} rel="noopener noreferrer">
          <Image
            src={stream.stream.thumbnail}
            alt={`${stream.channel_name}'s stream thumbnail`}
            height={198}
            width={352}
            className="dark:bg-secondary-dark-2"
            // priority
          />
        </a>
        {/* <FollowButton
          channel={stream.channel_name}
          channelId={stream.channel_id}
        /> */}
        <SimpleFollowButton channelId={stream.channel_id} />
        <BlacklistButton stream={stream} />
        <span className="absolute bottom-2 right-1.5 text-primary dark:bg-secondary-dark/80 bg-gray-400/80 rounded p-1 text-sm cursor-default">{`${stream.stream.viewers} viewers`}</span>
      </div>
      <CardContent className="dark:bg-secondary-dark-2 dark:text-text-primary-dark grow py-2.5">
        <div>
          <a target="_blank" href={stream.stream.url} rel="noopener noreferrer">
            <Typography
              title={stream.stream.title}
              className="text-ellipsis overflow-hidden line-clamp-1 text-sm"
            >
              {stream.stream.title}
            </Typography>
          </a>
        </div>
      </CardContent>
      <CardContent
        className="bg-secondary-alt dark:bg-secondary-dark"
        sx={{
          ":last-child": {
            paddingTop: "0.25rem",
            paddingBottom: "0.25rem",
          },
        }}
      >
        <div className="flex gap-2 items-center dark:text-primary">
          <ChannelPic stream={stream} />
          <Typography className="line-clamp-1 text-sm font-bold flex-1">
            <ChannelName stream={stream} />
          </Typography>
          <OrganizationIcon
            mainAffiliation={stream.channel_info.main_affiliation}
          />

          <PlatformIcon stream={stream} />
        </div>
        <div className="flex justify-between items-center dark:text-text-secondary-dark text-text-secondary mt-0.5">
          <Typography className="text-sm line-clamp-1 cursor-pointer">
            <LinkTo href={`/browse/games/${encodeURI(stream.stream.game)}`}>
              <span className="line-clamp-1">{stream.stream.game}</span>
            </LinkTo>
          </Typography>
          <Typography className="text-sm cursor-default min-w-fit ml-1">
            {stream.stream.language}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
}
