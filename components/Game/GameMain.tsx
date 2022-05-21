import React, { useState, useRef, useEffect, useMemo } from "react";
import Image from "next/image";
import BrowseWrapper from "../general/BrowseWrapper";
import GameStreams from "./GameStreams";
import BackgroundWrapper from "../general/BackgroundWrapper";
import useWindowDimensions from "../../hooks/useWindowDimensions";

export default function GameMain({ gameData }: { gameData: Game }) {
  const [showFullSummary, setShowFullSummary] = useState(false);
  const [showButton, setShowButton] = useState(false);
  const lineClamp = useRef<HTMLParagraphElement>(null);
  const size = useWindowDimensions();

  useEffect(() => {
    if (lineClamp.current!.scrollHeight > lineClamp.current!.clientHeight) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  }, [lineClamp, size.width]);

  return (
    <BrowseWrapper>
      <BackgroundWrapper
        image={gameData.screenshot}
        altText={`${gameData.name} screenshot`}
      >
        <div className="flex p-4 gap-4">
          <div className="min-w-fit">
            <Image
              alt={`${gameData.name}'s cover image`}
              src={gameData.cover_img}
              width={140}
              height={200}
              className="rounded"
            />
          </div>
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-4xl font-semibold">{gameData.name}</h2>
              <span className="text-sm text-gray-600">
                <span className="font-semibold text-black">
                  {gameData.viewers}
                </span>
                {" "} Viewers |{" "}
                <span className="font-semibold text-black">{gameData.streams}</span>{" "}
                Streams
              </span>
            </div>
            <div>
              {showFullSummary ? (
                <div>
                  <p ref={lineClamp} className="max-w-[75ch] text-sm">
                    {gameData.summary}
                  </p>
                  {showButton ? (
                    <button
                      className="text-sm font-semibold underline"
                      type="button"
                      onClick={() => setShowFullSummary(!showFullSummary)}
                    >
                      Show Less
                    </button>
                  ) : null}
                </div>
              ) : (
                <div>
                  <p
                    ref={lineClamp}
                    className="max-w-[75ch] line-clamp-4 text-sm"
                  >
                    {gameData.summary}
                  </p>
                  {showButton ? (
                    <button
                      className="text-sm font-semibold underline"
                      type="button"
                      onClick={() => setShowFullSummary(!showFullSummary)}
                    >
                      Show More
                    </button>
                  ) : null}
                </div>
              )}
            </div>
          </div>
        </div>
      </BackgroundWrapper>
      <div className="mt-7 border" />
      <GameStreams game={gameData.name} />
    </BrowseWrapper>
  );
}
