// Libraries
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import numbro from "numbro";

// Icons
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import TwitchIcon from "../../public/images/TwitchGlitchPurple.svg";
import YoutubeIcon from "../../public/images/yt_icon_rgb.svg";
import TwitterIcon from "../../public/images/TwitterBlue.svg";

// Hooks
import useHandleFollows from "../../hooks/useHandleFollows";

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
        {channel.platform === "youtube" ? <YoutubeIcon /> : null}
        {channel.platform === "twitch" ? <TwitchIcon /> : null}
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
      className="rounded"
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
      <span className="text-sm mt-2">
        Subscribers:
        {" "}
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
  size,
  subCount
}: {
  profile: Profile;
  altName?: string;
  language?: string;
  size: "normal" | "large"
  subCount?: boolean
}) {
  const [follow, followed] = useHandleFollows(profile.channels);

  const cardSize = size === "large" ? {cardHeight: "h-48", imageHeight: "h-40"} : {cardHeight: "h-40", imageHeight: "h-32"}


  return (
    <motion.div layout className={`relative w-60 ${cardSize.cardHeight} rounded-lg border`}>
      <div className={`absolute w-full ${cardSize.imageHeight} z-0 rounded-lg`}>
        {profile.profile.img ? (
          <Image
            src={profile.profile?.img}
            layout="fill"
            draggable={false}
            className="blur-sm opacity-40 w-full object-cover object-center h-full rounded-lg text-sm"
          />
        ) : null}
      </div>
      <div className="relative z-10 h-full flex flex-col gap-0.5">
        <div className={`${cardSize.imageHeight} flex flex-col justify-center items-center`}>
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
            <span className="line-clamp-1 px-2 text-center">
              {profile.name}
            </span>
          </a>
          <span className="text-gray-600 text-xs">
            {altName ? `(${altName})` : null}
          </span>
          <span className="text-gray-600 text-xs">{language || null}</span>
          {subCount && profile.channels[0].platform === "youtube" ? <SubscriberCount subcount={profile.channels[0].sub_count}/> : null}
        </div>
        <motion.div
          // initial="initial"
          // animate="animate"
          // transition={{ staggerChildren: 0.2, delayChildren: 0.4 }}
          className="flex items-center gap-2 bg-white justify-center py-2 rounded-b-lg border-t"
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
