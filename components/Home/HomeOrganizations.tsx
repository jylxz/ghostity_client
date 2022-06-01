/* eslint-disable import/no-unresolved */

// Libraries
import React from "react";
import Image from "next/image"
import { Autoplay, FreeMode } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

// Components
import LinkTo from "../general/LinkTo"

// CSS
import "swiper/css";

export default function HomeOrganizations({ logos }: OrganizationLogos) {
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
          <LinkTo href={`/browse/organizations/${logo.name.toLowerCase()}`}>
            <div className="flex justify-center">
              <Image
                src={logo.logo}
                alt={`${logo.name}'s logo`}
                height={64}
                width={128}
                className="w-32 h-16 object-scale-down grayscale hover:grayscale-0 cursor-pointer"
              />
            </div>
          </LinkTo>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
