import { Accordion, Typography } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";
import FaqAccordionDetails from "../FaqAccordionDetails";
import FaqAccordionSummary from "../FaqAccordionSummary"

export default function FaqVtuber({ currentTab }: { currentTab: string }) {
  return (
    <AnimatePresence exitBeforeEnter>
      {currentTab === "vtuber" ? (
        <motion.div
          initial={{
            translateX: -500,
            opacity: 0,
          }}
          animate={{
            translateX: 0,
            opacity: 1,
            transition: {
              delay: 1,
            },
          }}
          exit={{ translateX: -500, opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1a-content"
              id="panel1a-header"
            >
              <h3>How do I get on vGhostity?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                Getting on vGhostity is pretty easy, and in most cases you are
                probably already on here!
              </p>
              <br />
              <p>
                If you stream on <strong>Twitch</strong>, all you need to do is
                use Twitch&apos;s tag system and use the tag,
                &quot;Vtuber&quot;.
              </p>
              <p>
                If you stream on <strong>YouTube</strong>, all you need to do is
                put &quot;#Vtuber&quot; in your stream description or title.
              </p>
              <br />
              <p>
                Thats all you need to do and vGhostity will handle the rest!
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2a-content"
              id="panel2a-header"
            >
              <Typography>
                How long does it take to get on vGhostity?
              </Typography>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                vGhostity is set up to search for new Vtubers roughly every 30
                mins around the clock. It could possibly take longer if there is
                a lot of people streaming at that time and using the
                &quot;Vtuber&quot; tag.
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6a-content"
              id="panel6a-header"
            >
              <h3>
                I followed the instructions, but I still can&apos;t see my
                stream on vGhostity!
              </h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                If thats the case, then send me a message, especially if you
                stream on YouTube, through one of the three contacts above, with
                a link to your YouTube or Twitch channel. I&apos;ll try my best
                to get back to you as soon as possible and fix that for you!
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel7a-content"
              id="panel7a-header"
            >
              <h3>Can I remove my channel from vGhostity?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>Of course!</p>
              <br />
              <p>
                Simply send me a message through one of the three contacts above
                with a link to your YouTube or Twitch channel.
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel9a-content"
              id="panel9a-header"
            >
              <h3>Can I suggest a new feature/change?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                Absolutely! I would love to hear your opinion on how I can make
                VGhostity the best Vtuber app there is!
              </p>
            </FaqAccordionDetails>
          </Accordion>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
