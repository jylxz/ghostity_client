// Libraries
import { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// Components
import API from "services/API";
import GameCard from "../General/GameCard";
import ProblemLoading from "../General/ProblemLoading";
import GradientCircularProgress from "../General/GradientCircularProgress";
import BrowseWrapper from "../General/BrowseWrapper";
import GridWrapper from "../General/GridWrapper";
import useIsWindowSmall from "../../hooks/useIsWindowSmall/useIsWindowSmall";

export default function BrowseGames() {
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
    <BrowseWrapper id="browse-games-wrapper">
      {data ? (
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
          {hasNextPage ? (
            <motion.div
              layout="position"
              ref={ref}
              className="flex justify-center items-center pt-10 pb-3 h-24"
            >
              <GradientCircularProgress />
            </motion.div>
          ) : null}
        </>
      ) : null}
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <GradientCircularProgress />
        </div>
      ) : null}
      {error ? <ProblemLoading /> : null}
    </BrowseWrapper>
  );
}
