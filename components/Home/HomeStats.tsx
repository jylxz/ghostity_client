// Libraries
import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Icons
import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";

// Components
import SectionWrapper from "../general/SectionWrapper";
import HomeSectionHeading from "../general/HomeSectionHeading";

// Images
import TwitchLogo from "../../public/images/TwitchGlitchWhite.svg";
import youtubeLogo from "../../public/images/yt_icon_mono_dark.png";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.4,
      delayChildren: 0.6
    },
  },
};

const listItem = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      duration: 0.5,
    },
  },
};

function HomeStatCard({
  backgroundColor,
  image,
  title,
  stat,
  className,
}: {
  backgroundColor: string;
  image: any;
  title: string;
  stat: string;
  className?: string;
}) {
  return (
    <motion.div
      variants={listItem}
      className={`${backgroundColor} ${className} h-[10rem] rounded flex flex-col items-center justify-center shadow`}
    >
      <div className="min-h-[40px] min-w-[40px] max-h-[56px] max-w-[56px] flex justify-center">
        {image}
      </div>
      <div className="flex flex-col items-center">
        <h3 className="font-bold underline underline-offset-4 text-sm">
          {title}
        </h3>
        <div className="sm:text-lg mx-1 text-center">{stat}</div>
      </div>
    </motion.div>
  );
}

export default function HomeStats({ stats }: Stats) {
  return (
    <SectionWrapper color="bg-slate-100">
      <HomeSectionHeading heading="Ghostity Stats" />
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="grid grid-cols-3"
      >
        <HomeStatCard
          backgroundColor="bg-primary"
          image={<GhostityIcon className="w-2/3" />}
          title="TOTAL"
          stat={`${stats.number_of_channels_in_db} V-Tubers`}
        />
        <HomeStatCard
          backgroundColor="bg-secondary"
          image={<CableOutlinedIcon className="w-5/6 h-5/6 my-auto" />}
          title="LIVE"
          stat={`${stats.number_of_channels_live} V-Tubers`}
          className="row-start-2"
        />
        <HomeStatCard
          backgroundColor="bg-secondary2"
          image={<LiveTvOutlinedIcon className="h-5/6 w-5/6" />}
          title="WATCHING"
          stat={`${stats.total_viewers} Weebs`}
        />
        <HomeStatCard
          image={<CorporateFareOutlinedIcon className="h-5/6 w-5/6" />}
          backgroundColor="bg-slate-200"
          title="ORGANIZATIONS"
          stat={`${stats.total_organizations} Organizations`}
          className="row-start-2"
        />
        <HomeStatCard
          backgroundColor="bg-youtubeRed"
          image={
            <div className="my-auto">
              <Image
                src={youtubeLogo}
                alt="Youtube logo"
                height={24}
                width={34}
                draggable={false}
              />
            </div>
          }
          title="YOUTUBE"
          stat={`${stats.number_live_youtube} Channels`}
          className="text-white"
        />
        <HomeStatCard
          backgroundColor="bg-twitchPurple"
          image={<TwitchLogo className="w-5/6 h-5/6" />}
          title="TWITCH"
          stat={`${stats.number_live_twitch} Channels`}
          className="text-white"
        />
      </motion.div>
    </SectionWrapper>
  );
}
