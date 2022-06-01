/* eslint-disable import/no-unresolved */

// Libraries
import { useState } from "react";
import { Navigation } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { motion } from "framer-motion";

// Components
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import GamesOutlinedIcon from "@mui/icons-material/GamesOutlined";
import HomeSectionHeading from "../general/HomeSectionHeading";
import SectionWrapper from "../general/SectionWrapper";
import LinkTo from "../general/LinkTo";

// Images
import GhostityLogo from "../../public/images/Ghostity-svg.svg";

// Animations
import homeAnimations from "./animations/homeAnimations";

// CSS
import "swiper/css";
import "swiper/css/navigation";

function BrowseCardAnimation({
  children,
  staggerOrder,
  title,
}: {
  children: React.ReactNode;
  staggerOrder?: number;
  title: string;
}) {
  const cardVariant = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: staggerOrder
        ? { duration: 1, delay: staggerOrder * 0.4, delayChildren: 2 }
        : { duration: 1, delayChildren: 2 },
    },
  };

  const hoverVariant = {
    hover: {
      scale: 1.15,
    },
  };

  const titleVariant = {
    initial: {
      y: 100,
      opacity: 0,
    },
    animate: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <motion.div
      variants={cardVariant}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      className="mb-3 py-4 bg-[length:300%_300%] bg-left bg-gradient-to-r from-primary via-secondary to-secondary2 flex flex-col justify-center items-center h-36 shadow cursor-pointer rounded animate-background-position-left text-gray-500 "
    >
      <motion.div
        variants={hoverVariant}
        className="flex flex-col items-center"
      >
        {children}
        <motion.span variants={titleVariant} className="text-xl">
          {title}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function BrowseBar() {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const animations = homeAnimations.browse

  return (
    <SectionWrapper color="bg-slate-50">
      <HomeSectionHeading heading="Browse" />
      <div className="flex">
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
              <BrowseCardAnimation staggerOrder={1} title="Streams">
                <div className="flex gap-2">
                  <motion.div variants={animations.ghostVariant} className="h-10 w-10">
                    <GhostityLogo className="h-10 w-10" />
                  </motion.div>
                  <motion.div variants={animations.ghostVariant2} className="h-10 w-10">
                    <GhostityLogo className="h-10 w-10 -scale-x-100" />
                  </motion.div>
                </div>
              </BrowseCardAnimation>
            </LinkTo>
          </SwiperSlide>
          <SwiperSlide>
            <LinkTo href="/browse/games">
              <BrowseCardAnimation staggerOrder={2} title="Games">
                <motion.div variants={animations.gamesVariant} className="flex flex-col">
                  <GamesOutlinedIcon className="mx-auto h-10 w-10 text-black" />
                </motion.div>
              </BrowseCardAnimation>
            </LinkTo>
          </SwiperSlide>
          <SwiperSlide>
            <LinkTo href="/browse/organizations">
              <BrowseCardAnimation staggerOrder={3} title="Organizations">
                <motion.div
                key="organization"
                  variants={animations.organizationVariant}
                  className="flex flex-col items-center"
                >
                  <CorporateFareOutlinedIcon className="text-black h-10 w-10" />
                </motion.div>
              </BrowseCardAnimation>
            </LinkTo>
          </SwiperSlide>
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
