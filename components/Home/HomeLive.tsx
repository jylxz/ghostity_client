/* eslint-disable no-param-reassign */
/* eslint-disable import/no-unresolved */

// Libraries
import { useQuery } from "react-query";
import React, { useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components 
import SectionWrapper from "../general/SectionWrapper";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import HomeSectionHeading from "../general/HomeSectionHeading";
import LivestreamCard from "../general/LivestreamCard";

// CSS
import "swiper/css";
import "swiper/css/navigation";

export default function HomeLive() {
  const { isLoading, error, data } = useQuery<Streams, Error>(
    "streams",
    async () =>
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
      <HomeSectionHeading heading="Popular Live Channels" />
      <div className="flex justify-center">
        <span className="my-auto">
          <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="disabled:opacity-40"
            ref={(node) => setPrevEl(node)}
          >
            <ChevronLeftIcon className="text-4xl lg:text-5xl text-gray-600" />
          </motion.button>
        </span>
        <Swiper
          modules={[Navigation]}
          allowTouchMove={false}
          spaceBetween={6}
          slidesPerView={2}
          slidesPerGroup={2}
          navigation={{
            prevEl,
            nextEl,
          }}
          breakpoints={{
            768: { slidesPerGroup: 2, slidesPerView: 2 },
            1024: { slidesPerGroup: 3, slidesPerView: 3 },
            1280: {
              slidesPerGroup: 4,
              slidesPerView: 4,
            },
            1920: {
              slidesPerGroup: 5,
              slidesPerView: 5,
            },
          }}
          updateOnWindowResize
          className="py-4"
        >
          {data?.results?.map((stream: Stream, i: number) => (
            <SwiperSlide
              key={stream.channel_id}
              className="flex justify-center"
            >
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  delay: i * 0.02,
                  duration: 0.1,
                  ease: "easeIn",
                }}
              >
                <LivestreamCard stream={stream} />
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
        <span className="my-auto">
          <motion.button
            whileTap={{ scale: 0.8 }}
            type="button"
            className="disabled:opacity-40"
            ref={(node) => setNextEl(node)}
          >
            <ChevronRightIcon className="text-4xl lg:text-5xl text-gray-600" />
          </motion.button>
        </span>
      </div>
    </SectionWrapper>
  );
}
