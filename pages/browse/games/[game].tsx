// Libraries
import React, { ReactElement } from "react";
import Head from "next/head";
import { motion } from "framer-motion";

// Services
import API from "services/api";

// Layout
import BrowseLayout from "layouts/BrowseLayout";

// Components
import { DefaultKeywords, DefaultOpenGraph } from "components/Head";
import { GameBanner, GameStreams } from "components/Game";
import BrowseWrapper from "@general/BrowseWrapper";

export async function getServerSideProps(context: { query: { game: string } }) {
  const { game } = context.query;

  const gameData = await API.get<Game>(
    `/games/${encodeURIComponent(game)}`
  ).then((res) => res.data);

  if (!gameData) return { notFound: true };

  return { props: { gameData } };
}

export default function BrowseGameStreams({ gameData }: { gameData: Game }) {
  return (
    <>
      <Head>
        <title>vGhostity | {gameData.name}</title>
        <meta name="description" content={gameData.summary} />
      </Head>
      <>
        <DefaultOpenGraph
          title={`vGhostity | ${gameData.name}`}
          description={gameData.summary}
        />
        <DefaultKeywords keywords={gameData.name} />
      </>
      <BrowseWrapper>
        <GameBanner gameData={gameData} />
        <motion.div layout="position" className="my-7 border" />
        <GameStreams game={gameData.name} />
      </BrowseWrapper>
    </>
  );
}

BrowseGameStreams.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
