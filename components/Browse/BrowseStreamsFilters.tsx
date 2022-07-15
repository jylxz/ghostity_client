// Libraries
import React, { useEffect, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import Chip from "@mui/material/Chip";
import FormControl from "@mui/material/FormControl";

// Icons
import CloseIcon from "@mui/icons-material/Close";
import { AiOutlineFilter } from "react-icons/ai";

// Components
import { CustomSelect, StyledOption } from "../general/CustomSelect";
import { Filter, Filters } from "../../hooks/useHandleFilters";

export default function BrowseStreamsFilters({
  filters,
  setFilters,
  resetFilters,
  refetch,
}: {
  filters: Filters;
  setFilters: (filter: Filter, filterValue: unknown) => void;
  resetFilters: () => void;
  refetch: () => Promise<void>;
}) {
  const [showFilter, setShowFilter] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [sort, setSort] = useState(filters.sort);

  useEffect(() => {
    if (filters.sort) {
      setSort(filters.sort);
    }
  }, [filters]);

  return (
    <motion.div
      layout="size"
      // layoutId="browse-streams"
      // layoutScroll
      // transition={{
      //   layout: {
      //     duration: 0.3,
      //   },
      // }}
      className="flex flex-col justify-between pb-6"
    >
      <div className="flex sm:items-center justify-between">
        <motion.div layout className="flex items-center gap-2 ">
          <span className="hidden md:block font-medium dark:text-text-primary-dark">
            Filter
          </span>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.1, type: "string" }}
            type="button"
            onClick={() => setShowFilter(!showFilter)}
            className="dark:bg-secondary-dark bg-slate-100 px-2 py-0.5 rounded h-full"
          >
            <AiOutlineFilter className="h-8 w-5 dark:text-primary text-gray-600 font-thin" />
          </motion.button>
        </motion.div>
        <LayoutGroup>
          {filters.sort ? (
            <motion.div layout className="flex items-center gap-2 z-20">
              <motion.span
                className="hidden md:block font-medium dark:text-text-primary-dark"
                layout
              >
                Sort by
              </motion.span>
              <motion.span
                layout="position"
                layoutId="sort-by-button"
              >
                <CustomSelect
                  value={filters.sort}
                  onChange={(e) => setFilters("sort", e)}
                  className="dark:bg-secondary-dark dark:text-primary  bg-slate-100 text-gray-600 px-3 m-0"
                  componentsProps={{
                    listbox: {
                      className: "dark:border-0"
                    }
                  }}
                >
                  <StyledOption value="desc">
                    Viewers (High to Low)
                  </StyledOption>
                  <StyledOption value="asc">Viewers (Low to High)</StyledOption>
                </CustomSelect>
              </motion.span>
            </motion.div>
          ) : null}
        </LayoutGroup>
      </div>
      <AnimatePresence exitBeforeEnter>
        {showFilter ? (
          <motion.div
            key="OptionsContainer"
            layout={!showFilter}
            initial={{ translateY: -600 }}
            animate={{ translateY: 0 }}
            exit={{ translateY: -600 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="dark:bg-secondary-dark bg-slate-100 p-4 rounded-lg flex flex-col mt-4 z-30"
          >
            <motion.button
              // whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilter(!showFilter)}
              className="self-end"
            >
              <CloseIcon className="dark:text-white text-gray-500  cursor-pointer" />
            </motion.button>
            <div className="mb-4 grid sm:grid-cols-2 gap-4 sm:gap-8">
              <FormControl size="small">
                <div className="font-medium dark:text-text-primary-dark">
                  Language
                </div>
                <CustomSelect
                  value={filters.language}
                  onChange={(e) => setFilters("language", e)}
                  className="dark:bg-secondary-dark-2 dark:text-primary bg-white text-black border"
                  componentsProps={{
                    listbox: {
                      className:
                        "dark:text-text-secondary-dark sm:flex flex-row flex-wrap gap-2",
                    },
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
                <div className="font-medium dark:text-text-primary-dark">
                  Platform
                </div>
                <CustomSelect
                  value={filters.platform}
                  className="dark:bg-secondary-dark-2 dark:text-primary bg-white text-black border"
                  onChange={(e) => setFilters("platform", e)}
                  componentsProps={{
                    listbox: {
                      className:
                        "dark:text-text-secondary-dark sm:flex flex-wrap flex-row gap-2",
                    },
                  }}
                >
                  <StyledOption value="all">All</StyledOption>
                  <StyledOption value="youtube">Youtube</StyledOption>
                  <StyledOption value="twitch">Twitch</StyledOption>
                </CustomSelect>
              </FormControl>
            </div>
            <div className="mb-4">
              <div className="mb-2 font-medium dark:text-text-primary-dark">
                Exclude
              </div>
              <div className="flex flex-wrap gap-4">
                <Chip
                  label="English"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "en")}
                  className={
                    filters?.exclude?.includes("en")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Japanese"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "ja")}
                  className={
                    filters?.exclude?.includes("ja")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Korean"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "ko")}
                  className={
                    filters?.exclude?.includes("ko")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Indonesian"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "id")}
                  className={
                    filters?.exclude?.includes("id")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Chinese"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "zh")}
                  className={
                    filters?.exclude?.includes("zh")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Spanish"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "es")}
                  className={
                    filters?.exclude?.includes("es")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="French"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "fr")}
                  className={
                    filters?.exclude?.includes("fr")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="German"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "de")}
                  className={
                    filters?.exclude?.includes("de")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Portuguese"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "pt")}
                  className={
                    filters?.exclude?.includes("pt")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
                <Chip
                  label="Other"
                  variant="outlined"
                  onClick={() => setFilters("exclude", "other")}
                  className={
                    filters?.exclude?.includes("other")
                      ? "dark:bg-secondary-dark-2 dark:text-primary bg-white text-black px-1.5"
                      : "dark:bg-secondary-dark dark:text-text-secondary-dark bg-gray-200 text-gray-500 px-1.5"
                  }
                />
              </div>
            </div>
            <div className="flex justify-end gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="dark:bg-bg-gray-200 dark:border dark:border-text-secondary-dark dark:text-text-secondary-dark text-gray-500 px-3 py-1 rounded text-sm"
                onClick={() => resetFilters()}
              >
                Reset Filters
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.9 }}
                type="button"
                className="dark:bg-secondary-dark-2 dark:text-primary  bg-white px-3 py-1 text-black rounded border font-medium"
                onClick={async () => refetch().then(() => setShowFilter(false))}
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
