// Libraries
import React, { useContext } from "react";
import { AnimationProps, motion } from "framer-motion";

// Components
import LinkTo from "../general/LinkTo";

// Animations
import homeAnimations from "./animations/homeAnimations";

// Images
import VGhostityDiscoveringAlt from "../../public/images/Ghost-discovering-ghostity-white.svg";
import VGhostityDiscovering from "../../public/images/Ghost-discovering-ghostity.svg?component";
import ThemeContext from "../../context/ThemeContext";

export default function HomeWelcome() {
  const animations = homeAnimations.welcome;
  const theme = useContext(ThemeContext)

  return (
    <section className="px-4 sm:px-36 h-[30rem] flex items-center justify-center dark:bg-none dark:bg-primary-dark bg-gradient-to-r from-primary via-secondary to-secondary2">
      <div className="flex justify-center items-center gap-6">
        <motion.div
          variants={animations.containerVariant}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="rounded max-w-[75ch] text-center sm:text-left"
        >
          <motion.h1
            variants={animations.textVariant}
            className="dark:text-text-primary-dark text-5xl lg:text-6xl font-medium mb-8"
          >
            Welcome to{" "}
            <motion.span
              variants={
                animations.ghostityVariant as AnimationProps["variants"]
              }
              className="dark:text-primary text-white"
            >
              vGhostity
            </motion.span>{" "}
            !
          </motion.h1>
          <motion.p
            variants={animations.textVariant}
            className="text-sm lg:text-base 2xl:text-lg mb-6 dark:text-text-secondary-dark text-gray-700"
          >
            A comprehensive (not exhaustive!) app for V-Tubers! Keep up with
            your favorite V-Tubers from Hololive or Nijisanji, or even explore
            and discover a new V-Tuber that you haven&apos;t even heard about!
          </motion.p>
          <motion.div variants={animations.textVariant}>
            <LinkTo href="/browse">
              <motion.button
                variants={animations.buttonVariant}
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
          variants={animations.ghostVariant}
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
