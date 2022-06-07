import React, { useState, useMemo, useRef, useEffect } from "react";
import { AiOutlineFilter } from "react-icons/ai";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";
import CloseIcon from "@mui/icons-material/Close";
import { AnimatePresence, motion } from "framer-motion";
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
    <motion.div layout="size" className="flex flex-col justify-between py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between">
        <motion.div layout className="flex items-center gap-2 ">
          <div>Filter</div>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="bg-slate-100 px-2 py-0.5 rounded h-full"
          >
            <AiOutlineFilter className="h-8 w-5 text-gray-600 font-thin" />
          </motion.button>
        </motion.div>
        <motion.div layout className="flex items-center gap-2">
          <div>Sort by</div>
          <CustomSelect
            value={sort}
            onChange={(e) => {
              setSort(e);
            }}
            className="bg-slate-100 text-gray-600 px-3 m-0"
          >
            <StyledOption value="desc">Viewers (High to Low)</StyledOption>
            <StyledOption value="asc">Viewers (Low to High)</StyledOption>
          </CustomSelect>
        </motion.div>
      </div>
      <AnimatePresence exitBeforeEnter>
        {showFilter ? (
          <motion.div
            key="OptionsContainer"
            layout
            initial={{ translateY: -300 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: -400 }}
            transition={{ duration: 0.3 }}
            className="bg-slate-50 p-4 rounded flex flex-col mt-4"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setShowFilter(!showFilter)}
              className="self-end"
            >
              <CloseIcon className="text-gray-500  cursor-pointer" />
            </motion.button>
            <div className="mb-4 grid sm:grid-cols-2 gap-4 sm:gap-8">
              <FormControl size="small">
                <div className="font-thin">Language</div>
                <CustomSelect
                  value={language}
                  onChange={(e: string) => setLanguage(e)}
                  className="bg-white text-black"
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
                  className="bg-white text-black"
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
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Japanese"
                  variant="outlined"
                  onClick={() => excludeLanguages("ja")}
                  className={
                    exclude.includes("ja")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Korean"
                  variant="outlined"
                  onClick={() => excludeLanguages("ko")}
                  className={
                    exclude.includes("ko")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Indonesian"
                  variant="outlined"
                  onClick={() => excludeLanguages("id")}
                  className={
                    exclude.includes("id")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Chinese"
                  variant="outlined"
                  onClick={() => excludeLanguages("zh")}
                  className={
                    exclude.includes("zh")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Spanish"
                  variant="outlined"
                  onClick={() => excludeLanguages("es")}
                  className={
                    exclude.includes("es")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="French"
                  variant="outlined"
                  onClick={() => excludeLanguages("fr")}
                  className={
                    exclude.includes("fr")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="German"
                  variant="outlined"
                  onClick={() => excludeLanguages("de")}
                  className={
                    exclude.includes("de")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Portuguese"
                  variant="outlined"
                  onClick={() => excludeLanguages("pt")}
                  className={
                    exclude.includes("pt")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Other"
                  variant="outlined"
                  onClick={() => excludeLanguages("other")}
                  className={
                    exclude.includes("other")
                      ? "bg-white text-black px-1.5"
                      : "bg-gray-200 text-gray-500 px-1.5"
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="bg-gray-200 text-gray-500 px-3 py-1 rounded text-sm"
                onClick={() => resetFilters()}
              >
                Reset Filters
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="bg-white px-3 py-1 text-black rounded"
                onClick={() => {
                  refetchWithFilters();
                  setShowFilter(false);
                }}
              >
                Apply
              </motion.button>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </motion.div>
  );
}

export default BrowseStreamsOptions;
