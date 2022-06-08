// Libraries
import React, { Fragment, useState, useEffect } from "react";
import axios from "axios";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

// Components
import LivestreamCard from "../general/LivestreamCard";
import BrowseStreamsOptions from "./BrowseStreamsOptions";
import GradientCircularProgress from "../general/GradientCircularProgress";
import ProblemLoading from "../general/ProblemLoading";
import BrowseWrapper from "../general/BrowseWrapper";

interface Filters {
  sort?: string;
  platform?: string;
  language?: string;
  exclude?: string;
}

export default function BrowseStreams() {
  const [params, setParams] = useState<Filters>({});
  const { ref, inView } = useInView();

  const fetchStreams = async ({ pageParam = 1 }) => {
    const filters = params;
    let baseUrl = `https://api.ghostity.com/streams?page=${pageParam}`;

    let sort: string | undefined;
    let platform: string | undefined;
    let language: string | undefined;
    let exclude: string | undefined;

    if (filters.sort) sort = `&sort=${filters.sort}`;

    if (filters.language && filters.language !== "all")
      language = `&lang=${filters.language}`;

    if (filters.platform && filters.platform !== "all")
      platform = `&platform=${filters.platform}`;

    if (filters.exclude) exclude = `&exclude=${filters.exclude}`;

    [sort, language, platform, exclude].forEach((filter) => {
      if (filter) baseUrl += filter;
    });

    return axios.get(baseUrl).then((res) => res.data);
  };

  const { data, error, fetchNextPage, hasNextPage, isLoading } =
    useInfiniteQuery<Streams, Error>(["allStreams", params], fetchStreams, {
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
      <BrowseStreamsOptions setParams={setParams} />
      {data && !isLoading ? (
        <>
          <div className="grid grid-flow-row auto-rows-fr grid-cols-[repeat(auto-fill,_minmax(18rem,_1fr))] gap-4 gap-y-4 lg:gap-y-7 justify-items-center">
            {data?.pages.map((group) => (
              <Fragment key={group.results.length}>
                {group.results.map((stream: Stream) => (
                  <LivestreamCard key={stream.channel_id} stream={stream} />
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
        </>
      ) : null}
      {isLoading ? (
        <div className="flex-grow flex items-center justify-center">
          <GradientCircularProgress />
        </div>
      ) : null}
      {error ? <ProblemLoading /> : null}
    </BrowseWrapper>
  );
}
