import React, { ReactNode } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

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
      <motion.div layout="size" className="w-full relative">
        <motion.div layout className="absolute h-full w-full z-0 ">
          {image ? (
            <motion.img
              layout
              src={image}
              alt={altText}
              className="blur opacity-30 w-full object-contain h-full select-none"
              draggable={false}
            />
          ) : null}
        </motion.div>
        <div className="relative z-10">{children}</div>
      </motion.div>
    );

  return (
    <motion.div layout className="relative">
      <div className="absolute h-full w-full z-0 bg-gray-100 dark:bg-secondary-dark overflow-hidden">
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
      <motion.div layout className="relative z-10">{children}</motion.div>
    </motion.div>
  );
}
