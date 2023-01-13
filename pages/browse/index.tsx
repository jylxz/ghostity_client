// Libraries
import React, {
  Fragment,
  useEffect,
  useState,
  ReactElement,
  useContext,
} from "react";
import Head from "next/head";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { LayoutGroup, motion } from "framer-motion";

// Services
import API from "services/api";

// Hooks
import useHandleFilters from "hooks/useHandleFilters";

// Layout
import BrowseLayout from "layouts/BrowseLayout";

// Components
import {
  DefaultKeywords,
  DefaultOpenGraph,
  DefaultDescription,
} from "components/Head";
import { description } from "components/Head/Description";
import LivestreamCard from "@general/LivestreamCard";
import BrowseStreamsFilters from "components/Browse/BrowseStreamsFilters";
import GradientCircularProgress from "@general/GradientCircularProgress";
import ProblemLoading from "@general/ProblemLoading";
import BrowseWrapper from "@general/BrowseWrapper";
import GridWrapper from "@general/GridWrapper";
import MatureContext from "contexts/MatureContext";

export default function Browse() {
  const { ref, inView } = useInView();
  const [loading, setLoading] = useState(false);
  const [filterString, filters, setFilters, resetFilters] = useHandleFilters();
  const mature = useContext(MatureContext);

  const fetchStreams = async ({ pageParam = 1 }) =>
    API.get<Streams>(`/streams?page=${pageParam}&limit=30${filterString}`).then(
      (res) => res.data
    );

  const { data, error, fetchNextPage, hasNextPage, refetch } = useInfiniteQuery<
    Streams,
    Error
  >(["allStreams", `${filters.sort || ""}`], fetchStreams, {
    getNextPageParam: (lastPage) =>
      lastPage.next ? lastPage.next.page : false,
    cacheTime: 0,
  });

  const refetchWithFilters = async () => {
    setLoading(true);
    return refetch().then(() => setLoading(false));
  };

  useEffect(() => {
    if (inView) {
      fetchNextPage().catch(() => {});
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <Head>
        <title>vGhostity | Browse</title>
      </Head>
      <>
        <DefaultOpenGraph
          title="vGhostity | Browse"
          description={description}
        />
        <DefaultDescription />
        <DefaultKeywords />
      </>
      <BrowseWrapper>
        <LayoutGroup id="browse-streams">
          <BrowseStreamsFilters
            filters={filters}
            setFilters={setFilters}
            resetFilters={resetFilters}
            refetch={refetchWithFilters}
          />
          {data && !loading ? (
            <>
              <GridWrapper
                colSize="normal"
                key="streams-wrapper"
                transition={{
                  layout: {
                    duration: 0.4,
                  },
                }}
              >
                {data.pages.map((group, i) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <Fragment key={i}>
                    {group.results
                      .filter((stream) =>
                        mature ? !!stream : stream.stream.is_mature === false
                      )
                      .map((stream: Stream) => (
                        <motion.div key={stream.channel_id} layout="position">
                          <LivestreamCard stream={stream} />
                        </motion.div>
                      ))}
                  </Fragment>
                ))}
              </GridWrapper>
              {hasNextPage ? (
                <div
                  ref={ref}
                  className="flex justify-center items-center pt-10 pb-3 h-24"
                >
                  <GradientCircularProgress />
                </div>
              ) : null}
            </>
          ) : (
            <div className="flex-1 flex justify-center items-center">
              <GradientCircularProgress />
            </div>
          )}
          {error ? <ProblemLoading /> : null}
        </LayoutGroup>
      </BrowseWrapper>
    </>
  );
}

Browse.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
