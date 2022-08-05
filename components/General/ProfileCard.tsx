// Libraries
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import numbro from "numbro";

// Icons
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import BilibiliIcon from "@icons/Bilibili.svg";
import TwitchIcon from "@icons/TwitchGlitchPurple.svg";
import YoutubeIcon from "@icons/Youtube.png";
import TwitterIcon from "@icons/TwitterBlue.svg";
// Hooks
import useHandleFollows from "../../hooks/useHandleFollows/useHandleFollows";

const animations = {
  icons: {
    initial: {
      scale: 0,
      opacity: 0,
    },
    animate: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
      },
    },
  },
};

function ChannelIcon({ channel }: { channel: Channel }) {
  return (
    <motion.button
      variants={animations.icons}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      className="h-5 w-5"
    >
      <a href={channel.link} target="_blank" rel="noopener noreferrer">
        {channel.platform === "youtube" ? (
          <Image src={YoutubeIcon} height={15} width={20} alt="YouTube icon" />
        ) : null}
        {channel.platform === "twitch" ? <TwitchIcon /> : null}
        {channel.platform === "bilibili" ? <BilibiliIcon /> : null}
      </a>
    </motion.button>
  );
}

function SocialsIcon({
  social,
}: {
  social: { platform: string; url: string };
}) {
  return (
    <motion.button
      variants={animations.icons}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      className="w-5"
    >
      <a href={social.url} target="_blank" rel="noopener noreferrer">
        {social.platform === "twitter" ? <TwitterIcon /> : null}
      </a>
    </motion.button>
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
    <motion.button
      variants={animations.icons}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      type="button"
      className="rounded dark:text-primary"
      onClick={() => follow()}
    >
      {followed ? (
        <AiFillHeart className="w-5 h-5" />
      ) : (
        <AiOutlineHeart className="w-5 h-5" />
      )}
    </motion.button>
  );
}

function SubscriberCount({ subcount }: { subcount: number }) {
  return (
    <span className="dark:text-primary text-sm font-medium mt-2">
      Subscribers:{" "}
      {numbro(subcount).format({
        thousandSeparated: true,
        totalLength: subcount > 1000000 ? 3 : 0,
      })}
    </span>
  );
}

export default function ProfileCard({
  profile,
  altName,
  language,
  subCount,
}: {
  profile: Profile;
  altName?: string;
  language?: string;
  subCount?: boolean;
}) {
  const [follow, followed] = useHandleFollows(profile.channels);

  return (
    <motion.div
      layout
      className="relative w-72 sm:w-[19rem] h-48 rounded-lg dark:border-0 border"
    >
      <div className="absolute w-full h-40 z-0 rounded-lg overflow-hidden">
        {profile.profile.img ? (
          <Image
            src={profile.profile?.img}
            layout="fill"
            draggable={false}
            alt={`${profile.name}'s profile image`}
            className="blur-sm scale-1.1 opacity-40 w-full object-cover object-center h-full rounded-t-lg text-sm"
          />
        ) : null}
      </div>
      <div className="relative z-10 h-full flex flex-col gap-0.5 ">
        <div className="flex-1 py-3 z-30 flex flex-col items-center sm-custom-scroll overflow-y-auto overscroll-contain">
          <a
            href={profile.channels[0].link}
            target="_blank"
            rel="noopener noreferrer"
          >
            {profile.profile.img ? (
              <Image
                src={profile.profile?.img}
                width={48}
                height={48}
                alt="profileImage"
                className="rounded-full text-xs"
              />
            ) : null}
          </a>
          <a
            href={profile.channels[0].link}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="dark:text-primary line-clamp-1 px-2 text-center font-medium">
              {profile.name}
            </span>
          </a>
          <span className="dark:text-text-primary-dark text-gray-600 text-xs">
            {altName ? `(${altName})` : null}
          </span>
          <span className="dark:text-text-primary-dark text-gray-600 text-xs font-medium">
            {language || null}
          </span>
          {subCount && profile.channels[0].platform === "youtube" ? (
            <SubscriberCount subcount={profile.channels[0].sub_count} />
          ) : null}
          <div className="text-xs dark:text-text-primary-dark text-gray-600 font-medium px-3 w-full mt-5 break-words whitespace-pre-line">
            {profile.channels[0].description}
          </div>
        </div>
        <motion.div
          // initial="initial"
          // animate="animate"
          // transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
          className="flex items-center gap-2 dark:bg-secondary-dark dark:border-0 bg-secondary-alt justify-center py-2 rounded-b-lg border-t"
        >
          {profile.channels.map((channel) => (
            <ChannelIcon key={channel.id} channel={channel} />
          ))}
          {profile.profile.social_media
            ? profile.profile.social_media.map((social) => (
                <SocialsIcon key={social.url} social={social} />
              ))
            : null}
          <FollowIcon follow={follow} followed={followed} />
        </motion.div>
      </div>
    </motion.div>
  );
}
