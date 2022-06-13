import { useEffect, useState } from "react";
import useWindowDimensions from "./useWindowDimensions";

export default function useResponsiveBrowseBar() {
  const [showBrowseBar, browseBarOverride] = useState(true);
  const [userPreference, setShowBrowseBar] = useState(true);
  const [minimized, setMinimized] = useState(true);
  const size = useWindowDimensions();

  useEffect(() => {
    if (size.width) {
      if (size.width < 640) {
        browseBarOverride(false);
        setMinimized(true);
      } else if (size.width > 640 && userPreference) {
        browseBarOverride(true);
        setMinimized(false);
      } else if (size.width > 640 && !userPreference) {
        browseBarOverride(false);
        setMinimized(true);
      }
    }
  }, [size, userPreference]);

  return [
    showBrowseBar,
    setShowBrowseBar,
    userPreference,
    browseBarOverride,
    minimized,
  ] as const;
}
