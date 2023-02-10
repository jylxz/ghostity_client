import React from "react";
import { Accordion } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AnimatePresence, motion } from "framer-motion";
import FaqAccordionSummary from "../FaqAccordionSummary"
import FaqAccordionDetails from "../FaqAccordionDetails"

export default function FaqUser({ currentTab }: { currentTab: string }) {
  return (
    <AnimatePresence exitBeforeEnter>
      {currentTab === "user" ? (
        <motion.div
          initial={{
            translateY: 200,
            opacity: 0,
          }}
          animate={{
            translateY: 0,
            opacity: 1,
            transition: {
              delay: 1,
            },
          }}
          exit={{ translateY: 200, opacity: 0, transition: { duration: 0.4 } }}
          // transition={{ duration: 0.4 }}
        >
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <h3>
                How long does it take for streams to update/show up on
                vGhostity?
              </h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                vGhostity starts updating streams every 10 mins around the
                clock! However, it could take an few minutes before you can see
                it!
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2c-content"
              id="panel2c-header"
            >
              <h3>A feature/something is broken!</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                I still consider myself a Junior Developer so there is bound to
                be some bugs here and there. So, please forgive me and let know
                through twitter or discord! I&apos;ll try to fix it to the best
                of my ability!
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3c-content"
              id="panel3c-header"
            >
              <h3>Did you really build vGhostity by yourself?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                <strong>YES!</strong>
              </p>
              <br />
              <p>
                Unless you count YouTube tutorials, StackOverflow threads, and
                using React libraries. Everything was coded and designed by
                myself!
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5c-content"
              id="panel5c-header"
            >
              <h3>Can I suggest a new feature/change?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                Absolutely! I would love to hear your opinion on how I can make
                vGhostity the best Vtuber app there is!
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6c-content"
              id="panel6c-header"
            >
              <h3>Why is vGhostity called &quot;vGhostity&quot;?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                It&apos;s nothing too special or deep. When I was coming up
                names for the app, I was listening to Hoshimachi Suisei&apos;s
                song &quot;GHOST&quot; and decide why not use something with
                ghost in it. &quot;ghostity&quot; was a available domain and I
                added a &quot;v&quot; after some suggestions from some very cool
                people! Shoutout to the weebs in MoonCord!
              </p>
            </FaqAccordionDetails>
          </Accordion>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
