// Libraries
import React, { Dispatch, SetStateAction, useContext } from "react";
import { AnimatePresence, motion } from "framer-motion";

// Icons
import {
  AiOutlineHome,
  AiOutlineQuestion,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";

// Firebase
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/ghostityFirebase";
// import { auth } from "../../firebase/ghostityDevFirebase";

// Components
import VGhostityLogo from "../../public/images/Ghostity-svg.svg";
import AnimatedButton from "../general/AnimatedButton";
import ModalWrapper from "../general/ModalWrapper";
import LinkTo from "../general/LinkTo";
import UserProfileCard from "./UserProfileCard";

// Context
import UserContext from "../../context/UserContext";

export default function HamburgerNavMenu({
  showHamburgerMenu,
  setShowHamburgerMenu,
  setShowAuth,
}: {
  showHamburgerMenu: boolean;
  setShowHamburgerMenu: Dispatch<SetStateAction<boolean>>;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useContext(UserContext);

  return (
    <AnimatePresence exitBeforeEnter>
      {showHamburgerMenu ? (
        <ModalWrapper
          onClick={() => setShowHamburgerMenu(false)}
        >
          <motion.div
            className="fixed top-0 right-0 dark:bg-secondary-dark dark:border-primary-dark text-black bg-slate-100 z-50 h-full w-64 border-l-4 border-white flex flex-col px-2 py-8"
            initial={{ translateX: 300 }}
            animate={{ translateX: 0 }}
            exit={{ translateX: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <UserProfileCard closeParent={setShowHamburgerMenu} />
            <div className="dark:text-text-primary-dark  flex flex-col items-end grid-rows-3 p-4 text-lg gap-4 justify-items-end">
              <div className="">
                <LinkTo href="/">
                  <AnimatedButton
                    className="flex items-center gap-2"
                    onClick={() => setShowHamburgerMenu(false)}
                  >
                    Home
                    <div className="border-l-2 border-gray-300 pl-3">
                      <AiOutlineHome />
                    </div>
                  </AnimatedButton>
                </LinkTo>
              </div>
              <div className="">
                <LinkTo href="/browse">
                  <AnimatedButton
                    className="flex items-center gap-2 border-b-2 border-gray-300"
                    onClick={() => setShowHamburgerMenu(false)}
                  >
                    Browse
                    <div className="border-l-2 border-gray-300 pl-3">
                      <div className="w-5 h-5 -scale-x-100">
                        <VGhostityLogo className="dark:fill-text-primary-dark"/>
                      </div>
                    </div>
                  </AnimatedButton>
                </LinkTo>
                <div className="mt-2 text-base dark:text-text-secondary-dark text-gray-600 flex flex-col items-end gap-1.5">
                  <AnimatedButton onClick={() => setShowHamburgerMenu(false)}>
                    <LinkTo href="/browse/following">Following</LinkTo>
                  </AnimatedButton>
                  <AnimatedButton onClick={() => setShowHamburgerMenu(false)}>
                    <LinkTo href="/browse">Streams</LinkTo>
                  </AnimatedButton>
                  <AnimatedButton onClick={() => setShowHamburgerMenu(false)}>
                    <LinkTo href="/browse/games">Games</LinkTo>
                  </AnimatedButton>
                  <AnimatedButton onClick={() => setShowHamburgerMenu(false)}>
                    <LinkTo href="/browse/organizations">Organizations</LinkTo>
                  </AnimatedButton>
                  <AnimatedButton onClick={() => setShowHamburgerMenu(false)}>
                    <LinkTo href="/search">Search</LinkTo>
                  </AnimatedButton>
                </div>
              </div>
              <div>
                <LinkTo href="/faq">
                  <AnimatedButton
                    className="flex items-center gap-2"
                    onClick={() => setShowHamburgerMenu(false)}
                  >
                    FAQ
                    <div className="border-l-2 border-gray-300 pl-3">
                      <AiOutlineQuestion />
                    </div>
                  </AnimatedButton>
                </LinkTo>
              </div>
              <div>
                {user ? (
                  <AnimatedButton
                    className="flex items-center gap-2"
                    onClick={() => signOut(auth)}
                  >
                    Log Out
                    <div className="border-l-2 border-gray-300 pl-3">
                      <AiOutlineLogout />
                    </div>
                  </AnimatedButton>
                ) : (
                  <AnimatedButton
                    className="flex items-center gap-2"
                    onClick={() => {
                      setShowHamburgerMenu(false);
                      setShowAuth(true);
                    }}
                  >
                    Log In
                    <div className="border-l-2 border-gray-300 pl-3">
                      <AiOutlineLogin />
                    </div>
                  </AnimatedButton>
                )}
              </div>
            </div>
          </motion.div>
        </ModalWrapper>
      ) : null}
    </AnimatePresence>
  );
}
