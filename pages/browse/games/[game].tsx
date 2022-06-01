import Head from "next/head";
import React from "react";
import axios from "axios";
import GameMain from "../../../components/Game/GameMain";

export async function getServerSideProps(context: { query: { game: string } }) {
  const { game } = context.query;
  const gameData = await axios
    .get(`https://api.ghostity.com/games/${encodeURIComponent(game)}`)
    .then(async (res) => res.data);

  if (!gameData) return { notFound: true };

  return { props: { gameData } };
}

export default function BrowseGameStreams({ gameData }: { gameData: Game }) {
  return (
    <>
      <Head>
        <title>Ghostity | {gameData.name}</title>
      </Head>
      <GameMain gameData={gameData} />
    </>
  );
}
