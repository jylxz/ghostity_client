// Libraries
import React from "react";
import { motion } from "framer-motion";

// Components
import SectionWrapper from "../general/SectionWrapper";
import LinkTo from "../general/LinkTo";

// Animations
import homeAnimations from "./animations/homeAnimations"

// Images
import GhostityLogo from "../../public/images/Ghostity-svg.svg";

export default function HomeHelp() {
  const animations = homeAnimations.help

  return (
    <SectionWrapper color="bg-slate-50" className="py-14">
      <div className="grid grid-cols-2 w-3/4 mx-auto">
        <div className="text-6xl flex justify-center items-center">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{once: true}}
            className="relative"
          >
            <motion.div variants={animations.ghostVariant}>
              <GhostityLogo className="h-24 w-24" />
            </motion.div>
            <motion.span
              variants={animations.questionMarkVariant}
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
          viewport={{once: true}}
          className="flex flex-col gap-4 max-w-[75ch]"
        >
          <motion.h2
            variants={animations.questionHeadingVariant}
            className="text-xl lg:text-2xl"
          >
            Questions?
          </motion.h2>
          <motion.div variants={animations.containerVariant}>
            <motion.p
              variants={animations.textVariant}
              className="text-sm lg:text-base text-gray-500"
            >
              Are you a V-Tuber, but don&apos;t see your channel on ghostity?
              Check the FAQ page for help!
            </motion.p>
            <motion.div variants={animations.textVariant} className="mt-3">
              <LinkTo href="/faq">
                <motion.button
                  type="button"
                  variants={animations.buttonVariant}
                  whileHover="hover"
                  className="bg-gradient-to-r from-primary via-secondary to-secondary2 shadow-sm px-4 py-1 rounded"
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
