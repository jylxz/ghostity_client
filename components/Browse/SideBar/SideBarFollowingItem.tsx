import React, { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import useWindowDimensions from "../../../hooks/useWindowDimensions";

export default function SideBarFollowingItem({
  stream,
  minimized,
  userPreference,
  browseBarOverride,
}: {
  stream: Stream;
  minimized?: boolean;
  userPreference: boolean;
  browseBarOverride: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [showTitle, setShowTitle] = useState(false);
  const window = useWindowDimensions();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [titleTimeout, setTitleTimeout] = useState<NodeJS.Timeout>();
  const [browseTimeout, setBrowseTimeout] = useState<NodeJS.Timeout>();
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout>();

  const shouldAnimate = stream.stream.title.length / 15 > 1;
  const duration = stream.stream.title.length / 5;

  const handleShowTitle = () => {
    setTitleTimeout(setTimeout(() => setShowTitle(true), 800));
  };

  const handleHideTitle = () => {
    setShowTitle(false);
    clearTimeout(titleTimeout);
  };

  const handleBrowseOpen = () => {
    setBrowseTimeout(setTimeout(() => browseBarOverride(true), 1000));

    if (minimized) {
      clearTimeout(scrollTimeout);
      setScrollTimeout(
        setTimeout(
          () =>
            scrollRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "nearest",
            }),
          2000
        )
      );
    }
  };

  const handleBrowseClose = () => {
    clearTimeout(browseTimeout);
  };

  const handleBrowseOnClick = () => {
    if (!userPreference) {
      browseBarOverride(false);
    }

    handleHideTitle();
    handleBrowseClose();
  };

  const opacity = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
    exit: {
      opacity: 0,
    },
  };

  const text = {
    initial: {
      translateX: "0%",
    },
    animate: {
      translateX: "-100%",
      transition: { delay: 0.6, duration, repeat: Infinity },
    },
  };

  return (
    <motion.div
      ref={scrollRef}
      whileTap={{ scale: 0.95 }}
      onMouseEnter={() => handleShowTitle()}
      onMouseLeave={() => handleHideTitle()}
      onClick={() => handleBrowseOnClick()}
      onScroll={() => handleHideTitle()}
      className="w-full h-full text-sm relative"
    >
      <a href={stream.stream.url} target="_blank" rel="noopener noreferrer">
        <div className="flex items-center gap-2">
          <div className="min-w-fit mx-1 flex">
            <Image
              src={stream.channel_img}
              height={28}
              width={28}
              className="rounded-full "
              onMouseEnter={
                window.width > 640 ? () => handleBrowseOpen() : null
              }
              onMouseLeave={() => handleBrowseClose()}
              onClick={window.width > 640 ? () => handleBrowseOnClick() : null}
            />
          </div>
          {!minimized ? (
            <div className="w-full relative ">
              <AnimatePresence exitBeforeEnter>
                {showTitle ? (
                  <motion.span
                    key="title"
                    variants={opacity}
                    className=" overflow-hidden inline-block w-[10.5rem] align-text-bottom whitespace-nowrap text-sm"
                  >
                    {shouldAnimate ? (
                      <motion.span variants={text} className="inline-block">
                        {stream.stream.title}
                      </motion.span>
                    ) : (
                      <span>{stream.stream.title}</span>
                    )}
                  </motion.span>
                ) : (
                  <motion.span variants={opacity} className="line-clamp-1">
                    {stream.channel_name}
                  </motion.span>
                )}
              </AnimatePresence>
              <div className="text-gray-500 grid grid-cols-8 justify-between">
                <div className="flex-1 col-span-5">
                  <span className="line-clamp-1">{stream.stream.game} </span>
                </div>
                <div className="col-span-3 grid grid-cols-2 relative items-center gap-1">
                  <span className="animate-ping h-3 w-3 absolute left-[17px] rounded-full bg-primary border border-white opacity-60" />
                  <span className="justify-self-end rounded-full h-3 w-3 bg-primary border border-white" />
                  <span className="text-gray-700">{stream.stream.viewers}</span>
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </a>
    </motion.div>
  );
}
