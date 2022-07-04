// Libraries
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useRouter } from "next/router";
import { AnimationProps, motion } from "framer-motion";

// Icons
import { BiMenu } from "react-icons/bi";

// Components
import LinkTo from "../general/LinkTo";
import ProfileNavbar from "./ProfileNavbar";

// Contexts
import UserContext from "../../context/UserContext";

// Hooks
import useIsWindowSmall from "../../hooks/useIsWindowSmall";

// Images
import VGhostityLogo from "../../public/images/Ghostity-svg.svg";

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
        // whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        type="button"
        className="text-gray-600 px-2 py-1 hover:bg-blurGray hover:rounded font-medium"
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
  const isWindowSmall = useIsWindowSmall();

  const animateCenter: AnimationProps["variants"] = {
    initial: { translateX: 0 },
    animate: {
      translateX: 70,
      transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
    },
  };

  const wiggle: AnimationProps["variants"] = {
    initial: { rotate: 0 },
    animate: {
      rotate: [0, 10, -10, 10],
      transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
    },
  };

  const fadeOut: AnimationProps["variants"] = {
    initial: { opacity: 1 },
    animate: {
      opacity: 0,
      transition: { duration: 1, repeat: Infinity, repeatType: "mirror" },
    },
  };

  return (
    <nav className="sm:relative w-full bg-gradient-to-r from-primary via-secondary to-secondary2 flex items-center justify-between px-8 py-7 text-gray-500 h-14 z-50">
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
                <VGhostityLogo className="h-10 w-10 " />
              </motion.div>
              <motion.h1 variants={fadeOut} className=" text-black font-medium">
                vGhostity
              </motion.h1>
            </motion.div>
          </motion.button>
        </LinkTo>
        <ul className="flex items-center before:content-['|'] before:text-3xl before:mx-4">
          <div className="hidden sm:flex">
            <li>
              <NavbarButton text="Browse" href="/browse" />
            </li>
            <li>
              <NavbarButton text="FAQ" href="/faq" />
            </li>
          </div>
        </ul>
      </div>
      {(() => {
        if (!isWindowSmall) {
          if (!user) {
            return (
              <button
                type="button"
                className="hidden sm:block text-md border rounded py-1 px-3 hover:bg-blurGray hover:border-2"
                onClick={() => setShowAuth(!showAuth)}
              >
                Login
              </button>
            );
          }

          return <ProfileNavbar />;
        }

        return (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-9 h-9 mt-1"
            onClick={() => setShowHamburgerMenu(true)}
          >
            <BiMenu size={34} color="black" />
          </motion.button>
        );
      })()}
    </nav>
  );
}
