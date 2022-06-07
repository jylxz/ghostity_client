import { createContext, Dispatch, SetStateAction } from "react";

const BlacklistContext = createContext<{
  setShowBlacklistModal: Dispatch<SetStateAction<boolean>>;
  setBlacklistChannel: Dispatch<SetStateAction<Stream | null>>;
}>({
  setShowBlacklistModal: () => {},
  setBlacklistChannel: () => {},
});

export default BlacklistContext