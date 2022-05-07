/* eslint-disable import/no-unresolved */
import { useState } from "react";
import Link from "next/link";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import GamesOutlinedIcon from "@mui/icons-material/GamesOutlined";

import SectionWrapper from "../general/SectionWrapper";
import GhostityLogo from "../../public/images/Ghostity-svg-white.svg";

import "swiper/css";
import "swiper/css/navigation";

function BrowseBar() {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null)
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null)

  return (
    <SectionWrapper color="bg-slate-200">
      <h2 className="text-4xl mb-10 font-thin">Browse</h2>
      <div className="flex">
        <span className="my-auto">
          <button type="button" className="disabled:opacity-40" ref={(node) => setPrevEl(node)}>
            <ChevronLeftIcon className="text-4xl lg:text-5xl text-gray-600" />
          </button>
        </span>
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          slidesPerGroup={1}
          navigation={{
            prevEl,
            nextEl
          }}
          breakpoints={{
            768: {
              slidesPerGroup: 2,
              slidesPerView: 2,
            },
            1024: {
              slidesPerGroup: 3,
              slidesPerView: 3,
            },
          }}
          updateOnWindowResize
          modules={[Navigation]}
          className="child:text-white"
        >
          <SwiperSlide>
            <Link href="/browse" passHref>
              <div className="bg-[length:300%_300%] bg-left bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col justify-center items-center h-36 shadow cursor-pointer rounded animate-background-position-left">
                <div className="flex gap-2">
                  <GhostityLogo className="h-10 w-10" />
                  <GhostityLogo className="h-10 w-10 -scale-x-[1]" />
                </div>
                <div className="text-white text-2xl font-semibold">
                  All Streams
                </div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/games" passHref>
              <div className="bg-[length:300%_300%] bg-center bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col justify-center items-center h-36 shadow rounded animate-background-position-center cursor-pointer">
                <GamesOutlinedIcon className="text-white h-10 w-10" />
                <div className="text-white text-2xl font-semibold">Games</div>
              </div>
            </Link>
          </SwiperSlide>
          <SwiperSlide>
            <Link href="/organizations" passHref>
              <div className="bg-[length:300%_300%] bg-right bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col justify-center items-center h-36 shadow rounded animate-background-position-right cursor-pointer">
                <CorporateFareOutlinedIcon className="text-white h-10 w-10" />
                <div className="text-white text-2xl font-semibold">
                  Organizations
                </div>
              </div>
            </Link>
          </SwiperSlide>
        </Swiper>
        <span className="my-auto">
          <button type="button" className="disabled:opacity-40" ref={(node) => setNextEl(node)}>
            <ChevronRightIcon className="text-4xl lg:text-5xl text-gray-600" />
          </button>
        </span>
      </div>
    </SectionWrapper>
  );
}
export default BrowseBar;
