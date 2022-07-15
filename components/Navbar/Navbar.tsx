// Libraries
import React, { Dispatch, SetStateAction, useContext } from "react";
import { useRouter } from "next/router";
import { AnimationProps, motion } from "framer-motion";

// Icons
import { BiMenu } from "react-icons/bi";

// Components
import { MdOutlineDarkMode } from "react-icons/md";
import { BsFillSunFill } from "react-icons/bs";
import LinkTo from "../general/LinkTo";
import NavbarProfileButton from "./NavbarProfile";

// Contexts
import UserContext from "../../context/UserContext";

// Hooks
import useIsWindowSmall from "../../hooks/useIsWindowSmall";
import useThemeColor from "../../hooks/useThemeColor";

// Images
import VGhostityLogo from "../../public/images/Ghostity-svg.svg?component";
import VGhostityWhiteLogo from "../../public/images/Ghostity-svg-white.svg?component";

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
        className="dark:text-text-primary-dark text-gray-700 px-2 py-1 hover:bg-blurGray hover:rounded"
      >
        <div className="relative">
          {text}
          {router.route === href ||
          ((router.route.includes("browse") || router.route === "/search") &&
            text === "Browse") ? (
            <motion.div
              initial={false}
              layoutId="underline-navbar"
              className="underline-navbar dark:underline-dark-navbar"
              transition={spring}
            />
          ) : null}
        </div>
      </motion.button>
    </LinkTo>
  );
}

function ThemeButton({
  theme,
  overrideSystem,
}: {
  theme: "light" | "dark" | undefined;
  overrideSystem: () => void;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.7 }}
      type="button"
      onClick={() => overrideSystem()}
      className="px-2"
      aria-label="theme"
    >
      {theme === "light" ? <MdOutlineDarkMode color="black" size={20} /> : null}
      {theme === "dark" ? <BsFillSunFill color="#efefef" size={20} /> : null}
    </motion.button>
  );
}

function LoginButton({
  showAuth,
  setShowAuth,
  isWindowSmall,
}: {
  isWindowSmall: boolean;
  showAuth: boolean;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useContext(UserContext);

  return !user ? (
    <button
      type="button"
      className="hidden sm:block text-md dark:text-text-primary-dark border dark:border-text-primary-dark border-gray-500 rounded py-1 px-3 hover:bg-blurGray"
      onClick={() => setShowAuth(!showAuth)}
    >
      Login
    </button>
  ) : (
    <NavbarProfileButton user={user} isWindowSmall={isWindowSmall}/>
  );
}

function HamburgerNavButton({
  isWindowSmall,
  setShowHamburgerMenu,
  theme,
}: {
  isWindowSmall: boolean;
  setShowHamburgerMenu: Dispatch<SetStateAction<boolean>>;
  theme: "light" | "dark" | undefined;
}) {
  return isWindowSmall ? (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      whileTap={{ scale: 0.7 }}
      className="w-9 h-9"
      onClick={() => setShowHamburgerMenu(true)}
    >
      <BiMenu size={34} color={theme === "light" ? "black" : "white"} />
    </motion.button>
  ) : null;
}

export default function Navbar({
  showAuth,
  setShowAuth,
  setShowHamburgerMenu,
  theme,
  overrideSystem,
}: {
  showAuth: boolean;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
  setShowHamburgerMenu: Dispatch<SetStateAction<boolean>>;
  theme: "light" | "dark" | undefined;
  overrideSystem: () => void
}) {
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
    <nav className="sm:relative w-full dark:bg-none dark:bg-primary-dark bg-gradient-to-r from-primary via-secondary to-secondary2 flex items-center justify-between px-8 py-7 text-gray-500 h-14 z-50">
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
                {theme === "light" ? (
                  <VGhostityLogo className="h-8 w-8" />
                ) : (
                  <VGhostityWhiteLogo className="h-8 w-8" />
                )}
              </motion.div>
              <motion.h1
                variants={fadeOut}
                className=" dark:text-text-primary-dark text-black font-medium"
              >
                vGhostity
              </motion.h1>
            </motion.div>
          </motion.button>
        </LinkTo>
        <ul className="flex items-center before:content-['|'] before:text-3xl before:mx-4 before:dark:text-text-primary-dark">
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
      <div className="flex gap-3">
        <ThemeButton theme={theme} overrideSystem={overrideSystem} />
        <LoginButton
          isWindowSmall={isWindowSmall}
          showAuth={showAuth}
          setShowAuth={setShowAuth}
        />
        <HamburgerNavButton
          isWindowSmall={isWindowSmall}
          setShowHamburgerMenu={setShowHamburgerMenu}
          theme={theme}
        />
      </div>
    </nav>
  );
}
