import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import GhostityLogo from "../../public/images/Ghostity-svg-white.svg";

function NavbarButton(props: { text: string; href: string }) {
  const { text, href } = props;
  const router = useRouter();

  if (router.route === href) {
    return (
      <Link href={href} passHref>
        <button
          type="button"
          className=" text-white px-2 py-2 underline underline-offset-[6px] hover:underline hover:underline-offset-4  hover:decoration-2 hover:bg-blurGray hover:rounded"
        >
          {text}
        </button>
      </Link>
    );
  }

  return (
    <Link href={href} passHref>
      <button
        type="button"
        className=" text-white px-2 py-2 hover:underline hover:underline-offset-[6px] hover:decoration-2 hover:bg-blurGray hover:rounded"
      >
        {text}
      </button>
    </Link>
  );
}

function Navbar() {
  return (
    <nav className="bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 flex items-center justify-between px-8 py-7 text-white h-14">
      <div className="flex">
        <Link href="/" passHref>
          <button type="button" className="group py-2">
            <div className="flex gap-2 items-center text-2xl group-hover:animate-move-center">
              <GhostityLogo className="h-10 w-10 group-hover:animate-wiggle" />
              <h1 className="group-hover:animate-fade-out">ghostity</h1>
            </div>
          </button>
        </Link>
        <ul className="flex gap-2 items-center before:content-['|'] before:text-4xl before:mx-4">
          <li>
            <NavbarButton text="Home" href="/" />
          </li>
          <li>
            <NavbarButton text="Browse" href="/browse" />
          </li>
          <li>
            <NavbarButton text="FAQ" href="/faq" />
          </li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login" passHref>
          <button type="button" className="text-md border rounded py-1 px-3 hover:bg-blurGray hover:border-2">
            Login
          </button>
        </Link>
        <button type="button">
          <DarkModeOutlinedIcon />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
