import React, { useState, useMemo, useRef, useEffect } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { CustomSelect, StyledOption } from "../general/CustomSelect";

function BrowseStreamsOptions({
  setParams,
}: {
  setParams: React.Dispatch<React.SetStateAction<{}>>;
}) {
  const [showFilter, setShowFilter] = useState(false);
  const [sort, setSort] = useState("desc");
  const [language, setLanguage] = useState("all");
  const [platform, setPlatform] = useState("all");
  const [exclude, setExclude] = useState<string[]>([]);
  const initialRender = useRef(true);

  const excludeLanguages = (e: string) => {
    let excludeList = [...exclude];

    if (excludeList.includes(e)) {
      excludeList = excludeList.filter((lang) => lang !== e);
    } else {
      excludeList.push(e);
    }

    return setExclude(excludeList);
  };

  const resetFilters = () => {
    setSort("desc");
    setLanguage("all");
    setPlatform("all");
    setExclude([]);
  };

  const filter = useMemo(
    () => ({
      sort,
      language,
      platform,
      exclude,
    }),
    [exclude, language, platform, sort]
  );

  const refetchWithFilters = () => setParams(filter);

  useEffect(() => {
    if (initialRender.current) {
      initialRender.current = false;
      return;
    }

    refetchWithFilters();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sort]);

  return (
    <div className="flex flex-col justify-between py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <div className="flex flex-col gap-6 relative">
          <div className="flex items-center gap-2 ">
            <div>Filter</div>
            <button
              type="button"
              onClick={() => setShowFilter(!showFilter)}
              className="bg-slate-200 py-0.5 px-2 rounded"
            >
              <AiOutlineFilter className="h-8 w-5 text-gray-600 font-thin" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div>Sort by</div>
          <CustomSelect
            value={sort}
            onChange={(e) => {
              setSort(e);
            }}
            className="bg-slate-200 text-gray-600 px-3"
          >
            <StyledOption value="desc">Viewers (High to Low)</StyledOption>
            <StyledOption value="asc">Viewers (Low to High)</StyledOption>
          </CustomSelect>
        </div>
      </div>
      {showFilter ? (
        <div className="bg-slate-200 p-4 rounded flex flex-col mt-4">
          <CloseIcon
            className="text-gray-500 self-end cursor-pointer"
            onClick={() => setShowFilter(!showFilter)}
          />
          <div className="mb-4 grid sm:grid-cols-2 gap-4 sm:gap-8">
            <FormControl size="small">
              <div className="font-thin">Language</div>
              <CustomSelect
                value={language}
                onChange={(e: string) => setLanguage(e)}
                className="bg-slate-400"
                componentsProps={{
                  listbox: { className: "sm:flex flex-row flex-wrap gap-2" },
                }}
              >
                <StyledOption value="all">All</StyledOption>
                <StyledOption value="en">English</StyledOption>
                <StyledOption value="ja">Japanese</StyledOption>
                <StyledOption value="ko">Korean</StyledOption>
                <StyledOption value="id">Indonesian</StyledOption>
                <StyledOption value="zh">Chinese</StyledOption>
                <StyledOption value="es">Spanish</StyledOption>
                <StyledOption value="fr">French</StyledOption>
                <StyledOption value="de">German</StyledOption>
                <StyledOption value="pt">Portuguese</StyledOption>
                <StyledOption value="other">Other</StyledOption>
              </CustomSelect>
            </FormControl>
            <FormControl size="small">
              <div className="font-thin">Platform</div>
              <CustomSelect
                value={platform}
                className="bg-slate-400"
                onChange={(e) => setPlatform(e)}
                componentsProps={{
                  listbox: { className: "sm:flex flex-wrap flex-row gap-2" },
                }}
              >
                <StyledOption value="all">All</StyledOption>
                <StyledOption value="youtube">Youtube</StyledOption>
                <StyledOption value="twitch">Twitch</StyledOption>
              </CustomSelect>
            </FormControl>
          </div>
          <div className="mb-4">
            <div className="mb-2 font-thin">Exclude</div>
            <div className="flex flex-wrap gap-4">
              <Chip
                label="English"
                variant="outlined"
                onClick={() => excludeLanguages("en")}
                className={
                  exclude.includes("en")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="Japanese"
                variant="outlined"
                onClick={() => excludeLanguages("ja")}
                className={
                  exclude.includes("ja")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="Korean"
                variant="outlined"
                onClick={() => excludeLanguages("ko")}
                className={
                  exclude.includes("ko")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="Indonesian"
                variant="outlined"
                onClick={() => excludeLanguages("id")}
                className={
                  exclude.includes("id")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="Chinese"
                variant="outlined"
                onClick={() => excludeLanguages("zh")}
                className={
                  exclude.includes("zh")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="Spanish"
                variant="outlined"
                onClick={() => excludeLanguages("es")}
                className={
                  exclude.includes("es")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="French"
                variant="outlined"
                onClick={() => excludeLanguages("fr")}
                className={
                  exclude.includes("fr")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="German"
                variant="outlined"
                onClick={() => excludeLanguages("de")}
                className={
                  exclude.includes("de")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="Portuguese"
                variant="outlined"
                onClick={() => excludeLanguages("pt")}
                className={
                  exclude.includes("pt")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
              <Chip
                label="Other"
                variant="outlined"
                onClick={() => excludeLanguages("other")}
                className={
                  exclude.includes("other")
                    ? "bg-slate-400 text-white px-1.5"
                    : "bg-gray-300 text-gray-500 px-1.5"
                }
              />
            </div>
          </div>
          <div className="flex justify-end gap-4">
            <button
              type="button"
              className="bg-gray-300 px-3 py-1 text-gray-700 rounded text-sm"
              onClick={() => resetFilters()}
            >
              Reset Filters
            </button>
            <button
              type="button"
              className="bg-slate-400 px-3 py-1 text-white rounded"
              onClick={() => {refetchWithFilters(); setShowFilter(false)}}
            >
              Apply
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default BrowseStreamsOptions;
