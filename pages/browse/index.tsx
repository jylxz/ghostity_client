import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

import BrowseStreams from "../../components/Browse/BrowseStreams";
import BrowseSideBar from "../../components/Browse/BrowseSideBar";

export default function browse() {
  return (
    <motion.div
     
      exit={{ opacity: 0 }}
    >
      <Head>
        <title>Ghostity | Browse</title>
      </Head>
      <BrowseStreams />
    </motion.div>
  );
}
