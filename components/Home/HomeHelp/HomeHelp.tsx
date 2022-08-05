// Libraries
import React from "react";
import { motion } from "framer-motion";

// Images
import Ghostity from "@logo/Ghostity.svg";

// Components
import LinkTo from "@general/LinkTo";
import SectionWrapper from "../HomeSectionWrapper";

// Animations
import {
  ghostVariant,
  questionMarkVariant,
  questionHeadingVariant,
  containerVariant,
  textVariant,
  buttonVariant,
} from "../animations/HomeHelpAnimations";


export default function HomeHelp() {
  return (
    <SectionWrapper
      color="bg-slate-50"
      className="dark:bg-secondary-dark py-14"
    >
      <div className="grid grid-cols-2 gap-8 sm:w-1/2 mx-auto">
        <div className="text-6xl flex justify-center items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div variants={ghostVariant}>
              <Ghostity className="h-24 w-24 dark:fill-text-primary-dark" />
            </motion.div>
            <motion.span
              variants={questionMarkVariant}
              className="absolute -top-[1rem] -right-[2rem] select-none cursor-default dark:text-text-primary-dark"
            >
              ?
            </motion.span>
          </motion.div>
        </div>
        <motion.div
          initial="initial"
          whileInView="animate"
          whileTap="tap"
          viewport={{ once: true }}
          className="flex flex-col gap-4 max-w-[75ch]"
        >
          <motion.h2
            variants={questionHeadingVariant}
            className="text-xl font-medium lg:text-2xl dark:text-text-primary-dark"
          >
            Questions?
          </motion.h2>
          <motion.div variants={containerVariant}>
            <motion.p
              variants={textVariant}
              className="text-sm lg:text-base text-gray-500 dark:text-text-secondary-dark"
            >
              Are you a V-Tuber, but don&apos;t see your channel on vGhostity?
              Check the FAQ page for help!
            </motion.p>
            <motion.div variants={textVariant} className="mt-3">
              <LinkTo href="/faq">
                <motion.button
                  type="button"
                  variants={buttonVariant}
                  whileHover="hover"
                  className="dark:bg-none dark:bg-secondary-dark-2 dark:text-primary bg-gradient-to-r from-primary via-secondary to-secondary2 shadow-sm px-4 py-1 rounded font-medium"
                >
                  FAQ Page
                </motion.button>
              </LinkTo>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
