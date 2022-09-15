// Libraries
import React, { useContext, useState } from "react";
import { Card, CardContent, Typography } from "@mui/material";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/future/image";

// Icons
import { AiOutlineHeart, AiFillHeart, AiOutlineStop } from "react-icons/ai";
import TwitchIcon from "@icons/TwitchGlitchPurple.svg";
import YoutubeIcon from "@icons/Youtube.png";

// Contexts
import { ChannelPreviewContext, UserContext, AdminContext, BlacklistContext } from "contexts";

// Hooks
import { useWindowDimensions } from "hooks";
import useHandleFollows from "../../hooks/useHandleFollows/useHandleFollows";

// Components
import LinkTo from "./LinkTo";

function ChannelPicAndName({ stream }: { stream: Stream }) {
  const preview = useContext(ChannelPreviewContext);
  const { width } = useWindowDimensions();

  function handleChannelPreview() {
    if (preview && width && width > 768) {
      preview.setPreviewChannelId(stream.channel_id);
      preview.setShowPreview(true);
    } else {
      switch (stream.platform) {
        case "youtube":
          window.open(`https://www.youtube.com/channel/${stream.channel_id}`)
          break
        case "twitch":
          window.open(`${stream.stream.url}/about`)
          break
        default:
          break
      }
    }
  }

  return (
    <div className="flex-1 my-auto">
      <button
        type="button"
        className="flex gap-2 items-center"
        onClick={() => handleChannelPreview()}
      >

        <Image
          src={stream.channel_img}
          // priority
          height="22"
          width="22"
          alt={`${stream.channel_name}'s profile img`}
          className="rounded-full min-w-[22px] min-h-[22px] text-[0px]"
        />
        <Typography className="line-clamp-1 text-sm font-bold">
          {stream.channel_name}
        </Typography>
      </button>
    </div>
  );
}

function OrganizationIcon({
  mainAffiliation,
}: {
  mainAffiliation: Stream["channel_info"]["main_affiliation"];
}) {
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
          <button type="button" className="flex items-center">
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
  switch (stream.platform) {
    case "twitch":
      return (
        <div className="h-5 min-w-[18px] w-[18px]">
          <a
            target="_blank"
            href={stream.stream.url}
            rel="noopener nor eferrer"
            className="block"
          >
            <TwitchIcon />
          </a>
        </div>
      );
    case "youtube":
      return (
        <div className="h-5 min-w-[20px] w-5 flex items-center">
          <a
            target="_blank"
            href={stream.stream.url}
            rel="noopener noreferrer"
            className="block bg-white bg-clip-text"
          >
            <Image
              src={YoutubeIcon}
              height={16}
              width={20}
              alt="YouTube icon"
            />
          </a>
        </div>
      );
    default: 
      return null
  }
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
        onPointerDown={() => follow()}  
        onPointerEnter={() => setHoverState(true)}
        onPointerLeave={() => setHoverState(false)}
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
          <ChannelPicAndName stream={stream} />
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
