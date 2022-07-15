import { createContext, Dispatch, SetStateAction } from "react";

const SidebarContext = createContext<{
  showBrowseBar: boolean;
  setShowBrowseBar: Dispatch<SetStateAction<boolean>>;
  userPreference: boolean;
  browseBarOverride: Dispatch<SetStateAction<boolean>>;
  minimized: boolean;
}>({
  showBrowseBar: true,
  setShowBrowseBar: () => {},
  userPreference: true,
  browseBarOverride: () => {},
  minimized: false
});

export default SidebarContext;
