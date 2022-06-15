import React, { useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";

export default function useIsWindowSmall() {
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  const [width, setWidth] = useState<number>();
  const window = useWindowDimensions();

  useEffect(() => {
    if (window && window.width) {
      setWidth(window.width);
    }
  }, [window]);

  useEffect(() => {
    if (width && width < 640) {
      setIsWindowSmall(true);
    } else {
      setIsWindowSmall(false);
    }
  }, [width]);

  return [isWindowSmall] as const;
}
