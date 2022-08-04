import Head from "next/head";
import React, { useState } from "react";
import { DefaultDescription, DefaultKeywords } from "components/Head";
import { AiOutlineMail } from "react-icons/ai";
import { LayoutGroup, motion } from "framer-motion";

// Components
import BackgroundWrapper from "@general/BackgroundWrapper";
import Footer from "@general/Footer";
import FaqOrganization from "components/FAQ/FaqOrganization";
import FaqVtuber from "components/FAQ/FaqVtuber";
import AnimatedButton from "@general/AnimatedButton";
import FaqUser from "components/FAQ/FaqUser";

// Images
import VGhostityLogo from "@images/Ghostity-svg.svg";
import TwitterIcon from "@images/TwitterBlue.svg";
import DiscordIcon from "@images/Discord-Logo-Color.svg";

export default function Faq() {
  const [currentTab, setCurrentTab] = useState("");

  const containerAnimation = {
    animate: {
      transition: {
        delayChildren: 1,
        staggerChildren: 0.6,
      },
    },
  };

  const itemAnimation = {
    initial: {
      opacity: 0,
    },
    animate: {
      opacity: 1,
    },
  };
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
        <BackgroundWrapper image="https://res.cloudinary.com/ghostity/image/upload/v1656533585/banner/Banner_1_hstgss.png">
          <div className="h-64 flex flex-col justify-center items-center">
            <div className="bg-primary w-20 h-20 p-4 rounded-full">
              <VGhostityLogo />
            </div>
            <h1 className="text-2xl dark:text-text-primary-dark font-semibold">
              Frequently Asked Questions
            </h1>
            <div className="text-sm dark:text-text-primary-dark text-gray-500">
              Last Updated: July 6, 2022
            </div>
            <div className="mt-4 flex flex-wrap justify-center items-center gap-4 bg-gray-200/70 dark:bg-secondary-dark dark:text-text-primary-dark px-3 py-1 rounded-lg">
              <div>
                <a
                  href="https://twitter.com/_jylx"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm gap-2"
                >
                  <div className="h-5 w-5 mt-1.5">
                    <TwitterIcon />
                  </div>
                  <span>@_Jylx</span>
                </a>
              </div>
              |
              <div>
                <a
                  href="https://discordapp.com/users/577727654011338753"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center text-sm gap-1"
                >
                  <div className="h-5 w-5 mt-1.5">
                    <DiscordIcon />
                  </div>
                  <span>Jylx#5461</span>
                </a>
              </div>
              |
              <div>
                <a
                  href="mailto:jylx@ghostity.com"
                  className="flex items-center text-sm gap-1"
                >
                  <AiOutlineMail size={20} />
                  <span>Jylx@ghostity.com</span>
                </a>
              </div>
            </div>
          </div>
        </BackgroundWrapper>
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
              <motion.div
                layout="position"
                className="dark:text-text-primary-dark flex flex-col w-full justify-center items-center gap-4 mb-4"
                variants={containerAnimation}
                initial="initial"
                animate="animate"
              >
                <motion.h2
                  layout
                  variants={itemAnimation}
                  className="text-2xl text-center"
                >
                  Welcome to the vGhostity FAQ page!
                </motion.h2>
                <motion.h3
                  layout
                  variants={itemAnimation}
                  className="text-center"
                >
                  I am ...
                </motion.h3>
                <motion.div
                  layout
                  variants={itemAnimation}
                  className="flex gap-3 text-sm"
                >
                  <AnimatedButton
                    className={`${
                      currentTab === "vtuber"
                        ? "dark:bg-secondary-dark dark:text-primary bg-slate-100 text-black"
                        : "dark:bg-text-secondary-dark bg-gray-100 text-gray-300"
                    } py-1 px-2 rounded shadow`}
                    onClick={() => setCurrentTab("vtuber")}
                  >
                    A Vtuber
                  </AnimatedButton>
                  <AnimatedButton
                    className={`${
                      currentTab === "user"
                        ? "dark:bg-secondary-dark dark:text-primary bg-slate-100 text-black"
                        : "dark:bg-text-secondary-dark bg-gray-100 text-gray-300"
                    } py-1 px-2 rounded shadow`}
                    onClick={() => setCurrentTab("user")}
                  >
                    A User
                  </AnimatedButton>
                  <AnimatedButton
                    className={`${
                      currentTab === "org"
                        ? "dark:bg-secondary-dark dark:text-primary bg-slate-100 text-black"
                        : "dark:bg-text-secondary-dark bg-gray-100  text-gray-300"
                    } py-1 px-2 rounded shadow`}
                    onClick={() => setCurrentTab("org")}
                  >
                    An Organization
                  </AnimatedButton>
                </motion.div>
              </motion.div>
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
