import React, { ReactElement } from "react";
import Head from "next/head";
import BrowseGames from "../../../components/Browse/BrowseGames";
import DefaultKeywords from "../../../components/Head/Keywords";
import DefaultOpenGraph from "../../../components/Head/OpenGraph";
import BrowseLayout from "../../../layouts/BrowseLayout";

export default function Games() {
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

Games.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
