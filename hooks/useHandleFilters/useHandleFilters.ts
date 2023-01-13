import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "../useLocalStorage";

type Sort = "asc" | "desc";

type Languages =
  | "all"
  | "en"
  | "ja"
  | "ko"
  | "id"
  | "zh"
  | "es"
  | "fr"
  | "de"
  | "pt"
  | "other";

type Platform = "twitch" | "youtube" | "all";

export type Filter = "sort" | "platform" | "language" | "exclude";

export interface Filters {
  sort?: Sort;
  platform?: Platform;
  language?: Languages;
  exclude?: Languages[];
}

export default function useHandleFilters() {
  const defaultFilters = {
    sort: "desc",
    platform: "all",
    language: "all",
    exclude: [],
  };
  const [item, setItem] = useLocalStorage<Filters>("filters", {
    sort: "desc",
    platform: "all",
    language: "all",
    exclude: [],
  });
  const [sort, setSort] = useState<Sort>();
  const [platform, setPlatform] = useState<Platform>();
  const [language, setLanguage] = useState<Languages>();
  const [exclude, setExclude] = useState<Languages[]>();

  useEffect(() => {
    if (item) {
      setSort(item.sort);
      setPlatform(item.platform);
      setLanguage(item.language);
      setExclude(item.exclude);
    }
  }, [item]);

  const setFilters = (filter: Filter, filterValue: string) => {
    if (filter === "sort") {
      setItem((current) => ({
        ...current,
        sort: filterValue as Sort,
      }));
    }

    if (filter === "platform") {
      setItem((current) => ({ ...current, platform: filterValue as Platform }));
    }

    if (filter === "language") {
      setItem((current) => ({
        ...current,
        language: filterValue as Languages,
      }));
    }

    if (filter === "exclude") {
      let excludeList = exclude ? [...exclude] : [];

      if (excludeList.includes(filterValue as Languages)) {
        excludeList = excludeList.filter((lang) => lang !== filterValue);
      } else {
        excludeList.push(filterValue as Languages);
      }

      setItem((current) => ({ ...current, exclude: excludeList }));
    }
  };

  const resetFilters = () => {
    // setSort("desc")
    setPlatform("all");
    setLanguage("all");
    setExclude([]);
  };

  const filters = useMemo(
    () => ({
      sort,
      platform,
      language,
      exclude,
    }),
    [sort, platform, language, exclude]
  );

  const filterString = useMemo(() => {
    let queryFilterString = "";

    if (sort) {
      queryFilterString += `&sort=${sort}`;
    }

    if (platform !== "all") {
      queryFilterString += `&platform=${platform || "all"}`;
    }

    if (language !== "all") {
      queryFilterString += `&lang=${language || "all"}`;
    }

    if (exclude && exclude.length > 0) {
      queryFilterString += `&exclude=${exclude.join(",")}`;
    }

    return queryFilterString;
  }, [sort, platform, language, exclude]);

  return [filterString, filters, setFilters, resetFilters] as const;
}
