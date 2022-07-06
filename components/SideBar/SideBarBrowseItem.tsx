import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { IconType } from "react-icons";

import LinkTo from "../general/LinkTo";

import browseAnimations from "../Browse/animations/browseAnimations";

export default function SideBarBrowseItem({
  item,
  icon,
  href,
  minimized,
}: {
  item: string;
  icon: IconType | unknown;
  href: string;
  minimized?: boolean;
}) {
  const animations = browseAnimations.sidebar;
  const router = useRouter();
  const [selected, setSelected] = useState(
    router.route === href || router.route.includes(item.toLowerCase())
  );

  useEffect(() => {
    setSelected(
      router.route === href || router.route.includes(item.toLowerCase())
    );
  }, [router]);

  return (
    <motion.div
      variants={animations.browseItems}
      className={`relative ${!minimized ? "ml-5" : ""}`}
    >
      {selected ? (
        <motion.div
          layoutId="browseItem"
          initial={false}
          className="absolute z-20 -left-5 col-start-1 w-[calc(100%_+_1.25rem)] h-full dark:bg-secondary-dark-2 bg-white"
        />
      ) : null}
      <div
        className={`relative z-30 col-start-2 flex ${
          minimized ? "justify-center" : ""
        } items-center h-full`}
      >
        <LinkTo href={href}>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className={`z-30 flex items-center w-full h-full ${
              !selected
                ? "text-sm dark:text-text-secondary-dark dark:fill-text-secondary-dark text-gray-500 fill-gray-500 "
                : "font-medium dark:text-primary dark:fill-primary"
            }`}
          >
            {icon}
            {!minimized ? item : null}
          </motion.button>
        </LinkTo>
      </div>
    </motion.div>
  );
}
