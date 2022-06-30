import { Accordion, AccordionSummary, AccordionDetails } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { AnimatePresence, motion } from "framer-motion";
import React from "react";

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
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel1c-content"
              id="panel1c-header"
            >
              <h3>
                How long does it take for streams to update/show up on ghostity?
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="text-sm text-gray-500">
                <p>
                  Ghostity starts updating streams every 10 mins around the
                  clock! However, it could take an few minutes before you can
                  see it!
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel2c-content"
              id="panel2c-header"
            >
              <h3>A feature/something is broken!</h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="text-sm text-gray-500">
                <p>
                  I still consider myself a Junior Developer so there is bound
                  to be some bugs here and there. So, please forgive me and let
                  know through twitter or discord! I&apos;ll try to fix it to
                  the best of my ability!
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel3c-content"
              id="panel3c-header"
            >
              <h3>Did you really build ghostity by yourself?</h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="text-sm text-gray-500">
                <p>
                  <strong>YES!</strong>
                </p>
                <br />
                <p>
                  Unless you count YouTube tutorials, StackOverflow threads, and
                  using React libraries. Everything was coded and designed by
                  myself!
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4c-content"
              id="panel4c-header"
            >
              <h3>
                How can I support the continued development of ghostity and you?
              </h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="text-sm text-gray-500">
                <p>
                  I currently have a BuyMeACoffee account where you can donate{" "}
                  <a
                    href="https://www.buymeacoffee.com/jylx"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-bold underline"
                  >
                    here.
                  </a>
                </p>
                <br />
                <p>
                  Anything helps! Especially anything I can proudly tell my
                  parents about. However, don&apos;t feel pressured or obligated
                  to donate. I created ghostity on my accord and as a portfolio
                  project as a self-taught developer.
                </p>
                <br />
                <p>
                  If anything, the most I can ask you to do is share ghostity
                  with your friends, discord homies, Vtuber enjoyers, or other
                  Vtubers! It would be my dream if ghostity blew up and became
                  popular!
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5c-content"
              id="panel5c-header"
            >
              <h3>Can I suggest a new feature/change?</h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="text-sm text-gray-500">
                <p>
                  Absolutely! I would love to hear your opinion on how I can
                  make ghostity the best Vtuber app there is!
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
          <Accordion>
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel6c-content"
              id="panel6c-header"
            >
              <h3>Why is ghostity called &quot;ghostity&quot;?</h3>
            </AccordionSummary>
            <AccordionDetails>
              <div className="text-sm text-gray-500">
                <p>
                  It&apos;s nothing too special or deep. When I was coming up
                  names for the app, I was listening to Hoshimachi Suisei&apos;s
                  song &quot;GHOST&quot; and decide why not use something with
                  ghost in it. &quot;Ghostity&quot; was a available domain and
                  rest is history!
                </p>
              </div>
            </AccordionDetails>
          </Accordion>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
