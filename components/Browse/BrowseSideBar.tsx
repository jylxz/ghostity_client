import React, { Dispatch, Fragment, SetStateAction, useContext } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import { BsHeart } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { IconType } from "react-icons";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import UserContext from "../../context/UserContext";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";
import UserFollowContext from "../../context/UserFollowContext";
import SmallLivestreamCard from "../general/SmallLivestreamCard";

function BrowseItem({
  item,
  icon,
  href,
}: {
  item: string;
  icon: IconType | any;
  href: string;
}) {
  const router = useRouter();

  if (router.route === href || router.route.includes(item.toLowerCase())) {
    return (
      <>
        <div className="z-20 col-start-1 w-4 h-full m-auto bg-gray-50" />
        <div className="col-start-2 my-auto flex items-center bg-gray-50 h-full">
          <Link href={href} passHref>
            <button type="button" className="flex items-center">
              {icon}
              {item}
            </button>
          </Link>
        </div>
      </>
    );
  }

  return (
    <div className="col-start-2 my-auto">
      <Link href={href} passHref>
        <button
          type="button"
          className="text-sm flex items-center text-gray-500 fill-gray-500"
        >
          {icon}
          {item}
        </button>
      </Link>
    </div>
  );
}

function BrowseSideBar({
  show,
  setShow,
}: {
  show: { user: boolean; show: boolean };
  setShow: Dispatch<
    SetStateAction<{
      user: boolean;
      show: boolean;
    }>
  >;
}) {
  const user = useContext(UserContext);
  const follows = useContext(UserFollowContext);

  const channelIds: string = follows?.data()?.channel_ids.join(",");

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

  if (!show.show) return null;

  return (
    <div className="fixed z-30 sm:static bg-slate-100 min-w-[15rem] w-[15.5rem] h-[calc(100vh_-_3.5rem)] pl-5 overflow-auto">
      <div className="flex justify-between">
        <h1 className="text-lg h-14 flex items-center">Browse</h1>
        <button
          type="button"
          onClick={() => setShow({ user: !show.user, show: !show.show })}
        >
          Click
        </button>
      </div>
      <div className="grid grid-cols-[1rem,_auto] grid-rows-[repeat(4,_minmax(2.3rem,_1fr))] relative">
        <BrowseItem
          item="Following"
          icon={<BsHeart className="h-5 w-6 mx-2" />}
          href="/browse/following"
        />
        <BrowseItem
          item="Streams"
          icon={<GhostityIcon className="h-6 w-6 mx-2" />}
          href="/browse"
        />
        <BrowseItem
          item="Games"
          icon={<CgGames className="h-6 w-6 mx-2" />}
          href="/browse/games"
        />
        <BrowseItem
          item="Organizations"
          icon={<CorporateFareOutlinedIcon className=" h-6 w-6 mx-2" />}
          href="/browse/organizations"
        />
        <div className="z-0 -mt-[1rem] absolute bg-gradient-to-r from-primary via-secondary to-secondary2 w-[9rem] h-[1rem] origin-bottom-left rotate-90 rounded border-2 border-white" />
      </div>
      <div className="grid pr-5 gap-3 mt-5">
        <h1 className="text-lg">Followed</h1>
        {streams ? streams.data?.pages[0].results.slice(0,7).map((stream) => <SmallLivestreamCard key={stream._id} stream={stream} /> ) : null}
      </div>
    </div>
  );
}

export default BrowseSideBar;
