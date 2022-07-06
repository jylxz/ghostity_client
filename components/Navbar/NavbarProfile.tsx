import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { signOut, User } from "firebase/auth";
import { AiOutlineLogout } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import UserContext from "../../context/UserContext";
import { auth } from "../../firebase/ghostityFirebase";
// import { auth } from "../../firebase/ghostityDevFirebase";
import UserProfileCard from "./UserProfileCard";
import HamburgerNavMenuButton from "./HamburgerNavMenuButton";

function NavbarProfileMenu({
  show,
  setShow,
}: {
  show: boolean;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <AnimatePresence exitBeforeEnter>
      {show ? (
        <motion.div
          key="profileNavbar"
          layoutId="profileNavbar"
          initial={{ translateX: 400 }}
          animate={{
            translateX: 0,
          }}
          exit={{ translateX: 300 }}
          className="absolute top-[44px] -right-8 z-40 w-64 bg-slate-100 text-black px-2 py-3 rounded-bl "
        >
          <UserProfileCard closeParent={setShow} />
          <div className="flex flex-col items-end px-4 py-2 text font-medium">
            <HamburgerNavMenuButton
              title="Logout"
              onClick={() => signOut(auth)}
              icon={<AiOutlineLogout />}
            />
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}

export default function NavbarProfileButton({ user }: { user: User | null }) {
  const router = useRouter();
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(false);
  }, [router.route]);

  return (
    <div className="relative">
      {user && user.photoURL ? (
        <button
          onClick={() => setShow(!show)}
          type="button"
          className="flex items-center"
        >
          <Image
            alt="vGhostity profile image"
            src={user.photoURL}
            height={32}
            width={32}
            className="rounded-full"
          />
        </button>
      ) : null}
      <NavbarProfileMenu show={show} setShow={setShow}/>
    </div>
  );
}
