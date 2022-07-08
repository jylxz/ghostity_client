import React from "react";
import Head from "next/head";
import BrowseGames from "../../../components/Browse/BrowseGames";
import DefaultKeywords from "../../../components/Head/Keywords";
import DefaultOpenGraph from "../../../components/Head/OpenGraph";

export default function games() {
  return (
    <>
      <Head>
        <title>vGhostity | Games</title>
        <meta
          name="description"
          content="Keep track and watch VTubers play some of your favorite games from Minecraft, Valorant, Apex Legends, and more!"
        />
      </Head>
      <>
        <DefaultOpenGraph
          title="vGhostity | Games"
          description="Keep track and watch VTubers play some of your favorite games from Minecraft, Valorant, Apex Legends, and more!"
        />
        <DefaultKeywords />
      </>
      <BrowseGames />
    </>
  );
}
