import React from "react";
import Head from "next/head";

export default function DefaultKeywords({ keywords }: { keywords?: string | string[] }) {
  const keywordsString =  Array.isArray(keywords) ? keywords.join(", ") : keywords

  return (
    <Head>
      <meta
        name="keywords"
        content={`VTubers, watch VTubers, virtual youtubers, Hololive, Nijisanji, VShojo, VSPO, Twitch, Vtuber twitch, Youtube, Vtuber youtube, Vtuber directory, Vtuber app, livestreams, games, ${keywordsString || ""}`}
      />
    </Head>
  );
}
