import React, {
  createRef,
  Dispatch,
  Fragment,
  SetStateAction,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import { BsHeart, BsArrowBarLeft } from "react-icons/bs";
import { CgGames, CgPushChevronLeft } from "react-icons/cg";
import { IconType } from "react-icons";
import { BiSearchAlt, BiArrowToLeft, BiArrowFromLeft } from "react-icons/bi";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import UserContext from "../../context/UserContext";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";
import UserFollowContext from "../../context/UserFollowContext";
import SmallLivestreamCard from "../general/SmallLivestreamCard";
import browseAnimations from "./animations/browseAnimations";
import useResponsiveBrowseBar from "../../hooks/useResponsiveBrowseBar";

const animations = browseAnimations.sidebar;

function BrowseItem({
  item,
  icon,
  href,
  minimized,
}: {
  item: string;
  icon: IconType | any;
  href: string;
  minimized?: boolean;
}) {
  const router = useRouter();
  const [selected, setSelected] = useState(
    router.route === href || router.route.includes(item.toLowerCase())
  );
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };

  useEffect(() => {
    setSelected(
      router.route === href || router.route.includes(item.toLowerCase())
    );
  }, [router]);

  return (
    <motion.div
      variants={animations.browseItems}
      className={`relative ${!minimized ? "ml-5" : undefined}`}
    >
      {selected ? (
        <motion.div
          initial={false}
          layoutId="browse"
          transition={spring}
          className="absolute z-20 -left-5 col-start-1 w-[calc(100%_+_1.25rem)] h-full bg-white"
        />
      ) : null}
      <div className="relative z-30 col-start-2 flex items-center h-full">
        <Link href={href} passHref>
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="button"
            className={`z-30 flex items-center w-full h-full ${
              !selected ? "text-sm text-gray-500 fill-gray-500" : null
            }`}
          >
            {icon}
            {!minimized ? item : null}
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
}

function ShowMoreButtons({
  length,
  showMore,
  setShowMore,
}: {
  length: number;
  showMore: boolean;
  setShowMore: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  if (length > 6) {
    return !showMore ? (
      <button
        type="button"
        onClick={() => setShowMore(true)}
        className="text-sm"
      >
        Show more
      </button>
    ) : (
      <button
        type="button"
        onClick={() => setShowMore(false)}
        className="text-sm"
      >
        Show less
      </button>
    );
  }
  return null;
}

export default function BrowseSideBar() {
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);
  const [showMore, setShowMore] = useState(false);
  const [showChannels, setShowChannels] = useState(6);
  const [
    showBrowseBar,
    setShowBrowseBar,
    userPreference,
    browseBarOverride,
    minimized,
  ] = useResponsiveBrowseBar();

  const channelIds: string | undefined = follows?.channels?.join(",");

  useMemo(() => {
    if (showMore) {
      setShowChannels(6);
    } else {
      setShowChannels(12);
    }
  }, [showMore]);

  const fetchStreams = ({ pageParam = 1 }) =>
    axios
      .get(
        `https://api.ghostity.com/streams?page=${pageParam}&channels=${channelIds}`
      )
      .then((res) => res.data);

  const streams = useInfiniteQuery<Streams, Error>(
    ["userFollows", channelIds],
    fetchStreams,
    {
      enabled: !!user?.uid,
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  const activeCardRef = useRef<HTMLDivElement[]>([]);
  const parentRef = useRef<HTMLDivElement>(null);
  const [activeCardX, setActiveCardX] = useState<number | null>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number>(null);
  const [activeCardY, setActiveCardY] = useState<number | null>(null);

  useEffect(() => {
    setTimeout(
      () => {
        activeCardRef?.current[activeCardIndex]?.scrollIntoView({
          block: "center",
          behavior: "smooth",
        });
      },

      2000
    );
  }, [activeCardIndex, minimized]);

  return (
      <motion.div
        // ref={parentRef}
        layoutId="browseContainer"
        className={`fixed z-30 sm:static bg-slate-100 ${
          showBrowseBar ? "min-w-[15.5rem] max-w-[15.5rem] pl-4" : "w-16"
        } h-[calc(100vh_-_3.8rem)] overflow-auto`}
        onMouseLeave={() => (minimized ? browseBarOverride(false) : null)}
      >
          <motion.div  className="flex justify-between">
            {showBrowseBar ? (
              <h1 className="text-lg my-3 flex items-center">Browse</h1>
            ) : null}
            <motion.button
              type="button"
              whileHover={{ scale: 1.05 }}
              onClick={() => setShowBrowseBar(!showBrowseBar)}
              className={`p-1 my-3 flex items-center justify-center ${
                !showBrowseBar ? "mx-auto" : null
              }`}
            >
              {showBrowseBar ? (
                <BiArrowToLeft className="h-5 w-5" />
              ) : (
                <BiArrowFromLeft className="h-5 w-5" />
              )}
            </motion.button>
          </motion.div>
          {!showBrowseBar ? (
            <div className="mx-auto mb-1 w-10 h-0.5 border" />
          ) : null}
          <motion.div
            variants={animations.browseContainer}
            initial="initial"
            animate="animate"
            className="grid grid-cols-1 grid-rows-[repeat(5,_minmax(2.3rem,_1fr))] relative w-full"
          >
            <BrowseItem
              item="Following"
              minimized={!showBrowseBar}
              icon={
                <BsHeart
                  className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
                />
              }
              href="/browse/following"
            />
            <BrowseItem
              item="Streams"
              minimized={!showBrowseBar}
              icon={
                <GhostityIcon
                  className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
                />
              }
              href="/browse"
            />
            <BrowseItem
              item="Games"
              minimized={!showBrowseBar}
              icon={
                <CgGames
                  className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
                />
              }
              href="/browse/games"
            />
            <BrowseItem
              item="Organizations"
              minimized={!showBrowseBar}
              icon={
                <CorporateFareOutlinedIcon
                  className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
                />
              }
              href="/browse/organizations"
            />
            <BrowseItem
              item="Search"
              minimized={!showBrowseBar}
              icon={
                <BiSearchAlt
                  className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
                />
              }
              href="/search"
            />
            {showBrowseBar ? (
              <motion.div
                variants={animations.browseItems}
                className="z-0 -mt-[1rem] absolute bg-gradient-to-r from-primary via-secondary to-secondary2 w-[11.5rem] h-[1rem] origin-bottom-left rotate-90 rounded border-2 border-white"
              />
            ) : null}
          </motion.div>
        {user ? (
          <>
            {showBrowseBar ? (
              <h1 className="text-lg my-3">Followed</h1>
            ) : (
              <div className="mx-auto mt-1 mb-2 w-10 h-0.5 border" />
            )}
              {streams.data && !streams.isLoading ? (
                <motion.div
                key="hey"
                variants={animations.streamsContainer}
                initial="initial"
                animate="animate"
                exit="exit"
                className={`grid gap-2.5 ${showBrowseBar ? "mr-5" : ""} mb-4`}
                >
                    {streams.data?.pages[0].results
                      .slice(0, showChannels)
                      .map((stream, index) => (
                        <motion.div
                        key={stream._id}
                        variants={animations.streams}
                        className={!showBrowseBar ? "mx-auto" : ""}
                        
                        >
                          <SmallLivestreamCard
                            minimized={!showBrowseBar}
                            stream={stream}
                            browseBarOverride={browseBarOverride}
                            userPreference={userPreference}
                          />
                        </motion.div>
                      ))}
                  {showBrowseBar ? (
                    <ShowMoreButtons
                      length={streams?.data?.pages[0].results.length}
                      showMore={showMore}
                      setShowMore={setShowMore}
                    />
                  ) : null}
                </motion.div>
              ) : null}
          </>
        ) : null}
      </motion.div>
  );
}
