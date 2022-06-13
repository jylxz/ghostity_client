import { useEffect, useMemo, useState } from "react";
import useLocalStorage from "./useLocalStorage";

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

  const setFilters = (filter: Filter, filterValue: any) => {
    if (filter === "sort") {
      return setSort(filterValue);
    }

    if (filter === "platform") {
      return setPlatform(filterValue);
    }

    if (filter === "language") {
      return setLanguage(filterValue);
    }

    if (filter === "exclude") {
      let excludeList = exclude ? [...exclude] : [];

      if (excludeList.includes(filterValue)) {
        excludeList = excludeList.filter((lang) => lang !== filterValue);
      } else {
        excludeList.push(filterValue);
      }

      return setExclude(excludeList);
    }
  };

  const resetFilters = () => {
    // setSort("desc")
    setPlatform("all");
    setLanguage("all");
    setExclude([]);
  };

  const filters = useMemo(() => {
    setItem({
      sort,
      platform,
      language,
      exclude,
    });

    return {
      sort,
      platform,
      language,
      exclude,
    };
  }, [setItem, sort, platform, language, exclude]);

  const filterString = useMemo(() => {
    let queryFilterString: string = "";

    if (sort) {
      queryFilterString += `&sort=${sort}`;
    }

    if (platform !== "all") {
      queryFilterString += `&platform=${platform}`;
    }

    if (language !== "all") {
      queryFilterString += `&lang=${language}`;
    }

    if (exclude && exclude.length > 0) {
      queryFilterString += `&exclude=${exclude.join(",")}`;
    }

    return queryFilterString;
  }, [sort, platform, language, exclude]);

  return [filterString, filters, setFilters, resetFilters] as const;
}
