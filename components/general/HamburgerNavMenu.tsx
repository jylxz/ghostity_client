import { motion } from "framer-motion";
import React, { Dispatch, SetStateAction, useContext } from "react";
import {
  AiOutlineHome,
  AiOutlineQuestion,
  AiOutlineLogout,
  AiOutlineLogin,
} from "react-icons/ai";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase/clientApp";
import GhostityLogo from "../../public/images/Ghostity-svg.svg";
import AnimatedButton from "./AnimatedButton";
import DarkenBackgroundWrapper from "./DarkenBackgroundWrapper";
import LinkTo from "./LinkTo";
import UserContext from "../../context/UserContext";
import UserFollowContext from "../../context/UserFollowContext";
import UserProfileCard from "./UserProfileCard";

export default function HamburgerNavMenu({
  setShowHamburgerMenu,
  setShowAuth,
}: {
  setShowHamburgerMenu: Dispatch<SetStateAction<boolean>>;
  setShowAuth: Dispatch<SetStateAction<boolean>>;
}) {
  const user = useContext(UserContext);

  return (
    <DarkenBackgroundWrapper onClick={() => setShowHamburgerMenu(false)}>
      <motion.div
        className="fixed right-0 text-black bg-slate-100 z-50 h-full w-64 border-l-4 border-white flex flex-col px-2 py-8"
        initial={{ translateX: 300 }}
        animate={{ translateX: 0 }}
        exit={{ translateX: 300 }}
      >
        <UserProfileCard closeParent={setShowHamburgerMenu}/>
        <div className="flex flex-col items-end grid-rows-3 p-4 text-lg gap-4 justify-items-end">
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
                    <GhostityLogo />
                  </div>
                </div>
              </AnimatedButton>
            </LinkTo>
            <div className="mt-2 text-sm flex flex-col items-end gap-1.5">
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
                onClick={() => signOut(auth())}
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
    </DarkenBackgroundWrapper>
  );
}