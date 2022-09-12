import { createContext, Dispatch, SetStateAction } from "react";

interface ChannelPreview {
  showPreview: boolean;
  setShowPreview: Dispatch<SetStateAction<boolean>>;
  PreviewChannelId: string;
  setPreviewChannelId: Dispatch<SetStateAction<string>>;
}

const PreviewContext = createContext<ChannelPreview | null>(null)

export default PreviewContext
