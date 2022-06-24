import React, { useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";

export default function useIsWindowSmall() {
  const [isWindowSmall, setIsWindowSmall] = useState(false);
  const [width, setWidth] = useState<number>();
  const window = useWindowDimensions();

  // useEffect(() => {
  //   if (window && window.width) {
  //     setWidth(window.width);
  //   }
  // }, [window]);

  useEffect(() => {
    if (window.width && window.width < 640) {
      setIsWindowSmall(true);
    } else {
      setIsWindowSmall(false);
    }
  }, [window]);

  return isWindowSmall;
}
