import React from "react";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GhostityLogo from "../../public/images/Ghostity-svg.svg";

function Footer() {
  return (
    <footer className="h-16 bg-slate-200 flex justify-center items-center">
      <div className="flex items-center">
        Made by{" "}
        <span className="bg-[length:160%_160%] bg-left bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent font-bold animate-background-position-left text-lg">
          <a
            href="https://www.twitter.com/_jylx"
            target="_blank"
            rel="noopener noreferrer"
          >
            &nbsp;Jylx
          </a>
        </span>
        /Ghostity Project
        <FavoriteBorderIcon className="text-sm ml-2" />
        <GhostityLogo className="h-6 w-6 -scale-x-100" />
      </div>
    </footer>
  );
}

export default Footer;
