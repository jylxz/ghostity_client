/* eslint-disable import/no-unresolved */

import React from "react";
import Link from "next/link";
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
          <Link
            href={`/browse/organizations/${logo.name.toLowerCase()}`}
            passHref
          >
            <div className="flex justify-center">
              <img
                src={logo.logo}
                alt="An organization's logo"
                className="w-32 h-16 object-scale-down grayscale hover:grayscale-0 cursor-pointer"
              />
            </div>
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}

export default OrganizationLogoCarousel;
