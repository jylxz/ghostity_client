import React from "react";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GhostityLogo from "../../public/images/Ghostity-svg.svg";

function Footer() {
  const animations = {
    textVariant: {
      initial: {
        translateX: -200,
        opacity: 0,
      },
      animate: { translateX: 0, opacity: 1 },
    },
    ghostVariant: {
      initial: {
        translateX: 200,
        opacity: 0,
      },
      animate: {
        translateX: 0,
        opacity: 1,
      },
    },
    heartVariant: {
      initial: {
        opacity: 0
      },
      animate: {
        opacity: 1,
        transition: {
          delay: 1
        }
      }
    }
  };

  return (
    <footer className="h-16 bg-gradient-to-r from-primary via-secondary to-secondary2 flex justify-center items-center">
      <motion.div initial="initial" whileInView="animate" viewport={{once: true}} className="flex items-center">
        <motion.div variants={animations.textVariant}>
          Made by
          <span className="bg-[length:160%_160%] bg-left bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent font-bold animate-background-position-left text-lg">
            <a
              href="https://www.twitter.com/_jylx"
              target="_blank"
              rel="noopener noreferrer"
            >
              &nbsp;Jylx
            </a>
          </span>
          /Ghostity Project
        </motion.div>
        <motion.div variants={animations.heartVariant}>
          <FavoriteBorderIcon className="text-sm ml-2" />
        </motion.div>
        <motion.div variants={animations.ghostVariant}>
          <GhostityLogo className="h-6 w-6 -scale-x-100" />
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default Footer;
