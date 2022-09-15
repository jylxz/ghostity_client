import { ThemeContext } from "contexts";
import React, {
  useContext,
} from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import GradientCircularProgress from "@general/GradientCircularProgress";

export default function PreviewChannelTwitter({
  twitterUrl,
}: {
  twitterUrl: string;
}) {
  const screenName = twitterUrl.split(".com/")[1];
  const theme = useContext(ThemeContext);

  return (
    <div className="w-1/5 min-w-[18rem] max-h-full overflow-y-auto overscroll-contain pr-2.5 ">
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={screenName}
        theme={theme === "light" ? "light" : "dark"}
        noHeader
        noFooter
        noBorders
        tweetLimit={10}
        placeholder={
          <div className="flex justify-center items-center w-full h-full">
            <GradientCircularProgress />
          </div> 
        }
      />
    </div>
  );
}
