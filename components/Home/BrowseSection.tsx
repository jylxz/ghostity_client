/* eslint-disable import/no-unresolved */
import { useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import GamesOutlinedIcon from "@mui/icons-material/GamesOutlined";
import LinkTo from "../general/LinkTo";

import SectionWrapper from "../general/SectionWrapper";
import GhostityLogo from "../../public/images/Ghostity-svg.svg";

import "swiper/css";
import "swiper/css/navigation";

function BrowseBar() {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <SectionWrapper color="bg-slate-200">
      <h2 className="text-4xl mb-10 font-thin">Browse</h2>
      <div className="flex">
        <span className="my-auto">
          <button
            type="button"
            className="disabled:opacity-40"
            ref={(node) => setPrevEl(node)}
          >
            <ChevronLeftIcon className="text-4xl lg:text-5xl text-gray-600" />
          </button>
        </span>
        <Swiper
          spaceBetween={40}
          slidesPerView={1}
          slidesPerGroup={1}
          navigation={{
            prevEl,
            nextEl,
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
            <LinkTo href="/browse">
              <div className="bg-[length:300%_300%] bg-left bg-gradient-to-r from-primary via-secondary to-secondary2 flex flex-col justify-center items-center h-36 shadow-sm cursor-pointer rounded animate-background-position-left text-gray-500 ">
                <div className="flex gap-2">
                  <GhostityLogo className="h-10 w-10" />
                  <GhostityLogo className="h-10 w-10 -scale-x-[1]" />
                </div>
                <div className="text-2xl">Streams</div>
              </div>
            </LinkTo>
          </SwiperSlide>
          <SwiperSlide>
            <LinkTo href="/browse/games">
              <div className="bg-[length:300%_300%] bg-center bg-gradient-to-r from-primary via-secondary to-secondary2 flex flex-col justify-center items-center h-36 shadow-sm rounded animate-background-position-center cursor-pointer ">
                <GamesOutlinedIcon className="h-10 w-10 text-black" />
                <div className="text-2xl text-gray-500">Games</div>
              </div>
            </LinkTo>
          </SwiperSlide>
          <SwiperSlide>
            <LinkTo href="/browse/organizations">
              <div className="bg-[length:300%_300%] bg-right bg-gradient-to-r from-primary via-secondary to-secondary2 flex flex-col justify-center items-center h-36 shadow-sm rounded animate-background-position-right cursor-pointer text-gray-500">
                <CorporateFareOutlinedIcon className="text-black h-10 w-10" />
                <div className="text-2xl text-gray-500">Organizations</div>
              </div>
            </LinkTo>
          </SwiperSlide>
        </Swiper>
        <span className="my-auto">
          <button
            type="button"
            className="disabled:opacity-40"
            ref={(node) => setNextEl(node)}
          >
            <ChevronRightIcon className="text-4xl lg:text-5xl text-gray-600" />
          </button>
        </span>
      </div>
    </SectionWrapper>
  );
}
export default BrowseBar;
