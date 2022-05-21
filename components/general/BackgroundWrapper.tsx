import React, { ReactNode } from "react";
import Image from "next/image";

export default function BackgroundWrapper({
  children,
  image,
  nextImage = true,
  altText,
}: {
  children: ReactNode;
  nextImage?: boolean;
  image?: string;
  altText?: string;
}) {
  if (!nextImage)
    return (
      <div className="w-full relative">
          <div className="absolute h-full w-full z-0">
            {image ? (
              <img
                src={image}
                alt={altText}
                className="blur opacity-30 w-full object-contain h-full select-none"
                draggable={false}
              />
            ) : null}
          </div>
        <div className="relative z-10">{children}</div>
      </div>
    );

  return (
    <div className="relative">
      <div className="absolute h-full w-full z-0">
        {image ? (
          <Image
            src={image}
            alt={altText}
            className="blur-sm opacity-30 w-full object-cover object-center h-full select-none rounded"
            draggable={false}
            layout="fill"
          />
        ) : null}
      </div>
      <div className="relative z-10">{children}</div>
    </div>
  );
}
