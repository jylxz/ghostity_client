/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { useQuery } from "react-query";
import React, { useState } from "react";
import axios from "axios";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SectionWrapper from "../general/SectionWrapper";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import LivestreamCard from "../general/LivestreamCard";

import { Stream } from "../../interfaces/API.interface";

import "swiper/css";
import "swiper/css/navigation";

function PopularLiveChannels() {
  const { isLoading, error, data } = useQuery("streams", async () =>
    axios
      .get("https://api.ghostity.com/streams?limit=20")
      .then((res) => res.data)
  );

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  if (isLoading) {
    return (
      <SectionWrapper color="bg-slate-100">
        <h2 className="text-4xl mb-8 font-thin">Popular Live Channels</h2>
        <div className="flex justify-center items-center h-[17rem]">
          <GradientCircularProgress />
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper color="bg-slate-100">
        <h2 className="text-4xl mb-8 font-thin">Popular Live Channels</h2>
        <div className="flex justify-center items-center h-[17rem]">
          <ProblemLoading />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper color="bg-slate-100">
      <h2 className="text-4xl mb-8 font-thin">Popular Live Channels</h2>
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
          modules={[Navigation]}
          allowTouchMove={false}
          spaceBetween={20}
          slidesPerView={2}
          slidesPerGroup={2}
          navigation={{
            prevEl,
            nextEl,
          }}
          breakpoints={{
            768: { slidesPerGroup: 3, slidesPerView: 3 },
            1024: { slidesPerGroup: 4, slidesPerView: 4 },
            1280: {
              slidesPerGroup: 5,
              slidesPerView: 5,
            },
            1920: {
              slidesPerGroup: 6,
              slidesPerView: 6,
            },
          }}
          updateOnWindowResize
          className="py-4"
        >
          {data.results.map((stream: Stream) => (
            <SwiperSlide key={stream.channel_id}>
              <LivestreamCard stream={stream} />
            </SwiperSlide>
          ))}
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

export default PopularLiveChannels;
