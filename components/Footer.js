import React from "react";
import Image from "next/image";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GhostityLogo from "../public/images/Ghostity-svg.svg";

function Footer() {
  return (
    <footer className="h-16 bg-slate-200 flex justify-center items-center">
      <div className="flex items-center">
        Made by Jylx/Ghostity Project
        <FavoriteBorderIcon className="text-sm ml-2" />
        <Image
          src={GhostityLogo}
          alt="Ghostity logo"
          height={24}
          width={24}
          className="scale-x-[-1]"
        />
      </div>
    </footer>
  );
}

export default Footer;
