import React from "react";
import GhostityLogo from "../../public/images/Ghostity-svg.svg";

import SectionWrapper from "../general/SectionWrapper";
import LinkTo from "../general/LinkTo";

function Help() {
  return (
    <SectionWrapper color="bg-slate-100">
      <div className="grid grid-cols-2 w-4/5 mx-auto">
        <div className="text-6xl flex justify-center items-center">
          <div className="relative">
            <GhostityLogo className="h-24 w-24" />
            <span className="absolute -top-[1rem] -right-[2rem] select-none cursor-default">
              ?
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-4 max-w-[75ch]">
          <h2 className="text-2xl lg:text-3xl">Questions?</h2>
          <p className="text-sm lg:text-base text-gray-500">
            Are you a V-Tuber, but don&apos;t see your channel on ghostity?
            Check the FAQ page for help!
          </p>
          <div>
            <LinkTo href="/faq">
              <button
                type="button"
                className="bg-gradient-to-r from-primary via-secondary to-secondary2 shadow-sm lg:text-lg px-4 py-1 rounded"
              >
                FAQ Page
              </button>
            </LinkTo>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}

export default Help;
