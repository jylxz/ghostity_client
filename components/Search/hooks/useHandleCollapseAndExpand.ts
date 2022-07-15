import React, { useEffect, useState } from 'react'
import { ShowResultsOptions } from './useHandleShowResults';

export default function useHandleCollapseAndExpand(
  expandSection: "profiles" | "organizations" | "games" | "streams",
  currentlyShowing: ShowResultsOptions,
  setShow: (
    value: React.SetStateAction<ShowResultsOptions>
  ) => void
) {
  const [expand, setExpand] = useState(false);

  const handleExpand = () => {
    setShow(expandSection);
    setExpand(true);
  };

  const handleCollapse = () => {
    setShow("all");
    setExpand(false);
  };

  useEffect(() => {
    if (currentlyShowing === "all") {
      setExpand(false);
    }
  }, [currentlyShowing]);

  return { expand, handleExpand, handleCollapse };
}
