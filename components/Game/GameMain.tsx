// Libraries
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";

// Hooks
import useWindowDimensions from "../../hooks/useWindowDimensions/useWindowDimensions";

// Components
import BrowseWrapper from "../General/BrowseWrapper";
import GameStreams from "./GameStreams";
import BackgroundWrapper from "../General/BackgroundWrapper";

export default function GameMain({ gameData }: { gameData: Game }) {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const lineClamp = useRef<HTMLParagraphElement>(null);
  const size = useWindowDimensions();

  useEffect(() => {
    if (lineClamp.current && lineClamp.current.scrollHeight > lineClamp.current.clientHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [lineClamp, size.width]);

  return (
    <BrowseWrapper>
      <BackgroundWrapper
        image={gameData?.screenshot}
        altText={`${gameData.name} screenshot`}
      >
        <div className="flex flex-col sm:flex-row p-4 gap-4">
          <motion.div
            layout
            className="min-w-fit max-h-full my-auto mx-auto sm:mx-0"
          >
            {gameData.cover_img ? (
              <Image
                alt={`${gameData.name}'s cover image`}
                src={gameData.cover_img}
                width={140}
                height={200}
                quality={100}
                className="rounded"
              />
            ) : null}
          </motion.div>
          <div className="flex flex-col gap-3">
            <motion.h2
              layout
              className="dark:text-text-primary-dark text-center sm:text-start text-4xl font-semibold"
            >
              {gameData.name}
            </motion.h2>
            <motion.span
              layout="position"
              className="text-center sm:text-start text-sm font-medium dark:text-text-secondary-dark text-gray-600"
            >
              <span className="font-semibold dark:text-text-primary-dark text-black">
                {gameData.viewers}
              </span>{" "}
              Viewers |{" "}
              <span className="font-semibold dark:text-text-primary-dark text-black">
                {gameData.streams}
              </span>{" "}
              Streams
            </motion.span>
            <p
              ref={lineClamp}
              className={`dark:text-text-primary-dark my-1 max-w-[75ch] font-medium ${
                !showFullSummary ? "line-clamp-4" : ""
              } text-sm`}
            >
              {gameData.summary}
            </p>
            {showButton ? (
              <motion.button
                layout="position"
                className="dark:text-text-primary-dark text-sm font-semibold underline self-center sm:self-start"
                type="button"
                onClick={() => setShowFullSummary(!showFullSummary)}
              >
                {!showFullSummary ? "Show More" : "Show Less"}
              </motion.button>
            ) : null}
          </div>
        </div>
      </BackgroundWrapper>
      <motion.div layout="position" className="my-7 border" />
      <GameStreams game={gameData.name} />
    </BrowseWrapper>
  );
}
