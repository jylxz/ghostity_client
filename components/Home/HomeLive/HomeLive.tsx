// Libraries
import { useInfiniteQuery } from "react-query";
import React, { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import API from "@services/api";

// Context
import MatureContext from "@contexts/MatureContext";

// Icons
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

// Components
import GradientCircularProgress from "@general/GradientCircularProgress";
import ProblemLoading from "@general/ProblemLoading";
import LivestreamCard from "@general/LivestreamCard";
import HomeSectionHeading from "../HomeSectionHeading";
import SectionWrapper from "../HomeSectionWrapper";

// CSS
import "swiper/css";
import "swiper/css/navigation";

export default function HomeLive() {
  const mature = useContext(MatureContext)
  const fetchStreams = async ({ pageParam = 1 }) =>
    API.get<Streams>(`/streams?page=${pageParam}`).then((res) => res.data);

  const { data, error, isLoading } = useInfiniteQuery<Streams, Error>(
    ["allStreams", {}],
    fetchStreams,
    {
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);

  return (
    <SectionWrapper className="dark:bg-secondary-dark-2" color="bg-slate-100">
      <HomeSectionHeading>Popular Live Channels</HomeSectionHeading>
      {isLoading ||
        (error && (
          <div className="flex justify-center items-center h-[17rem]">
            <GradientCircularProgress loading={isLoading} />
            <ProblemLoading error={!!error} />
          </div>
        ))}
      {data && (
        <div className="flex justify-center">
          <span className="my-auto">
            <motion.button
              whileTap={{ scale: 0.8 }}
              type="button"
              className="disabled:opacity-40"
              ref={(node) => setPrevEl(node)}
            >
              <ChevronLeftIcon className="text-4xl lg:text-5xl dark:text-white text-gray-600" />
            </motion.button>
          </span>
          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={1}
            slidesPerGroup={1}
            navigation={{
              prevEl,
              nextEl,
            }}
            breakpoints={{
              768: { slidesPerGroup: 2, slidesPerView: 2 },
              1280: {
                slidesPerGroup: 3,
                slidesPerView: 3,
              },
              1920: {
                slidesPerGroup: 4,
                slidesPerView: 4,
              },
            }}
            updateOnWindowResize
            className="py-4"
          >
            {data?.pages[0].results
              .filter((stream) =>
                mature ? !!stream : stream.stream.is_mature === false
              )
              .slice(0, 16)
              .map((stream: Stream, i: number) => (
                <SwiperSlide
                  key={stream.channel_id}
                  className="flex justify-center my-1"
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
              <ChevronRightIcon className="text-4xl lg:text-5xl dark:text-white text-gray-600" />
            </motion.button>
          </span>
        </div>
      )}
    </SectionWrapper>
  );
}
