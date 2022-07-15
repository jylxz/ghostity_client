import React, { useEffect, useState } from 'react'

export default function useHandleCollapseAndExpand(
  expandSection: "profiles" | "organizations" | "games" | "streams",
  show: boolean,
  setShow: (
    value: React.SetStateAction<
      "all" | "reset" | "streams" | "profiles" | "games" | "organizations"
    >
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
    if (show) {
      setExpand(false);
    }
  }, [show]);

  return { expand, handleExpand, handleCollapse };
}
