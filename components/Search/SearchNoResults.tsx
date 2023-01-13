import React, { useContext } from "react";
import { motion } from "framer-motion";
import ThemeContext from "@contexts/ThemeContext";
import Ghostity from "@logo/Ghostity.svg";
import GhostityWhite from "@logo/GhostityWhite.svg";

export default function SearchNoResults() {
  const theme = useContext(ThemeContext);

  return (
    <motion.div
      key="no-results"
      className="dark:text-text-primary-dark text-2xl text-center mx-auto"
      exit={{ opacity: 0 }}
    >
      {theme === "light" ? (
        <Ghostity className="h-48 w-48" />
      ) : (
        <GhostityWhite className="h-48 w-48" />
      )}
      No Results Found
    </motion.div>
  );
}
