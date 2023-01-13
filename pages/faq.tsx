// Libraries
import Head from "next/head";
import React, { useState } from "react";
import { LayoutGroup, motion } from "framer-motion";

// Components
import { DefaultDescription, DefaultKeywords } from "@components/Head";
import {
  FaqBanner,
  FaqTabsMenu,
  FaqOrganization,
  FaqUser,
  FaqVtuber,
} from "@components/FAQ";
import Footer from "@general/Footer";

export default function Faq() {
  const [currentTab, setCurrentTab] = useState("");

  return (
    <>
      <Head>
        <title>vGhostity | FAQ</title>
      </Head>
      <>
        <DefaultDescription />
        <DefaultKeywords />
      </>
      <div className="font-medium overflow-hidden">
        <FaqBanner />
        <LayoutGroup>
          <motion.div
            layout
            transition={{ layout: { delay: 0.3 } }}
            className="flex justify-center items-center min-h-[40rem]"
          >
            <motion.div
              layout="size"
              className="max-w-[75ch] py-20 px-6 flex flex-col gap-4"
            >
              <FaqTabsMenu
                currentTab={currentTab}
                setCurrentTab={setCurrentTab}
              />
              <FaqVtuber currentTab={currentTab} />
              <FaqUser currentTab={currentTab} />
              <FaqOrganization currentTab={currentTab} />
            </motion.div>
          </motion.div>
          <Footer />
        </LayoutGroup>
      </div>
    </>
  );
}
