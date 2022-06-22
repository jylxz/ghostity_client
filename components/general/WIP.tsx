import React from "react";
import Wip from "../../public/images/WIP.svg";

export default function WIP() {
  return (
    <div className=" flex flex-col justify-center items-center relative">
      <div className="w-72 ">
        <Wip />
      </div>
      <span className="absolute bottom-10">Currently being worked on! Come back later!</span>
    </div>
  );
}
