// Libraries
import React from "react";
import { motion } from "framer-motion";

// Components
import SectionWrapper from "../general/SectionWrapper";
import LinkTo from "../general/LinkTo";

// Animations
import { homeHelpAnimations } from "./animations/homeAnimations";

// Images
import VGhostityLogo from "../../public/images/Ghostity-svg.svg";

export default function HomeHelp() {
  const {
    ghostVariant,
    questionMarkVariant,
    questionHeadingVariant,
    containerVariant,
    textVariant,
    buttonVariant,
  } = homeHelpAnimations;

  return (
    <SectionWrapper color="bg-slate-50" className="py-14">
      <div className="grid grid-cols-2 gap-8 sm:w-1/2 mx-auto">
        <div className="text-6xl flex justify-center items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative"
          >
            <motion.div variants={ghostVariant}>
              <VGhostityLogo className="h-24 w-24" />
            </motion.div>
            <motion.span
              variants={questionMarkVariant}
              className="absolute -top-[1rem] -right-[2rem] select-none cursor-default"
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
            className="text-xl font-medium lg:text-2xl"
          >
            Questions?
          </motion.h2>
          <motion.div variants={containerVariant}>
            <motion.p
              variants={textVariant}
              className="text-sm lg:text-base text-gray-500"
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
                  className="bg-gradient-to-r from-primary via-secondary to-secondary2 shadow-sm px-4 py-1 rounded font-medium"
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
