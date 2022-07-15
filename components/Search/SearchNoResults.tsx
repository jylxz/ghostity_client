import React, { useContext } from "react";
import { motion } from "framer-motion";
import ThemeContext from "../../context/ThemeContext";
import GhostityLogo from "../../public/images/Ghostity-svg.svg";
import GhostityLogoAlt from "../../public/images/Ghostity-svg-white.svg";

export default function SearchNoResults() {
  const theme = useContext(ThemeContext);

  return (
    <motion.div
      key="no-results"
      className="dark:text-text-primary-dark text-2xl text-center mx-auto"
      exit={{ opacity: 0 }}
    >
      {theme === "light" ? (
        <GhostityLogo className="h-48 w-48" />
      ) : (
        <GhostityLogoAlt className="h-48 w-48" />
      )}
      No Results Found
    </motion.div>
  );
}
