import React from "react";
import Image from "next/image";
import Link from "next/link";
import {useRouter} from 'next/router'
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import ghostityLogo from "../public/images/Ghostity-svg-white.svg";

function NavbarButton(props) {
  const { text, href } = props;
  const router = useRouter();

  if (router.route === href) {
    return (
      <>
        <Link href={href}>
          <a className=" text-white px-2 py-2 underline underline-offset-[6px] hover:underline hover:underline-offset-4  hover:decoration-2 hover:bg-blurGray hover:rounded">
            {text}
          </a>
        </Link>
      </>
    );
  }

  return (
    <>
      <Link href={href}>
        <a className=" text-white px-2 py-2 hover:underline hover:underline-offset-[6px] hover:decoration-2 hover:bg-blurGray hover:rounded">
          {text}
        </a>
      </Link>
    </>
  );
}

function Navbar() {
  return (
    <nav className="bg-transparent flex items-center justify-between px-4 sm:px-24 py-2 text-white">
      <div className="flex">
        <Link href="/">
          <a className="group py-2">
            <div className="flex gap-2 items-center text-2xl group-hover:animate-move-center">
              <Image
                src={ghostityLogo}
                alt="Ghostity Logo"
                width={40}
                height={40}
                className="group-hover:animate-wiggle p-[3px]"
              />
              <h1 className="group-hover:animate-fade-out">ghostity</h1>
            </div>
          </a>
        </Link>
        <ul className="flex gap-2 items-center before:content-['|'] before:text-4xl before:mx-4">
          <li>{<NavbarButton text="Home" href="/" />}</li>
          <li>{<NavbarButton text="Browse" href="/browse" />}</li>
          <li>{<NavbarButton text="FAQ" href="/faq" />}</li>
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <Link href="/login">
          <a className="text-md border rounded py-1 px-3 hover:bg-blurGray hover:border-2">
            Login
          </a>
        </Link>
        <button type="button">
          <DarkModeOutlinedIcon />
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
