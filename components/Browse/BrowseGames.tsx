import axios from "axios";
import React, { Fragment, useEffect } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";
import GameCard from "../general/GameCard";
import ProblemLoading from "../general/ProblemLoading";
import GradientCircularProgress from "../general/GradientCircularProgress";

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

  if (isLoading)
    return (
      <div className="bg-slate-50 overflow-auto h-[calc(100vh_-_7rem)] px-4 sm:px-14 py-7 flex justify-center items-center">
        <GradientCircularProgress />
      </div>
    );

  if (error)
    return (
      <div className="bg-slate-50 overflow-auto h-[calc(100vh_-_7rem)] px-4 sm:px-14 py-7 flex justify-center items-center">
        <ProblemLoading />
      </div>
    );

  return (
    <div className="bg-slate-50 overflow-auto h-[calc(100vh_-_7rem)] px-4 sm:px-14 py-7">
      <div className="grid grid-cols-[repeat(auto-fill,_minmax(160px,_1fr))] gap-8">
        {console.log(data?.pages)}
        {data?.pages.map((group) => (
          <Fragment key={group.results.length}>
            {group.results.map((game) => (
              <GameCard key={game._id} game={game} />
            ))}
          </Fragment>
        ))}
      </div>
      {hasNextPage ? (
        <div
          ref={ref}
          className="flex justify-center items-center pt-10 pb-3 h-24"
        >
          <GradientCircularProgress />
        </div>
      ) : null}
    </div>
  );
}
