import React from "react";
import Head from "next/head";
import { motion } from "framer-motion";

import BrowseStreams from "../../components/Browse/BrowseStreams";
import BrowseSideBar from "../../components/SideBar/SideBarMain";

export default function browse() {
  return (
    <>
      <Head>
        <title>Ghostity | Browse</title>
      </Head>
      <BrowseStreams />
    </>
  );
}
