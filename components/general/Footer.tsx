import React from "react";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import GhostityLogo from "../../public/images/Ghostity-svg.svg";
import LinkTo from "./LinkTo";

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
      opacity: 0,
    },
    animate: {
      opacity: 1,
      transition: {
        delay: 1.5,
      },
    },
  },
  containerVariant: {
    animate: {
      transition: { staggerChildren: 0.3 },
    },
  },
  textVariant2: {
    initial: { translateY: 50, opacity: 0 },
    animate: {
      translateY: 0,
      opacity: 1,
    },
  },
};

function FooterItem({ children }: { children: React.ReactNode }) {
  return <motion.div variants={animations.textVariant2}>{children}</motion.div>;
}

function Footer() {
  return (
    <footer className="pt-16 pb-28 bg-gradient-to-r from-primary via-secondary to-secondary2 flex justify-center items-center">
      <div className="sm:flex gap-10 sm:gap-20 px-6">
        <div className="mb-10 sm:mb-0">
          <div className="flex gap-2 items-center text-2xl border-b border-black pb-2 mb-2">
            <div>
              <GhostityLogo className="h-12 w-12" />
            </div>
            <h1 className="text-3xl sm:text-4xl text-black">ghostity</h1>
          </div>
          <motion.div initial="initial" whileInView="animate" viewport={{once: true}} className="flex text-sm">
            <motion.div variants={animations.textVariant}>
              Made by
              <span className="bg-[length:160%_160%] bg-left bg-gradient-to-r from-pink-300 via-purple-300 to-indigo-400 bg-clip-text text-transparent font-bold animate-background-position-left text-sm">
                <a
                  href="https://www.twitter.com/_jylx"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  &nbsp;Jylx
                </a>
              </span>
            </motion.div>
            <motion.div variants={animations.heartVariant}>
              <FavoriteBorderIcon className="text-sm ml-2" />
            </motion.div>
            <motion.div variants={animations.ghostVariant}>
              <GhostityLogo className="h-5 w-5 -scale-x-100" />
            </motion.div>
          </motion.div>
        </div>
        <div className="grid grid-cols-4 gap-3">
          <div className="flex flex-col text-sm items-center">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1"
              >
                Browse
              </motion.h2>
              <div className="flex flex-col gap-1 text-gray-600">
                <FooterItem>
                  <LinkTo href="/browse/following">Following</LinkTo>
                </FooterItem>
                <FooterItem>
                  <LinkTo href="/browse/streams">Streams</LinkTo>
                </FooterItem>
                <FooterItem>
                  <LinkTo href="/browse/games">Games</LinkTo>
                </FooterItem>
                <FooterItem>
                  <LinkTo href="/browse/organizations">Organizations</LinkTo>
                </FooterItem>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-center text-sm">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col text-gray-600"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1 text-black"
              >
                Contacts
              </motion.h2>
              <div className="flex flex-col gap-1">
                <FooterItem>
                  <a
                    href="https://discordapp.com/users/577727654011338753"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Discord
                  </a>
                </FooterItem>
                <FooterItem>
                  <a
                    href="https://www.twitter.com/_jylx"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Twitter
                  </a>
                </FooterItem>
              </div>
            </motion.div>
          </div>
          <div className="flex justify-center text-sm">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col text-gray-600"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1 text-black"
              >
                Help
              </motion.h2>
              <FooterItem>
                <LinkTo href="/faq">FAQ</LinkTo>
              </FooterItem>
            </motion.div>
          </div>
          <div className="flex justify-center text-sm">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col text-gray-600"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1 text-black"
              >
                Status
              </motion.h2>
              <FooterItem>
                <a
                  href="https://ghostity.statuspage.io"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Status
                </a>
              </FooterItem>
            </motion.div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
