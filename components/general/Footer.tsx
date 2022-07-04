import React from "react";
import { motion } from "framer-motion";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import VGhostityLogo from "../../public/images/Ghostity-svg.svg";
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
    <motion.footer layout className="pt-16 pb-28 bg-gradient-to-r from-primary via-secondary to-secondary2 flex justify-center items-center">
      <div className="flex-1 lg:flex-none md:flex gap-10 sm:gap-20 px-6 justify-center sm:w-1/2">
        <div className="mb-10">
          <LinkTo href="/">
            <div className="flex gap-2 items-center text-2xl border-b border-black pb-2 mb-2">
              <div>
                <VGhostityLogo className="h-12 w-12" />
              </div>
              <h1 className="text-3xl sm:text-4xl text-black">vGhostity</h1>
            </div>
          </LinkTo>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="flex text-sm"
          >
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
              <VGhostityLogo className="h-5 w-5 -scale-x-100" />
            </motion.div>
          </motion.div>
        </div>
        <div className="flex-1 grid grid-cols-[repeat(auto-fill,_minmax(6rem,_1fr))] gap-x-1 gap-y-3">
          <div className="flex flex-col text-sm">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1 font-medium"
              >
                Browse
              </motion.h2>
              <div className="flex flex-col gap-1 text-gray-600">
                <FooterItem>
                  <LinkTo href="/browse/following">Following</LinkTo>
                </FooterItem>
                <FooterItem>
                  <LinkTo href="/browse">Streams</LinkTo>
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
          <div className="flex text-sm">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col text-gray-600"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1 text-black font-medium"
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
                <FooterItem>
                  <a href="mailto:jylx@ghostity.com">Email</a>
                </FooterItem>
              </div>
            </motion.div>
          </div>
          <div className="flex text-sm">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col text-gray-600"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1 text-black font-medium"
              >
                Legal
              </motion.h2>
              <div className="flex flex-col gap-1">
                <FooterItem>
                  <LinkTo href="/legal/terms-of-service">
                    Terms of Service
                  </LinkTo>
                </FooterItem>
                <FooterItem>
                  <LinkTo href="/legal/privacy-policy">Privacy Policy</LinkTo>
                </FooterItem>
              </div>
            </motion.div>
          </div>
          <div className="flex text-sm">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col text-gray-600"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1 text-black font-medium"
              >
                Help
              </motion.h2>
              <FooterItem>
                <LinkTo href="/faq">FAQ</LinkTo>
              </FooterItem>
            </motion.div>
          </div>
          <div className="flex text-sm">
            <motion.div
              initial="initial"
              whileInView="animate"
              variants={animations.containerVariant}
              viewport={{ once: true }}
              className="flex flex-col text-gray-600"
            >
              <motion.h2
                variants={animations.textVariant2}
                className="text-lg mb-1 text-black font-medium"
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
    </motion.footer>
  );
}

export default Footer;
