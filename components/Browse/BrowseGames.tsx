// Libraries
import axios from "axios";
import React, { useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";

// Components
import GameCard from "../general/GameCard";
import ProblemLoading from "../general/ProblemLoading";
import GradientCircularProgress from "../general/GradientCircularProgress";
import BrowseWrapper from "../general/BrowseWrapper";
import GridWrapper from "../general/GridWrapper";

export default function BrowseGames() {
  const { ref, inView } = useInView();

  const fetchGames = async ({ pageParam = 1 }) =>
    axios
      .get(`https://api.ghostity.com/games?page=${pageParam}`)
      .then((res) => res.data);

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<Games, Error>("games", fetchGames, {
      getNextPageParam: (lastPage) =>
        lastPage.next ? lastPage.next.page : false,
    });

  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [fetchNextPage, inView]);

  return (
    <BrowseWrapper>
      {/* <LayoutGroup> */}
        {data ? (
          <>
            <GridWrapper colSize="xsmall">
              {data?.pages.map((group) => (
                <>
                  {group.results.map((game) => (
                    <motion.span layout="position" key={game._id}>
                      <GameCard key={game._id} game={game} />
                    </motion.span>
                  ))}
                </>
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
      {/* </LayoutGroup> */}
      {isLoading ? (
        <div className="h-full flex items-center justify-center">
          <GradientCircularProgress />
        </div>
      ) : null}
      {error ? <ProblemLoading /> : null}
    </BrowseWrapper>
  );
}
