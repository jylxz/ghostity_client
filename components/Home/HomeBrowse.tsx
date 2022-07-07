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
import VGhostityLogo from "../../public/images/Ghostity-svg.svg";

// Animations
import { homeBrowseAnimations } from "./animations/homeAnimations";

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
  const {cardVariant, hoverVariant, titleVariant} = homeBrowseAnimations.card

  return (
    <motion.div
      custom={staggerOrder}
      variants={cardVariant}
      initial="initial"
      whileInView="animate"
      whileHover="hover"
      viewport={{ once: true }}
      className="mb-3 py-4 bg-[length:300%_300%] dark:bg-none dark:bg-secondary-dark-2 bg-left bg-gradient-to-r from-primary via-secondary to-secondary2 flex flex-col justify-center items-center h-36 shadow cursor-pointer rounded animate-background-position-left text-gray-500 "
    >
      <motion.div
        variants={hoverVariant}
        className="dark:fill-text-primary-dark flex flex-col items-center"
      >
        {children}
        <motion.span variants={titleVariant} className="dark:text-primary text-xl">
          {title}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

export default function BrowseBar() {
  const [prevEl, setPrevEl] = useState<HTMLElement | null>(null);
  const [nextEl, setNextEl] = useState<HTMLElement | null>(null);
  const { ghostVariant, ghostVariant2, organizationVariant, gamesVariant } =
    homeBrowseAnimations;

  return (
    <SectionWrapper color="bg-slate-50" className="dark:bg-secondary-dark">
      <HomeSectionHeading heading="Browse" />
      <div className="flex">
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
        >
          <SwiperSlide>
            <LinkTo href="/browse">
              <BrowseCardAnimation staggerOrder={1} title="Streams">
                <div className="flex gap-2">
                  <motion.div variants={ghostVariant} className="h-10 w-10">
                    <VGhostityLogo className="h-10 w-10" />
                  </motion.div>
                  <motion.div variants={ghostVariant2} className="h-10 w-10">
                    <VGhostityLogo className="h-10 w-10 -scale-x-100" />
                  </motion.div>
                </div>
              </BrowseCardAnimation>
            </LinkTo>
          </SwiperSlide>
          <SwiperSlide>
            <LinkTo href="/browse/games">
              <BrowseCardAnimation staggerOrder={2} title="Games">
                <motion.div variants={gamesVariant} className="flex flex-col">
                  <GamesOutlinedIcon className="mx-auto h-10 w-10 dark:text-text-primary-dark text-black" />
                </motion.div>
              </BrowseCardAnimation>
            </LinkTo>
          </SwiperSlide>
          <SwiperSlide>
            <LinkTo href="/browse/organizations">
              <BrowseCardAnimation staggerOrder={3} title="Organizations">
                <motion.div
                  variants={organizationVariant}
                  className="flex flex-col items-center"
                >
                  <CorporateFareOutlinedIcon className="dark:text-text-primary-dark text-black h-10 w-10" />
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
            <ChevronRightIcon className="text-4xl lg:text-5xl dark:text-white text-gray-600" />
          </motion.button>
        </span>
      </div>
    </SectionWrapper>
  );
}
