import Head from "next/head";
import React, { useContext, useState } from "react";

// Icons
import { AnimatePresence } from "framer-motion";

// Contexts
import UserContext from "@contexts/UserContext";

// Components
import {
  AccountBanner,
  AccountChangePfp,
  AccountMain,
  AccountNoUser,
} from "@components/Account";
import Footer from "@general/Footer";

export default function Account() {
  const user = useContext(UserContext);
  const [editPfp, setEditPfp] = useState(false);

  return (
    <>
      <Head>
        <title>vGhostity | Account</title>
      </Head>
      <div className="relative font-medium">
        <AnimatePresence exitBeforeEnter>
          {editPfp && <AccountChangePfp setEditPfp={setEditPfp} />}
        </AnimatePresence>
        {user ? (
          <div className={`flex flex-col min-h-screen ${!user ? "blur" : ""}`}>
            <AccountBanner user={user} setEditPfp={setEditPfp} />
            <AccountMain user={user} />
          </div>
        ) : (
          <div className="min-h-screen" />
        )}
        {!user && <AccountNoUser />}
      </div>
      <Footer />
    </>
  );
}
