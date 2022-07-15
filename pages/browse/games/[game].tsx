import Head from "next/head";
import React, { ReactElement } from "react";
import axios from "axios";
import GameMain from "../../../components/Game/GameMain";
import DefaultKeywords from "../../../components/Head/Keywords";
import DefaultOpenGraph from "../../../components/Head/OpenGraph";
import BrowseLayout from "../../../layouts/BrowseLayout";

export async function getServerSideProps(context: { query: { game: string } }) {
  const { game } = context.query;
  const API = process.env.NEXT_PUBLIC_API as string;

  const gameData = await axios
    .get<Game>(`${API}/games/${encodeURIComponent(game)}`)
    .then((res) => res.data);

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
      <GameMain gameData={gameData} />
    </>
  );
}

BrowseGameStreams.getLayout = function getLayout(page: ReactElement) {
  return <BrowseLayout>{page}</BrowseLayout>;
};
