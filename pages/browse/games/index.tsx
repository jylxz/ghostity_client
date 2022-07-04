import React from "react";
import Head from "next/head";
import BrowseGames from "../../../components/Browse/BrowseGames";

export default function games() {
  return (
    <>
      <Head>
        <title>vGhostity | Games</title>
        <meta
          name="keywords"
          content="V-Tubers, VTubers, virtual youtubers, Hololive, Nijisanji, VShojo, VSPO, Twitch, Youtube, V-Tuber directory, livestreams, games"
        />
      </Head>
      <BrowseGames />
    </>
  );
}

