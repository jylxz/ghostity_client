import { useContext, useEffect, useState } from "react";
import SidebarContext from "../context/SidebarContext";

export default function useElementDimensions(element: HTMLDivElement | null) {
  const responsiveBrowseBar = useContext(SidebarContext);
  const { minimized } = { ...responsiveBrowseBar };
  
  function getElementDimensions() {
    const width = element ? element.getClientRects().item(0)?.width : undefined;
    const height = element ? element.getClientRects().item(0)?.height : undefined;
    
    return {
      width,
      height,
    };
  }

  const [dimensions, setDimensions] = useState(getElementDimensions());

  useEffect(() => {
    if (element) {
      window.addEventListener("resize", () =>
        setDimensions(getElementDimensions())
      );

      setDimensions(getElementDimensions)
    }

    return () => window.removeEventListener("resize", () =>
      setDimensions(getElementDimensions())
    );
  }, [element]);

  // Considers width when Browsebar is open
  useEffect(() => {
    setDimensions(getElementDimensions());
  }, [minimized]);

  return dimensions
}
