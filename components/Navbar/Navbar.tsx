// Libraries
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

// Icons
import { BiMenu } from "react-icons/bi";

// Components
import LinkTo from "../general/LinkTo";
import ProfileNavbar from "./ProfileNavbar";

// Contexts
import UserContext from "../../context/UserContext";

// Images
import GhostityLogo from "../../public/images/Ghostity-svg.svg";
import AnimatedButton from "../general/AnimatedButton";
import useIsWindowSmall from "../../hooks/useIsWindowSmall";

function NavbarButton({ text, href }: { text: string; href: string }) {
  const router = useRouter();
  const spring = {
    type: "spring",
    stiffness: 500,
    damping: 30,
  };

  return (
    <LinkTo href={href}>
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.9 }}
        type="button"
        className="text-gray-600 px-2 py-1 hover:bg-blurGray hover:rounded"
      >
        <div className="relative">
          {text}
          {router.route === href ||
          ((router.route.includes("browse") || router.route === "/search") &&
            text === "Browse") ? (
            <motion.div
              initial={false}
              layoutId="underline-navbar"
              className="underline-navbar"
              transition={spring}
            />
          ) : null}
        </div>
      </motion.button>
    </LinkTo>
  );
}

export default function Navbar({
  showAuth,
  setShowAuth,
  setShowHamburgerMenu,
}: {
  showAuth: boolean;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
  setShowHamburgerMenu: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useContext(UserContext);
  const [isWindowSmall] = useIsWindowSmall();

  const animateCenter = {
    initial: { translateX: 0 },
    animate: {
      translateX: 70,
      transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
    },
  };

  const wiggle = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 10, -10, 10],
      transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
    },
  };

  const fadeOut = {
    initial: { opacity: 1 },
    animate: {
      opacity: 0,
      transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
    },
  };

  return (
    <nav className="bg-gradient-to-r from-[#DEECFC] via-[#E1F2FB] to-[#F1F9F9] flex items-center justify-between px-8 py-7 text-gray-500 h-14 relative z-50">
      <div className="flex">
        <LinkTo href="/">
          <motion.button
            initial="initial"
            whileHover="animate"
            type="button"
            className="group py-2"
          >
            <motion.div
              variants={animateCenter}
              className="flex gap-2 items-center text-2xl "
            >
              <motion.div variants={wiggle}>
                <GhostityLogo className="h-10 w-10 " />
              </motion.div>
              <motion.h1 variants={fadeOut} className=" text-black">
                ghostity
              </motion.h1>
            </motion.div>
          </motion.button>
        </LinkTo>
        <ul className="flex gap-2 items-center before:content-['|'] before:text-3xl before:mx-4">
          {!isWindowSmall ? (
            <>
              <li>
                <NavbarButton text="Home" href="/" />
              </li>
              <li>
                <NavbarButton text="Browse" href="/browse" />
              </li>
              <li>
                <NavbarButton text="FAQ" href="/faq" />
              </li>
            </>
          ) : null}
        </ul>
      </div>
      {(() => {
        if (!isWindowSmall) {
          if (!user) {
            return (
              <button
                type="button"
                className="text-md border rounded py-1 px-3 hover:bg-blurGray hover:border-2"
                onClick={() => setShowAuth(!showAuth)}
              >
                Login
              </button>
            );
          }

          return <ProfileNavbar />;
        }

        return (
          <AnimatedButton
            className="w-9 h-9 mt-1"
            onClick={() => setShowHamburgerMenu(true)}
          >
            <BiMenu size={34} color="black" />
          </AnimatedButton>
        );
      })()}
    </nav>
  );
}