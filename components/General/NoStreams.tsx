import React from "react";
import Ghostity from "@logo/Ghostity.svg";

export default function NoStreams() {
  return (
    <div className="flex justify-center items-center gap-3 mt-10">
      <div className="h-16 w-16">
        <Ghostity />
      </div>
      <div className="text-sm max-w-[75ch]">Looks like no one is live at the moment...</div>
    </div>
  );
}
