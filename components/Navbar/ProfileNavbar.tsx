import React, { useState, useContext, useEffect } from "react";
import Image from "next/image";
import { signOut } from "firebase/auth";
import { AiOutlineLogout } from "react-icons/ai";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/router";
import UserContext from "../../context/UserContext";
import { auth } from "../../firebase/clientApp";
import UserProfileCard from "../general/UserProfileCard";
import HamburgerNavMenuButton from "../general/HamburgerNavMenuButton";

export default function ProfileNavbar() {
  const router = useRouter();
  const [show, setShow] = useState(false);
  const user = useContext(UserContext);

  useEffect(() => {
    setShow(false);
  }, [router.route]);

  return (
    <div className="relative flex items-center">
      {user && user.photoURL ? (
        <button onClick={() => setShow(!show)} type="button">
          <Image
            src={user.photoURL}
            height={32}
            width={32}
            className="rounded-full"
          />
        </button>
      ) : null}
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
            className="absolute top-11 -right-8 z-40 w-64 bg-slate-100 text-black px-2 py-3 rounded-bl"
          >
            <UserProfileCard closeParent={setShow} />
            <div className="flex flex-col items-end px-4 py-2 text">
              <HamburgerNavMenuButton
                title="Logout"
                onClick={() => signOut(auth())}
                icon={<AiOutlineLogout />}
              />
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
