// Libraries
import React from "react";
import { AnimationProps, motion } from "framer-motion";

// Components
import LinkTo from "../general/LinkTo";

// Animations
import homeAnimations from "./animations/homeAnimations"

// Images
import GhostityDiscovering from "../../public/images/Ghost-discovering-ghostity.svg";

export default function HomeWelcome() {
  const animations = homeAnimations.welcome

  return (
    <section className="px-4 sm:px-36 h-[30rem] flex items-center justify-center bg-gradient-to-r from-primary via-secondary to-secondary2">
      <div className="flex justify-center items-center gap-6">
        <motion.div
          variants={animations.containerVariant}
          initial="initial"
          whileInView="animate"
          viewport={{once: true}}
          className="rounded max-w-[75ch] text-center sm:text-left"
        >
          <motion.h1
            variants={animations.textVariant}
            className="text-5xl lg:text-6xl font-medium mb-8"
          >
            Welcome to{" "}
            <motion.span
              variants={animations.ghostityVariant as AnimationProps["variants"]}
              className="text-white"
            >
              ghostity
            </motion.span>{" "}
            !
          </motion.h1>
          <motion.p
            variants={animations.textVariant}
            className="text-sm lg:text-base 2xl:text-lg text-gray-500 mb-6"
          >
            A comprehensive (not exhaustive!) directory for V-Tubers! Keep up
            with your favorite V-Tubers from Hololive or Nijisanji, or even
            explore and discover a new V-Tuber that you haven&apos;t even heard
            about!
          </motion.p>
          <motion.div variants={animations.textVariant}>
            <LinkTo href="/browse">
              <motion.button
                variants={animations.buttonVariant}
                whileHover="hover"
                whileTap="tap"
                type="button"
                className="bg-white py-2 px-7 rounded text-gray-600 shadow hover:bg-slate-100 hover:animate-scale"
              >
                Browse
              </motion.button>
            </LinkTo>
          </motion.div>
        </motion.div>
        <motion.div
          variants={animations.ghostVariant}
          initial="initial"
          animate="animate"
          className="hidden lg:flex w-1/4 min-w-[400px] justify-center"
        >
          <GhostityDiscovering className="w-full" />
        </motion.div>
      </div>
    </section>
  );
}

