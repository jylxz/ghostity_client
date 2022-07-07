import { Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AnimatePresence, motion } from "framer-motion";

import React from "react";
import FaqAccordionDetails from "./FaqAccordionDetails";
import FaqAccordionSummary from "./FaqAccordionSummary";

export default function FaqOrganization({
  currentTab,
}: {
  currentTab: string;
}) {
  return (
    <AnimatePresence exitBeforeEnter>
      {currentTab === "org" ? (
        <motion.div
          initial={{
            translateX: 500,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
            transition: {
              delay: 1,
            },
          }}
          exit={{ translateX: 500, opacity: 0, transition: { duration: 0.4 } }}
          // transition={{ duration: 0.4 }}
        >
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1b-content"
              id="panel1b-header"
            >
              <h3>Can my organization be added into vGhostity?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
                <p>Absolutely!</p>
                <br />
                <p>
                  The only requirement at the moment is that your organization
                  has a professionally made website! This requirement is purely
                  for quality control and because I have to manually add the
                  information about your organization and members at this
                  moment. Perhaps when I implement an easier way to add
                  organizations, I can drop this requirement.
                </p>
                <br />
                <p>
                  If you meet that requirement, send me a message through one of
                  the three contacts above and let&apos;s get your organization
                  on vGhostity!
                </p>
            </FaqAccordionDetails>
          </Accordion>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
