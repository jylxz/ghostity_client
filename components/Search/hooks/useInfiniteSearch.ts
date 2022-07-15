import { useInfiniteQuery } from "react-query";
import API from "../../../API";

export default function useInfiniteSearch<T extends APINextPrev>(
  query: string,
  queryMode: "profiles" | "organizations" | "games" | "streams",
) {
  const getMoreData = ({ pageParam = 1 }) =>
    API.get<T>(
      `/search?mode=${queryMode}&page=${pageParam}&limit=30&query=${query}`
    ).then((res) => res.data);

  const moreData = useInfiniteQuery<T, Error>([`more${queryMode}`], getMoreData, {
    getNextPageParam: (lastPage) =>
      lastPage.next ? lastPage.next.page : undefined,
    enabled: false,
    cacheTime: 0
  });

  return moreData;
}
