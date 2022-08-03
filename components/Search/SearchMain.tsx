// Libraries
import React, { useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

// Components
import API from "../../services/API/API";
import BrowseWrapper from "../General/BrowseWrapper";
import SearchBar from "./SearchBar";
import SearchStream from "./SearchStream";
import SearchProfiles from "./SearchProfiles";
import SearchOrganizations from "./SearchOrganizations";
import SearchGames from "./SearchGames";

// Hooks
import useHandleShowResults from "./hooks/useHandleShowResults";
import useElementDimensions from "../../hooks/useElementDimensions/useElementDimensions";

// CSS
import "swiper/css";
import "swiper/css/navigation";
import SearchNoResults from "./SearchNoResults";

export default function SearchMain() {
  const [input, setInput] = useState("");
  const [compact, setCompact] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const { width } = useElementDimensions(ref.current);

  const {
    showStreams,
    showGames,
    showProfiles,
    showOrganizations,
    showing,
    setShow,
  } = useHandleShowResults();

  const fetchSearch = async () =>
    API.get<Search>(`/search?query=${input}`).then((res) => res.data);

  const search = useQuery<Search, Error>("search", fetchSearch, {
    enabled: false,
  });

  useEffect(() => {
    if (!input) return;

    if (search && search.data?.query.string === input) return;

    const searchDebounce = setTimeout(async () => {
      if (input.length >= 3) {
        setShow("none");
        setCompact(true);
        await search.refetch();
        setShow("all");
      }
    }, 1500);

    // eslint-disable-next-line consistent-return
    return () => clearTimeout(searchDebounce);
  }, [input]);

  // Deals with caching and restoring cache
  useEffect(() => {
    if (search.data && !search.isStale) {
      setCompact(true);
      setInput(search.data.query.string);
    }
  }, []);

  useEffect(() => {
    if (search.data && search.isStale) {
      setInput("");
      setShow("none");
      setCompact(false);
      search.remove();
    }
  }, [search]);

  return (
    <BrowseWrapper>
      <SearchBar
        input={input}
        setInput={setInput}
        compact={compact}
        loading={search.isRefetching || search.isFetching}
        width={width}
      />
      <motion.div ref={ref} className="flex flex-col gap-8 pb-8">
        <AnimatePresence exitBeforeEnter>
          {search.data && !search.isRefetching && typeof width === "number" && (
            <LayoutGroup>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{
                  layout: {
                    duration: 1,
                  },
                }}
                className="flex flex-col gap-6"
              >
                <SearchStream
                  streams={search.data.results.streams}
                  query={input}
                  show={showStreams}
                  currentlyShowing={showing}
                  setShow={setShow}
                  width={width}
                />
                <SearchProfiles
                  profiles={search.data.results.profiles}
                  query={input}
                  show={showProfiles}
                  currentlyShowing={showing}
                  setShow={setShow}
                  width={width}
                />
                <SearchOrganizations
                  organizations={search.data.results.organizations}
                  query={input}
                  show={showOrganizations}
                  currentlyShowing={showing}
                  setShow={setShow}
                  width={width}
                />
                <SearchGames
                  games={search.data.results.games}
                  query={input}
                  show={showGames}
                  currentlyShowing={showing}
                  setShow={setShow}
                  width={width}
                />
              </motion.div>
              {search.data?.query.total === 0 && !search.isRefetching && (
                <SearchNoResults />
              )}
            </LayoutGroup>
          )}
        </AnimatePresence>
      </motion.div>
    </BrowseWrapper>
  );
}
