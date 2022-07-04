// Libraries
import React, { useState } from "react";
import { AiOutlineMail } from "react-icons/ai";
import { LayoutGroup, motion } from "framer-motion";

// Components
import BackgroundWrapper from "../general/BackgroundWrapper";
import Footer from "../general/Footer";
import FaqOrganization from "./FaqOrganization";
import FaqVtuber from "./FaqVtuber";
import AnimatedButton from "../general/AnimatedButton";
import FaqUser from "./FaqUser";

// Images
import VGhostityLogo from "../../public/images/Ghostity-svg.svg";
import TwitterIcon from "../../public/images/TwitterBlue.svg";
import DiscordIcon from "../../public/images/Discord-Logo-Color.svg";

export default function FaqMain() {
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
    <div className="font-medium overflow-x-hidden">
      <BackgroundWrapper image="https://res.cloudinary.com/ghostity/image/upload/v1656533585/banner/Banner_1_hstgss.png">
        <div className="h-64 flex flex-col justify-center items-center">
          <div className="bg-primary w-20 h-20 p-4 rounded-full">
            <VGhostityLogo />
          </div>
          <h1 className="text-2xl font-semibold">Frequently Asked Questions</h1>
          <div className="text-sm text-gray-500">
            Last Updated: July 1, 2022
          </div>
          <div className="mt-4 flex flex-wrap justify-center items-center gap-4 bg-gray-200/70 px-3 py-1 rounded-lg">
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
              className="flex flex-col w-full justify-center items-center gap-4 mb-4"
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
                      ? "bg-slate-100 text-black"
                      : "bg-gray-100 : text-gray-300"
                  } py-1 px-2 rounded shadow`}
                  onClick={() => setCurrentTab("vtuber")}
                >
                  A Vtuber
                </AnimatedButton>
                <AnimatedButton
                  className={`${
                    currentTab === "user"
                      ? "bg-slate-100 text-black"
                      : "bg-gray-100 : text-gray-300"
                  } py-1 px-2 rounded shadow`}
                  onClick={() => setCurrentTab("user")}
                >
                  A User
                </AnimatedButton>
                <AnimatedButton
                  className={`${
                    currentTab === "org"
                      ? "bg-slate-100 text-black"
                      : "bg-gray-100 : text-gray-300"
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
  );
}
