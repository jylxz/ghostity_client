import { ThemeContext } from "contexts";
import React, {useContext} from "react";
import { TwitterTimelineEmbed } from "react-twitter-embed";

export default function PreviewChannelTwitter({
  twitterUrl,
}: {
  twitterUrl: string;
}) {
  const screenName = twitterUrl.split(".com/")[1];
  const theme = useContext(ThemeContext)

  return (
    <div className="w-1/5 min-w-[18rem] p-4 max-h-full overflow-y-auto overscroll-contain">
      <TwitterTimelineEmbed
        sourceType="profile"
        screenName={screenName}
        theme={theme === "light" ? "light" : "dark"}
        noHeader
        noFooter
        tweetLimit={10}
      />
    </div>
  );
}
