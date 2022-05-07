import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import CorporateFareOutlinedIcon from "@mui/icons-material/CorporateFareOutlined";
import { BsHeart } from "react-icons/bs";
import { CgGames } from "react-icons/cg";
import { IconType } from "react-icons";
import GhostityIcon from "../../public/images/Ghostity-svg.svg";

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

  if (router.route === href) {
    return (
      <>
        <div className="z-20 col-start-1 w-4 h-[2.5rem] m-auto bg-slate-50" />
        <div className="col-start-2 my-auto flex items-center bg-slate-50 py-2">
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
          className="text-sm flex items-center text-gray-500"
        >
          {icon}
          {item}
        </button>
      </Link>
    </div>
  );
}

function BrowseSideBar() {
  return (
    <div className="bg-slate-200 min-w-[12rem] w-64 h-[calc(100vh_-_3.5rem)] pl-5">
      <h1 className="text-lg h-14 flex items-center">Browse</h1>
      <div className="grid grid-cols-[1rem,_auto] grid-rows-[repeat(4,_minmax(3rem,_1fr))] relative">
        <BrowseItem
          item="Following"
          icon={<BsHeart className="text-lg h-6 w-6 mx-2" />}
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
          item="Organization"
          icon={<CorporateFareOutlinedIcon className=" h-6 w-6 mx-2" />}
          href="/browse/organizations"
        />
        <div className="z-0 mt-[-1rem] absolute bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 w-[12rem] h-[1rem] origin-bottom-left rotate-90 rounded" />
      </div>
    </div>
  );
}

export default BrowseSideBar;
