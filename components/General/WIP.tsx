import React from "react";
import Wip from "@images/WIP.svg";

export default function WIP() {
  return (
    <div className="pt-10 flex flex-col justify-center items-center relative">
      <div className="w-72 relative">
        <Wip />
      <span className="absolute bottom-0 text-center">Currently a planned feature! Come back later!</span>
      </div>
    </div>
  );
}
