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
              aria-controls="panel3a-content"
              id="panel3a-header"
            >
              <Typography>
                Do I have to stream with a Vtuber model every stream?
              </Typography>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                <strong>NO!</strong>
              </p>
              <br />
              <p>
                Please check &quot;Why am I blacklisted from vGhostity?&quot;
                for more information.
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel4a-content"
              id="panel4a-header"
            >
              <h3>What is consider a &quot;Vtuber&quot;?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                This question is probably the hardest for me to answer, because
                I feel I have no right to decide what is and what isn&apos;t, as
                I am not a Vtuber and don&apos;t plan to be one. I am simply a
                Vtuber enjoyer. However, what I think matters the most is
                effort. A good Vtuber model and rigging can be very expensive,
                so if you are grinding out streams using a static image until
                you have the money to go all out, who am I to say you
                aren&apos;t one!
              </p>
            </FaqAccordionDetails>
          </Accordion>
          <Accordion>
            <FaqAccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls="panel5a-content"
              id="panel5a-header"
            >
              <h3>Why am I blacklisted from vGhostity?</h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
              <p>
                The biggest factor that is used to determine if you get
                blacklisted or not is your VODs and broadcasts. If{" "}
                <strong>NONE</strong> of your VODs have a single Vtuber model or
                even a static image, that makes you a <strong>good</strong>{" "}
                blacklist candidate.
              </p>
              <br />
              <p>
                However, that doesn&apos;t mean you can stream once with a model
                or static image and never stream with it again. If your most
                recent VODs, let&apos;s say around 3 months of VODs,
                doesn&apos;t include a model or image, then that makes you a{" "}
                <strong>decent</strong> blacklist candidate. You are considered
                a <strong>decent</strong> candidate because it varies how much
                you stream within those 3 months.
              </p>
              <br />
              <p>
                Suppose you stream only twice during those three months and for
                one of those two streams, you use a model. You will{" "}
                <strong>not</strong> be blacklisted. However, if you stream
                everyday and only like 5 of those 90 streams are with a model,
                then there is change you will be blacklisted. So, if you try to
                stream <strong>30-40%</strong> of the time with a model, you
                should be good!
              </p>
              <br />
              <p>
                Essentially, if you are obviously not a Vtuber, then you will be
                blacklisted.
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
              aria-controls="panel8a-content"
              id="panel8a-header"
            >
              <h3>
                How can I support the continued development of vGhostity and
                you?
              </h3>
            </FaqAccordionSummary>
            <FaqAccordionDetails>
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
                to donate. I created vGhostity on my accord and as a portfolio
                project as a self-taught developer.
              </p>
              <br />
              <p>
                If anything, the most I can ask you to do is share VGhostity
                with your friends, discord homies, Vtuber enjoyers, or other
                Vtubers! It would be cool if VGhostity blew up and became
                popular!
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
