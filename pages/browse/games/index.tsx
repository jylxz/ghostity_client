// Libraries
import React, { Fragment, ReactElement, useEffect } from "react";
import Head from "next/head";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// Layout
import BrowseLayout from "@layouts/BrowseLayout";

// Services
import API from "@services/api";

// Components
import { DefaultKeywords, DefaultOpenGraph } from "@components/Head";
import GameCard from "@general/GameCard";
import ProblemLoading from "@general/ProblemLoading";
import GradientCircularProgress from "@general/GradientCircularProgress";
import BrowseWrapper from "@general/BrowseWrapper";
import GridWrapper from "@general/GridWrapper";

// Hooks
import useIsWindowSmall from "@hooks/useIsWindowSmall";

export default function Games() {
  const { ref, inView } = useInView();
  const isWindowSmall = useIsWindowSmall();

  const fetchGames = async ({ pageParam = 1 }) =>
    API.get<Games>(`/games?page=${pageParam}`).then((res) => res.data);

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<Games, Error>("games", fetchGames, {
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage().catch(() => {});
    }
  }, [fetchNextPage, inView]);

  return (
    <>
      <Head>
        <title>vGhostity | Games</title>
        <meta
          name="description"
          content="Keep track and watch VTubers play some of your favorite games from Minecraft, Valorant, Apex Legends, and more!"
        />
      </Head>
      <>
        <DefaultOpenGraph
          title="vGhostity | Games"
          description="Keep track and watch VTubers play some of your favorite games from Minecraft, Valorant, Apex Legends, and more!"
        />
        <DefaultKeywords />
      </>
      <BrowseWrapper id="browse-games-wrapper">
        {data && (
          <>
            <GridWrapper colSize={isWindowSmall ? "xxsmall" : "xsmall"}>
              {data?.pages.map((group, i) => (
                // eslint-disable-next-line react/no-array-index-key
                <Fragment key={i}>
                  {group.results.map((game) => (
                    <motion.span layout="position" key={game._id}>
                      <GameCard key={game._id} game={game} />
                    </motion.span>
                  ))}
                </Fragment>
              ))}
            </GridWrapper>
            {hasNextPage && (
              <motion.div
                layout="position"
                ref={ref}
                className="flex justify-center items-center pt-10 pb-3 h-24"
              >
                <GradientCircularProgress />
              </motion.div>
            )}
          </>
        )}
        {isLoading && (
          <div className="h-full flex items-center justify-center">
            <GradientCircularProgress />
          </div>
        )}
        {error && <ProblemLoading />}
      </BrowseWrapper>
    </>
  );
}

Games.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
