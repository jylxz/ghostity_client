// Libraries
import React, { useContext } from "react";
import { AnimationProps, motion } from "framer-motion";

// Images
import VGhostityDiscoveringAlt from "@images/Ghost-discovering-ghostity-white.svg";
import VGhostityDiscovering from "@images/Ghost-discovering-ghostity.svg";

// Components
import LinkTo from "@general/LinkTo";

// Contexts
import ThemeContext from "contexts/ThemeContext";

// Animation Variants
import {
  containerVariant,
  textVariant,
  ghostVariant,
  ghostityVariant,
  buttonVariant,
} from "../animations/HomeWelcomeAnimations";


export default function HomeWelcome() {
  const theme = useContext(ThemeContext);

  return (
    <section className="px-4 sm:px-36 h-[30rem] flex items-center justify-center dark:bg-none dark:bg-primary-dark bg-gradient-to-r from-primary via-secondary to-secondary2">
      <div className="flex justify-center items-center gap-6">
        <motion.div
          variants={containerVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="rounded max-w-[75ch] text-center sm:text-left"
        >
          <motion.h1
            variants={textVariant}
            className="dark:text-text-primary-dark text-5xl lg:text-6xl font-medium mb-8"
          >
            Welcome to{" "}
            <motion.span
              variants={
                ghostityVariant as AnimationProps["variants"]
              }
              className="dark:text-primary text-white"
            >
              vGhostity
            </motion.span>{" "}
            !
          </motion.h1>
          <motion.p
            variants={textVariant}
            className="text-sm lg:text-base 2xl:text-lg mb-6 dark:text-text-secondary-dark text-text-secondary"
          >
            A comprehensive (not exhaustive!) app for VTubers! Keep up with your
            favorite VTubers from Hololive or Nijisanji, or even explore and
            discover a new VTuber that you haven&apos;t even heard about,
            regardless if they stream on Twitch or Youtube!
          </motion.p>
          <motion.div variants={textVariant}>
            <LinkTo href="/browse">
              <motion.button
                variants={buttonVariant}
                whileHover="hover"
                whileTap="tap"
                type="button"
                className="dark:bg-secondary-dark-2 dark:text-primary bg-white py-2 px-7 rounded text-gray-600 shadow font-medium hover:bg-slate-100 hover:animate-scale"
              >
                Browse
              </motion.button>
            </LinkTo>
          </motion.div>
        </motion.div>
        <motion.div
          variants={ghostVariant}
          initial="initial"
          animate="animate"
          className="hidden lg:flex w-1/4 min-w-[400px] justify-center"
        >
          {theme === "light" ? (
            <VGhostityDiscovering className="w-full" />
          ) : (
            <VGhostityDiscoveringAlt className="w-full" />
          )}
        </motion.div>
      </div>
    </section>
  );
}
