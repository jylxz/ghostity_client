import React from "react";
import Image from "next/image";
import CableOutlinedIcon from "@mui/icons-material/CableOutlined";
import LiveTvOutlinedIcon from "@mui/icons-material/LiveTvOutlined";
import SectionWrapper from "../general/SectionWrapper";
import TwitchLogo from "../../public/images/TwitchGlitchWhite.svg";
import youtubeLogo from "../../public/images/yt_icon_mono_dark.png";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";


function Stats({ stats }: Stats) {
  return (
    <SectionWrapper color="bg-slate-50">
      <h2 className="text-4xl mb-8 font-thin">Ghostity Stats</h2>
      <div className="grid grid-cols-4 grid-rows-3 gap-4 sm:gap-8">
        <div className="bg-gradient-to-r from-primary via-secondary to-secondary2 h-[10rem] rounded flex items-center justify-center shadow">
          <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
            <div className="min-h-[60px] min-w-[60px] flex justify-center">
              <GhostityIcon className="h-14 w-14" />
            </div>
            <h3 className="font-bold underline underline-offset-4 text-sm">
              TOTAL
            </h3>
            <div className="text-lg mx-1 text-center text-gray-500">
              {stats.number_of_channels_in_db} V-Tubers
            </div>
          </div>
        </div>
        <div className="bg-gray-600 h-[10rem] rounded text-white flex  items-center justify-center shadow">
          <div className="flex flex-col items-center justify-center gap-1 w-full h-full">
            <div className="min-h-[56px] min-w-[56px] flex justify-center">
              <CableOutlinedIcon className="h-[54px] w-[54px]" />
            </div>
            <h3 className="font-bold underline underline-offset-4 text-sm">
              LIVE
            </h3>
            <div className="text-lg mx-1 text-center">
              {stats.number_of_channels_live} V-Tubers
            </div>
          </div>
        </div>
        <div className="bg-slate-300 text-white rounded col-start-2 col-end-5 row-start-1 row-end-3 shadow">
          <div className="h-full mx-10 flex flex-col justify-center items-center gap-3">
            <div className="flex justify-center items-center">
              <LiveTvOutlinedIcon className="h-24 w-24" />
            </div>
            <h3 className="font-bold underline underline-offset-4 text-2xl">
              WATCHING
            </h3>
            <div className="text-4xl">{stats.total_viewers} Weebs</div>
          </div>
        </div>
        <div className="bg-youtubeRed text-white rounded col-start-1 col-end-3 shadow">
          <div className="h-full mx-10 flex flex-col justify-center items-center gap-1">
            <div>
              <Image
                src={youtubeLogo}
                alt="Youtube logo"
                height={60}
                width={80}
                draggable={false}
              />
            </div>
            <h3 className="font-bold underline underline-offset-4">YOUTUBE</h3>
            <div className="text-lg">{stats.number_live_youtube} Channels</div>
          </div>
        </div>
        <div className="bg-twitchPurple text-white rounded col-start-3 col-end-5 shadow">
          <div className="h-full flex flex-col justify-center items-center gap-1">
            <div>
              <TwitchLogo className="w-14 h-14" />
            </div>
            <h3 className="font-bold underline underline-offset-4">TWITCH</h3>
            <div className="text-lg">{stats.number_live_twitch} Channels</div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Stats;
