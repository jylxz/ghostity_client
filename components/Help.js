import React from "react";
import Image from "next/image";
import GhostityLogo from "../public/images/Ghostity-svg.svg";

import SectionWrapper from "./SectionWrapper"

function Help() {
  return (
    <SectionWrapper color={"bg-slate-100"} >
      <div className="grid grid-cols-2 w-3/4 mx-auto">
        <div className="text-6xl flex justify-center items-center">
          <div className="relative">
            <Image
              src={GhostityLogo}
              alt="Ghostity logo"
              width={100}
              height={100}
            />
            <span className="absolute top-[-10px]">?</span>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-[75ch]">
          <h2 className="text-2xl lg:text-3xl">Questions?</h2>
          <p className="lg:text-lg text-gray-500">
            Are you a V-Tuber, but don't see your channel on ghostity? Check the FAQ page for help!
          </p>
          <div>
            <button className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 text-white text-lg px-4 py-1 rounded">
              FAQ Page
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Help;
