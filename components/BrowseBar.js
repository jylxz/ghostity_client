/* eslint-disable import/no-unresolved */
import { useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import GamesOutlinedIcon from "@mui/icons-material/GamesOutlined";

import SectionWrapper from "./SectionWrapper";
import GhostityLogo from "../public/images/Ghostity-svg-white.svg";

import "swiper/css";
import "swiper/css/navigation";

function BrowseBar() {
  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  return (
    <SectionWrapper color={"bg-slate-200"}>
      <h2 className="text-4xl mb-10 font-thin">Browse</h2>
      <div className="flex">
        <span className="my-auto">
          <button className="disabled:opacity-40" ref={navigationPrevRef}>
            <ChevronLeftIcon className="text-4xl lg:text-5xl text-gray-600" />
          </button>
        </span>
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          slidesPerGroup={1}
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
          onInit={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          className="child:text-white"
        >
          <SwiperSlide>
            <Link href="/browse" passHref>
              <div className="bg-[length:300%_300%] bg-left bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex flex-col justify-center items-center h-36 shadow cursor-pointer rounded animate-background-position-left">
                <div className="flex gap-2">
                  <Image
                    src={GhostityLogo}
                    alt="Ghostity logo"
                    height={40}
                    width={40}
                  ></Image>
                  <Image
                    src={GhostityLogo}
                    alt="Ghostity logo"
                    height={40}
                    width={40}
                    className="scale-x-[-1]"
                  ></Image>
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
          <button className="disabled:opacity-40" ref={navigationNextRef}>
            <ChevronRightIcon className="text-4xl lg:text-5xl text-gray-600" />
          </button>
        </span>
      </div>
    </SectionWrapper>
  );
}
export default BrowseBar;
