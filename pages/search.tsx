import Head from "next/head";
// Libraries
import React, { ReactElement, useEffect, useRef, useState } from "react";
import { useQuery } from "react-query";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";

// Services
import API from "@services/api";

// Layout 
import BrowseLayout from "@layouts/BrowseLayout"

// Components
import DefaultKeywords from "@components/Head/Keywords";
import BrowseWrapper from "@general/BrowseWrapper";
import SearchBar from "@components/Search/SearchBar/SearchBar";
import SearchStream from "@components/Search/SearchStream";
import SearchProfiles from "@components/Search/SearchProfiles";
import SearchOrganizations from "@components/Search/SearchOrganizations";
import SearchGames from "@components/Search/SearchGames";
import SearchNoResults from "@components/Search/SearchNoResults";

// Hooks
import useHandleShowResults from "@components/Search/helpers/useHandleShowResults";
import useElementDimensions from "@hooks/useElementDimensions";

// CSS
import "swiper/css";
import "swiper/css/navigation";

function Search() {
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
    <>
      <Head>
        <title>vGhostity | Search</title>
        <meta
          name="description"
          content="Search through vGhostity's comprehensive database of 100,000+ VTubers!"
        />
      </Head>
      <DefaultKeywords />
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
    </>
  );
}

Search.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};

export default Search;
