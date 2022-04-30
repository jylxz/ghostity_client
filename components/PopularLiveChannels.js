/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */
import { useQuery } from "react-query";
import React, { useRef } from "react";
import axios from "axios";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import SectionWrapper from "./SectionWrapper";
import GradientCircularProgress from "./GradientCircularProgress";
import ProblemLoading from "./ProblemLoading";
import LivestreamCard from "./LivestreamCard";

import "swiper/css";
import "swiper/css/navigation";

function PopularLiveChannels() {
  const { isLoading, error, data } = useQuery("streams", async () =>
    axios
      .get("https://api.ghostity.com/streams?limit=20")
      .then((res) => res.data)
  );

  const navigationNextRef = useRef(null);
  const navigationPrevRef = useRef(null);

  if (isLoading) {
    return (
      <SectionWrapper color={"bg-slate-100"}>
        <h2 className="text-4xl mb-8 font-thin">
          Popular Live Channels
        </h2>
        <div className="flex justify-center items-center h-[17rem]">
          <GradientCircularProgress />
        </div>
      </SectionWrapper>
    );
  }

  if (error) {
    return (
      <SectionWrapper color={"bg-slate-100"}>
        <h2 className="text-4xl mb-8 font-thin">
          Popular Live Channels
        </h2>
        <div className="flex justify-center items-center h-[17rem]">
          <ProblemLoading />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper color={"bg-slate-100"}>
      <h2 className="text-4xl mb-8 font-thin">
        Popular Live Channels
      </h2>
      <div className="flex">
        <span className="my-auto">
          <button className="disabled:opacity-40" ref={navigationPrevRef}>
            <ChevronLeftIcon className="text-4xl lg:text-5xl text-gray-600" />
          </button>
        </span>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={2}
          slidesPerGroup={2}
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
          onInit={(swiper) => {
            setTimeout(() => {
              swiper.params.navigation.prevEl = navigationPrevRef.current;
              swiper.params.navigation.nextEl = navigationNextRef.current;
              swiper.navigation.init();
              swiper.navigation.update();
            });
          }}
          className="py-4"
        >
          {data.map((stream) => (
            <SwiperSlide key={stream.channel_id}>
              <LivestreamCard stream={stream}></LivestreamCard>
            </SwiperSlide>
          ))}
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

export default PopularLiveChannels;
