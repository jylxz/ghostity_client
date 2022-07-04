// Libraries
import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { motion } from "framer-motion";
import { useInfiniteQuery } from "react-query";

// Icons
import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import { BsHeart } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { BiSearchAlt, BiArrowToLeft, BiArrowFromLeft } from "react-icons/bi";
import VGhostityIcon from "../../public/images/Ghostity-svg.svg";

// Contexts
import UserContext from "../../context/UserContext";
import UserFollowContext from "../../context/UserFollowContext";

// Hooks
import useResponsiveBrowseBar from "../../hooks/useResponsiveBrowseBar";
import useWindowDimensions from "../../hooks/useWindowDimensions";

// Components
import SideBarBrowseItem from "./SideBarBrowseItem";
import SideBarButtons from "./SideBarButtons";
import SideBarFollowingItem from "./SideBarFollowingItem";

// Animations
import browseAnimations from "../Browse/animations/browseAnimations";
import useIsWindowSmall from "../../hooks/useIsWindowSmall";

export default function SideBarMain() {
  const animations = browseAnimations.sidebar;
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);
  const [showChannels, setShowChannels] = useState(5);
  const window = useWindowDimensions();
  const isWindowSmall = useIsWindowSmall();
  const [
    showBrowseBar,
    setShowBrowseBar,
    userPreference,
    browseBarOverride,
    minimized,
  ] = useResponsiveBrowseBar();

  const [width, setWidth] = useState<number>();

  useEffect(() => {
    if (window.width) {
      setWidth(window.width);
    }
  }, [window]);

  const channelIds: string[] | undefined = follows?.channels;

  const API = process.env.NEXT_PUBLIC_API as string;

  const fetchStreams = ({ pageParam = 1 }) =>
    axios
      .post<Streams>(`${API}/streams?page=${pageParam}`, {
        channelIds,
      })
      .then((res) => res.data);

  const streams = useInfiniteQuery<Streams, Error>(
    ["followStreams", channelIds],
    fetchStreams,
    {
      // refetchInterval: 180000,
      enabled: !!user?.uid && !!channelIds,
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    }
  );

  return (
    <motion.div
      layout="size"
      layoutScroll
      initial={{ translateX: -300 }}
      animate={{ translateX: 0 }}
      className={` z-30  bg-slate-100 scroll-smooth ${
        showBrowseBar ? "min-w-[16rem] max-w-[16rem] pl-4" : "w-16"
      } h-[calc(100vh_-_3.8rem)] overflow-x-hidden overflow-y-auto hidden sm:block sm-custom-scroll`}
      onMouseLeave={() => (minimized ? browseBarOverride(false) : null)}
    >
      <div
        className={`flex ${
          showBrowseBar ? "justify-between" : "justify-center"
        }`}
      >
        {showBrowseBar ? (
          <h1 className="text-lg my-3 flex items-center font-medium">
            Browse
          </h1>
        ) : null}
        <motion.div layout="position" className="flex justify-between">
          <motion.button
            type="button"
            whileHover={{ scale: 1.05 }}
            onClick={() => setShowBrowseBar(!showBrowseBar)}
            className={`p-1 my-3 flex items-center justify-center ${
              !showBrowseBar ? "mx-auto" : ""
            } ${isWindowSmall ? "hidden" : ""}`}
          >
            {showBrowseBar ? (
              <BiArrowToLeft className="h-5 w-5" />
            ) : (
              <BiArrowFromLeft className="h-5 w-5" />
            )}
          </motion.button>
        </motion.div>
      </div>
      {!showBrowseBar ? (
        <div
          className={`mx-auto mb-1 w-10 h-0.5 border ${
            width && width < 640 ? "hidden" : ""
          }`}
        />
      ) : null}
      <motion.div
        variants={animations.browseContainer}
        layout="position"
        initial="initial"
        animate="animate"
        className="grid grid-cols-1 grid-rows-[repeat(5,_minmax(2.3rem,_1fr))] relative w-full"
      >
        <SideBarBrowseItem
          item="Following"
          minimized={!showBrowseBar}
          icon={
            <BsHeart
              className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
            />
          }
          href="/browse/following"
        />
        <SideBarBrowseItem
          item="Streams"
          minimized={!showBrowseBar}
          icon={
            <VGhostityIcon
              className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
            />
          }
          href="/browse"
        />
        <SideBarBrowseItem
          item="Games"
          minimized={!showBrowseBar}
          icon={
            <CgGames
              className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
            />
          }
          href="/browse/games"
        />
        <SideBarBrowseItem
          item="Organizations"
          minimized={!showBrowseBar}
          icon={
            <CorporateFareOutlinedIcon
              className={`h-6 w-6 py-0.5 ${showBrowseBar ? "mx-2" : "mx-auto"}`}
            />
          }
          href="/browse/organizations"
        />
        <SideBarBrowseItem
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
            variants={animations.gradientBar}
            className="z-0 -mt-[1rem] absolute bg-gradient-to-r from-primary via-secondary to-secondary2 w-[11.5rem] h-[1rem] origin-bottom-left rotate-90 rounded border-2 border-white"
          />
        ) : null}
      </motion.div>
      {user ? (
        <>
          {showBrowseBar ? (
            <h1 className="text-lg my-3 font-medium">Following</h1>
          ) : (
            <div className="mx-auto mt-1 mb-2 w-10 h-0.5 border" />
          )}
          {streams.data &&
          !streams.isLoading &&
          streams.data.pages[0].results.length > 0 ? (
            <motion.div
              variants={animations.streamsContainer}
              layoutScroll
              // layout="position"
              layout
              initial="initial"
              animate="animate"
              className={`grid gap-3 ${showBrowseBar ? "mr-5" : ""} mb-4`}
            >
              {streams.data?.pages[0].results
                .slice(0, showChannels)
                .map((stream) => (
                  <motion.div
                    key={stream._id}
                    variants={animations.streams}
                    layout="position"
                    // layout
                    className={!showBrowseBar ? "mx-auto" : ""}
                  >
                    <SideBarFollowingItem
                      minimized={!showBrowseBar}
                      stream={stream}
                      browseBarOverride={browseBarOverride}
                      userPreference={userPreference}
                    />
                  </motion.div>
                ))}
              {showBrowseBar ? (
                <SideBarButtons
                  length={
                    streams?.data?.pages[0].next?.total ||
                    streams?.data?.pages[0].results.length
                  }
                  showChannels={showChannels}
                  setShowChannels={setShowChannels}
                />
              ) : null}
            </motion.div>
          ) : null}
        </>
      ) : null}
    </motion.div>
  );
}
