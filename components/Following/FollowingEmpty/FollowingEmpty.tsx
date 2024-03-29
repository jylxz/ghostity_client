import React from "react";
import BrowseWrapper from "@general/BrowseWrapper";
import Ghostity from "@logo/Ghostity.svg"

export default function FollowingEmpty() {
  return (
    <BrowseWrapper>
      <div className="flex flex-col justify-center items-center h-[26rem] sm:h-full text-center">
        <Ghostity className="w-20 h-20" />
        Login or create an account to follow your favorite V-Tubers and see who is live!
      </div>
    </BrowseWrapper>
  );
}
