/* eslint-disable import/no-unresolved */

import React from "react";
import LinkTo from "../general/LinkTo"
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

function OrganizationLogoCarousel({ logos }: OrganizationLogos) {
  return (
    <Swiper
      modules={[FreeMode, Autoplay]}
      autoplay={{
        delay: 0,
        disableOnInteraction: false,
        pauseOnMouseEnter: true,
      }}
      speed={5000}
      slidesPerView={5}
      spaceBetween={30}
      loop
      freeMode
      className="child:ease-linear bg-white"
    >
      {logos.map((logo) => (
        <SwiperSlide key={logo._id}>
          <LinkTo
            href={`/browse/organizations/${logo.name.toLowerCase()}`}
          >
            <div className="flex justify-center">
              <img
                src={logo.logo}
                alt="An organization's logo"
                className="w-32 h-16 object-scale-down grayscale hover:grayscale-0 cursor-pointer"
              />
            </div>
          </LinkTo>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default OrganizationLogoCarousel;
